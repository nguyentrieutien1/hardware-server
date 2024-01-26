-- CreateTable
CREATE TABLE "repair" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusId" INTEGER DEFAULT 1,
    "fullName" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "note" TEXT,
    "expirationDate" TEXT,
    "orderCode" TEXT,

    CONSTRAINT "repair_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE CASCADE ON UPDATE CASCADE;
