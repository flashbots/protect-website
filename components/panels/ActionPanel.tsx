import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export const ActionPanel = ({
  children,
  backgroundClass = 'bg-white',
}: {
  children: ReactNode;
  backgroundClass?: string;
}) => {
  return (
    <div
      className={classes(
        backgroundClass,
        'flex flex-col grow',
        'p-[20px] sm:pt-[18px]',
        'border sm:border-0 border-black border-opacity-15',
        'shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)] sm:shadow-none',
        'rounded-[10px] sm:rounded-none',
        'max-h-[385px] sm:max-h-full',
      )}
    >
      {children}
    </div>
  );
};
