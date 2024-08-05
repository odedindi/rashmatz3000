'use client';

import type { NextPage } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, Suspense, useCallback } from 'react';
import ContentSection from './components/content-section';
import { useSession } from 'next-auth/react';

const ProfileForm = dynamic(() => import('./features/profile-form'), {
  ssr: false,
});
const AccountForm = dynamic(() => import('./features/account-form'), {
  ssr: false,
});
const AppearanceForm = dynamic(() => import('./features/appearance-form'), {
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
];

const activeTabParamKey = 'tab';
const ProfilePageContent: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session } = useSession();
  const activeTab = searchParams.get(activeTabParamKey) ?? tabs[0].value;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  if (!session?.user) router.push('/auth/sign-in'); // Redirect to sign-in if user is not signed in
  return (
    <Tabs
      defaultValue="profile"
      value={activeTab}
      className="w-full pb-10"
      onValueChange={(tab) =>
        router.push(`${pathname}?${createQueryString('tab', tab)}`)
      }
    >
      <TabsList className="mb-4 px-2">
        {tabs.map(({ value, title }) => (
          <TabsTrigger key={value} value={value} className="rounded">
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
