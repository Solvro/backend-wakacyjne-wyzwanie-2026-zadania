-- CreateEnum
CREATE TYPE "Rodzaj" AS ENUM ('ZAKWATEROWANIE', 'TRANSPORT', 'WYZYWIENIE');

-- CreateEnum
CREATE TYPE "Dieta" AS ENUM ('WEGETARIANSKA', 'WEGANSKA', 'BEZGLUTENOWA', 'BEZLAKTOZOWA');

-- CreateEnum
CREATE TYPE "Miasto" AS ENUM ('WARSZAWA', 'SEOUL', 'PARYZ', 'TOKIO', 'SZANGHAJ', 'SINGAPUR');

-- CreateEnum
CREATE TYPE "Wyzywienie" AS ENUM ('ALL_INCLUSIVE', 'POSILKI_3', 'POSILKI_2', 'SNIADANIA', 'BEZ_WYZYWIENIA');

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "rodzaj" "Rodzaj" NOT NULL DEFAULT 'ZAKWATEROWANIE',
    "kwota" DOUBLE PRECISION NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "wiek" INTEGER NOT NULL,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,
    "dieta" "Dieta",

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" SERIAL NOT NULL,
    "miasto" "Miasto" NOT NULL DEFAULT 'WARSZAWA',
    "termin" TIMESTAMP(3) NOT NULL,
    "wyzywienie" "Wyzywienie" NOT NULL DEFAULT 'SNIADANIA',

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
