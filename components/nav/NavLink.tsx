import { ReactNode } from 'react';

import Link from 'next/link';

import { classes } from '@/lib/classes';

export const NavLink = ({
  children,
  href,
  isActive,
  onClick,
}: {
  children: ReactNode;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      className={classes(
        isActive
          ? 'opacity-100 hover:opacity-80'
          : 'opacity-40 hover:opacity-60',
        'text-black font-medium',
        'text-[48px] sm:text-[17px]',
        'tracking-[-0.86px] sm:tracking-[-0.34px]',
        'leading-[22px] sm:leading-[33px]',
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
