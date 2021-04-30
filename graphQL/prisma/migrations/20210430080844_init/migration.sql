-- CreateTable
CREATE TABLE "Gamer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "gamer" TEXT,
    "avatar" TEXT,
    "gamerlevel" INTEGER,
    "title" TEXT,
    "description" TEXT,
    "defaultCredits" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gamerlevel" INTEGER,
    "title" TEXT,
    "image" TEXT,
    "price" TEXT,
    "link" TEXT,
    "gameformat" TEXT,
    "description" TEXT,
    "defaultCredits" TEXT,
    "gamerId" INTEGER,
    "email" TEXT,
    "avatar" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gamer.email_unique" ON "Gamer"("email");

-- AddForeignKey
ALTER TABLE "Game" ADD FOREIGN KEY ("gamerId") REFERENCES "Gamer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
