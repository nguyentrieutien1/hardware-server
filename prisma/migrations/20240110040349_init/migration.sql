/*
  Warnings:

  - You are about to drop the column `categoriesId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoriesId_fkey";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "categoriesId";
