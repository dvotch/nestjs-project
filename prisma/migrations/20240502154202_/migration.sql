/*
  Warnings:

  - You are about to drop the column `organizationId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_organizationId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "organizationId",
ALTER COLUMN "group" DROP NOT NULL;

-- CreateTable
CREATE TABLE "UsersOrganization" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UsersOrganization_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersOrganization" ADD CONSTRAINT "UsersOrganization_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOrganization" ADD CONSTRAINT "UsersOrganization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
