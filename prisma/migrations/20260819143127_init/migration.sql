-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PLANNING', 'COMPLETED');

-- CreateTable
CREATE TABLE "Trip" (
    "IdT" SERIAL NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "StartDate" DATE NOT NULL,
    "EndDate" DATE,
    "Status" "Status" NOT NULL DEFAULT 'PLANNING',

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("IdT")
);

-- CreateTable
CREATE TABLE "TripParticipant" (
    "IdTP" SERIAL NOT NULL,
    "TripId" INTEGER NOT NULL,
    "ParticipantId" INTEGER NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("IdTP")
);

-- CreateTable
CREATE TABLE "Expense" (
    "Id" SERIAL NOT NULL,
    "Title" VARCHAR(100) NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "DepositDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "TripParticipantId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "Id" SERIAL NOT NULL,
    "NameP" VARCHAR(100) NOT NULL,
    "SurnameP" VARCHAR(100) NOT NULL,
    "Phone" VARCHAR(20) NOT NULL,
    "Email" VARCHAR(100),

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_TripId_fkey" FOREIGN KEY ("TripId") REFERENCES "Trip"("IdT") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_ParticipantId_fkey" FOREIGN KEY ("ParticipantId") REFERENCES "Participant"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_TripParticipantId_fkey" FOREIGN KEY ("TripParticipantId") REFERENCES "TripParticipant"("IdTP") ON DELETE RESTRICT ON UPDATE CASCADE;
