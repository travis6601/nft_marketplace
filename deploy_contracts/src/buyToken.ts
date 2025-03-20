import { getMarketPlaceContractAddress, getNftContract } from "./utils";

export const main = async () => {
  const marketPlaceContract = await getMarketPlaceContractAddress();

  // Get the contract address of the NFT
  const allNftContractAddress = await marketPlaceContract.getAllListing();
  const nftContractAddress = allNftContractAddress[0].nftAddress;
  const nftPrice = allNftContractAddress[0].price;
  // Buy NFT

  const tx = await marketPlaceContract.buyNft(nftContractAddress, {
    value: nftPrice,
  });

  console.log("tx", tx);
};

main();
