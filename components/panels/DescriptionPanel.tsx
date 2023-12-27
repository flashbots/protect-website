'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

import { classes } from '@/lib/classes';

import { BackButton } from '../buttons/BackButton';

export const DescriptionPanel = ({
  title,
  dots,
  children,
  bottomBar,
  backHref,
}: {
  title: string;
  dots: {
    activeIndex: number;
    totalDots: number;
  };
  children: ReactNode;
  bottomBar?: ReactNode;
  backHref?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollable, setScrollable] = useState(true);

  useEffect(() => {
    // when scrolled, set scroll position
    const onScroll = () => {
      if (scrollRef.current) {
        // scroll position as a percentage of the total scroll height
        setScrollPosition(
          scrollRef.current.scrollTop /
            (scrollRef.current.scrollHeight - scrollRef.current.clientHeight),
        );
      }
    };
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', onScroll);
      setScrollable(currentRef.scrollHeight > currentRef.clientHeight);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div
      className={classes(
        'bg-white',
        'w-full sm:w-[333px] h-full',
        'border-black border-opacity-15 sm:border-opacity-10',
        'border sm:border-r sm:border-0',
        'sm:shrink-0',
        'flex flex-col justify-between',
        'shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)] sm:shadow-none',
        'rounded-[10px] sm:rounded-none',
        'overflow-hidden',
      )}
    >
      <div className="relative overflow-hidden flex w-full h-full">
        <div className="overflow-scroll w-full flex flex-col" ref={scrollRef}>
          {/* title bar */}
          <div
            className={classes(
              'bg-white p-[22px] pb-[17px] sticky top-0',
              'flex flex-row items-center justify-between',
              'border-b border-black transition-all duration-300',
              scrollPosition > 0 ? 'border-opacity-10' : 'border-opacity-0',
              'z-50',
            )}
          >
            <div className="flex flex-row items-center gap-[14px]">
              <BackButton href={backHref} />
              <div className="text-black text-[26px] font-medium leading-[33px] tracking-[-0.52px]">
                {title}
              </div>
            </div>
            <div className="flex flex-row gap-[6px]">
              {Array.from({ length: dots.totalDots }, (_, i) => (
                <div
                  className={classes(
                    'rounded-full w-[8px] h-[8px]',
                    i === dots.activeIndex ? 'bg-black' : 'bg-[#DADADA]',
                  )}
                  key={i}
                ></div>
              ))}
            </div>
          </div>
          {/* description text */}
          <div className="p-[22px] pt-0 pl-[29px] grow">{children}</div>
          <div
            className={classes(
              'h-[50px] bg-gradient-to-b from-transparent transition-all',
              scrollPosition < 1 && scrollable ? 'to-white' : 'to-transparent',
              'pointer-events-none',
              'absolute bottom-0 left-0 right-0 z-20',
            )}
          ></div>
        </div>
      </div>
      {bottomBar}
    </div>
  );
};
