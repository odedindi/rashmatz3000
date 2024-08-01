'use client';

import type { FC } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = true,
  storageKey = 'rashmatz3000-theme',
  ...props
}) => (
  <NextThemesProvider
    attribute={attribute}
    defaultTheme={defaultTheme}
    enableSystem={enableSystem}
    disableTransitionOnChange={disableTransitionOnChange}
    storageKey={storageKey}
    {...props}
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
