import { CSSProperties, ReactNode } from 'react';

import Link from 'next/link';

import { classes } from '@/lib/classes';

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
  type?: 'primary-black' | 'primary-white';
  style?: CSSProperties;
}) => {
  const buttonClasses = classes(
    'w-full rounded-[8px]',
    'transition-all',
    'p-[9px] text-[20px] h-[46px]',
    'font-medium',
    'border',
    type === 'primary-black' && 'border-black bg-black text-white',
    type === 'primary-white' && 'bg-black bg-white text-black',
    'leading-[18px]',
    'flex flex-row items-center justify-center',
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
