import { ethers } from "ethers";
import Web3Modal from "web3modal";

// INTERNAL IMPORT
import FileSharingDApp from "./FileSharingDApp.json";

// FILESHARING
export const FILE_SHARING_ADDRESS =
  "0x36a5eB4E208Aa48F9Ca92595F1E67Aa3fBEc90e5";
const FILE_SHARING_ABI = FileSharingDApp.abi;

const BitTorrent = {
  chainId: 2442, // 1029 in hexadecimal
  name: "Polygon zkEVM Cardona Testnet",
  currency: {
    name: "Polygon zkEVM Cardona Testnet",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://polygon-zkevm-cardona.blockpi.network/v1/rpc/public"],
  blockExplorerUrls: ["https://cardona-zkevm.polygonscan.com"],
};

const fetchContract = (signer, ABI, ADDRESS) =>
  new ethers.Contract(ADDRESS, ABI, signer);

const switchToBitTorrentChain = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Metamask is not installed.");
    return;
  }

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BitTorrent.chainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [BitTorrent],
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
    if (network.chainId !== parseInt(BitTorrent.chainId, 16)) {
      await switchToBitTorrentChain();
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
