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
          'h-screen w-screen flex flex-row items-center justify-center',
        )}
      >
        {children}
      </body>
    </html>
  );
}
