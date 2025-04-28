-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_jobCompany_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "jobCompany" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_jobCompany_fkey" FOREIGN KEY ("jobCompany") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
