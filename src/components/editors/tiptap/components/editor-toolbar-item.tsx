import { forwardRef } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const EditorToolbarItem = forwardRef<
  HTMLButtonElement,
  ButtonProps & { active?: 0 | 1 }
>(({ active, ...props }, ref) => (
  <Button
    ref={ref}
    variant={'ringHover'}
    className={cn('flex-1', active && 'ring-2 ring-primary/90 ring-offset-2')}
    {...props}
  />
));

EditorToolbarItem.displayName = 'MenuItem';

export default EditorToolbarItem;
