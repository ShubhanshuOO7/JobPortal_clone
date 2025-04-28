-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_jobCompany_fkey";

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
