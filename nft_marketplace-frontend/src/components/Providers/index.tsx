"use client";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "~/config/wagmi";
import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
      </QueryClientProvider>

      <Toaster richColors position="top-right" />
    </WagmiProvider>
  );
};

export default Providers;
