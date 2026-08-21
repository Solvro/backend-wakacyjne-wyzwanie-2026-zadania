/*
  Warnings:

  - You are about to drop the `expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participants` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `participants_trips` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trips` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_id_participant_fkey";

-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_id_trip_fkey";

-- DropForeignKey
ALTER TABLE "participants_trips" DROP CONSTRAINT "participants_trips_id_participant_fkey";

-- DropForeignKey
ALTER TABLE "participants_trips" DROP CONSTRAINT "participants_trips_id_trip_fkey";

-- DropTable
DROP TABLE "expenses";

-- DropTable
DROP TABLE "participants";

-- DropTable
DROP TABLE "participants_trips";

-- DropTable
DROP TABLE "trips";

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "nationality" "Nationality" NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "id_participant" INTEGER NOT NULL,
    "id_trip" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantsTrips" (
    "id" SERIAL NOT NULL,
    "id_trip" INTEGER NOT NULL,
    "id_participant" INTEGER NOT NULL,

    CONSTRAINT "ParticipantsTrips_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_participant_fkey" FOREIGN KEY ("id_participant") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsTrips" ADD CONSTRAINT "ParticipantsTrips_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantsTrips" ADD CONSTRAINT "ParticipantsTrips_id_participant_fkey" FOREIGN KEY ("id_participant") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
