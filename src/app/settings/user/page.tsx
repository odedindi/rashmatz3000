'use client';

import type { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, Suspense, useCallback } from 'react';
import ContentSection from './components/content-section';

const ProfileForm = dynamic(() => import('./features/profile-form'), {
  ssr: false,
});
const AccountForm = dynamic(() => import('./features/account-form'), {
  ssr: false,
});
const AppearanceForm = dynamic(() => import('./features/appearance-form'), {
  ssr: false,
});
const DisplayForm = dynamic(() => import('./features/display-form'), {
  ssr: false,
});

const tabs = [
  {
    value: 'profile',
    title: 'Profile',
    desc: 'This is how others will see you on the site.',
    Tab: ProfileForm,
  },
  {
    value: 'account',
    title: 'Account',
    desc: 'Update your account settings. Set your preferred language and timezone.',
    Tab: AccountForm,
  },
  {
    value: 'appearance',
    title: 'Appearance',
    desc: 'Customize the appearance of the app. Automatically switch between day and night themes.',
    Tab: AppearanceForm,
  },
  {
    value: 'display',
    title: 'Display',
    desc: "Turn items on or off to control what's displayed in the app.",
    Tab: DisplayForm,
  },
];

const activeTabParamKey = 'tab';
const ProfilePageContent: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const activeTab = searchParams.get(activeTabParamKey) || undefined;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      className="w-full"
      onValueChange={(tab) =>
        router.push(`${pathname}?${createQueryString('tab', tab)}`)
      }
    >
      <TabsList className="mb-10">
        {tabs.map(({ value, title }) => (
          <TabsTrigger key={value} value={value}>
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ value, Tab, title }, i) => (
        <TabsContent key={i} value={value}>
          <ContentSection title={title} desc={tabs[i].desc}>
            <Tab />
          </ContentSection>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const ProfilePage: NextPage = () => (
  <Suspense fallback={'loading...'}>
    <ProfilePageContent />
  </Suspense>
);

export default ProfilePage;
