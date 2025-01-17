/*
  Warnings:

  - You are about to drop the column `imageType` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "imageType",
ALTER COLUMN "image" SET DATA TYPE TEXT;
