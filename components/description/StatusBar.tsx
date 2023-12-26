import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

import { Status, StatusLight } from '../icons/StatusLight';

export const StatusBar = ({
  children,
  status,
}: {
  children: ReactNode;
  status: Status;
}) => {
  return (
    <div
      className={classes(
        'border-t border-black border-opacity-10',
        'flex flex-row items-center justify-between',
        'pt-[13px]',
      )}
    >
      <div className="text-black text-xl font-normal tracking-[-0.4px] leading-[31px]">
        {children}
      </div>
      <div className="flex flex-row items-center gap-[7px]">
        <StatusLight color={status.lightColor} />
        <div className="text-right text-black text-[21px] font-medium">
          {status.text}
        </div>
      </div>
    </div>
  );
};
