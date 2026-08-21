/*
  Warnings:

  - You are about to drop the column `wiek` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `termin` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `data_urodzenia` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" 
ADD COLUMN     "data_urodzenia" TIMESTAMP(3);

UPDATE "Participant" 
SET "data_urodzenia" = TIMESTAMP'2002-01-12 00:00:00.000' 
WHERE "id" = 1;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "termin";

ALTER TABLE "Participant" 
ALTER COLUMN "data_urodzenia" SET NOT NULL;
