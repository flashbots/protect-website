import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export const DescriptionText = ({
  textOpacityClass = 'text-opacity-80',
  children,
}: {
  textOpacityClass?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={classes(
        'text-black text-[19px] tracking-[-0.38px] leading-[22px] mb-[11px]',
        textOpacityClass,
      )}
    >
      {children}
    </div>
  );
};
