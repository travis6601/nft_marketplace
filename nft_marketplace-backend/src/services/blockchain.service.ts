import { ethers } from "ethers";
import blockchainProvider, {
  account,
  nftMarketPlaceContract,
} from "../config/blockchain";
import { NftListing, TRANSACTION_TYPE } from "../interfaces";
import { NFT_ABI } from "../constants/abi";
import { parsedTokenUri } from "../utils";
import prisma from "../config/db";
import { formatEther } from "ethers/lib/utils";

class BlockchainService {
  getNftDetails = async () => {
    try {
      const nftListing = await nftMarketPlaceContract.getAllListing();

      const nftDetails = await Promise.all(
        nftListing.map(async (nft: NftListing) => {
          const nftAddress = nft.nftAddress;
          const nftContract = new ethers.Contract(nftAddress, NFT_ABI, account);

          // Get NFT details
          const name = await nftContract.name();
          const symbol = await nftContract.symbol();

          // Get tokenUri from NFT contract
          const parseTokenUri = parsedTokenUri(nft.tokenUri);
          const tokenUri = await fetch(parseTokenUri);
          const tokenUriJson = await tokenUri.json();

          return {
            ...nft,
            name,
            symbol,
            tokenUri: tokenUriJson.image,
          };
        })
      );

      return nftDetails;
    } catch (error) {
      console.log("Error when fetch NFT details on blockchain", error);
      return null;
    }
  };

  getUserTransaction = async () => {
    try {
      const lastBlockNumberTransaction = await prisma.config.findFirst({
        where: {
          id: 1,
        },
        select: {
          last_block_number_transaction: true,
        },
      });

      if (!lastBlockNumberTransaction) return;

      const logs = await blockchainProvider.getLogs({
        address: nftMarketPlaceContract.address,
        fromBlock: lastBlockNumberTransaction.last_block_number_transaction,
        toBlock: "latest",
      });

      if (logs.length > 1) {
        const lastestBlockNumber = logs[logs.length - 1].blockNumber;

        for (const log of logs) {
          const decodedLog = nftMarketPlaceContract.interface.parseLog(log);
          const isBuyEvent = decodedLog.name === "NFTBuy";

          // Skip event create NFT
          if (decodedLog.name === "NFTCreated") continue;

          const block = await blockchainProvider.getBlock(log.blockNumber);
          const timestamp = new Date(block.timestamp * 1000);

          const newTransaction = {
            id: log.transactionHash,
            nft_address: decodedLog.args.nftAddress,
            from_address: isBuyEvent
              ? decodedLog.args.buyer
              : decodedLog.args.seller,
            price: Number(formatEther(decodedLog.args.price)),
            type:
              decodedLog.name === "NFTBuy"
                ? TRANSACTION_TYPE.BUY
                : TRANSACTION_TYPE.SELL,
            transaction_at: timestamp,
          };

          await prisma.$transaction(async () => {
            await prisma.transactions.create({
              data: newTransaction,
            });

            await prisma.config.update({
              where: {
                id: 1,
              },
              data: {
                last_block_number_transaction: lastestBlockNumber + 1,
              },
            });
          });
        }
      }

      console.log("Cron job - User transactions fetched successfully");
    } catch (error) {
      console.log("---> User transactions fetch failed", error);
      return null;
    }
  };
}

export default new BlockchainService();
