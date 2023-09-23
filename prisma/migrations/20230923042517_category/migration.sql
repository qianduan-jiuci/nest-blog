/*
  Warnings:

  - Made the column `categoryId` on table `artilce` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `artilce` DROP FOREIGN KEY `artilce_categoryId_fkey`;

-- AlterTable
ALTER TABLE `artilce` MODIFY `categoryId` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `title` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `artilce` ADD CONSTRAINT `artilce_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
