-- AlterTable
ALTER TABLE "order" ADD COLUMN     "statusId" INTEGER;

-- CreateTable
CREATE TABLE "status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
