-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "resume" DROP NOT NULL,
ALTER COLUMN "resumeOriginalName" DROP NOT NULL,
ALTER COLUMN "profilePhoto" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" DROP NOT NULL;
