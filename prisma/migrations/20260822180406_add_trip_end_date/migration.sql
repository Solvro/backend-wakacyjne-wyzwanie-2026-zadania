/*
  Warnings:

  - The `category` column on the `Trip` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TripCategory" AS ENUM ('VACATION', 'BUSINESS', 'WEEKEND', 'OTHER');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "endDate" TIMESTAMP(3),
DROP COLUMN "category",
ADD COLUMN     "category" "TripCategory" NOT NULL DEFAULT 'VACATION';
