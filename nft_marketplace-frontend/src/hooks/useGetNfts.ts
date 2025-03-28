import { useQuery } from "@tanstack/react-query";
import { BACKEND_URL } from "~/constants";

const useGetNfts = () => {
  return useQuery({
    queryKey: ["nftCollections"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/nft`);

      if (!response.ok) {
        throw new Error("Failed to fetch collections");
      }
      return response.json();
    },
  });
};

export default useGetNfts;
