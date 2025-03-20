import { getMarketPlaceContractAddress } from "./utils";

export const main = async () => {
  const marketPlaceContract = await getMarketPlaceContractAddress();

  // Call contract to create NFT
  // const name = "BEAR NFT";
  // const symbol = "BEAR";
  // const tokenUri = "ipfs://QmXEm1qRdEywKdkeNhYn5C7YWCQhqGAKEy7AyQRpDrQgfB";
  // const price = 0.0001 * 10 ** 18;

  // const createNFT = await marketPlaceContract.createNewNft(
  //   name,
  //   symbol,
  //   tokenUri,
  //   price
  // );
  // await createNFT.wait();
  // console.log("NFT created successfully");

  const listingNftContractAddress =
    await marketPlaceContract.listingNftContractAddress(0);
  console.log("listingNftContractAddress: ", listingNftContractAddress);
};

main();
