import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'auth page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
      {children}
    </div>
  );
}
