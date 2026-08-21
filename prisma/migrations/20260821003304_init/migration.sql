-- CreateTable
CREATE TABLE "Trip" (
    "trip_id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "start" DATE NOT NULL,
    "end" DATE NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("trip_id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "participant_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pesel" CHAR(11) NOT NULL,
    "phone_number" VARCHAR(15) NOT NULL,
    "trip_id" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("participant_id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "expense_id" SERIAL NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "paid_by_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "description" TEXT,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("expense_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_pesel_key" ON "Participant"("pesel");

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("trip_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_paid_by_id_fkey" FOREIGN KEY ("paid_by_id") REFERENCES "Participant"("participant_id") ON DELETE RESTRICT ON UPDATE CASCADE;
