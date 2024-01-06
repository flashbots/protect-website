import Image from 'next/image';
import Link from 'next/link';

import { BigBlackButton } from '@/components/buttons/BigBlackButton';
import { ArrowRight } from '@/components/icons/ArrowRight';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
import { MobilePanel } from '@/components/panels/MobilePanel';
import { DescriptionText } from '@/components/text/DescriptionText';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';

export default function Start() {
  const title = 'Get started';
  const backHref = '/';

  return (
    <MobilePanel title={title} backHref={backHref}>
      <DescriptionPanel
        title={title}
        backHref={backHref}
        dots={{
          activeIndex: 0,
          totalDots: 2,
        }}
      >
        <DescriptionText>
          Flashbots Protect lets you control how your transactions are
          processed. You can choose how to prioritize speed, privacy and
          refunds.
        </DescriptionText>
        <DescriptionText textOpacityClass="text-opacity-50">
          You can always change this later.
        </DescriptionText>
      </DescriptionPanel>

      <ActionPanel
        backgroundClass={classes(
          // Color = Color * alpha + Background * (1 - alpha);
          // rgba(217, 217, 217, 0.2) => rgba(247, 247, 247)
          'sm:bg-[rgba(247,247,247)]',
          'bg-white',
        )}
        borderClass="border-0"
      >
        <FormHint className="mb-[14px] hidden sm:flex">
          Select setup mode
        </FormHint>

        <Link href="/summary?fast=true">
          <BigBlackButton
            className="mb-[15px]"
            paddingClassName="pt-[24px] px-[25px] pb-[21px] sm:p-[20px] sm:pb-[15px]"
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
          </BigBlackButton>
        </Link>

        <Link href="/configure/speed">
          <div
            className={classes(
              'bg-white rounded-[8px]',
              'pt-[24px] px-[25px] pb-[21px] sm:p-[20px] sm:pb-[15px]',
              'border border-black border-opacity-15',
              'flex flex-col justify-between',
              'text-black',
              'group hover:border-opacity-30 cursor-pointer transition-all',
            )}
          >
            <div className="flex flex-row justify-between items-center text-black">
              <Image
                src="/icons/custom-icon.svg"
                alt="custom"
                height={24}
                width={24}
              />
              <ArrowRight />
            </div>
            <div className="text-black text-[29px] font-medium leading-[18px] tracking-[-0.58px] mt-[24px] mb-[8px]">
              Custom
            </div>
            <div className="opacity-80 text-black text-base font-normal leading-[22px] tracking-[-0.32px] ">
              For users with unique needs.
            </div>
          </div>
        </Link>
      </ActionPanel>
    </MobilePanel>
  );
}
