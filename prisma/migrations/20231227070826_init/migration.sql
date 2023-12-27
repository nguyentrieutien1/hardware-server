-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "statusId" INTEGER DEFAULT 4;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
