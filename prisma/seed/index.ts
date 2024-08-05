import prisma from '@/lib/prisma';

import { seedUsers } from './users';
import { seedAllowedEmails } from './allowedEmails';

const seed = async () => {
  const response = await Promise.all([seedUsers(), seedAllowedEmails()]);
  console.log(response);
};
seed()
  .then(async () => {
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
