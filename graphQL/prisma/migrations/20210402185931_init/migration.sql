-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gamer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "gamer" TEXT,
    "avatar" TEXT NOT NULL,
    "gamerlevel" INTEGER NOT NULL
);
INSERT INTO "new_Gamer" ("id", "email", "gamer", "avatar", "gamerlevel") SELECT "id", "email", "gamer", "avatar", "gamerlevel" FROM "Gamer";
DROP TABLE "Gamer";
ALTER TABLE "new_Gamer" RENAME TO "Gamer";
CREATE UNIQUE INDEX "Gamer.email_unique" ON "Gamer"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
