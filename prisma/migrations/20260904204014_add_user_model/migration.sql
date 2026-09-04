-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "tel" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
