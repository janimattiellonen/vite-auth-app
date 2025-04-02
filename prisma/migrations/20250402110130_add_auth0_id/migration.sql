/*
  Warnings:

  - You are about to drop the column `avatar` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "avatar";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ALTER COLUMN "auth0Id" DROP NOT NULL;
