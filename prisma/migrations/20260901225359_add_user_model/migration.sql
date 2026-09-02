/*
  Warnings:

  - You are about to drop the column `tripId` on the `Participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_tripId_fkey";

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "tripId";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipantToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParticipantToTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_ParticipantToTrip_B_index" ON "_ParticipantToTrip"("B");

-- AddForeignKey
ALTER TABLE "_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
