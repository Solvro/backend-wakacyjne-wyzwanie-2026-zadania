-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('FOOD', 'TRANSPORT', 'ACCOMMODATION', 'ENTERTAINMENT', 'OTHER');

-- CreateTable
CREATE TABLE "Trip" (
    "Trip_id" SERIAL NOT NULL,
    "Location" VARCHAR(255) NOT NULL,
    "Begin_date" TIMESTAMP(3) NOT NULL,
    "End_date" TIMESTAMP(3),

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("Trip_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "Participant_id" SERIAL NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255),
    "Age" INTEGER NOT NULL,
    "Phone" VARCHAR(255) NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("Participant_id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "Expense_id" SERIAL NOT NULL,
    "Trip_id" INTEGER NOT NULL,
    "Payer_id" INTEGER NOT NULL,
    "Type" "ExpenseType" NOT NULL,
    "Amount" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("Expense_id")
);

-- CreateTable
CREATE TABLE "TripParticipant" (
    "id" SERIAL NOT NULL,
    "Trip_id" INTEGER NOT NULL,
    "Participant_id" INTEGER NOT NULL,

    CONSTRAINT "TripParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TripParticipant_Trip_id_Participant_id_key" ON "TripParticipant"("Trip_id", "Participant_id");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "Trip"("Trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Payer_id_fkey" FOREIGN KEY ("Payer_id") REFERENCES "Participant"("Participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "Trip"("Trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripParticipant" ADD CONSTRAINT "TripParticipant_Participant_id_fkey" FOREIGN KEY ("Participant_id") REFERENCES "Participant"("Participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
