import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";
import axios from "axios";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";

//INTERNAL IMPORT
import { getBalance, web3Provider, FILE_SHARING_Contract } from "./constants";
import { shortenAddress, parseErrorMsg } from "../utils/utils";

export const CONTEXT = React.createContext();

export const CONTEXT_Provider = ({ children }) => {
  const DAPP_NAME = "Web3 Drive";
  const [openComponent, setOpenComponent] = useState("Home");

  const [loader, setLoader] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [login, setLogin] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [getAllPublicFiles, setGetAllPublicFiles] = useState([]);
  const [getAllUserFiles, setGetAllUserFiles] = useState([]);
  const [allDappUsers, setAllDappUsers] = useState([]);
  const [getFileRights, setGetFileRights] = useState([]);
  const [memberships, setMemberships] = useState([]);
  //CRECK CREATE
  const [checkCreate, setCheckCreate] = useState(0);

  //NOTIFICATION
  const notifyError = (msg) => toast.error(msg, { duration: 4000 });
  const notifySuccess = (msg) => toast.success(msg, { duration: 4000 });

  //CONNECT WALLET
  const connect = async () => {
    try {
      if (!window.ethereum) return notifyError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length) {
        setAddress(accounts[0]);
      } else {
        notifyError("Sorry, you have No account");
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };
  //CHECH IF WALLET CONNECTED
  const checkIfWalletConnected = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    return accounts[0];
  };

  //SIGN UP
  const SIGN_UP = async (user) => {
    try {
      setLoader(true);
      notifySuccess("Wait creating your account");
      const contract = await FILE_SHARING_Contract();

      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();

      if (user.password === user.confirmpassword) {
        const encryptPass = await bcrypt.hash(user.password, 12);

        const transaction = await contract
          .connect(signer)
          .signUp(user.fullname, user.username, user.email, encryptPass);
        await transaction.wait();

        const userDetails = await contract.connect(signer).users(account);

        const userInfo = {
          email: userDetails.email,
          name: userDetails.fullname,
          username: userDetails.username,
          address: userDetails._address,
          password: userDetails.password,
          isRegistered: userDetails.isRegistered,
          credit: userDetails.credit.toNumber(),
          membership: userDetails.membership,
        };

        setCurrentUser(userInfo);
        localStorage.setItem("currentUser", JSON.stringify(userInfo));
        setLoader(false);
        setLogin(false);
        setSignUp(false);
        notifySuccess("Account successfully created");
        setOpenComponent("Home");
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };
  //LOGIN UP
  const LOGIN = async (userlogin) => {
    try {
      setLoader(true);
      notifySuccess("Wait loginin to your account..");
      const contract = await FILE_SHARING_Contract();

      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();

      if (account) {
        const userDetails = await contract.connect(signer).users(account);
        //
        const user = {
          email: userDetails.email,
          name: userDetails.fullname,
          username: userDetails.username,
          address: userDetails._address,
          password: userDetails.password,
          isRegistered: userDetails.isRegistered,
          credit: userDetails.credit.toNumber(),
          membership: userDetails.membership,
        };

        if (user.name == "") {
          notifyError("Kindly Create Account");
        } else {
          const encryptPass = await bcrypt.compare(
            userlogin.password,
            userDetails.password
          );
          if (userDetails.username && encryptPass) {
            setCurrentUser(user);
            setLoader(true);
            notifySuccess("Successfully loginin...");
            localStorage.setItem("currentUser", JSON.stringify(user));
            setLogin(false);
            setLoader(false);
            setOpenComponent("Home");
          }
        }
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
      setLoader(false);
    }
  };

  //RESET PASSWORD
  const RESET_PASSWORD = async (resetPassword) => {
    try {
      setLoader(true);
      notifySuccess("Wait don't close the window");
      const contract = await FILE_SHARING_Contract();

      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();

      if (account) {
        const userDetails = await contract.connect(signer).users(account);

        const user = {
          email: userDetails.email,
          name: userDetails.fullname,
          username: userDetails.username,
          address: userDetails._address,
          password: userDetails.password,
          isRegistered: userDetails.isRegistered,
        };

        if (user.name == "") {
          notifyError("Sorry You have not register yet");
        } else {
          if (userDetails.username == resetPassword.username) {
            const encryptPass = await bcrypt.hash(resetPassword.password, 12);

            const transaction = await contract
              .connect(signer)
              .resetPassword(encryptPass);

            await transaction.wait();
            //UPDATED
            const updateUserData = await contract
              .connect(signer)
              .users(account);
            localStorage.removeItem("currentUser");

            const updatePass = {
              email: updateUserData.email,
              name: updateUserData.fullname,
              username: updateUserData.username,
              address: updateUserData._address,
              password: updateUserData.password,
              isRegistered: updateUserData.isRegistered,
            };

            setCurrentUser(updatePass);
            localStorage.setItem("currentUser", JSON.stringify(updateUserData));
            setLoader(false);
            notifySuccess("Password updated successfully");
            setOpenComponent("Home");
          }
        }
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      setLoader(false);
      notifyError("someting went wrong try later");
    }
  };

  //LOADINITIALDATA
  const LOAD_INITIAL_DATA = async () => {
    try {
      if (address) {
        //PROVIDER
        const PROVIDER = await web3Provider();
        const signer = PROVIDER.getSigner();
        const contract = await FILE_SHARING_Contract();
        const account = await checkIfWalletConnected();

        const userLoginData = JSON.parse(localStorage.getItem("currentUser"));

        if (userLoginData?.isRegistered) {
          setLoader(true);
          localStorage.removeItem("currentUser");
          const userDetails = await contract.connect(signer).users(account);

          const user = {
            email: userDetails.email,
            name: userDetails.fullname,
            username: userDetails.username,
            address: userDetails._address,
            password: userDetails.password,
            isRegistered: userDetails.isRegistered,
            credit: userDetails.credit.toNumber(),
            membership: userDetails.membership,
          };

          setCurrentUser(user);
          localStorage.setItem("currentUser", JSON.stringify(user));

          //MEMBERSHIP PLAN
          const BASIC_PLAN_FEE = await contract.BASIC_PLAN();
          const SILVER_PLAN_FEE = await contract.SILVER_PLAN();
          const GOLD_PLAN_FEE = await contract.GOLD_PLAN();

          const PLAN_1 = ethers.utils.formatUnits(
            BASIC_PLAN_FEE.toString(),
            "ether"
          );
          const PLAN_2 = ethers.utils.formatUnits(
            SILVER_PLAN_FEE.toString(),
            "ether"
          );
          const PLAN_3 = ethers.utils.formatUnits(
            GOLD_PLAN_FEE.toString(),
            "ether"
          );
          const Plan = [
            {
              plan: "Basic",
              price: PLAN_1,
              cradit: 20,
            },
            {
              plan: "Silver",
              price: PLAN_2,
              cradit: 50,
            },
            {
              plan: "Gold",
              price: PLAN_3,
              cradit: 100,
            },
          ];
          setMemberships(Plan);

          ///GET_ALL_PUBLIC_FILES
          const _ALL_PUBLIC_FILES = await contract.getAllPublicFiles();
          const _parsedPublicFile = _ALL_PUBLIC_FILES.map((file) => ({
            ID: file.ID.toNumber(),
            owner: file.owner,
            isPublic: file.isPublic,
            fileName: file.fileName,
            description: file.description,
            fileHash: file.fileHash,
            category: file.category,
            createdAt: file.createdAt.toNumber(),
          }));
          setGetAllPublicFiles(_parsedPublicFile);

          //GET_ALL_USER_FILE
          const _ALL_USER_FILES = await contract.getAllUserFiles(account);
          const _parsedUserFiles = _ALL_USER_FILES.map((file) => ({
            ID: file.ID.toNumber(),
            owner: file.owner,
            isPublic: file.isPublic,
            fileName: file.fileName,
            description: file.description,
            fileHash: file.fileHash,
            category: file.category,
            createdAt: file.createdAt.toNumber(),
          }));
          setGetAllUserFiles(_parsedUserFiles);

          //GET USER FILE RIGHT
          const GET_USER_FILES_RIGHTS = await contract.getAllUserCertificates(
            account
          );
          const _parsedRightsFiles = GET_USER_FILES_RIGHTS.map((file) => ({
            ID: file.ID.toNumber(),
            owner: file.owner,
            isPublic: file.isPublic,
            fileName: file.fileName,
            description: file.description,
            fileHash: file.fileHash,
            category: file.category,
            createdAt: file.createdAt.toNumber(),
          }));
          setGetFileRights(_parsedRightsFiles);

          //GET ALL USERS
          const GET_ALL_DAPP_USER = await contract.getAllDappUsers();
          const _parsedDappUsers = GET_ALL_DAPP_USER.map((user) => ({
            address: user._address,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            password: user.password,
            isRegistered: user.isRegistered,
            registerAt: new Date(
              user.registerAt.toNumber() * 1000
            ).toLocaleDateString(),
          }));
          setAllDappUsers(_parsedDappUsers);
          setOpenComponent("Home");
          setLogin(false);
          setLoader(false);
        }
      } else {
        setLogin(true);
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      console.log(error);
    }
  };

  useEffect(() => {
    LOAD_INITIAL_DATA();
  }, [address]);

  //CREATED FILE
  const CREATE_FILE = async (file, userDetails, fileURL) => {
    try {
      setLoader(true);
      notifySuccess("Wait calling contract");
      const contract = await FILE_SHARING_Contract();

      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();

      const visibility = file._isPublic == "True" ? true : false;

      const _create = await contract
        .connect(signer)
        .createFile(
          file._fileName,
          file._description,
          file._category,
          fileURL,
          visibility
        );
      await _create.wait();

      if (_create && !_create.hasOwnProperty("transactionHash")) {
        setLoader(false);
        notifySuccess("File Uploaded successfully");
        setOpenComponent("Home");
      }
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      setLoader(false);
    }
  };

  //BUYRIGHT
  const BUY_RIGHT = async (file) => {
    try {
      setLoader(true);
      notifySuccess("Wait calling contract");
      const contract = await FILE_SHARING_Contract();

      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();

      const BuyingFee = await contract.LICENSE_FEE();

      const transaction = await contract
        .connect(signer)
        .buyCertificate(
          file.owner,
          file.ID,
          file.fileName,
          file.description,
          file.category,
          file.fileHash,
          file.isPublic,
          {
            value: BuyingFee.toString(),
            gasLimit: ethers.utils.hexlify(1000000),
          }
        );

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully Claim file right");
      setOpenComponent("Home");
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      setLoader(false);
    }
  };

  //BUY CRADIT
  const BUY_CRADIT = async (plan) => {
    try {
      setLoader(true);
      notifySuccess("Wait calling contract");
      const contract = await FILE_SHARING_Contract();

      const CONTRACT_OWNER = await contract.owner();

      const account = await checkIfWalletConnected();
      const PROVIDER = await web3Provider();
      const signer = PROVIDER.getSigner();
      console.log(plan);

      const price = ethers.utils.parseUnits(plan.price.toString(), "ether");

      const transaction = await contract
        .connect(signer)
        .buyCredit(Number(plan.cradit), plan.plan, {
          value: price,
          gasLimit: ethers.utils.hexlify(1000000),
        });

      await transaction.wait();
      setLoader(false);
      notifySuccess("Successfully Claim file right");
      setOpenComponent("Home");
    } catch (error) {
      const errorMsg = parseErrorMsg(error);
      notifyError(errorMsg);
      setLoader(false);
    }
  };

  return (
    <CONTEXT.Provider
      value={{
        address,
        login,
        signUp,
        currentUser,
        getAllUserFiles,
        getAllPublicFiles,
        allDappUsers,
        openComponent,
        loader,
        memberships,
        getFileRights,
        LOAD_INITIAL_DATA,
        BUY_CRADIT,
        setLogin,
        setSignUp,
        setOpenComponent,
        BUY_RIGHT,
        setLoader,
        notifySuccess,
        notifyError,
        connect,
        SIGN_UP,
        LOGIN,
        CREATE_FILE,
        RESET_PASSWORD,
      }}
    >
      {children}
    </CONTEXT.Provider>
  );
};
