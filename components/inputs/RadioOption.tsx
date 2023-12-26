'use client';

import { ReactNode, useId } from 'react';

import { classes } from '@/lib/classes';

import { clickableClasses } from '../buttons/styling';

export const RadioOption = ({
  children,
  checked,
  onChange,
  className,
}: {
  children: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}) => {
  const id = useId();

  return (
    <label
      className={classes(
        'flex flex-row items-center justify-between',
        'rounded-[8px] border border-black border-opacity-10 h-[48px] px-[13px]',
        'bg-black bg-opacity-0 has-[:checked]:bg-opacity-5',
        'shrink-0',
        clickableClasses,
        className,
      )}
      htmlFor={id}
    >
      <div className="flex flex-row items-center">{children}</div>
      <div className="w-[23px] h-[23px] rounded-full border border-black border-opacity-20 p-[4px]">
        <input
          type="radio"
          className="peer absolute cursor-pointer appearance-none"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />

        <div className="w-[13px] h-[13px] rounded-full bg-black peer-checked:opacity-100 opacity-0 transition-all"></div>
      </div>
    </label>
  );
};
