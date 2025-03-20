import { PinataSDK } from "pinata";
require("dotenv").config();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.PINATA_GATEWAY_URL,
  pinataGatewayKey: process.env.PINATA_GATEWAY_KEY,
});

export default pinata;
