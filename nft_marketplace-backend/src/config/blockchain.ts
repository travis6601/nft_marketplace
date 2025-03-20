import { ethers } from "ethers";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "../constants";
import { NFT_MARKETPLACE_ABI } from "../constants/abi";
require("dotenv").config();

const blockchainProvider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL
);

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string);
export const account = wallet.connect(blockchainProvider);

export const nftMarketPlaceContract = new ethers.Contract(
  NFT_MARKETPLACE_CONTRACT_ADDRESS,
  NFT_MARKETPLACE_ABI,
  account
);

export default blockchainProvider;
