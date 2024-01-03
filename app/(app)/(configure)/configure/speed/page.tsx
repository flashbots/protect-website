'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { clickableClasses } from '@/components/buttons/styling';
import { Checkbox } from '@/components/inputs/Checkbox';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
import { DescriptionText } from '@/components/text/DescriptionText';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';
import { useSupportedBuilders } from '@/lib/useSupportedBuilders';
import { alwaysSelectedBuilders, useURLState } from '@/lib/useURLState';

export default function Speed() {
  const supportedBuilders = useSupportedBuilders();
  const [selectAllBuilders, setSelectAllBuilders] = useState<boolean>(false);
  const router = useRouter();
  const { backToSummary, urlParams, builders, setBuilders } = useURLState();

  useEffect(() => {
    if (selectAllBuilders) {
      setBuilders(supportedBuilders.map((builder) => builder.name));
    }
  }, [selectAllBuilders, supportedBuilders, setBuilders]);

  return (
    <>
      <DescriptionPanel
        title="Speed"
        dots={{
          activeIndex: 0,
          totalDots: 4,
        }}
        backHref={backToSummary ? '/summary' : '/start'}
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
        <LearnMore href="https://docs.flashbots.net/flashbots-protect/mev-share#builders" />
      </DescriptionPanel>

      <ActionPanel>
        <FormHint className="mb-[6px]">Select builders</FormHint>
        <div
          className={classes(
            'flex flex-row items-center justify-between',
            'rounded-[8px] border border-black border-opacity-10 px-[15px]',
            'h-[48px] shrink-0',
            'mb-[22px]',
            clickableClasses,
          )}
          onClick={() => setSelectAllBuilders((prev) => !prev)}
        >
          <Checkbox checked={selectAllBuilders} onChange={setSelectAllBuilders}>
            <div className="text-black text-[20px] font-medium leading-[18px] tracking-[-0.4px] ml-[12px]">
              Send to all builders
            </div>
          </Checkbox>
        </div>
        <div className="flex flex-col flex-wrap gap-y-[14px] gap-x-[24px] overflow-scroll pl-2 min-h-[166px]">
          {supportedBuilders.map((builder) => (
            <div key={builder.name} className="w-[50%]">
              <Checkbox
                checked={builders.includes(builder.name)}
                onChange={(checked) => {
                  if (checked) {
                    setBuilders((prev) => [...prev, builder.name]);
                  } else {
                    setBuilders((prev) =>
                      prev.filter((name) => name !== builder.name),
                    );
                  }
                }}
                disabled={
                  alwaysSelectedBuilders.includes(builder.name) ||
                  selectAllBuilders
                }
              >
                <div
                  className={classes(
                    'text-black text-[18px] font-normal leading-[22px] tracking-[-0.32px] ml-[9px]',
                    builders.includes(builder.name)
                      ? 'opacity-100'
                      : 'opacity-50',
                  )}
                >
                  {builder.name}
                </div>
              </Checkbox>
            </div>
          ))}
        </div>
        <Button
          className="mt-[22px] sm:mt-[32px]"
          onClick={() => {
            router.push(
              backToSummary
                ? `/summary?${urlParams}`
                : `/configure/privacy?${urlParams}`,
            );
          }}
        >
          Confirm
        </Button>
      </ActionPanel>
    </>
  );
}
