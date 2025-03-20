interface NftListing {
  creator: string;
  nftAddress: string;
  price: string;
  tokenUri: string;
  isListed: boolean;
}

enum TRANSACTION_TYPE {
  BUY = "BUY",
  SELL = "SELL",
}

export { NftListing, TRANSACTION_TYPE };
