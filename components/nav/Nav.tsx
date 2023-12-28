'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { classes } from '@/lib/classes';

import { NavLink } from './NavLink';

export const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-row items-center justify-center px-[18px]">
      <div
        className={classes(
          'bg-white border border-black border-opacity-10',
          'rounded-[60px]',
          'flex flex-row items-center justify-between',
          'gap-[16px]',
          'h-[41px]',
          'px-[19px]',
          'mt-[20px]',
          'hidden sm:flex',
        )}
      >
        <NavLink href="/about" isActive={pathname === '/about'}>
          About
        </NavLink>
        <div className="w-[1px] bg-black bg-opacity-30 h-[16px]"></div>
        <NavLink href="/" isActive={pathname !== '/about'}>
          Protect
        </NavLink>
        <div className="w-[1px] bg-black bg-opacity-30 h-[16px]"></div>
        <NavLink isActive={false} href="https://docs.flashbots.net/">
          Documentation
        </NavLink>
      </div>
      <div
        className={classes(
          'flex sm:hidden',
          'w-full flex-row justify-between items-center',
          'mb-[23px]',
        )}
      >
        <Link className="flex flex-row items-start gap-[10px]" href="/">
          <Image src="/icons/logo.svg" width={36} height={35} alt="logo" />
          <div className="text-black text-[29px] font-medium tracking-[-0.58px]">
            Protect
          </div>
        </Link>
        <Image
          src="/icons/menu-hamburger.svg"
          width={30}
          height={30}
          alt="open menu"
        />
      </div>
    </div>
  );
};
