'use client';

import type { FC } from 'react';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

const themeIcons: { [T in Theme]: JSX.Element } = {
  light: <Sun className="h-[1.2rem] w-[1.2rem]" />,
  dark: <Moon className="h-[1.2rem] w-[1.2rem]" />,
  system: <SunMoon className="h-[1.2rem] w-[1.2rem]" />,
};

const ModeToggle: FC = () => {
  const { setTheme, themes, theme: activeTheme } = useTheme();

  if (!activeTheme) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" size="icon" className="rounded-full">
          {themeIcons[activeTheme as Theme]}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            className={cn(
              'duration-250 flex gap-2 rounded capitalize transition ease-in',
              theme === activeTheme && 'font-bold'
            )}
          >
            {themeIcons[theme as Theme]}
            {theme}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
