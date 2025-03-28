import { useState } from "react";
import { toast } from "sonner";
import { Address } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { wagmiConfig } from "~/config/wagmi";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "~/constants";
import { NFT_MARKETPLACE_ABI } from "~/constants/abi";
import { Config, waitForTransactionReceipt } from "@wagmi/core";

interface UseSellNftProps {
  nftAddress: string;
  nftBalance: number;
}

const useSellNft = ({ nftAddress, nftBalance }: UseSellNftProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const sellNft = async () => {
    try {
      if (!address) {
        toast.error("Please connect your wallet");
        return null;
      }

      if (!nftAddress) {
        toast.error("Invalid NFT address");
        return null;
      }

      if (nftBalance <= 0) {
        toast.error("Insufficient balance");
        return null;
      }

      setIsLoading(true);

      const tx = await writeContractAsync({
        abi: NFT_MARKETPLACE_ABI,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS as Address,
        functionName: "sellNft",
        args: [nftAddress],
      });

      const transactionReceipt = await waitForTransactionReceipt(
        wagmiConfig as Config,
        {
          hash: tx as Address,
        }
      );

      if (transactionReceipt) {
        return transactionReceipt.transactionHash;
      }
    } catch (error) {
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sellNft,
    isLoading,
  };
};

export default useSellNft;
