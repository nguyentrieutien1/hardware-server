-- AlterTable
ALTER TABLE "account" ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "address" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "phone" TEXT;
