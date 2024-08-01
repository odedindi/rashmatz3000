'use client';

import {
  createContext,
  type FC,
  forwardRef,
  type HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

const LayoutContext = createContext<{
  offset: number;
  fixed: boolean;
} | null>(null);

interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  fixed?: boolean;
}

const Layout: FC<LayoutProps> = ({ className, fixed = false, ...props }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const div = divRef.current;

    if (!div) return;
    const onScroll = () => setOffset(div.scrollTop);

    // clean up code
    div.removeEventListener('scroll', onScroll);
    div.addEventListener('scroll', onScroll, { passive: true });
    return () => div.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <LayoutContext.Provider value={{ offset, fixed }}>
      <div
        ref={divRef}
        data-layout="layout"
        className={cn(
          'h-full overflow-auto',
          fixed && 'flex flex-col',
          className
        )}
        {...props}
      />
    </LayoutContext.Provider>
  );
};

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  sticky?: boolean;
}

const LayoutHeader = forwardRef<HTMLDivElement, HeaderProps>(
  function LayoutHeader({ className, sticky, ...props }, ref) {
    // Check if Layout.Header is used within Layout
    const contextVal = useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(
        `Layout.Header must be used within ${Layout.displayName}.`
      );
    }

    return (
      <div
        ref={ref}
        data-layout="header"
        className={cn(
          `z-10 flex h-[var(--header-height)] items-center gap-4 bg-background p-4 md:px-8`,
          contextVal.offset > 10 && sticky ? 'shadow' : 'shadow-none',
          contextVal.fixed && 'flex-none',
          sticky && 'sticky top-0',
          className
        )}
        {...props}
      />
    );
  }
);

const LayoutBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function LayoutBody({ className, ...props }, ref) {
    // Check if Layout.Body is used within Layout
    const contextVal = useContext(LayoutContext);
    if (contextVal === null) {
      throw new Error(`Layout.Body must be used within ${Layout.displayName}.`);
    }

    return (
      <div
        ref={ref}
        data-layout="body"
        className={cn(
          'px-4 py-6 md:overflow-hidden md:px-8',
          contextVal && contextVal.fixed && 'flex-1',
          className
        )}
        {...props}
      />
    );
  }
);

export { Layout, LayoutBody, LayoutHeader };