'use client';
import { Card } from '@/components/ui/card';
import { SignUpForm } from '../components/sign-up-form';
import Link from 'next/link';
import { UserPlus2 } from 'lucide-react';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
  return (
    <>
      <div className="mb-4 flex items-center justify-center">
        <UserPlus2 />
        <h1 className="text-xl font-medium">Create an account</h1>
      </div>
      <Card className="p-6">
        <p className="mb-2 text-sm text-muted-foreground">
          Enter your email and password to create an account. <br />
          Already have an account?{' '}
          <Link
            href="/auth/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>

        <SignUpForm />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          By creating an account, you agree to our{' '}
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
};

export default SignUp;
