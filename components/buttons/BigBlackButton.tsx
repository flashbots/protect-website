import { ReactNode } from 'react';

import { classes } from '@/lib/classes';

import './styles.css';

export const BigBlackButton = ({
  children,
  className,
  onClick,
  paddingClassName = 'p-[20px] pb-[15px]',
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  paddingClassName?: string;
}) => {
  return (
    <div
      className={classes(
        'bg-squares-grid bg-black rounded-[8px]',
        'cursor-pointer transition-all ring-0 hover:ring-1 ring-gray-700',
        className,
        paddingClassName,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};