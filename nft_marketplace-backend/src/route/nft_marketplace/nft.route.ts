import { Router } from "express";
import {
  getAllNfts,
  getNftBalance,
  getNftTransactions,
  uploadMetadata,
} from "../../controllers/nft";
import multer from "multer";

const nftRoute = Router();
const upload = multer({ dest: "uploads/" });

nftRoute.get("/nft", getAllNfts);
nftRoute.get("/fetch_transactions", getNftTransactions);
nftRoute.post("/upload_metadata", upload.single("image"), uploadMetadata);
nftRoute.get("/get_balance", getNftBalance);

export default nftRoute;
