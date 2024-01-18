'use client';

import { ReactNode, useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { classes } from '@/lib/classes';

import { NavLink } from './NavLink';

export const Nav = ({
  children,
  displayClassNames = 'flex',
}: {
  children?: ReactNode;
  displayClassNames?: string;
}) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // look for mobile overlay id and make if transparent
    const mobileOverlay = document.getElementById('mobile-overlay');
    if (mobileOverlay) {
      // change class
      if (isMenuOpen) {
        mobileOverlay.classList.add('bg-dots');
      } else {
        mobileOverlay.classList.remove('bg-dots');
      }
    }
  }, [isMenuOpen]);

  return (
    <div
      className={classes(
        displayClassNames,
        'w-full flex-row items-start justify-center px-[18px]',
      )}
    >
      {/* Desktop */}
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
        <NavLink isActive={false} href="https://docs.flashbots.net/flashbots-protect/overview">
          Documentation
        </NavLink>
      </div>

      {/* Mobile */}
      <div
        className={classes(
          'flex sm:hidden w-full flex-col',
          'transition-all',
          'relative',
          isMenuOpen ? 'min-h-dvh shrink-0' : 'min-h-0 h-auto',
        )}
      >
        <div
          className={classes(
            'flex w-full flex-row justify-between items-center',
            'mb-[23px]',
          )}
        >
          {children && !isMenuOpen ? (
            children
          ) : (
            <Link
              className="flex flex-row items-start gap-[10px]"
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image src="/icons/logo.svg" width={36} height={35} alt="logo" />
              <div className="text-black text-[29px] font-medium tracking-[-0.58px]">
                Protect
              </div>
            </Link>
          )}
          {isMenuOpen ? (
            <Image
              src="/icons/menu-close.svg"
              width={30}
              height={30}
              alt="close menu"
              className="cursor-pointer opacity-50 hover:opacity-80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          ) : (
            <Image
              src="/icons/menu-hamburger.svg"
              width={30}
              height={30}
              alt="open menu"
              className="cursor-pointer opacity-50 hover:opacity-80"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          )}
        </div>
        <div
          className={classes(
            'fixed bottom-0',
            isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
            'flex flex-col gap-[48px] pb-[87px]',
            'transition-all origin-top',
          )}
        >
          <NavLink
            href="/about"
            isActive={pathname === '/about'}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink isActive={false} href="https://docs.flashbots.net/flashbots-protect/overview">
            Documentation
          </NavLink>

          <NavLink
            href="/"
            isActive={pathname !== '/about'}
            onClick={() => setIsMenuOpen(false)}
          >
            Protect
          </NavLink>
        </div>
      </div>
    </div>
  );
};
