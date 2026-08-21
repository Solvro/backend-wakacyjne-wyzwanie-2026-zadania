-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Owner', 'Member', 'Other');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Food', 'Transport', 'Accomodation', 'Other');

-- CreateTable
CREATE TABLE "Participants" (
    "Participant_id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Email" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'Member',
    "Trip_id" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("Participant_id")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "Expense_id" SERIAL NOT NULL,
    "Product_name" TEXT NOT NULL,
    "Amount_pln" DOUBLE PRECISION NOT NULL,
    "Category" "Category" NOT NULL,
    "Transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Paid_by_id" INTEGER NOT NULL,
    "Trip_id" INTEGER NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("Expense_id")
);

-- CreateTable
CREATE TABLE "Trips" (
    "Trip_id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Cost_pln" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("Trip_id")
);

-- AddForeignKey
ALTER TABLE "Participants" ADD CONSTRAINT "Participants_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "Trips"("Trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_Paid_by_id_fkey" FOREIGN KEY ("Paid_by_id") REFERENCES "Participants"("Participant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "Trips"("Trip_id") ON DELETE CASCADE ON UPDATE CASCADE;
