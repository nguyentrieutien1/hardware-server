/*
  Warnings:

  - You are about to drop the column `updateAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `image` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_productId_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "sex" DROP NOT NULL;

-- AlterTable
ALTER TABLE "image" DROP COLUMN "updateAt",
ADD COLUMN     "accountId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "image_accountId_key" ON "image"("accountId");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
