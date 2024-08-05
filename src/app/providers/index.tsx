import ThemeProvider from '@/app/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { FC, PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

const Providers: FC<PropsWithChildren<{ session: Session | null }>> = ({
  children,
  session,
}) => (
  <SessionProvider session={session}>
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  </SessionProvider>
);
export default Providers;
