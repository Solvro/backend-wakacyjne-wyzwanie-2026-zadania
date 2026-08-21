-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'EUR', 'USD', 'GBP');

-- CreateEnum
CREATE TYPE "Nationality" AS ENUM ('POLISH', 'GERMAN', 'SPANISH', 'FRENCH');

-- CreateTable
CREATE TABLE "participants" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "nationality" "Nationality" NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "id_participant" INTEGER NOT NULL,
    "id_trip" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" "Currency" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "participants_trips" (
    "id" SERIAL NOT NULL,
    "id_trip" INTEGER NOT NULL,
    "id_participant" INTEGER NOT NULL,

    CONSTRAINT "participants_trips_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "participants_email_key" ON "participants"("email");

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_participant_fkey" FOREIGN KEY ("id_participant") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants_trips" ADD CONSTRAINT "participants_trips_id_trip_fkey" FOREIGN KEY ("id_trip") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participants_trips" ADD CONSTRAINT "participants_trips_id_participant_fkey" FOREIGN KEY ("id_participant") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
