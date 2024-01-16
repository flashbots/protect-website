import Image from 'next/image';

import { classes } from '@/lib/classes';

import { Button } from '../../components/buttons/Button';

export default function Home() {
  return (
    <div
      className={classes(
        'sm:w-[715px] sm:h-[422px] bg-black rounded-[10px]',
        'flex flex-col sm:flex-row',
        'items-center justify-start',
        'gap-[15px] sm:gap-[29px]',
        'p-[17px] sm:pr-[30px]',
        'h-full max-h-[553px]',
      )}
    >
      <div
        className={classes(
          'grow sm:h-full',
          'w-full sm:w-[320px]',
          'bg-black overflow-hidden rounded-[10px] shrink-0 relative',
          'border border-white border-opacity-20',
        )}
      >
        <Image
          src="/animation.gif"
          alt="animation"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
      <div
        className={classes(
          'flex flex-col justify-between sm:py-[13px] gap-[21px]',
          'sm:grow sm:h-full',
          'text-white',
          'px-[7px] sm:p-0',
        )}
      >
        <div>
          <div className="text-[38px] font-medium leading-[41px] mb-[9px] tracking-[-0.76px]">
            A safer way to transact on Ethereum
          </div>
          <div
            className={classes(
              'opacity-80 text-lg leading-[22px] font-normal sm:max-w-[290px] tracking-[-0.36px]',
            )}
          >
            Use Flashbots Protect to protect yourself from frontrunning and earn
            refunds.
          </div>
        </div>
        <div className="leading-[18px]">
          <Button
            type="primary-white"
            className="mb-[17px] sm:mb-[23px]"
            href={'/start'}
          >
            <Image
              src="/icons/play-icon.svg"
              height={20}
              width={20}
              alt="play"
              className="mr-[6px]"
              sizes="(max-width: 728px) 100vw, 320px"
            />
            Get protected
          </Button>
          <div className="flex flex-row items-center gap-[21px]">
            <div className="flex-1">
              <div className="text-white text-opacity-60 text-[16px] font-normal mb-3 tracking-[-0.32px] leading-[18px]">
                Transactions&nbsp;processed
              </div>
              <div className="text-[25px] font-[500] tracking-[-0.5px] leading-[18px]">
                <span className="hidden sm:inline opacity-80">&gt;</span>
                <span className="inline sm:hidden opacity-80">Over&nbsp;</span>
                <span className="">6.8&nbsp;</span>
                <span className="opacity-80">million</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 w-[1px] h-[59px]"></div>
            <div className="flex-1">
              <div className="text-white text-opacity-60 text-[16px] font-normal mb-3 tracking-[-0.32px] leading-[18px]">
                Refunds&nbsp;earned
              </div>
              <div>
                <div className="text-[25px] font-[500] tracking-[-0.5px] leading-[18px]">
                  <span className="hidden sm:inline opacity-80">&gt;</span>
                  <span className="inline sm:hidden opacity-80">
                    Over&nbsp;
                  </span>
                  <span className="">190&nbsp;</span>
                  <span className="opacity-80">ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
