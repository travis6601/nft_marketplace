import { useState } from "react";
import { toast } from "sonner";
import { Address, parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import { wagmiConfig } from "~/config/wagmi";
import { BACKEND_URL, NFT_MARKETPLACE_CONTRACT_ADDRESS } from "~/constants";
import { NFT_MARKETPLACE_ABI } from "~/constants/abi";
import { Config, waitForTransactionReceipt } from "@wagmi/core";
import { useTransactionToast } from "~/hooks/useTransactionToast";

interface UseCreateNftProps {
  name: string;
  symbol: string;
  description: string;
  file: File | null;
  price: string;
  resetForm: () => void;
}

const useCreateNft = ({
  name,
  symbol,
  description,
  file,
  price,
  resetForm,
}: UseCreateNftProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { writeContractAsync } = useWriteContract();
  const transactionToast = useTransactionToast();
  const { address } = useAccount();

  const handleCreateNewNft = async () => {
    try {
      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (Number(price) <= 0) {
        toast.error("Price must be greater than 0");
        return;
      }

      if (!name || !symbol || !description || !file) {
        toast.error("Missing required fields");
        return;
      }

      setLoading(true);

      // Append data to request
      const formData = new FormData();
      formData.append("name", name);
      formData.append("symbol", symbol);
      formData.append("description", description);
      formData.append("image", file);

      // Upload image to IPFS
      const uploadMetadataRes = await fetch(`${BACKEND_URL}/upload_metadata`, {
        method: "POST",
        body: formData,
      });
      const uploadMetadataResJson = await uploadMetadataRes.json();
      const imageIpfsCid = uploadMetadataResJson.cid;

      if (uploadMetadataRes.status !== 200 || !imageIpfsCid) {
        toast.error("Failed to upload metadata");
        return;
      }

      const tx = await writeContractAsync({
        abi: NFT_MARKETPLACE_ABI,
        address: NFT_MARKETPLACE_CONTRACT_ADDRESS as Address,
        functionName: "createNewNft",
        args: [name, symbol, imageIpfsCid, parseEther(price)],
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
      console.error("Error creating NFT: ", error);
      toast.error("Failed to create NFT");
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return {
    handleCreateNewNft,
    loading,
  };
};

export default useCreateNft;
