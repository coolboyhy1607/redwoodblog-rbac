/*
  Warnings:

  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserRole` table. All the data in the column will be lost.
  - The `id` column on the `UserRole` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Revision` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Star` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,userProfileId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_parentDocumentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_actorId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Revision" DROP CONSTRAINT "Revision_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- DropIndex
DROP INDEX "UserRole_name_userProfileId_unique";

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userProfileId" INTEGER,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Attachment";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Document";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Revision";

-- DropTable
DROP TABLE "Star";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorId" TEXT,
    "editorId" TEXT,
    "publisherId" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uuid" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile.uuid_unique" ON "UserProfile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_userProfileId_unique" ON "UserRole"("name", "userProfileId");

-- AddForeignKey
ALTER TABLE "UserRole" ADD FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
