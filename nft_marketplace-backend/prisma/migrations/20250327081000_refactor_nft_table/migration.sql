/*
  Warnings:

  - Added the required column `image` to the `nft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nft" ADD COLUMN     "image" TEXT NOT NULL;
