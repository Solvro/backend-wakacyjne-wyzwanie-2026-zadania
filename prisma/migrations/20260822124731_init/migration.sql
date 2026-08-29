-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DOMESTIC', 'ABROAD');

-- CreateTable
CREATE TABLE "Trip" (
    "trip_id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "type" "Type" NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participant_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "expense_id" SERIAL NOT NULL,
    "ammount" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "payer_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payer_id_fkey" FOREIGN KEY ("payer_id") REFERENCES "Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
