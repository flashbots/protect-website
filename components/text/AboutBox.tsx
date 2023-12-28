import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

export const AboutBox = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={classes(
        'border border-black border-opacity-15 bg-white rounded-[10px]',
        'px-[24px] pt-[17px] pb-[20px]',
        'w-full sm:w-[calc(50%-25px/2)]',
      )}
    >
      <div
        className={
          'text-[22px] font-medium leading-[27px] tracking-[-0.44px] mb-[4px]'
        }
      >
        {title}
      </div>
      <div
        className={'text-[17px] font-normal leading-[20px] tracking-[-0.34px]'}
      >
        {children}
      </div>
    </div>
  );
};
