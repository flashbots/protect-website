import { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.css';
import { fontCalibre } from '@/fonts/fonts';

export const metadata: Metadata = {
  title: 'Flashbots Protect',
  description: 'A safer way to transact on Ethereum',
  openGraph: {
    type: 'website',
    url: 'https://protect.flashbots.net',
    title: 'Flashbots Protect',
    description: 'A safer way to transact on Ethereum, by Flashbots.',
    siteName: 'Protect',
    images: [
      {
        url: '/og-image.png',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontCalibre.className}>
      {children}
    </html>
  );
}
