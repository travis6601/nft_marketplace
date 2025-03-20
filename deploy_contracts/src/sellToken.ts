import { getMarketPlaceContractAddress } from "./utils";

export const main = async () => {
  const marketPlaceContract = await getMarketPlaceContractAddress();

  const TOKEN_TO_SELL = (await marketPlaceContract.getAllListing())[0]
    .nftAddress;

  const tx = await marketPlaceContract.sellNft(TOKEN_TO_SELL);

  console.log("tx", tx);
};

main();
