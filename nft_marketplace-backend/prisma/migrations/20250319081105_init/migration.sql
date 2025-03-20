-- CreateTable
CREATE TABLE "nft" (
    "address" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isListed" BOOLEAN NOT NULL,

    CONSTRAINT "nft_pkey" PRIMARY KEY ("address")
);

-- CreateIndex
CREATE UNIQUE INDEX "nft_address_key" ON "nft"("address");
