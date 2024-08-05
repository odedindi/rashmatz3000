import { forwardRef } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const EditorToolbarItem = forwardRef<
  HTMLButtonElement,
  ButtonProps & { active?: boolean }
>(({ active, ...props }, ref) => (
  <Button
    ref={ref}
    variant={'ringHover'}
    className={cn(
      'flex-1 rounded',
      active && 'ring-2 ring-primary/90 ring-offset-2'
    )}
    {...props}
  />
));

EditorToolbarItem.displayName = 'MenuItem';

export default EditorToolbarItem;
