"use client";

import { useQuery } from "@tanstack/react-query";
import NftCard from "~/components/ui/NftCollections/NftCard";
import SkeletonCard from "~/components/ui/NftCollections/SkeletonCard";
import { BACKEND_URL } from "~/constants";
import useGetNfts from "~/hooks/useGetNfts";

export interface NFTCollection {
  address: string;
  created: string;
  image: string;
  isListed: boolean;
  name: string;
  price: string;
  symbol: string;
  updated: string;
  uri: string;
}

const NftCollections = () => {
  const { isLoading, data: nftCollectionsData } = useGetNfts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : nftCollectionsData?.data?.length > 0 ? (
        nftCollectionsData?.data?.map((collection: NFTCollection) => (
          <NftCard key={collection.address} {...collection} />
        ))
      ) : (
        <div className="font-bold text-2xl text-center w-full col-span-3">
          NFT Marketplace is empty!!!
        </div>
      )}
    </div>
  );
};

export default NftCollections;
