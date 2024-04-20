/*
  Warnings:

  - A unique constraint covering the columns `[userId,lessonId]` on the table `statement` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "statement_userId_lessonId_key" ON "statement"("userId", "lessonId");
