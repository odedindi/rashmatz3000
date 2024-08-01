'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

const GoHomeButton: FC<{ className?: ClassValue }> = ({ className }) => {
  const router = useRouter();
  return (
    <Button
      title="Home"
      className={cn('w-full rounded', className)}
      onClick={() => router.push('/')}
      variant="secondary"
    >
      Back to Home
    </Button>
  );
};

export default GoHomeButton;
