/*
  Warnings:

  - You are about to drop the column `ftTokenExpiresAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ftTokenExpiresAt",
ADD COLUMN     "ftATExpiresAt" TIMESTAMP(3),
ADD COLUMN     "ftRTExpiresAt" TIMESTAMP(3);
