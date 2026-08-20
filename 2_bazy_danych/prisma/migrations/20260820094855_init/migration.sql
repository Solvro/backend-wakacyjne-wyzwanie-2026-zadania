/*
  Warnings:

  - Added the required column `title` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trips" ADD COLUMN     "title" TEXT NOT NULL;
