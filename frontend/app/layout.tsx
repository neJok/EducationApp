import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';

import { TmaSDKLoader } from '@/components/TmaSDKLoader';
import QueryProvider from "@/app/QueryProvider";

import '@/styles/global.css';
import '@/styles/reset.css';

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
          <QueryProvider>
            {children}
          </QueryProvider>
        </TmaSDKLoader>
      </body>
    </html>
  );
}
