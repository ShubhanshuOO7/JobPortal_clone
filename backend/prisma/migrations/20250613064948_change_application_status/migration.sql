/*
  Warnings:

  - The values [pending,accepted,rejected] on the enum `ApplicantionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicantionStatus_new" AS ENUM ('Pending', 'Accepted', 'Rejected');
ALTER TABLE "Applications" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Applications" ALTER COLUMN "status" TYPE "ApplicantionStatus_new" USING ("status"::text::"ApplicantionStatus_new");
ALTER TYPE "ApplicantionStatus" RENAME TO "ApplicantionStatus_old";
ALTER TYPE "ApplicantionStatus_new" RENAME TO "ApplicantionStatus";
DROP TYPE "ApplicantionStatus_old";
ALTER TABLE "Applications" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "Applications" ALTER COLUMN "status" SET DEFAULT 'Pending';
