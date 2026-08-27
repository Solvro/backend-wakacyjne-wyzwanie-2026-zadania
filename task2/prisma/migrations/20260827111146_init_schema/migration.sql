/*
  Warnings:

  - You are about to drop the `Participant_Trip` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participant_Trip" DROP CONSTRAINT "Participant_Trip_participant_id_fkey";

-- DropForeignKey
ALTER TABLE "Participant_Trip" DROP CONSTRAINT "Participant_Trip_trip_id_fkey";

-- DropTable
DROP TABLE "Participant_Trip";
