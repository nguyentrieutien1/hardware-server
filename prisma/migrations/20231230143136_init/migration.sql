/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "account_id_key" ON "account"("id");
