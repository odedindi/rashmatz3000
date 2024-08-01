import ThemeProvider from '@/app/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FC, PropsWithChildren } from 'react';

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider>
    {children}
    <Toaster />
  </ThemeProvider>
);
export default Providers;
