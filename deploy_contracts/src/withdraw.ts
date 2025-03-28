import { getMarketPlaceContractAddress, getNftContract } from "./utils";

export const main = async () => {
  const marketPlaceContract = await getMarketPlaceContractAddress();

  const WITHDRAW_ADDRESS = "0x936BE52585eE53EeD66CeEAf141cc6d0597eB4AE";
  const tx = await marketPlaceContract.withdrawTo(WITHDRAW_ADDRESS);

  await tx.wait();
  console.log(
    "Withdraw successfully",
    `https://sepolia.basescan.org/tx/${tx.hash}`
  );
};

main();
