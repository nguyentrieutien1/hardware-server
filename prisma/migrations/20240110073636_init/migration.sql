/*
  Warnings:

  - A unique constraint covering the columns `[productId]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "productId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "order_productId_key" ON "order"("productId");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
