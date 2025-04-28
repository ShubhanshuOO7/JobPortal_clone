/*
  Warnings:

  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyName]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyName` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Company_name_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "name",
ADD COLUMN     "companyName" TEXT NOT NULL,
ALTER COLUMN "logo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "Company"("companyName");
