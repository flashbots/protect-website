import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

import './styles.css';

export const BigBlackButton = ({
  children,
  className,
  onClick,
  paddingClassName = 'p-[20px] pb-[15px]',
  forceSquares = false,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  paddingClassName?: string;
  forceSquares?: boolean;
  disabled?: boolean;
}) => {
  return (
    <div
      className={classes(
        'bg-squares-grid bg-black rounded-[8px]',
        'transition-all ring-0 ring-gray-700',
        !disabled && 'cursor-pointer hover:ring-1',
        className,
        paddingClassName,
        forceSquares && 'bg-squares-grid-squares',
      )}
      onClick={disabled ? () => {} : onClick}
    >
      {children}
    </div>
  );
};
