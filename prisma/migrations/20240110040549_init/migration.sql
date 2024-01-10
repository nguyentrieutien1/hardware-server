/*
  Warnings:

  - A unique constraint covering the columns `[categoriesId]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "categoriesId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "product_categoriesId_key" ON "product"("categoriesId");

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
