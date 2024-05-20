// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileSharingDApp {
    address public owner;
    uint256 public LICENSE_FEE = 0.00001 ether;

    //MEMBERSHIP PLAN
    uint256 public BASIC_PLAN = 0.0001 ether;
    uint256 public SILVER_PLAN = 0.0005 ether;
    uint256 public GOLD_PLAN = 0.001 ether;

    
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

    uint256 public fileID;


    event FileShared(address indexed owner, string fileName, string fileHash, bool isPublic);
    event FileCertificate(address indexed owner, address indexed buyer, string fileName, string fileHash);
    event UserSignedUp(address indexed userAddress, string username);
    event UserLoggedIn(address indexed userAddress, string username);

   
    modifier onlyRegisteredUser() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createFile(string memory _fileName, string memory _description, string memory _category, string memory _fileHash, bool _isPublic) external onlyRegisteredUser {
       User storage user = users[msg.sender];
       require( user.credit > 0, "You Don't have cradit to create, Buy Now");

       fileID++;
       uint256 newID = fileID;
       File memory newFile = File({
            ID: newID,
            owner: msg.sender,
            fileName: _fileName,
            description: _description,
            category: _category,
            fileHash: _fileHash,
            isPublic: _isPublic,
            createdAt: block.timestamp
        });

        userFiles[msg.sender].push(newFile);
        
       
        user.credit = user.credit - 1;

        if (_isPublic) {
            publicFiles.push(newFile);
        }

        emit FileShared(msg.sender, _fileName, _fileHash, _isPublic);
    }

    function buyCertificate(address _owner, uint256 _ID, string memory _fileName, string memory _description, string memory _category, string memory _fileHash, bool _isPublic) external payable onlyRegisteredUser {
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
            msg.value == BASIC_PLAN || msg.value == SILVER_PLAN  || msg.value  == GOLD_PLAN,
            "You Don't have fund to make tractions"
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

    function signUp(string memory _fullname,string memory _username,string memory _email, string memory _password) public {
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

         getAllUsers.push(User(msg.sender, _fullname, _username, _email, _password, true, block.timestamp, 5, "notMember" ));

        emit UserSignedUp(msg.sender, _username);
    }

    function login(string memory _password) public onlyRegisteredUser returns(address, string memory, bool) {
        // In a real-world scenario, you would compare the hashed password
        require(keccak256(abi.encodePacked(_password)) == keccak256(abi.encodePacked(users[msg.sender].password)), "Invalid password");

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
}




