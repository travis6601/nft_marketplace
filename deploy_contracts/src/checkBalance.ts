import { getMarketPlaceContractAddress, getNftContract } from "./utils";

export const main = async () => {
  const marketPlaceContract = await getMarketPlaceContractAddress();

  // Get the contract address of the NFT
  const allNftContractAddress = await marketPlaceContract.getAllListing();
  const nftContractAddress = allNftContractAddress[0].nftAddress;
  // Buy NFT
  console.log("nftContractAddress: ", nftContractAddress);

  const value = await marketPlaceContract.getNftBalances(nftContractAddress);
  console.log("value: ", Number(value));
};

main();
