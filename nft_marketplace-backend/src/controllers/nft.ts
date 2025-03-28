import { Request, Response } from "express";
import nftService from "../services/nft.service";
import blockchainService from "../services/blockchain.service";
import { nftMarketPlaceContract } from "../config/blockchain";

const getAllNfts = async (req: Request, res: Response) => {
  try {
    const nftDetails = await nftService.getNftDetails();

    res.json({
      message: "NFTs fetched successfully",
      data: nftDetails || [],
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNftTransactions = async (req: Request, res: Response) => {
  try {
    const { address, page = 1, pageSize = 20, time_sort = "desc" } = req.query;

    if (!address) {
      res.status(400).json({ message: "User address is required" });
      return;
    }

    // Get user transaction by filter user and make pagination
    const userTransactions = await nftService.getUserTransaction(
      address as string,
      Number(page),
      Number(pageSize),
      time_sort as "desc" | "asc"
    );
    console.log("userTransactions: ", userTransactions);

    if (!userTransactions) {
      res.status(500).json({ message: "Failed to get user transactions" });
      return;
    }

    res.json({
      message: "User transactions fetched successfully",
      data: userTransactions,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadMetadata = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const imagePath = req?.file?.path;

    if (!name || !description || !imagePath) {
      res.status(400).json({ message: "Missing required fields" });
    }

    const metadataCid = await nftService.uploadMetadataToIpfs(
      name,
      description,
      imagePath as string
    );

    if (!metadataCid) {
      res.status(500).json({ message: "Failed to upload metadata" });
    }

    res.json({
      message: "Metadata uploaded successfully",
      cid: `ipfs://${metadataCid}`,
    });
  } catch (error) {
    console.error("Upload metadata to IPFS failed: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getNftBalance = async (req: Request, res: Response) => {
  try {
    const nftListing = await nftMarketPlaceContract.getAllListing();

    if (nftListing.length === 0) {
      res.json({
        message: "User balance fetched successfully",
        data: 0,
      });
    }

    let nftBalances = [];
    for (const nft of nftListing) {
      const nftBalance = await nftMarketPlaceContract.getNftBalances(
        nft.nftAddress
      );
      nftBalances.push({
        nftAddress: nft.nftAddress,
        balance: Number(nftBalance),
      });
    }

    res.json({
      message: "User balance fetched successfully",
      data: nftBalances,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllNfts, getNftTransactions, uploadMetadata, getNftBalance };
