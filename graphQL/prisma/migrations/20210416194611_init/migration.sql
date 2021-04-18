-- CreateTable
CREATE TABLE "Gamer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "gamer" TEXT,
    "avatar" TEXT NOT NULL,
    "gamerlevel" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "defaultCredits" TEXT NOT NULL,
    "gamerId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gamer.email_unique" ON "Gamer"("email");

-- AddForeignKey
ALTER TABLE "Game" ADD FOREIGN KEY ("gamerId") REFERENCES "Gamer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
