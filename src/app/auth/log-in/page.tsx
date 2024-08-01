'use client';

import { Card } from '@/components/ui/card';
import { UserAuthForm } from '../components/user-auth-form';
import { UserPlus2 } from 'lucide-react';
import Link from 'next/link';

export default function SignIn2() {
  return (
    <>
      <div className="mb-4 flex items-center justify-center gap-2">
        <UserPlus2 />
        <h1 className="text-xl font-medium">Login</h1>
      </div>
      <Card className="p-6">
        <p className="mb-2 text-sm text-muted-foreground">
          Enter your email and password below <br />
          to log into your account
        </p>

        <UserAuthForm />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          By clicking login, you agree to our{' '}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </Card>
    </>
  );
}
