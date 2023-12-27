import { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';
import { fontCalibre } from '@/fonts/fonts';
import { classes } from '@/lib/classes';

export const metadata: Metadata = {
  title: 'Flashbots Protect',
  description: 'A safer way to transact on Ethereum',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={classes(
          fontCalibre.className,
          'h-dvh w-screen flex flex-col',
          'justify-end sm:justify-center items-center',
          'px-[20px] py-[20px]',
          'max-h-dvh overflow-hidden',
        )}
      >
        {children}
      </body>
    </html>
  );
}
