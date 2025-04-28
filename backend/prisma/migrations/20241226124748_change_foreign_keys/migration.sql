-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_jobCompany_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_userId_fkey";

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_jobCompany_fkey" FOREIGN KEY ("jobCompany") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
