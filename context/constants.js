import { ethers } from "ethers";
import Web3Modal from "web3modal";

// INTERNAL IMPORT
import FileSharingDApp from "./FileSharingDApp.json";

// FILESHARING
export const FILE_SHARING_ADDRESS =
  "0xFD71B02dc467d6126381818cCae65f23B4AD7a50";
const FILE_SHARING_ABI = FileSharingDApp.abi;

const FileCoin = {
  chainId: 314159,
  name: "Filecoin - Calibration testnet",
  currency: {
    name: "Filecoin - Calibration testnet",
    symbol: "tFIL",
    decimals: 18,
  },
  rpcUrls: ["https://filecoin-calibration.chainup.net/rpc/v1"],
  blockExplorerUrls: ["https://calibration.filscan.io"],
};

const fetchContract = (signer, ABI, ADDRESS) =>
  new ethers.Contract(ADDRESS, ABI, signer);

const switchToFileCoinChain = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Metamask is not installed.");
    return;
  }

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: FileCoin.chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [FileCoin],
        });
      } catch (addError) {
        console.error("Failed to add the network:", addError);
      }
    } else {
      console.error("Failed to switch network:", switchError);
    }
  }
};

export const web3Provider = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const network = await provider.getNetwork();
    if (network.chainId !== parseInt(FileCoin.chainId, 16)) {
      await switchToFileCoinChain();
    }

    return provider;
  } catch (error) {
    console.log(error);
  }
};

export const FILE_SHARING_Contract = async () => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();
    const contract = fetchContract(
      signer,
      FILE_SHARING_ABI,
      FILE_SHARING_ADDRESS
    );
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const getBalance = async () => {
  try {
    const provider = await web3Provider();
    const signer = provider.getSigner();
    return await signer.getBalance();
  } catch (error) {
    console.log(error);
  }
};
