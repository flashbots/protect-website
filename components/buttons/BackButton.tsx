'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { classes } from '@/lib/classes';

export const BackButton = () => {
  const router = useRouter();
  return (
    <div
      className={classes(
        'rounded-full w-[35px] h-[35px] border border-black border-opacity-15 flex flex-row items-center justify-center opacity-50',
        'cursor-pointer',
        'transition-all hover:border-opacity-30 hover:opacity-[0.7]',
      )}
      onClick={() => {
        router.back();
      }}
    >
      <Image height={14} width={8} src="/icons/caret-left.svg" alt="back" />
    </div>
  );
};
