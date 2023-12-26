import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

import { BackButton } from '../buttons/BackButton';

export const DescriptionPanel = ({
  title,
  dots,
  children,
  bottomBar,
  backHref,
}: {
  title: string;
  dots: {
    activeIndex: number;
    totalDots: number;
  };
  children: ReactNode;
  bottomBar?: ReactNode;
  backHref?: string;
}) => {
  return (
    <div
      className={classes(
        'w-[333px] h-full',
        'border-r-black border-r border-opacity-10',
        'p-[22px] pr-[30px]',
        'shrink-0',
        'flex flex-col justify-between',
      )}
    >
      <div>
        <div className="flex flex-row items-center justify-between pb-[20px]">
          <div className="flex flex-row items-center gap-[14px]">
            <BackButton href={backHref} />
            <div className="text-black text-[26px] font-medium leading-[33px] tracking-[-0.52px]">
              {title}
            </div>
          </div>
          <div className="flex flex-row gap-[6px]">
            {Array.from({ length: dots.totalDots }, (_, i) => (
              <div
                className={classes(
                  'rounded-full w-[8px] h-[8px]',
                  i === dots.activeIndex ? 'bg-black' : 'bg-[#DADADA]',
                )}
                key={i}
              ></div>
            ))}
          </div>
        </div>
        {children}
      </div>
      {bottomBar}
    </div>
  );
};
