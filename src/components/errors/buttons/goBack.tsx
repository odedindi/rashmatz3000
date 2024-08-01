'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

const GoBackButton: FC<{ className?: ClassValue }> = ({ className }) => {
  const router = useRouter();
  return (
    <Button
      title="Go back"
      className={cn('w-full rounded', className)}
      onClick={router.back}
    >
      Go Back
    </Button>
  );
};

export default GoBackButton;
