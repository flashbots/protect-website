'use client';

import { usePathname } from 'next/navigation';

import { Nav } from '@/components/nav/Nav';
import { NavLink } from '@/components/nav/NavLink';
import { RefundMetrics } from '@/components/RefundMetrics';
import { classes } from '@/lib/classes';

export function Header() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: Both components centered together */}
      <div className="hidden sm:flex w-full justify-center">
        <div className="flex items-center gap-4 mt-[20px]">
          <div
            className={classes(
              'bg-white border border-black border-opacity-10',
              'rounded-[60px]',
              'flex flex-row items-center justify-between',
              'gap-[16px]',
              'h-[41px]',
              'px-[19px]',
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
            <NavLink
              isActive={false}
              href="https://docs.flashbots.net/flashbots-protect/overview"
            >
              Documentation
            </NavLink>
          </div>
          <RefundMetrics />
        </div>
      </div>

      {/* Mobile: Use existing Nav component */}
      <div className="flex sm:hidden flex-col w-full">
        <Nav />
        <div className="px-[18px] -mt-[13px]">
          <RefundMetrics />
        </div>
      </div>
    </>
  );
}
