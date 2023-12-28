import { ReactNode } from 'react';

import type { Metadata } from 'next';
import Image from 'next/image';

import { Nav } from '@/components/nav/Nav';
import { fontCalibre } from '@/fonts/fonts';
import { classes } from '@/lib/classes';

import './globals.css';

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
          'justify-between items-center',
          'px-[20px] py-[20px]',
          'max-h-dvh overflow-hidden',
        )}
      >
        <Nav />
        {children}
        <div className="hidden sm:flex flex-row items-center gap-[8px] mb-[21px]">
          <div className="text-black text-opacity-50 text-[19px] font-medium tracking-[-0.38px]">
            Built by
          </div>
          <Image
            src="/icons/flashbots-logo.svg"
            height={24}
            width={96}
            alt="flashbots logo"
          />
        </div>
      </body>
    </html>
  );
}
