'use client'; // Error components must be Client Components

import type { NextPage } from 'next';
import { useEffect } from 'react';
import ResetButton from '@/components/errors/buttons/reset';
import GeneralError from '@/components/errors/general-error';

const Error: NextPage<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <GeneralError />
      {/* // Attempt to recover by trying to re-render the segment */}
      <ResetButton reset={reset} className="mt-4" />
    </div>
  );
};

export default Error;
