import type { FC, PropsWithChildren } from 'react';

import { Layout, LayoutBody, LayoutHeader } from '@/components/layout';
import Search from '@/components/search';
import { ModeToggle } from '@/components/modeToggle';
import UserNav from '@/components/userNav';
import { type NavLink, TopNav } from './top-nav';

const topNav: NavLink[] = [
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

const AppShell: FC<PropsWithChildren> = ({ children }) => (
  <Layout>
    <LayoutHeader>
      <div className="flex h-[--top-nav-height] w-full items-center justify-start direction-reverse">
        <TopNav links={topNav} />
        <div className="flex w-full items-center justify-end space-x-2">
          <UserNav user={{ name: 'stanis', email: 'satnaingdev@gmail.com' }} />
          <Search />
          <ModeToggle />
        </div>
      </div>
    </LayoutHeader>
    <LayoutBody>
      <main id="content" className="relative flex h-[--main-height] flex-col">
        {children}
      </main>
    </LayoutBody>
  </Layout>
);

export default AppShell;
