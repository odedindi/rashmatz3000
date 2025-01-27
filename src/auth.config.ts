import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { saltAndHashPassword } from '@/lib/password';
import { z } from 'zod';

const { AUTH_SECRETE, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = z
  .object({
    AUTH_SECRETE: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  })
  .parse(process.env);

const getUserFromDb = async (email: unknown, _password?: string) => {
  if (typeof email !== 'string') return null;

  const user = {
    id: 'mockId',
    name: 'John Doe',
    email,
  };
  return user;
};

const authConfig = {
  secret: AUTH_SECRETE,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // logic to salt and hash password
        const pwHash = await saltAndHashPassword(credentials.password);

        // logic to verify if user exists
        user = await getUserFromDb(credentials.email, pwHash);

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('User not found.');
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    verifyRequest: '/auth/otp',
  },
} satisfies NextAuthConfig;

export default authConfig;
