import prisma from '@/lib/prisma';
import { Role, User } from '@prisma/client';

type UserToSeed = Pick<User, 'name' | 'email' | 'role'>;

const USERS: UserToSeed[] = [
  {
    name: 'Guest User',
    email: 'guest@email.com',
    role: Role.GUEST,
  },
  {
    name: 'Oded',
    email: 'odedindi@gmail.com',
    role: Role.ADMIN,
  },
];

export const seedUsers = async () => {
  const users: User[] = [];

  for (const user of USERS) {
    const seededUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    users.push(seededUser);
  }

  return users;
};
