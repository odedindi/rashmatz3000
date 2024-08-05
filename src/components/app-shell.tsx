import type { FC, PropsWithChildren } from 'react';

import { Layout, LayoutBody, LayoutHeader } from '@/components/layout';
import UserNav from '@/components/userNav';
import { TopNav } from './top-nav';
import dynamic from 'next/dynamic';

const ModeToggle = dynamic(() => import('@/components/modeToggle'), {
  ssr: false,
});
const AppShell: FC<PropsWithChildren> = ({ children }) => (
  <Layout>
    <LayoutHeader>
      <div className="flex h-[--top-nav-height] w-full items-center justify-start direction-reverse">
        <TopNav />
        <div className="flex w-full items-center justify-end space-x-2">
          <UserNav />
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
