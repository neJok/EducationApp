import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';

import { TmaSDKLoader } from '@/components/TmaSDKLoader';

import '@/styles/global.css';
import '@/styles/reset.css';
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Education',
  description: 'Education platform',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
    <body className={inter.className}>
      <TmaSDKLoader>
        <StoreProvider>
          {children}
        </StoreProvider>
      </TmaSDKLoader>
    </body>
    </html>
  );
}
