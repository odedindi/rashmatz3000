-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "favoriteUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];
