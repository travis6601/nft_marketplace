// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NftMarketPlaceModule = buildModule("NftMarketPlace", (m) => {
  const nftmarketplace = m.contract("NftMarketPlace");

  return { nftmarketplace };
});

export default NftMarketPlaceModule;
