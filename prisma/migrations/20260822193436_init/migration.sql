-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('notStarted', 'ended', 'inProgress');

-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('pending', 'paid');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'EUR', 'USD');

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "destination" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "status" "TripStatus" NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "birth_date" DATE NOT NULL,
    "phone_number" TEXT,
    "email" TEXT,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "currency" "Currency" NOT NULL,
    "status" "ExpenseStatus" NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip_Participant" (
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,

    CONSTRAINT "Trip_Participant_pkey" PRIMARY KEY ("trip_id","participant_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_phone_number_key" ON "Participant"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip_Participant" ADD CONSTRAINT "Trip_Participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip_Participant" ADD CONSTRAINT "Trip_Participant_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
