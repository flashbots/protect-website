import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export default function ConfigureLayout({ children }: { children: ReactNode }) {
  return (
    <div
      // this creates a white fixed panel for mobile
      // and is "pass thru" for desktop
      className={classes(
        'top-0 left-0 fixed sm:static',
        'bg-white',
        'h-full sm:h-auto',
        'flex flex-col justify-between',
        'px-[20px] sm:px-0',
        'pb-[14px] sm:pb-0',
        'transition-all',
      )}
      id="mobile-overlay"
    >
      {children}
    </div>
  );
}
