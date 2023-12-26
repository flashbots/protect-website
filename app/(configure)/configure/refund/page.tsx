'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { clickableClasses } from '@/components/buttons/styling';
import { DescriptionPanel } from '@/components/description/DescriptionPanel';
import { StatusBar } from '@/components/description/StatusBar';
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

  return (
    <>
      <DescriptionPanel
        title="Refunds"
        dots={{
          activeIndex: 2,
          totalDots: 4,
        }}
        backHref={backToSummary ? '/summary' : '/configure/privacy'}
        bottomBar={<StatusBar status={speedScore}>Inclusion Speed</StatusBar>}
      >
        <DescriptionText>
          Protect will refund you if your transaction leaks any value. You can
          keep this refund, or use it to pay for your transaction to be
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

      <div
        className={classes('flex flex-col grow pt-[18px] px-[20px] pb-[19px]')}
      >
        <FormHint className="mb-[12px]">Select refund share</FormHint>
        <div className="grow relative">
          <div className="w-full h-[33px] relative">
            <div
              className={classes(
                'w-full h-[4px] rounded-[2px] bg-black bg-opacity-10',
                'absolute top-1/2 -translate-y-1/2',
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
              '[&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none ',
              '[&::-webkit-slider-thumb]:w-[60px] [&::-moz-range-thumb]:w-[60px]',
              '[&::-webkit-slider-thumb]:h-[33px] [&::-moz-range-thumb]:h-[33px]',
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
          {(refundAddress || refundShare !== defaultRefundShare) && (
            <>
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
            </>
          )}
        </div>
        <Button
          className="mt-[32px]"
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
      </div>
    </>
  );
}
