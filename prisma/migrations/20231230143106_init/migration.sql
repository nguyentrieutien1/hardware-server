/*
  Warnings:

  - You are about to drop the column `imageId` on the `account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_imageId_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "imageId";
