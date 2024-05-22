// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBase.sol";

contract FileSharingDApp is VRFConsumerBase {
    address public owner;
    uint256 public LICENSE_FEE = 0.00001 ether;

    // MEMBERSHIP PLAN
    uint256 public BASIC_PLAN = 0.0001 ether;
    uint256 public SILVER_PLAN = 0.0005 ether;
    uint256 public GOLD_PLAN = 0.001 ether;

    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    mapping(bytes32 => address) public requestIdToSender;

    struct File {
        uint256 ID;
        address owner;
        string fileName;
        string description;
        string category;
        string fileHash;
        bool isPublic;
        uint256 createdAt;
    }

    struct Certificate {
        uint256 ID;
        address owner;
        string fileName;
        string description;
        string category;
        string fileHash;
        bool isPublic;
        uint256 createdAt;
    }

    struct User {
        address _address;
        string fullname;
        string username;
        string email;
        string password;
        bool isRegistered;
        uint256 registerAt;
        uint256 credit;
        string membership;
    }

    mapping(address => File[]) private userFiles;
    mapping(address => Certificate[]) private fileCertificate;
    mapping(address => User) public users;
    File[] public publicFiles;
    User[] getAllUsers;

    event FileShared(address indexed owner, string fileName, string fileHash, bool isPublic);
    event FileCertificate(address indexed owner, address indexed buyer, string fileName, string fileHash);
    event UserSignedUp(address indexed userAddress, string username);
    event UserLoggedIn(address indexed userAddress, string username);
    event RandomnessRequested(bytes32 requestId);

    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee
    ) VRFConsumerBase(_vrfCoordinator, _linkToken) {
        owner = msg.sender;
        keyHash = _keyHash;
        fee = _fee;
    }

    function createFile(
        string memory _fileName,
        string memory _description,
        string memory _category,
        string memory _fileHash,
        bool _isPublic
    ) external onlyRegisteredUser {
        User storage user = users[msg.sender];
        require(user.credit > 0, "You don't have credit to create, buy now");

        bytes32 requestId = requestRandomNumber();
        requestIdToSender[requestId] = msg.sender;
        // Temporarily store file data until randomness is fulfilled
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        address fileOwner = requestIdToSender[requestId];

        uint256 newID = randomResult;
        File memory newFile = File({
            ID: newID,
            owner: fileOwner,
            fileName: "", // This should be retrieved from a temporary storage if needed
            description: "", // This should be retrieved from a temporary storage if needed
            category: "", // This should be retrieved from a temporary storage if needed
            fileHash: "", // This should be retrieved from a temporary storage if needed
            isPublic: false, // This should be retrieved from a temporary storage if needed
            createdAt: block.timestamp
        });

        userFiles[fileOwner].push(newFile);
        User storage user = users[fileOwner];
        user.credit = user.credit - 1;

        if (newFile.isPublic) {
            publicFiles.push(newFile);
        }

        emit FileShared(fileOwner, newFile.fileName, newFile.fileHash, newFile.isPublic);
    }

    function buyCertificate(
        address _owner,
        uint256 _ID,
        string memory _fileName,
        string memory _description,
        string memory _category,
        string memory _fileHash,
        bool _isPublic
    ) external payable onlyRegisteredUser {
        require(
            msg.value == LICENSE_FEE,
            "Please submit the asking LICENSE_FEE in order to complete the purchase"
        );

        Certificate memory newFile = Certificate({
            ID: _ID,
            owner: _owner,
            fileName: _fileName,
            description: _description,
            category: _category,
            fileHash: _fileHash,
            isPublic: _isPublic,
            createdAt: block.timestamp
        });

        fileCertificate[msg.sender].push(newFile);
        payable(_owner).transfer(LICENSE_FEE);

        emit FileCertificate(msg.sender, _owner, _fileName, _fileHash);
    }

    function buyCredit(uint256 _credit, string memory _plan) external payable {
        require(
            msg.value == BASIC_PLAN || msg.value == SILVER_PLAN || msg.value == GOLD_PLAN,
            "You don't have fund to make transactions"
        );

        User storage user = users[msg.sender];

        user.credit = user.credit + _credit;
        user.membership = _plan;
        payable(owner).transfer(msg.value);
    }

    function getAllPublicFiles() external view returns (File[] memory) {
        return publicFiles;
    }

    function getAllUserFiles(address _user) external view returns (File[] memory) {
        return userFiles[_user];
    }

    function getAllUserCertificates(address _user) external view returns (Certificate[] memory) {
        return fileCertificate[_user];
    }

    function signUp(
        string memory _fullname,
        string memory _username,
        string memory _email,
        string memory _password
    ) public {
        require(!users[msg.sender].isRegistered, "User already registered");

        users[msg.sender] = User({
            _address: msg.sender,
            fullname: _fullname,
            username: _username,
            email: _email,
            password: _password,
            isRegistered: true,
            registerAt: block.timestamp,
            credit: 5,
            membership: "notMember"
        });

        getAllUsers.push(User(msg.sender, _fullname, _username, _email, _password, true, block.timestamp, 5, "notMember"));

        emit UserSignedUp(msg.sender, _username);
    }

    function login(string memory _password) public onlyRegisteredUser returns (address, string memory, bool) {
        // In a real-world scenario, you would compare the hashed password
        require(
            keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(users[msg.sender].password)),
            "Invalid password"
        );

        emit UserLoggedIn(msg.sender, users[msg.sender].username);

        return (msg.sender, users[msg.sender].username, true);
    }

    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    function resetPassword(string memory _newPassword) public onlyRegisteredUser {
        // In a real-world scenario, you would hash the new password before storing it
        users[msg.sender].password = _newPassword;
    }

    function getAllDappUsers() public view returns (User[] memory) {
        return getAllUsers;
    }

    // Chainlink VRF
    function requestRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        requestId = requestRandomness(keyHash, fee);
        emit RandomnessRequested(requestId);
    }
}



