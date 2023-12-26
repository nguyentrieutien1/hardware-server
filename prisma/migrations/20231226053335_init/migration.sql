/*
  Warnings:

  - You are about to drop the column `cartId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `product` table. All the data in the column will be lost.
  - Added the required column `productId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_cartId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_cartId_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "cartId";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "accountId" INTEGER,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product" DROP COLUMN "cartId";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
