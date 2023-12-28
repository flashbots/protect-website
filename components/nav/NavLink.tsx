import { ReactNode } from 'react';

import Link from 'next/link';

import { classes } from '@/lib/classes';

export const NavLink = ({
  children,
  href,
  isActive,
}: {
  children: ReactNode;
  href: string;
  isActive?: boolean;
}) => {
  return (
    <Link
      className={classes(
        isActive
          ? 'opacity-100 hover:opacity-80'
          : 'opacity-40 hover:opacity-60',
        'text-black text-[17px] font-medium leading-[33px] tracking-[-0.34px]',
      )}
      href={href}
    >
      {children}
    </Link>
  );
};
