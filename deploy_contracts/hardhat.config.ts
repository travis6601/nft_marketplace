import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const NODE_ENDPOINT = process.env.NODE_END_POINT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    "base-sepolia": {
      url: NODE_ENDPOINT,
      accounts: [PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },
};

export default config;
