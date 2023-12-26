'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { DescriptionPanel } from '@/components/description/DescriptionPanel';
import { StatusBar } from '@/components/description/StatusBar';
import { Checkbox } from '@/components/inputs/Checkbox';
import { RadioOption } from '@/components/inputs/RadioOption';
import { DescriptionText } from '@/components/text/DescriptionText';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';
import { alwaysSelectedHints, Hints, useURLState } from '@/lib/useURLState';

const hintOptions = [
  { value: Hints.logs, name: 'All logs' },
  { value: Hints.defaultLogs, name: 'Default Logs' },
  { value: Hints.contractAddress, name: 'Contract' },
  { value: Hints.hash, name: 'Hash' },
  { value: Hints.calldata, name: 'Calldata' },
  { value: Hints.functionSelector, name: 'Function Selector' },
];

export default function Privacy() {
  const router = useRouter();

  const { backToSummary, urlParams, hints, setHints, refundScore } =
    useURLState();

  return (
    <>
      <DescriptionPanel
        title="Privacy"
        dots={{
          activeIndex: 1,
          totalDots: 4,
        }}
        backHref={backToSummary ? '/summary' : '/configure/speed'}
        bottomBar={
          <StatusBar status={refundScore}>Refund Likelihood</StatusBar>
        }
      >
        <DescriptionText>
          You can control the visibility of your transaction data, and therefore
          your privacy, by choosing to share hints.
        </DescriptionText>
        <DescriptionText>
          If you want to maximize the likelihood of receiving a refund, share
          more hints.
        </DescriptionText>
        <LearnMore href="https://docs.flashbots.net/flashbots-protect/mev-share#hints" />
      </DescriptionPanel>

      <div
        className={classes('flex flex-col grow pt-[18px] px-[20px] pb-[19px]')}
      >
        <FormHint className="mb-[6px]">Select hints to share</FormHint>

        <RadioOption
          checked={
            hints.length === 2 &&
            hints.includes(Hints.hash) &&
            hints.includes(Hints.defaultLogs)
          }
          onChange={(selected) => {
            if (selected) setHints([Hints.hash, Hints.defaultLogs]);
          }}
          className="mb-[10px]"
        >
          <Image src="/icons/star.svg" height={20} width={20} alt="question" />
          <div className="text-black text-[20px] font-medium leading-[33px] tracking-[-0.4px] ml-[8px]">
            Default set
          </div>
        </RadioOption>

        <RadioOption
          checked={hints.length === 1 && hints[0] === Hints.hash}
          onChange={(selected) => {
            if (selected) setHints([Hints.hash]);
          }}
          className="mb-[10px]"
        >
          <Image
            src="/icons/private.svg"
            height={20}
            width={20}
            alt="question"
          />
          <div className="text-black text-[20px] font-medium leading-[33px] tracking-[-0.4px] ml-[8px]">
            Full privacy
          </div>
        </RadioOption>

        <div className="flex flex-col flex-wrap gap-y-[14px] gap-x-[24px] overflow-scroll mt-[42px]">
          {hintOptions.map((hint) => (
            <div key={hint.value}>
              <Checkbox
                checked={hints.includes(hint.value)}
                onChange={(checked) => {
                  if (checked) {
                    // contract address is always shared if function selector is chosen
                    if (hint.value === Hints.functionSelector) {
                      setHints((prev) =>
                        Array.from(
                          new Set([
                            ...prev,
                            Hints.functionSelector,
                            Hints.contractAddress,
                          ]),
                        ),
                      );
                    } else if (hint.value === Hints.calldata) {
                      // contract address and function selector are always shared if calldata is chosen
                      setHints((prev) =>
                        Array.from(
                          new Set([
                            ...prev,
                            Hints.calldata,
                            Hints.contractAddress,
                            Hints.functionSelector,
                          ]),
                        ),
                      );
                    } else if (hint.value === Hints.logs) {
                      // default logs are always shared if all logs are shared
                      setHints((prev) =>
                        Array.from(
                          new Set([...prev, Hints.logs, Hints.defaultLogs]),
                        ),
                      );
                    } else {
                      setHints((prev) => [...prev, hint.value]);
                    }
                  } else {
                    setHints((prev) =>
                      prev.filter((name) => name !== hint.value),
                    );
                  }
                }}
                disabled={
                  alwaysSelectedHints.includes(hint.value) ||
                  // contract address is always shared if function selector is chosen
                  (hint.value === Hints.contractAddress &&
                    hints.includes(Hints.functionSelector)) ||
                  // contract address and function selector are always shared if calldata is chosen
                  ((hint.value === Hints.contractAddress ||
                    hint.value === Hints.functionSelector) &&
                    hints.includes(Hints.calldata)) ||
                  // default logs are always shared if all logs are shared
                  (hint.value === Hints.defaultLogs &&
                    hints.includes(Hints.logs))
                }
              >
                <div
                  className={classes(
                    'text-black text-[18px] font-normal leading-[22px] tracking-[-0.32px] ml-[9px]',
                    hints.includes(hint.value) ? 'opacity-100' : 'opacity-50',
                  )}
                >
                  {hint.name}
                </div>
              </Checkbox>
            </div>
          ))}
        </div>

        <Button
          className="mt-[32px]"
          onClick={() => {
            router.push(
              backToSummary
                ? `/summary?${urlParams}`
                : `/configure/refund?${urlParams}`,
            );
          }}
        >
          Confirm
        </Button>
      </div>
    </>
  );
}
