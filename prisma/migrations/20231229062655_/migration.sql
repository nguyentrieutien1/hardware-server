/*
  Warnings:

  - The `stock` column on the `product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `price` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
DROP COLUMN "stock",
ADD COLUMN     "stock" INTEGER;
