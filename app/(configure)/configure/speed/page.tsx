import Image from 'next/image';
import Link from 'next/link';

import { LearnMore } from '@/components/buttons/LearnMore';
import { DescriptionPanel } from '@/components/DescriptionPanel';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { DescriptionText } from '@/components/text/DescriptionText';
import { classes } from '@/lib/classes';

export default function Start() {
  return (
    <>
      <DescriptionPanel
        title="Speed"
        dots={{
          activeIndex: 0,
          totalDots: 4,
        }}
      >
        <DescriptionText>
          How quickly your transactions are confirmed onchain is determined by
          how many builders you share your transaction with.
        </DescriptionText>
        <DescriptionText>
          Select more builders to have your transactions land more quickly.
        </DescriptionText>
        <DescriptionText textOpacityClass="text-opacity-50">
          Note: when you send your transaction to a builder, you are entrusting
          them not to frontrun your transaction or disclose it to third parties
          who might.
        </DescriptionText>
        <LearnMore href="/" />
      </DescriptionPanel>

      <div
        className={classes(
          'flex flex-col grow bg-[#D9D9D9] bg-opacity-20 pt-[18px] px-[22px]',
        )}
      >
        <div className="opacity-50 text-black text-[17px] font-normal leading-[33px] tracking-[-0.34px] mx-[6px] mb-[14px]">
          Select setup mode
        </div>

        <Link href="/finalize?fast=true">
          <div
            className={classes(
              'fast-mode-option bg-black rounded-[8px] p-[20px] pb-[15px] mb-[15px]',
              'cursor-pointer transition-all ring-0 hover:ring-2 ring-gray-300',
            )}
          >
            <div className="flex flex-row justify-between items-center text-white">
              <Image
                src="/icons/lightning-icon.svg"
                alt="lightning"
                height={24}
                width={24}
              />
              <ArrowRight />
            </div>
            <div className="text-white text-[29px] font-medium leading-[18px] tracking-[-0.58px] mt-[24px] mb-[8px]">
              Fast
            </div>
            <div className="opacity-80 text-white text-base font-normal leading-[22px] tracking-[-0.32px] ">
              Optimized for speed. Works well for most.
            </div>
          </div>
        </Link>

        <div
          className={classes(
            'bg-white rounded-[8px] pt-[17px] px-[20px] pb-[13px] border border-black border-opacity-15',
            'flex flex-row justify-between items-center',
            'text-black',
            'group hover:border-opacity-30 cursor-pointer transition-all',
          )}
        >
          <div>
            <div className="text-black text-2xl font-medium tracking-[-0.48px] leading-[18px] mb-[6px]">
              Custom
            </div>
            <div className="opacity-80 text-black text-base font-normal tracking-[-0.32px] leading-[22px]">
              For users with unique needs.
            </div>
          </div>
          <ArrowRight className="opacity-30 group-hover:opacity-50 transition-all" />
        </div>
      </div>
    </>
  );
}
