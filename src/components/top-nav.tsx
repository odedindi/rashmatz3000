'use client';
import { cn } from '@/lib/utils';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type FC, type ReactNode, useState } from 'react';
import { ClassValue } from 'clsx';

type NavLink = {
  title: string;
  href: string;
};

const navLinkClassName: ClassValue =
  'text-sm font-medium transition-colors hover:text-primary';
const activeLinkClassName: ClassValue =
  'text-muted-foreground pointer-events-none';
interface TopNavProps extends React.HTMLAttributes<HTMLElement> {}

const links: NavLink[] = [
  {
    title: 'Tasks',
    href: '/tasks',
  },
  {
    title: 'New Task',
    href: '/tasks/new',
  },
  // {
  //   title: 'Products',
  //   href: '/dashboard/products',
  // },
  // {
  //   title: 'Settings',
  //   href: '/settings/user',
  // },
];

export const TopNav: FC<TopNavProps> = ({ className, ...props }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="md:hidden">
        <Dropdown
          trigger={
            <Button size="icon" className="rounded">
              <MenuIcon />
            </Button>
          }
          links={links}
        />
      </div>

      <nav
        className={cn(
          'hidden items-center space-x-4 md:flex lg:space-x-6',
          className
        )}
        {...props}
      >
        <Link
          href={'/'}
          className={cn(
            navLinkClassName,
            pathname === '/' && activeLinkClassName
          )}
        >
          Home
        </Link>
        {links.map(({ title, href }, i) => (
          <Link
            title={`${title}-${href}`}
            key={i}
            href={href}
            className={cn(
              navLinkClassName,
              pathname.includes(href) && activeLinkClassName
            )}
          >
            {title}
          </Link>
        ))}
      </nav>
    </>
  );
};

const Dropdown: FC<{
  trigger: ReactNode;
  links: NavLink[];
}> = ({ trigger, links }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Drawer open={open} onOpenChange={setOpen} direction={'bottom'}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Menu</DrawerTitle>
        <DrawerDescription className="sr-only">
          Navigation links
        </DrawerDescription>
        <DrawerHeader className={'flex justify-end'}>
          <DrawerClose asChild>
            <Button variant="outline" className="rounded">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <DrawerFooter className={'px-4'}>
          <Button
            variant="ghost"
            className={cn(
              navLinkClassName,
              'rounded hover:bg-background',
              pathname === '/' && activeLinkClassName
            )}
            onClick={() => router.push('/')}
          >
            Home
          </Button>
          {links.map(({ title, href }, i) => (
            <Button
              key={i}
              title={`${typeof window !== 'undefined' ? window.location.origin : ''}${href}`}
              variant="ghost"
              className={cn(
                navLinkClassName,
                'rounded hover:bg-background',
                pathname.includes(href) && activeLinkClassName
              )}
              onClick={() => router.push(href)}
            >
              {title}
            </Button>
          ))}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
