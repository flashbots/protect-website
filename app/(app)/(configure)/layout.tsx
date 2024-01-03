import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export default function ConfigureLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={classes(
        'w-full sm:w-[673px] sm:h-[409px] rounded-[10px]',
        'flex flex-col sm:flex-row gap-[17px] sm:gap-0',
        'border-black border-opacity-15',
        'border-0 sm:border',
        'overflow-hidden sm:overflow-hidden',
      )}
    >
      {children}
    </div>
  );
}
