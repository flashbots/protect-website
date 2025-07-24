import { ReactNode } from 'react';

import Image from 'next/image';

import { Header } from '@/components/Header';
import { classes } from '@/lib/classes';

import './app.css';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <body
      className={classes(
        'h-dvh w-screen flex flex-col',
        'items-center',
        'px-[20px] py-[20px]',
        'max-h-dvh overflow-hidden',
      )}
    >
      <Header />

      <main className="flex-1 flex items-center justify-center w-full">
        {children}
      </main>

      <footer className="hidden sm:flex flex-row items-center gap-[8px]">
        <div className="text-black text-opacity-50 text-[19px] font-medium tracking-[-0.38px]">
          Built by
        </div>
        <Image
          src="/icons/flashbots-logo.svg"
          height={24}
          width={96}
          alt="flashbots logo"
        />
      </footer>
    </body>
  );
}
