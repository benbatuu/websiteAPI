/*
  Warnings:

  - Added the required column `pricetype` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services"."services" ADD COLUMN     "pricetype" TEXT NOT NULL;
