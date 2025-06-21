/*
  Warnings:

  - You are about to drop the `_ApplicationsToJob` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApplicationsToJob" DROP CONSTRAINT "_ApplicationsToJob_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicationsToJob" DROP CONSTRAINT "_ApplicationsToJob_B_fkey";

-- AlterTable
ALTER TABLE "Applications" ADD COLUMN     "jobId" INTEGER;

-- DropTable
DROP TABLE "_ApplicationsToJob";

-- AddForeignKey
ALTER TABLE "Applications" ADD CONSTRAINT "Applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
