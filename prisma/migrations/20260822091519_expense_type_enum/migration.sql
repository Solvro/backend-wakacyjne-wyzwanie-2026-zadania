-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('ACCOMODATION', 'FOOD', 'OTHER');

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "type" "ExpenseType";
