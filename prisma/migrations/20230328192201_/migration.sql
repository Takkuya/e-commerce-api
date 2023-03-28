/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `sellers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `sellers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `sellers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sellers" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sellers_email_key" ON "sellers"("email");
