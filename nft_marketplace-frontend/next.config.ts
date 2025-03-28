import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.seadn.io",
      },
      {
        protocol: "https",
        hostname: "fuchsia-raw-dolphin-155.mypinata.cloud",
      },
    ],
  },
};

export default nextConfig;
