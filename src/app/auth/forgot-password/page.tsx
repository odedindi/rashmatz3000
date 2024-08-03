'use client';
import { Card } from '@/components/ui/card';
import { ForgotForm } from '../components/forgot-form';
import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <>
      <div className="mb-4 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        <h1 className="text-xl font-medium">Shadcn Admin</h1>
      </div>
      <Card className="p-6">
        <div className="mb-2 flex flex-col space-y-2 text-left">
          <h1 className="text-md font-semibold tracking-tight">
            Forgot Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your registered email and <br /> we will send you a link to
            reset your password.
          </p>
        </div>
        <ForgotForm />
        <p className="mt-4 px-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/sign-up"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
          .
        </p>
      </Card>
    </>
  );
}
