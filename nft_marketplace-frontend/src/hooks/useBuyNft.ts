import { useState } from "react";
import { toast } from "sonner";
import { Address, formatEther, parseEther } from "viem";
import { useAccount, useBalance, useWriteContract } from "wagmi";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "~/constants";
import { NFT_MARKETPLACE_ABI } from "~/constants/abi";
import { Config, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "~/config/wagmi";
import { useTransactionToast } from "~/hooks/useTransactionToast";

interface UseBuyNftProps {
  nftAddress: Address;
  price: string;
}
const useBuyNft = ({ nftAddress, price }: UseBuyNftProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const { data } = useBalance({
    address,
  });
  const transactionToast = useTransactionToast();

  const { writeContractAsync } = useWriteContract();

  const handleBuyNft = async () => {
    const userEthBalance = formatEther(data?.value || 0n);

    if (!nftAddress) {
      toast.error("Invalid NFT address");
      return;
    }

    if (Number(userEthBalance) <= Number(price)) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setLoading(true);

      const tx = await writeContractAsync({
        abi: NFT_MARKETPLACE_ABI,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS as Address,
        functionName: "buyNft",
        args: [nftAddress],
        value: parseEther(price),
      });

      const transactionReceipt = await waitForTransactionReceipt(
        wagmiConfig as Config,
        {
          hash: tx as Address,
        }
      );

      if (transactionReceipt) {
        transactionToast(transactionReceipt.transactionHash);
      } else {
        toast.error("Failed to create NFT");
      }
    } catch (error) {
      toast.error("Failed to buy NFT");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleBuyNft,
  };
};

export default useBuyNft;
