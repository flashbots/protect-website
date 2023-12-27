import Image from 'next/image';
import Link from 'next/link';

import { BigBlackButton } from '@/components/buttons/BigBlackButton';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
import { DescriptionText } from '@/components/text/DescriptionText';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';

export default function Start() {
  return (
    <>
      <DescriptionPanel
        title="Get started"
        dots={{
          activeIndex: 0,
          totalDots: 2,
        }}
        backHref="/"
      >
        <DescriptionText>
          Flashbots Protect lets you control how your transactions are
          processed. You can choose how to prioritize speed, cost, and privacy.
        </DescriptionText>
        <DescriptionText textOpacityClass="text-opacity-50">
          You can always change this later.
        </DescriptionText>
      </DescriptionPanel>

      <ActionPanel
        backgroundClass={classes(
          // Color = Color * alpha + Background * (1 - alpha);
          // rgba(217, 217, 217, 0.2) => rgba(247, 247, 247)
          'bg-[rgba(247,247,247)]',
        )}
      >
        <FormHint className="mb-[14px] hidden sm:flex">
          Select setup mode
        </FormHint>

        <Link href="/summary?fast=true">
          <BigBlackButton className="mb-[15px]">
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
          </BigBlackButton>
        </Link>

        <Link href="/configure/speed">
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
        </Link>
      </ActionPanel>
    </>
  );
}
