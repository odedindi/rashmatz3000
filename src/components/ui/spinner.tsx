import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

export const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      true: 'flex',
      false: 'hidden',
    },
  },
  defaultVariants: {
    show: true,
  },
});

export const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      xs: 'size-4',
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-12',
      xl: 'size-16',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerContentProps>(
  ({ size, show, children, className }, ref) => (
    <span ref={ref} className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  )
);

Spinner.displayName = 'Spinner';
