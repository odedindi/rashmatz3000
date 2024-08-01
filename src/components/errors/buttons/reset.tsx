'use client';

import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

const ResetButton: FC<{ className?: ClassValue; reset: () => void }> = ({
  className,
  reset,
}) => (
  <Button
    title="Reset"
    className={cn('w-full rounded', className)}
    variant="outline"
    onClick={reset}
  >
    Reset
  </Button>
);

export default ResetButton;
