import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export const FormHint = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return (
    <div
      className={classes(
        'text-black text-[17px] font-normal leading-[33px] tracking-[-0.34px] mx-[6px]',
        className,
      )}
    >
      {children}
    </div>
  );
};
