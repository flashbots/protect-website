import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

import { PanelTitle } from './PanelTitle';
import { Nav } from '../nav/Nav';

export const MobilePanel = ({
  children,
  title,
  backHref,
}: {
  children: ReactNode;
  title: string;
  backHref: string;
}) => {
  return (
    <>
      <Nav displayClassNames="flex sm:hidden pt-[19px] px-[12px]">
        <PanelTitle title={title} backHref={backHref} />
      </Nav>
      <div
        className={classes(
          'w-full sm:w-[673px]',
          'rounded-[10px]',
          'flex flex-col sm:flex-row gap-0',
          'border-black border-opacity-15',
          'border',
          'overflow-hidden sm:overflow-hidden',
          'shadow-[0px_4px_74px_0px_rgba(0,0,0,0.07)] sm:shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)]',
          'sm:h-[409px]',
          'justify-between',
        )}
      >
        {children}
      </div>
    </>
  );
};
