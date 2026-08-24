/*
  Warnings:

  - You are about to drop the column `kwota` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `rodzaj` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `data_urodzenia` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `dieta` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `imie` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `nazwisko` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `miasto` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `wyzywienie` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ACCOMMODATION', 'TRANSPORTATION', 'FOOD');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'LACTOSE_FREE');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('WARSAW', 'SEOUL', 'PARIS', 'TOKYO', 'SZANGHAI', 'SINGAPORE');

-- CreateEnum
CREATE TYPE "Food" AS ENUM ('ALL_INCLUSIVE', 'MEALS_3', 'MEALS_2', 'BREAKFAST', 'WITHOUT');

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "kwota",
DROP COLUMN "rodzaj",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'ACCOMMODATION';

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "data_urodzenia",
DROP COLUMN "dieta",
DROP COLUMN "imie",
DROP COLUMN "nazwisko",
ADD COLUMN     "date_of_birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "diet" "Diet",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "surname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "miasto",
DROP COLUMN "wyzywienie",
ADD COLUMN     "city" "City" NOT NULL DEFAULT 'WARSAW',
ADD COLUMN     "food" "Food" NOT NULL DEFAULT 'BREAKFAST';

-- DropEnum
DROP TYPE "Dieta";

-- DropEnum
DROP TYPE "Miasto";

-- DropEnum
DROP TYPE "Rodzaj";

-- DropEnum
DROP TYPE "Wyzywienie";
