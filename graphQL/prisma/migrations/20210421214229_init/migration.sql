/*
  Warnings:

  - You are about to drop the column `avatar` on the `Gamer` table. All the data in the column will be lost.
  - You are about to drop the column `gamerlevel` on the `Gamer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gamer" DROP COLUMN "avatar",
DROP COLUMN "gamerlevel";
