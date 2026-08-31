-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ACCOMMODATION', 'TRANSPORTATION', 'FOOD');

-- CreateEnum
CREATE TYPE "Diet" AS ENUM ('VEGETARIAN', 'VEGAN', 'GLUTEN_FREE', 'LACTOSE_FREE');

-- CreateEnum
CREATE TYPE "City" AS ENUM ('WARSAW', 'SEOUL', 'PARIS', 'TOKYO', 'SZANGHAI', 'SINGAPORE');

-- CreateEnum
CREATE TYPE "Food" AS ENUM ('ALL_INCLUSIVE', 'MEALS_3', 'MEALS_2', 'BREAKFAST', 'WITHOUT');

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "type" "Type" NOT NULL DEFAULT 'ACCOMMODATION',
    "amount" DOUBLE PRECISION NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "diet" "Diet",
    "date_of_birth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "city" "City" NOT NULL DEFAULT 'WARSAW',
    "food" "Food" NOT NULL DEFAULT 'BREAKFAST',

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ParticipantToTrip" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ParticipantToTrip_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ParticipantToTrip_B_index" ON "_ParticipantToTrip"("B");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
