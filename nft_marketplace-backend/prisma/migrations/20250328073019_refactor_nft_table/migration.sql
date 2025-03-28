/*
  Warnings:

  - You are about to alter the column `price` on the `nft` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `price` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "nft" ALTER COLUMN "price" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "price" SET DATA TYPE BIGINT;
