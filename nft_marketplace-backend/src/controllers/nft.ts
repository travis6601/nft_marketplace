import { Request, Response } from "express";
import nftService from "../services/nft.service";
import blockchainService from "../services/blockchain.service";
import pinata from "../config/pinata";
import { nftMarketPlaceContract } from "../config/blockchain";
const mime = require("mime");

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
    await blockchainService.getUserTransaction();
    res.json({
      message: "User transactions fetched successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const uploadMetadata = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name || !description || !req.file) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const imagePath = req.file.path;
    const metadataCid = await nftService.uploadMetadataToIpfs(
      name,
      description,
      imagePath
    );

    if (!metadataCid) {
      res.status(500).json({ message: "Failed to upload metadata" });
      return;
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

    console.log("nftBalances", nftBalances);

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
