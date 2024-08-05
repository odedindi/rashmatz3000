import prisma from '@/lib/prisma';
import { AllowedEmail } from '@prisma/client';

type AllowedEmailToSeed = AllowedEmail['email'];

const ALLOWED_EMAILS: AllowedEmailToSeed[] = [
  'rashmatz3000@gmail.com',
  'odedindi@gmail.com',
];

export const seedAllowedEmails = async () => {
  const allowedEmails: AllowedEmail[] = [];
  for (const email of ALLOWED_EMAILS) {
    const allowedEmail = await prisma.allowedEmail.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    allowedEmails.push(allowedEmail);
  }
  return allowedEmails;
};
