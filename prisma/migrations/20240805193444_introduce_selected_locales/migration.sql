-- CreateEnum
CREATE TYPE "SupportedLocale" AS ENUM ('EN', 'DE', 'HE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "selectedLocale" "SupportedLocale" NOT NULL DEFAULT 'EN';
