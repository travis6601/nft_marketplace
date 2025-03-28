"use client";

import Image from "next/image";
import { CheckCircle, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "~/components/ui/shadcn/card";
import { Badge } from "~/components/ui/shadcn/badge";
import useHover from "~/hooks/useHover";
import { NFTCollection } from "~/components/ui/NftCollections/NftCollection";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/shadcn/button";
import { generateNftImageIpfs } from "~/utils";
import useBuyNft from "~/hooks/useBuyNft";
import { Address } from "viem";
import { NFT_MARKETPLACE_ABI } from "~/constants/abi";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "~/constants";
import { useAccount, useReadContract } from "wagmi";
import useSellNft from "~/hooks/useSellNft";
import { toast } from "sonner";
import { useTransactionToast } from "~/hooks/useTransactionToast";

const NftCard = (collection: NFTCollection) => {
  const [nftHoverRef, isHoverNft] = useHover<HTMLDivElement>();
  const { handleBuyNft, loading } = useBuyNft({
    nftAddress: collection.address as Address,
    price: collection.price,
  });
  const { address } = useAccount();
  const transactionToast = useTransactionToast();

  const { data: nftBalanceData } = useReadContract({
    abi: NFT_MARKETPLACE_ABI,
    address: NFT_MARKETPLACE_CONTRACT_ADDRESS,
    functionName: "getNftBalances",
    args: [address, collection.address],
    query: {
      refetchInterval: 3000,
    },
  });

  const nftBalance = Number(nftBalanceData || 0);

  const { isLoading: isSellLoading, sellNft } = useSellNft({
    nftAddress: collection.address,
    nftBalance,
  });

  const handleSellNft = async () => {
    try {
      if (!address) {
        toast.error("Please connect your wallet");
        return null;
      }

      const sellTx = await sellNft();
      console.log("sellTx: ", sellTx);

      if (sellTx) {
        transactionToast(sellTx);
      }
    } catch (erorr) {
      toast.error("Failed to sell NFT");
    }
  };

  return (
    <Card
      key={collection.address}
      className="overflow-hidden border rounded-xl hover:shadow-lg transition-shadow duration-300 group relative !pt-0"
      ref={nftHoverRef}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={generateNftImageIpfs(collection.image) || "/placeholder.svg"}
          alt={collection.name}
          fill
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold mr-2">{collection.name}</h3>
          {true && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-600 rounded-full p-0"
            >
              <CheckCircle className="h-4 w-4 text-blue-500 fill-blue-100" />
            </Badge>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium">{collection.price}</p>
          </div>

          {nftBalance > 0 && (
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className="font-medium">{nftBalance}</p>
            </div>
          )}
        </div>
      </CardContent>

      <div
        className={cn(
          "absolute -bottom-20 left-0 right-0 transition-bottom duration-300 ease-in-out",
          {
            "bottom-0": isHoverNft || loading || isSellLoading,
          }
        )}
      >
        {nftBalance === 0 ? (
          <Button
            className="bg-blue-400 w-full hover:bg-blue-600 rounded-t-none cursor-pointer"
            onClick={handleBuyNft}
            isLoading={loading}
          >
            <p>Buy now</p>
            <ShoppingCart />
          </Button>
        ) : (
          <div className="flex">
            <Button
              className="bg-blue-400 w-full hover:bg-blue-600 rounded-t-none rounded-r-none cursor-pointer"
              onClick={handleBuyNft}
              isLoading={loading}
            >
              <p>Buy</p>
            </Button>
            <Button
              className="bg-red-400 w-full hover:bg-red-600 rounded-t-none rounded-l-none  cursor-pointer"
              onClick={handleSellNft}
              isLoading={isSellLoading}
            >
              <p>Sell</p>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NftCard;
