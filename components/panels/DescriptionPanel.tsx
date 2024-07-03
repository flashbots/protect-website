'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

import { classes } from '@/lib/classes';

import { PanelTitle } from './PanelTitle';

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
        'border-black border-opacity-10',
        'border-0 sm:border-r',
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
              'hidden sm:flex',
              'bg-white p-[22px] sticky top-0',
              'flex-row items-center justify-between',
              'border-b border-black transition-all duration-300',
              scrollPosition > 0 ? 'border-opacity-10' : 'border-opacity-0',
              'z-50',
            )}
          >
            <PanelTitle title={title} backHref={backHref} />
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
          <div
            className={classes(
              'p-[22px] grow',
              'pb-[11px] sm:pb-[22px]',
              'pt-[22px] sm:pt-0',
            )}
          >
            {children}
          </div>
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
