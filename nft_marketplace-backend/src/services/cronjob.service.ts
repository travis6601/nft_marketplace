import { formatEther } from "ethers/lib/utils";
import prisma from "../config/db";
import blockchainService from "./blockchain.service";

class CronJob {
  refetchNftDetails = async () => {
    try {
      const nftDetailsOnBlockchain = await blockchainService.getNftDetails();

      const nfts = await prisma.nft.findMany({
        select: {
          address: true,
        },
      });

      if (!nftDetailsOnBlockchain) return;

      const newNfts = nftDetailsOnBlockchain.filter(
        (blockchainNft) =>
          !nfts.find(
            (dbNft) =>
              dbNft.address.toLocaleLowerCase() ===
              blockchainNft.nftAddress.toLocaleLowerCase()
          )
      );

      await Promise.all(
        newNfts.map((nft) =>
          prisma.nft.create({
            data: {
              address: nft.nftAddress,
              creator: nft.creator,
              name: nft.name,
              symbol: nft.symbol,
              uri: nft.tokenUri,
              price: formatEther(BigInt(nft.price)),
              isListed: nft.isListed,
              image: nft.image,
            },
          })
        )
      );

      console.log(
        `Cron job - NFT details refetched ${new Date().toLocaleString()}`
      );
    } catch (error) {
      console.log(
        `Cron job - NFT details failed ${new Date().toLocaleString()}`,
        error
      );
    }
  };
}

export default new CronJob();
