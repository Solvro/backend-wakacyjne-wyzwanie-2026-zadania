-- CreateTable
CREATE TABLE "Trip" (
    "Trip_id" SERIAL NOT NULL,
    "Trip_Name" TEXT NOT NULL,
    "Destination" TEXT NOT NULL,
    "Start_Date" TIMESTAMP(3) NOT NULL,
    "End_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("Trip_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "Participant_id" SERIAL NOT NULL,
    "Trip_id" INTEGER NOT NULL,
    "Name" TEXT NOT NULL,
    "Surname" TEXT NOT NULL,
    "Pesel" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("Participant_id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "Expense_id" SERIAL NOT NULL,
    "Trip_id" INTEGER NOT NULL,
    "Participant_id" INTEGER NOT NULL,
    "Amount" DOUBLE PRECISION NOT NULL,
    "Category" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("Expense_id")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "Trip"("Trip_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Participant_id_fkey" FOREIGN KEY ("Participant_id") REFERENCES "Participant"("Participant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_Trip_id_fkey" FOREIGN KEY ("Trip_id") REFERENCES "Trip"("Trip_id") ON DELETE CASCADE ON UPDATE CASCADE;
