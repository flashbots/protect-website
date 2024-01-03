'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { classes } from '@/lib/classes';

export default function DocumentationButton() {
  const searchParams = useSearchParams();
  const darkMode = searchParams.get('theme') === 'dark';

  return (
    <Link href={`/`} target="_parent">
      <div
        className={classes(
          'pl-[20px] pr-[40px] pt-[10px] pb-[16px] h-[88px]',
          darkMode ? 'bg-white' : 'bg-black',
          'flex flex-row items-center justify-between gap-[10px]',
        )}
      >
        <Image
          src="/icons/logo.svg"
          height={52}
          width={49}
          alt="flashbots logo"
        />
        <div>
          <div
            className={classes(
              'opacity-50',
              darkMode ? 'text-black' : 'text-white',
              'text-[20px] font-medium tracking-[-0.4px] leading-[18px] mb-[12px]',
            )}
          >
            Start setup for
          </div>
          <div
            className={classes(
              'text-[30px] font-medium tracking-[-0.6px] leading-[18px]',
              darkMode ? 'text-black' : 'text-white',
            )}
          >
            Flashbots Protect
          </div>
        </div>
      </div>
    </Link>
  );
}
