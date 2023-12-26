'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { classes } from '@/lib/classes';
import { useURLState } from '@/lib/useURLState';

import { clickableClasses } from './styling';

export const BackButton = ({ href }: { href?: string }) => {
  const router = useRouter();
  const { urlParams } = useURLState();
  return (
    <div
      className={classes(
        'rounded-full w-[35px] h-[35px] border border-black border-opacity-15 flex flex-row items-center justify-center',
        'cursor-pointer',
        clickableClasses,
        'opacity-50 hover:opacity-70',
      )}
      onClick={() => {
        if (href) {
          router.push(`${href}?${urlParams}`);
        } else {
          router.back();
        }
      }}
    >
      <Image height={14} width={8} src="/icons/caret-left.svg" alt="back" />
    </div>
  );
};
