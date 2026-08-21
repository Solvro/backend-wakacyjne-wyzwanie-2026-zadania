-- CreateTable
CREATE TABLE "Trip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    CONSTRAINT "Participant_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "trip_id" INTEGER NOT NULL,
    "participant_id" INTEGER NOT NULL,
    CONSTRAINT "Expense_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Expense_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
