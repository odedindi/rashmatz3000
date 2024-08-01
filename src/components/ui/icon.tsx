import { type FC, memo } from 'react';
import { cn } from '@/lib/utils';
import { icons } from 'lucide-react';

type IconName = keyof typeof icons;
export type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

export const Icon: FC<IconProps> = memo(
  ({ name, className, strokeWidth = 2.5 }) => {
    const IconComponent = icons[name];

    if (!IconComponent) return null;

    return (
      <IconComponent
        className={cn('h-4 w-4', className)}
        strokeWidth={strokeWidth}
      />
    );
  }
);
