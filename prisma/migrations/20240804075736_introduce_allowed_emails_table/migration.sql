-- CreateTable
CREATE TABLE "AllowedEmails" (
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AllowedEmails_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "AllowedEmails_email_key" ON "AllowedEmails"("email");

-- CreateIndex
CREATE INDEX "AllowedEmails_email_idx" ON "AllowedEmails"("email");
