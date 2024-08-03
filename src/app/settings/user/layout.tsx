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
    <div className="flex w-full flex-col justify-center space-y-2">
      {children}
    </div>
  );
}
