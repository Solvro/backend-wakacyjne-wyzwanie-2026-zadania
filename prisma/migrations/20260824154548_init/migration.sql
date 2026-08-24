-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('PLANNED', 'ACTIVE', 'FINISHED');

-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('FOOD', 'TRANSPORT', 'TICKETS');

-- CreateTable
CREATE TABLE "Trip" (
    "TripID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "participant" INTEGER NOT NULL,
    "place" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "status" "TripStatus" NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("TripID")
);

-- CreateTable
CREATE TABLE "Participant" (
    "ParticipantID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("ParticipantID")
);

-- CreateTable
CREATE TABLE "Expense" (
    "ExpenseID" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "payerID" INTEGER NOT NULL,
    "tripID" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "category" "ExpenseCategory" NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("ExpenseID")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_participant_fkey" FOREIGN KEY ("participant") REFERENCES "Participant"("ParticipantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerID_fkey" FOREIGN KEY ("payerID") REFERENCES "Participant"("ParticipantID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tripID_fkey" FOREIGN KEY ("tripID") REFERENCES "Trip"("TripID") ON DELETE RESTRICT ON UPDATE CASCADE;
