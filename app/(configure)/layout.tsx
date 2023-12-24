import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export default function ConfigureLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={classes(
        'w-[673px] h-[409px] bg-white rounded-[10px]',
        'flex flex-row',
        'border border-black border-opacity-15',
      )}
    >
      {children}
    </div>
  );
}
