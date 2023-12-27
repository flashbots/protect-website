import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export const DescriptionText = ({
  textOpacityClass = 'text-opacity-80',
  className,
  children,
}: {
  textOpacityClass?: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={classes(
        'text-black leading-[22px]',
        'mb-[10px] sm:mb-[11px]',
        'text-[20px] sm:text-[19px]',
        'tracking-[-0.4px] sm:tracking-[-0.38px]',
        textOpacityClass,
        className,
      )}
    >
      {children}
    </div>
  );
};
