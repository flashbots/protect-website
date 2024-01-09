'use client';

import { ReactNode, useId } from 'react';

import Image from 'next/image';

import { classes } from '@/lib/classes';

export const Checkbox = ({
  children,
  className,
  checked,
  onChange,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  const id = useId();

  return (
    <div
      className={classes(
        'flex flex-row items-center cursor-pointer',
        className,
        'pointer-events-none',
      )}
      id={id}
    >
      <div className="flex relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={classes(
            'appearance-none',
            'w-[18px] h-[18px] rounded-[4px] border border-black',
            'border-opacity-10',
            'bg-white checked:bg-black',
            'ring-0',
            'peer',
            disabled
              ? 'checked:bg-opacity-30 checked:border-opacity-0'
              : 'checked:border-opacity-100',
            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
            'transition-all',
          )}
          disabled={disabled}
        ></input>
        <Image
          src="/icons/check.svg"
          height={8.5}
          width={9.5}
          alt="check"
          className={classes(
            'absolute hidden peer-checked:block',
            'top-1/2 left-1/2',
            '-translate-x-1/2 -translate-y-1/2',
            'pointer-events-none',
          )}
        />
      </div>
      <label
        htmlFor={id}
        onClick={() => !disabled && onChange(!checked)}
        className={classes(
          'select-none',
          disabled && 'opacity-50',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        )}
      >
        {children}
      </label>
    </div>
  );
};
