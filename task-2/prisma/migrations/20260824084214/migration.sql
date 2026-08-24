/*
  Warnings:

  - You are about to drop the `TripsParticipants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TripsParticipants" DROP CONSTRAINT "TripsParticipants_participantId_fkey";

-- DropForeignKey
ALTER TABLE "TripsParticipants" DROP CONSTRAINT "TripsParticipants_tripId_fkey";

-- DropTable
DROP TABLE "TripsParticipants";

-- CreateTable
CREATE TABLE "TripParticipant" (
    "tripId" INTEGER NOT NULL,
    "participantId" INTEGER NOT NULL,
    "slotNumber" INTEGER NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("tripId","participantId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripParticipant_tripId_slotNumber_key" ON "TripParticipant"("tripId", "slotNumber");

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
