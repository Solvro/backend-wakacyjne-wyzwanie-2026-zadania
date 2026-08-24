-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PLN', 'GBP', 'USD', 'EUR');

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adult" BOOLEAN NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "maxSlots" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TripsParticipants" (
    "tripId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "slotNumber" INTEGER NOT NULL,

    CONSTRAINT "TripsParticipants_pkey" PRIMARY KEY ("tripId","participantId")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "currency" "Currency" NOT NULL,
    "tripId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trip_title_key" ON "Trip"("title");

-- CreateIndex
CREATE UNIQUE INDEX "TripsParticipants_tripId_slotNumber_key" ON "TripsParticipants"("tripId", "slotNumber");

-- AddForeignKey
ALTER TABLE "TripsParticipants" ADD CONSTRAINT "TripsParticipants_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripsParticipants" ADD CONSTRAINT "TripsParticipants_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
