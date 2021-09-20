/*
  Warnings:

  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userProfileId` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `id` on the `UserRole` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userProfileId_fkey";

-- DropIndex
DROP INDEX "UserRole_name_userProfileId_unique";

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
DROP COLUMN "userProfileId",
ADD COLUMN     "userId" UUID,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Contact";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "UserProfile";

-- CreateTable
CREATE TABLE "Attachment" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "documentId" UUID,
    "key" VARCHAR(4096) NOT NULL,
    "url" VARCHAR(4096) NOT NULL,
    "contentType" VARCHAR(255) NOT NULL,
    "size" BIGINT NOT NULL,
    "acl" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" UUID NOT NULL,
    "name" VARCHAR,
    "description" VARCHAR,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "deletedAt" TIMESTAMP(3),
    "urlId" VARCHAR(255),
    "documentStructure" JSONB,
    "color" TEXT,
    "icon" TEXT,
    "sort" JSONB,
    "index" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "urlId" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,
    "collectionId" UUID,
    "parentDocumentId" UUID,
    "lastModifiedById" UUID NOT NULL,
    "revisionCount" INTEGER DEFAULT 0,
    "deletedAt" TIMESTAMP(3),
    "createdById" UUID,
    "emoji" VARCHAR(255),
    "publishedAt" TIMESTAMP(3),
    "archivedAt" TIMESTAMP(3),
    "isWelcome" BOOLEAN NOT NULL DEFAULT false,
    "editorVersion" VARCHAR(255),
    "version" SMALLINT,
    "template" BOOLEAN NOT NULL DEFAULT false,
    "templateId" UUID,
    "previousTitles" VARCHAR(255)[],
    "state" BYTEA,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "data" JSONB,
    "userId" UUID,
    "collectionId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "documentId" UUID,
    "actorId" UUID,
    "ip" VARCHAR(255),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revision" (
    "id" UUID NOT NULL,
    "title" VARCHAR NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "editorVersion" VARCHAR(255),
    "version" SMALLINT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Star" (
    "id" UUID NOT NULL,
    "documentId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(255),
    "username" VARCHAR(255),
    "name" VARCHAR NOT NULL,
    "jwtSecret" BYTEA,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatarUrl" TEXT,
    "lastActiveAt" TIMESTAMP(3),
    "lastActiveIp" VARCHAR(255),
    "lastSignedInAt" TIMESTAMP(3),
    "lastSignedInIp" VARCHAR(255),
    "deletedAt" TIMESTAMP(3),
    "lastSigninEmailSentAt" TIMESTAMP(3),
    "language" VARCHAR(255) DEFAULT E'en_US',

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attachments_document_id" ON "Attachment"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Collection.urlId_unique" ON "Collection"("urlId");

-- CreateIndex
CREATE INDEX "atlases_id_deleted_at" ON "Collection"("id", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Document.urlId_unique" ON "Document"("urlId");

-- CreateIndex
CREATE INDEX "documents_archived_at" ON "Document"("archivedAt");

-- CreateIndex
CREATE INDEX "documents_id_atlas_id_deleted_at" ON "Document"("id", "collectionId", "deletedAt");

-- CreateIndex
CREATE INDEX "documents_id_atlas_id_published_at" ON "Document"("id", "collectionId", "publishedAt");

-- CreateIndex
CREATE INDEX "documents_parent_document_id_atlas_id_deleted_at" ON "Document"("parentDocumentId", "collectionId", "deletedAt");

-- CreateIndex
CREATE INDEX "documents_updated_at" ON "Document"("updatedAt");

-- CreateIndex
CREATE INDEX "documents_url_id_deleted_at" ON "Document"("urlId", "deletedAt");

-- CreateIndex
CREATE INDEX "events_actor_id" ON "Event"("actorId");

-- CreateIndex
CREATE INDEX "events_document_id" ON "Event"("documentId");

-- CreateIndex
CREATE INDEX "events_name" ON "Event"("name");

-- CreateIndex
CREATE INDEX "revisions_document_id" ON "Revision"("documentId");

-- CreateIndex
CREATE INDEX "stars_document_id_user_id" ON "Star"("documentId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_name_userProfileId_unique" ON "UserRole"("name", "userId");

-- AddForeignKey
ALTER TABLE "UserRole" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD FOREIGN KEY ("parentDocumentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
