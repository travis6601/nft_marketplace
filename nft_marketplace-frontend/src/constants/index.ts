const PINATE_GATEWAY = "https://fuchsia-raw-dolphin-155.mypinata.cloud";
const REOWN_PROJECT_ID = "3b836f7430fb59383702eef2ed4ab028";
const BACKEND_URL = "http://localhost:3001";
const NFT_MARKETPLACE_CONTRACT_ADDRESS =
  "0x882Be4Ee2f05d10E52CCD085270D49b8Eb9C57D6";
export enum EXPLORE_SCAN_TYPE {
  ADDRESS = "ADDRESS",
  TRANSACTION = "TRANSACTION",
  TOKEN = "TOKEN",
}
const EXPLORER_SCAN = "https://sepolia.basescan.org/";

const BERA_SCAN_TYPE_VALUE: Record<string, string> = {
  ADDRESS: "address",
  TRANSACTION: "tx",
  TOKEN: "token",
};

export {
  PINATE_GATEWAY,
  REOWN_PROJECT_ID,
  BACKEND_URL,
  NFT_MARKETPLACE_CONTRACT_ADDRESS,
  EXPLORER_SCAN,
  BERA_SCAN_TYPE_VALUE,
};
