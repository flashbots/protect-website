import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export const ActionPanel = ({
  children,
  backgroundClass = 'bg-white',
  borderClass = 'border-t sm:border-0',
}: {
  children: ReactNode;
  backgroundClass?: string;
  borderClass?: string;
}) => {
  return (
    <div
      className={classes(
        backgroundClass,
        borderClass,
        'flex flex-col grow',
        'p-[20px] pt-[9px] sm:pt-[18px]',
        'border-black border-opacity-15',
        'max-h-[385px] sm:max-h-full',
      )}
    >
      {children}
    </div>
  );
};
