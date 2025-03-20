const hre = require("hardhat");
const { MARKET_PLACE_CONTRACT_ADDRESS } = require("../constants");
const nftMarketPlaceAbi =
  require("../artifacts/contracts/NFTMarketPlace.sol/NFTMarketPlace.json").abi;
const nftAbi = require("../artifacts/contracts/NFT.sol/NFT.json").abi;

export const getMarketPlaceContractAddress = async () => {
  const accounts = await hre.ethers.getSigners();

  const marketPlaceContract = new hre.ethers.Contract(
    MARKET_PLACE_CONTRACT_ADDRESS,
    nftMarketPlaceAbi,
    accounts[0]
  );

  return marketPlaceContract;
};

export const getNftContract = async (nftAddress: string) => {
  const accounts = await hre.ethers.getSigners();

  return new hre.ethers.Contract(nftAddress, nftAbi, accounts[0]);
};
