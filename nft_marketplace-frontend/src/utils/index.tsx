import {
  BERA_SCAN_TYPE_VALUE,
  EXPLORER_SCAN,
  PINATE_GATEWAY,
} from "~/constants";

const generateNftImageIpfs = (imageIpfs: string) => {
  const ipfsId = imageIpfs.split("//")[1];
  return `${PINATE_GATEWAY}/ipfs/${ipfsId}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_KEY}`;
};

const generateExplorerUrl = (address: string, type: string) => {
  const url = `${EXPLORER_SCAN}${BERA_SCAN_TYPE_VALUE[type]}/${address}`;

  return url;
};

const shortenAddress = (address: string, first = 6, last = 4) => {
  if (address.length < first + last + 1) {
    return address;
  }

  return `${address.slice(0, first)}...${address.slice(-last)}`;
};
export { generateNftImageIpfs, generateExplorerUrl, shortenAddress };
