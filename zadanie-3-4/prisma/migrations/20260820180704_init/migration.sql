-- CreateEnum
CREATE TYPE "ExpenseStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'SETTLED');

-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Trip" (
    "uuid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUuid" UUID NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Expense" (
    "uuid" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'PLN',
    "status" "ExpenseStatus" NOT NULL DEFAULT 'PAID',
    "payerUuid" UUID NOT NULL,
    "tripUuid" UUID NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Participant" (
    "uuid" UUID NOT NULL,
    "tripUuid" UUID NOT NULL,
    "userUuid" UUID NOT NULL,
    "nicknameInTrip" TEXT,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_tripUuid_userUuid_key" ON "Participant"("tripUuid", "userUuid");

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_createdByUuid_fkey" FOREIGN KEY ("createdByUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payerUuid_fkey" FOREIGN KEY ("payerUuid") REFERENCES "Participant"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_tripUuid_fkey" FOREIGN KEY ("tripUuid") REFERENCES "Trip"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_tripUuid_fkey" FOREIGN KEY ("tripUuid") REFERENCES "Trip"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
