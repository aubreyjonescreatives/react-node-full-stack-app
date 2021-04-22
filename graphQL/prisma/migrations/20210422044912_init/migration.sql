-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gamerlevel" INTEGER,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "avatar" TEXT;

-- AlterTable
ALTER TABLE "Gamer" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "gamerlevel" INTEGER,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "defaultCredits" INTEGER;
