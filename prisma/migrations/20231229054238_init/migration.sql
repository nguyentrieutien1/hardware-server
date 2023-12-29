/*
  Warnings:

  - The `url` column on the `image` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "image" DROP COLUMN "url",
ADD COLUMN     "url" JSONB;
