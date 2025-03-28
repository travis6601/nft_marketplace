import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "viem/chains";
import { REOWN_PROJECT_ID } from "~/constants";

export const wagmiConfig = getDefaultConfig({
  appName: "NFT Marketplace",
  projectId: REOWN_PROJECT_ID as string,
  chains: [baseSepolia],
  ssr: true,
});
