import express, { Request, Response } from "express";
import nftRoute from "./route/nft_marketplace/nft.route";
import cron from "node-cron";
import cronjobService from "./services/cronjob.service";
import blockchainService from "./services/blockchain.service";
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(nftRoute);

// Fetch all NFT details every minute
// cron.schedule("*/15 * * * * *", async () => {
//   await cronjobService.refetchNftDetails();
//   await blockchainService.getUserTransaction();
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
