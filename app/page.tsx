import Image from 'next/image';

import { classes } from '@/lib/classes';

import { Button } from '../components/buttons/Button';

export default function Home() {
  return (
    <div
      className={classes(
        'w-[715px] h-[422px] bg-black rounded-[10px]',
        'flex flex-row items-center justify-center gap-[29px]',
        'p-[17px] pr-[30px]',
      )}
    >
      <div className="h-full w-[320px] bg-gray-500 rounded-[10px] shrink-0"></div>
      <div
        className={classes(
          'flex flex-col justify-between py-[13px]',
          'grow h-full',
          'text-white',
        )}
      >
        <div>
          <div className="text-[38px] font-medium leading-[41px] mb-[9px] tracking-[-0.76px]">
            A safer way to transact on Ethereum
          </div>
          <div
            className={classes(
              'opacity-80 text-lg leading-[22px] font-normal max-w-[290px] tracking-[-0.36px]',
            )}
          >
            Use Flashbots Protect to protect yourself from frontrunning and earn
            refunds.
          </div>
        </div>
        <div className="leading-[18px]">
          <Button type="primary-white" className="mb-[23px]">
            <Image
              src="/play-icon.svg"
              height={20}
              width={20}
              alt="play"
              className="mr-[6px]"
            />
            Get Protected
          </Button>
          <div className="flex flex-row items-center gap-[21px]">
            <div className="">
              <div className="text-white text-opacity-60 text-[16px] font-normal mb-3 tracking-[-0.32px] leading-[18px]">
                Transactions processed
              </div>
              <div className="text-[25px] font-[500] tracking-[-0.5px] leading-[18px]">
                <span className="opacity-80">&gt;</span>
                <span className="">6.8</span>
                <span className="opacity-80"> million</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-10 w-[1px] h-[59px]"></div>
            <div className="">
              <div className="text-white text-opacity-60 text-[16px] font-normal mb-3 tracking-[-0.32px] leading-[18px]">
                Refunds earned
              </div>
              <div>
                <div className="text-[25px] font-[500] tracking-[-0.5px] leading-[18px]">
                  <span className="opacity-80">&gt;</span>
                  <span className="">100</span>
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
