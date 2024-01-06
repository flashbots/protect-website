import { CSSProperties, ReactNode } from 'react';

import Link from 'next/link';

import { classes } from '@/lib/classes';

import { clickableClasses } from './styling';

export const Button = ({
  children,
  onClick,
  href,
  className,
  type = 'primary-black',
  style,
}: {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'primary-black' | 'primary-white' | 'secondary';
  style?: CSSProperties;
}) => {
  const buttonClasses = classes(
    'w-full rounded-[8px]',
    'transition-all',
    'text-[20px] shrink-0',
    'font-medium',
    'border',
    type === 'primary-black' && 'border-black bg-black text-white h-[48px]',
    type === 'primary-white' && 'bg-black bg-white text-black h-[46px]',
    type === 'secondary' &&
      'border-black bg-white text-black h-[39px] border-opacity-10',
    'leading-[18px]',
    'flex flex-row items-center justify-center',
    clickableClasses,
    'hover:scale-y-[1.03] hover:scale-x-[1.01]',
  );

  if (href) {
    return (
      <Link href={href} style={style}>
        <div className={classes(buttonClasses, className)}>{children}</div>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classes(buttonClasses, className)}
      style={style}
    >
      {children}
    </button>
  );
};
