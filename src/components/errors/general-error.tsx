import type { FC } from 'react';
import GoBack from './buttons/goBack';
import GoHome from './buttons/goHome';
import { ClassValue } from 'clsx';
import { cn } from '@/lib/utils';

interface GeneralErrorProps {
  minimal?: boolean;
  errorNumber?: number;
  className?: ClassValue;
}

const GeneralError: FC<GeneralErrorProps> = ({
  minimal = false,
  errorNumber,
  className,
}) => (
  <div className={cn('flex flex-col gap-4 text-center', className)}>
    {!minimal && errorNumber ? (
      <h1 className="text-[7rem] font-bold leading-tight">{errorNumber}</h1>
    ) : null}
    <span className="font-medium">Oops! Something went wrong {`:'(`}</span>
    <p className="text-center text-muted-foreground">
      We apologize for the inconvenience. <br /> Please try again later.
    </p>
    {!minimal ? (
      <div className="mt-6 flex gap-4">
        <GoBack />
        <GoHome />
      </div>
    ) : null}
  </div>
);

export default GeneralError;
