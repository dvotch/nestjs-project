/*
  Warnings:

  - Added the required column `status` to the `UsersOrganization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsersOrganization" ADD COLUMN     "status" BOOLEAN NOT NULL;
