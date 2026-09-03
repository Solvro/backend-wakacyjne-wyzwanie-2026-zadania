/*
  Warnings:

  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Amount` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `DepositDate` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `TripParticipantId` on the `Expense` table. All the data in the column will be lost.
  - The primary key for the `Participant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Email` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `Id` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `NameP` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `SurnameP` on the `Participant` table. All the data in the column will be lost.
  - The primary key for the `Trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `EndDate` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `IdT` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `StartDate` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Trip` table. All the data in the column will be lost.
  - The primary key for the `TripParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `IdTP` on the `TripParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `ParticipantId` on the `TripParticipant` table. All the data in the column will be lost.
  - You are about to drop the column `TripId` on the `TripParticipant` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripParticipantId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameParticipant` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surnameParticipant` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participantId` to the `TripParticipant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripId` to the `TripParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_TripParticipantId_fkey";

-- DropForeignKey
ALTER TABLE "TripParticipant" DROP CONSTRAINT "TripParticipant_ParticipantId_fkey";

-- DropForeignKey
ALTER TABLE "TripParticipant" DROP CONSTRAINT "TripParticipant_TripId_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_pkey",
DROP COLUMN "Amount",
DROP COLUMN "DepositDate",
DROP COLUMN "Id",
DROP COLUMN "Title",
DROP COLUMN "TripParticipantId",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "depositDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "title" VARCHAR(100) NOT NULL,
ADD COLUMN     "tripParticipantId" INTEGER NOT NULL,
ADD CONSTRAINT "Expense_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_pkey",
DROP COLUMN "Email",
DROP COLUMN "Id",
DROP COLUMN "NameP",
DROP COLUMN "Phone",
DROP COLUMN "SurnameP",
ADD COLUMN     "email" VARCHAR(100),
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "nameParticipant" VARCHAR(100) NOT NULL,
ADD COLUMN     "phone" VARCHAR(20) NOT NULL,
ADD COLUMN     "surnameParticipant" VARCHAR(100) NOT NULL,
ADD CONSTRAINT "Participant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_pkey",
DROP COLUMN "EndDate",
DROP COLUMN "IdT",
DROP COLUMN "Name",
DROP COLUMN "StartDate",
DROP COLUMN "Status",
ADD COLUMN     "endDate" DATE,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" VARCHAR(100) NOT NULL,
ADD COLUMN     "startDate" DATE NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PLANNING',
ADD CONSTRAINT "Trip_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TripParticipant" DROP CONSTRAINT "TripParticipant_pkey",
DROP COLUMN "IdTP",
DROP COLUMN "ParticipantId",
DROP COLUMN "TripId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "participantId" INTEGER NOT NULL,
ADD COLUMN     "tripId" INTEGER NOT NULL,
ADD CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tripParticipantId_fkey" FOREIGN KEY ("tripParticipantId") REFERENCES "TripParticipant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
