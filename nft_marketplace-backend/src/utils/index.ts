import { PINATE_GATEWAY } from "../constants";
require("dotenv").config();

const parsedTokenUri = (tokenUri: string) => {
  const ipfsId = tokenUri.split("://")[1];
  return `${PINATE_GATEWAY}/ipfs/${ipfsId}?pinataGatewayToken=${process.env.PINATA_GATEWAY_KEY}`;
};

export { parsedTokenUri };
