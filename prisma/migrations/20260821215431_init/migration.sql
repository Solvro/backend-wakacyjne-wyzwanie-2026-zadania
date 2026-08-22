-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Paid', 'Unpaid');

-- CreateTable
CREATE TABLE "Trip" (
    "TripID" SERIAL NOT NULL,
    "TripDate" TIMESTAMP(3) NOT NULL,
    "Destination" TEXT NOT NULL,
    "Description" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("TripID")
);

-- CreateTable
CREATE TABLE "Participant" (
    "ParticipantID" SERIAL NOT NULL,
    "TripID" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "ContactNumber" TEXT NOT NULL,
    "PaymentStatus" "PaymentStatus" NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("ParticipantID")
);

-- CreateTable
CREATE TABLE "Expense" (
    "ExpenseID" SERIAL NOT NULL,
    "TripID" INTEGER NOT NULL,
    "ExpenseName" TEXT NOT NULL,
    "Cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("ExpenseID")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_TripID_fkey" FOREIGN KEY ("TripID") REFERENCES "Trip"("TripID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_TripID_fkey" FOREIGN KEY ("TripID") REFERENCES "Trip"("TripID") ON DELETE RESTRICT ON UPDATE CASCADE;
