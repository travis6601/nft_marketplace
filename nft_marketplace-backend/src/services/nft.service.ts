import prisma from "../config/db";
import path from "path";
import pinata from "../config/pinata";
const mime = require("mime");
const fs = require("fs-extra");

class NftService {
  getNftDetails = async () => {
    try {
      const nfts = await prisma.nft.findMany();

      if (nfts.length) return nfts;
    } catch (error) {
      return null;
    }
  };

  uploadMetadataToIpfs = async (
    name: string,
    description: string,
    imagePath: string
  ) => {
    try {
      // Setup image to upload Pinata
      const blob = new Blob([fs.readFileSync(imagePath)]);
      const file = new File([blob], `${name}_NFT_image_${Date.now()}`, {
        type: mime.getType(imagePath),
      });

      const uploaded = await pinata.upload.public.file(file);

      if (uploaded) {
        const imageCid = uploaded.cid;

        const metaData = {
          name,
          description,
          image: `ipfs://${imageCid}`,
        };

        // Parse metadata to JSON and upload to Pinata
        const metadataBlob = new Blob([JSON.stringify(metaData)]);
        const metadataFileName = `${name}_NFT_metadata_${Date.now()}.json`;
        const metadataFile = new File([metadataBlob], metadataFileName, {
          type: "application/json",
        });

        const metadataUploaded = await pinata.upload.public.file(metadataFile);

        if (metadataUploaded) {
          return metadataUploaded.cid;
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  };
}

export default new NftService();
