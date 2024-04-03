/*
  Warnings:

  - You are about to drop the column `Name` on the `lessons` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `portfolio` table. All the data in the column will be lost.
  - You are about to drop the column `Photo` on the `portfolio` table. All the data in the column will be lost.
  - The `roles` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `photo` to the `future` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `future` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `mark` on the `marks` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `logo` to the `organizators` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `portfolio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `portfolio` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `year` on the `portfolio` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `avatar` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specializationId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('resources_department', 'student', 'teacher');

-- DropForeignKey
ALTER TABLE "future" DROP CONSTRAINT "future_specializationId_fkey";

-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_userId_fkey";

-- DropForeignKey
ALTER TABLE "portfolio" DROP CONSTRAINT "portfolio_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationId_fkey";

-- AlterTable
ALTER TABLE "future" ADD COLUMN     "photo" BYTEA NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "marks" DROP COLUMN "mark",
ADD COLUMN     "mark" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "organizators" ADD COLUMN     "logo" BYTEA NOT NULL;

-- AlterTable
ALTER TABLE "portfolio" DROP COLUMN "Name",
DROP COLUMN "Photo",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photo" BYTEA NOT NULL,
DROP COLUMN "year",
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" BYTEA NOT NULL,
ADD COLUMN     "specializationId" TEXT NOT NULL,
DROP COLUMN "roles",
ADD COLUMN     "roles" "role"[] DEFAULT ARRAY['student']::"role"[],
ALTER COLUMN "organizationId" DROP NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "future" ADD CONSTRAINT "future_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
