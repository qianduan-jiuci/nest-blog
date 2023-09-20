/*
  Warnings:

  - You are about to drop the column `isActive` on the `artilce` table. All the data in the column will be lost.
  - Added the required column `active` to the `artilce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artilce` DROP COLUMN `isActive`,
    ADD COLUMN `active` BOOLEAN NOT NULL;
