-- CreateEnum
CREATE TYPE "CurrencyEnum" AS ENUM ('USD', 'EUR', 'PLN');

-- CreateTable
CREATE TABLE "Expense" (
    "expense_id" SERIAL NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" "CurrencyEnum" NOT NULL,
    "participant_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "trip_id" SERIAL NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "description" VARCHAR(100),
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participant_id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "surname" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(10) NOT NULL,
    "age" INTEGER,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "Participant_Trip" (
    "participant_id" INTEGER NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "Participant_Trip_pkey" PRIMARY KEY ("participant_id","trip_id")
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
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant_Trip" ADD CONSTRAINT "Participant_Trip_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant_Trip" ADD CONSTRAINT "Participant_Trip_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_A_fkey" FOREIGN KEY ("A") REFERENCES "Participant"("participant_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ParticipantToTrip" ADD CONSTRAINT "_ParticipantToTrip_B_fkey" FOREIGN KEY ("B") REFERENCES "Trip"("trip_id") ON DELETE CASCADE ON UPDATE CASCADE;
