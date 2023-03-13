/*
  Warnings:

  - You are about to drop the column `ftDisplayName` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ftId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ftAccessToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ftRefreshToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ftDisplayName",
ADD COLUMN     "ftAccessExpiresAt" TIMESTAMP(3),
ADD COLUMN     "ftRefreshExpiresAt" TIMESTAMP(3),
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "nickname" DROP NOT NULL,
ALTER COLUMN "rank" SET DEFAULT 0,
ALTER COLUMN "isTwoFactor" SET DEFAULT false,
ALTER COLUMN "ftUsername" DROP NOT NULL,
ALTER COLUMN "ftAccessToken" DROP NOT NULL,
ALTER COLUMN "ftRefreshToken" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_ftId_key" ON "User"("ftId");

-- CreateIndex
CREATE UNIQUE INDEX "User_ftAccessToken_key" ON "User"("ftAccessToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_ftRefreshToken_key" ON "User"("ftRefreshToken");
