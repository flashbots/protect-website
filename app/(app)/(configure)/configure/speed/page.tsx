'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { clickableClasses } from '@/components/buttons/styling';
import { Checkbox } from '@/components/inputs/Checkbox';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
import { MobilePanel } from '@/components/panels/MobilePanel';
import { DescriptionText } from '@/components/text/DescriptionText';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';
import { useSupportedBuilders } from '@/lib/useSupportedBuilders';
import { alwaysSelectedBuilders, useURLState } from '@/lib/useURLState';

export default function Speed() {
  const supportedBuilders = useSupportedBuilders();
  const [selectAllBuilders, setSelectAllBuilders] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const buildersPerPage = 10; // Adjust based on your UI
  const router = useRouter();
  const { backToSummary, urlParams, builders, setBuilders, fastMode } =
    useURLState();

  useEffect(() => {
    if (fastMode) {
      setSelectAllBuilders(true);
    }
  }, [fastMode]);

  useEffect(() => {
    if (selectAllBuilders) {
      setBuilders(supportedBuilders.map((builder) => builder.name));
    }
  }, [selectAllBuilders, supportedBuilders, setBuilders]);

  // Calculate the total number of pages
  const totalPages =
    supportedBuilders.length > 0
      ? Math.ceil(supportedBuilders.length / buildersPerPage)
      : 1;

  // Slice the supportedBuilders array to only include the builders for the current page
  const currentBuilders = supportedBuilders.slice(
    (currentPage - 1) * buildersPerPage,
    currentPage * buildersPerPage,
  );

  // Function to change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const title = 'Speed';
  const backHref = backToSummary ? '/summary' : '/start';

  return (
    <MobilePanel title={title} backHref={backHref}>
      <DescriptionPanel
        title={title}
        dots={{
          activeIndex: 0,
          totalDots: 4,
        }}
        backHref={backHref}
      >
        <DescriptionText>
          How quickly your transactions are confirmed onchain depends on how
          many builders you share them with.
        </DescriptionText>
        <DescriptionText>
          Select more builders to have your transactions land more quickly.
        </DescriptionText>
        <DescriptionText textOpacityClass="text-opacity-50">
          Note: Transactions are shared no later than one block after they are
          received. When you send your transaction to another builder, you
          entrust them not to frontrun your transaction or disclose it to third
          parties who might.
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
          <Checkbox
            checked={selectAllBuilders}
            onChange={setSelectAllBuilders}
            className="pointer-events-none"
          >
            <div className="text-black text-[20px] font-medium leading-[18px] tracking-[-0.4px] ml-[12px]">
              Send to all builders
            </div>
          </Checkbox>
        </div>
        <div className="grid grid-cols-2 flex-wrap gap-y-[14px] gap-x-[24px] pl-2 h-[188px] pb-[14px]">
          {currentBuilders.map((builder) => (
            <div key={builder.name}>
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
          {/* Render placeholders to ensure consistent height */}
          {Array.from({ length: 10 - currentBuilders.length }, (_, index) => (
            <div
              key={`placeholder-${index}`}
              className="opacity-0 w-full h-[22px]"
            >
              {/* Placeholder with the same styling as builder elements */}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-1 -mt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <div
                key={pageNumber}
                role="button"
                tabIndex={0} // Make it focusable
                aria-label={`Go to page ${pageNumber}`}
                onClick={() => goToPage(pageNumber)}
                onKeyDown={(event) => {
                  // Make it accessible with keyboard
                  if (event.key === 'Enter' || event.key === ' ') {
                    goToPage(pageNumber);
                  }
                }}
                className="w-3 h-5 inline-flex items-center cursor-pointer"
              >
                <div
                  className={`w-3 h-1 rounded-lg ${
                    currentPage === pageNumber
                      ? 'bg-black'
                      : 'bg-black bg-opacity-30'
                  }`}
                />
              </div>
            ),
          )}
        </div>
        <Button
          className="mt-2 sm:mt-3"
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
    </MobilePanel>
  );
}
