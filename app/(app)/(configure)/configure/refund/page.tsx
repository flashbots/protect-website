'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { clickableClasses } from '@/components/buttons/styling';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
import { MobilePanel } from '@/components/panels/MobilePanel';
import { StatusBar } from '@/components/panels/StatusBar';
import { DescriptionText } from '@/components/text/DescriptionText';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';
import { defaultRefundShare, useURLState } from '@/lib/useURLState';

export default function Refund() {
  const router = useRouter();
  const {
    backToSummary,
    urlParams,
    refundShare,
    setRefundShare,
    speedScore,
    refundAddress,
    setRefundAddress,
  } = useURLState();

  const title = 'Refunds';
  const backHref = backToSummary ? '/summary' : '/configure/privacy';

  return (
    <MobilePanel title={title} backHref={backHref}>
      <DescriptionPanel
        title={title}
        backHref={backHref}
        dots={{
          activeIndex: 2,
          totalDots: 4,
        }}
        bottomBar={<StatusBar status={speedScore}>Inclusion Speed</StatusBar>}
      >
        <DescriptionText>
          Protect will refund you if your transaction generates any value. You
          can keep this refund, or use it to pay for your transaction to be
          confirmed onchain more quickly.
        </DescriptionText>
        <DescriptionText className="inline">
          Your refund share determines how much of the refund you keep.
        </DescriptionText>
        <DescriptionText textOpacityClass="text-opacity-50" className="inline">
          {' '}
          For faster transactions, choose a lower refund share.
        </DescriptionText>
        <LearnMore
          href="https://docs.flashbots.net/flashbots-protect/mev-share#refunds"
          className="mt-[11px]"
        />
      </DescriptionPanel>

      <ActionPanel>
        <FormHint className="mb-[12px]">Select refund share</FormHint>
        <div className="grow relative mb-[40px]">
          <div className="w-full h-[33px] relative">
            <div
              className={classes(
                'w-[calc(100%-16px)] h-[4px] rounded-[2px] bg-black bg-opacity-10',
                'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
                'z-0',
              )}
            ></div>
            <div
              className={classes(
                'absolute',
                'w-fit h-[33px] bg-white rounded-md border-2 border-black bg-opacity-100',
                'z-20',
                'leading-[31px] text-[23px] font-medium tracking-[-0.46px]',
                'px-2 flex flex-row items-center',
                'pointer-events-none select-none cursor-pointer',
              )}
              style={{
                left: `${refundShare}%`,
                transform: `translateX(${-refundShare}%)`,
              }}
            >
              {refundShare}%
            </div>
          </div>
          <input
            type="range"
            className={classes(
              'w-full h-[33px]',
              'appearance-none',
              'absolute top-0',
              'bg-transparent',
              '[&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none',
              '[&::-webkit-slider-thumb]:w-[60px] [&::-moz-range-thumb]:w-[60px]',
              '[&::-webkit-slider-thumb]:h-[33px] [&::-moz-range-thumb]:h-[33px]',
              '[&::-webkit-slider-thumb]:rounded-md [&::-moz-range-thumb]:rounded-md',
              '[&::-webkit-slider-thumb]:bg-transparent [&::-moz-range-thumb]:bg-transparent',
              '[&::-webkit-slider-thumb]:shadow-none [&::-moz-range-thumb]:shadow-none',
              '[&::-webkit-slider-thumb]:ring-0 [&::-moz-range-thumb]:ring-0',
              'cursor-pointer',
            )}
            value={refundShare}
            onChange={(e) => {
              setRefundShare(Number(e.target.value));
            }}
            min={0}
            max={100}
            step={1}
          ></input>
          <div className="flex flex-row justify-between text-[20px] tracking-[-0.4px] opacity-50 leading-[18px] px-[8px]">
            <div>0%</div>
            <div>100%</div>
          </div>

          <div
            className={classes(
              refundAddress || refundShare !== defaultRefundShare
                ? 'opacity-1 visible'
                : 'opacity-0 invisible',
            )}
          >
            <FormHint className="mt-[12px] mb-[6px]">
              Enter refund address
            </FormHint>
            <input
              type="text"
              value={refundAddress}
              onChange={(e) => {
                setRefundAddress(e.target.value);
              }}
              className={classes(
                'w-full h-[42px] border border-black border-opacity-10 rounded-[8px]',
                'p-[10px]',
                clickableClasses,
                'cursor-pointer',
              )}
              placeholder="0x..."
            ></input>
          </div>
        </div>
        <Button
          className="mt-[17px] sm:mt-[32px]"
          onClick={() => {
            if (refundShare !== defaultRefundShare && !refundAddress) {
              alert('Please enter your refund address');
              return;
            }
            router.push(`/summary?${urlParams}`);
          }}
        >
          Confirm
        </Button>
      </ActionPanel>
    </MobilePanel>
  );
}
