'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BigBlackButton } from '@/components/buttons/BigBlackButton';
import { Button } from '@/components/buttons/Button';
import { clickableClasses } from '@/components/buttons/styling';
import { Check } from '@/components/icons/Check';
import { StatusLight } from '@/components/icons/StatusLight';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
import { MobilePanel } from '@/components/panels/MobilePanel';
import { classes } from '@/lib/classes';
import { useURLState } from '@/lib/useURLState';

const RPC_FLASHBOTS_NET = 'https://rpc.flashbots.net';
const ETH_CHAIN_ID = '0x1';
const ETH_CHAIN_NAME = 'Ethereum Mainnet';

export default function Summary() {
  const {
    fastMode,
    urlParams,
    speedScore,
    refundScore,
    privacyScore,
    // setRefundShare,
    // setBuilders,
  } = useURLState();

  const summaryScores = [
    {
      text: 'Privacy',
      url: '/configure/privacy',
      status: privacyScore,
    },
    {
      text: 'Speed',
      url: '/configure/speed',
      status: speedScore,
    },
    {
      text: 'Refund Likelihood',
      url: '/configure/refund',
      status: refundScore,
    },
  ];

  const constructRpcUrl = () => {
    const rpcUrl = new URL(RPC_FLASHBOTS_NET);

    if (fastMode) {
      rpcUrl.pathname += 'fast';
    } else {
      rpcUrl.search = urlParams || '';
    }

    return rpcUrl;
  };

  const title = 'Summary';
  const backHref = fastMode ? 'start' : '/configure/refund';

  // added indicator
  const [addedToMetamask, setAddedToMetamask] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  useEffect(() => {
    // after 10 seconds, reset the added indicator
    if (addedToMetamask) {
      const timeout = setTimeout(() => setAddedToMetamask(false), 10000);
      return () => clearTimeout(timeout);
    }
    if (copiedToClipboard) {
      const timeout = setTimeout(() => setCopiedToClipboard(false), 2500);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [addedToMetamask, copiedToClipboard]);

  // troubleshooting popup
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  return (
    <MobilePanel title={title} backHref={backHref}>
      <DescriptionPanel
        title={title}
        backHref={backHref}
        dots={{
          activeIndex: fastMode ? 1 : 3,
          totalDots: fastMode ? 2 : 4,
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div
            className={classes(
              'border border-black sm:border-opacity-10 sm:p-[16px] sm:rounded-[12px]',
              'flex flex-col gap-[9px]',
              'border-opacity-0 p-0 rounded-0',
              'ml-[-7px]',
            )}
          >
            {summaryScores.map(({ text, status, url }, index) => {
              return (
                <Link
                  href={`${url}?${urlParams}&fromSummary=true&fast=${!!fastMode}`}
                  key={index}
                >
                  <div
                    className={classes(
                      'border border-black border-opacity-10 px-[17px] rounded-[12px]',
                      'h-[47px] shrink-0',
                      'flex flex-row items-center justify-between',
                      clickableClasses,
                    )}
                  >
                    <div
                      className={classes(
                        'text-black text-base font-normal leading-[33px] tracking-[-0.32px]',
                        'transition-all opacity-50 group-hover:opacity-80',
                      )}
                    >
                      {text}
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <StatusLight color={status.lightColor} />
                      <div className="text-right text-black text-[24px] font-medium">
                        {status.text}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            className={classes(
              'opacity-50 text-center marker:text-black text-sm font-normal tracking-[-0.28px] leading-[18px]',
              'mt-[11px]',
            )}
          >
            By adding Flashbots Protect to your wallet, you agree to the Terms
            and Conditions outlined&nbsp;
            <Link
              href="https://docs.flashbots.net/policies/terms-of-service"
              className="underline"
              target="_blank"
            >
              here
            </Link>
            .
          </div>
        </div>
      </DescriptionPanel>

      <ActionPanel
        backgroundClass={classes(
          // Color = Color * alpha + Background * (1 - alpha);
          // rgba(217, 217, 217, 0.2) => rgba(247, 247, 247)
          'bg-white sm:bg-[rgba(247,247,247)]',
        )}
        borderClass="border-0"
      >
        <BigBlackButton
          forceSquares
          className="relative h-[58px] sm:h-[91px]"
          paddingClassName="py-[10px] sm:py-[26px]"
          disabled={addedToMetamask}
          onClick={() => {
            const provider = (window as any).ethereum;
            if (provider && provider.isMetaMask) {
              const addChainParams = {
                chainId: ETH_CHAIN_ID,
                chainName: `Flashbots Protect (${ETH_CHAIN_NAME})`,
                iconUrls: ['https://docs.flashbots.net/img/logo.png'],
                nativeCurrency: {
                  name: 'Ethereum',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [constructRpcUrl().toString()],
              };
              // do it manually with window.ethereum
              provider
                .request({
                  method: 'wallet_addEthereumChain',
                  params: [addChainParams],
                })
                .then((res: any) => {
                  // metamask will return null if chain is added
                  if (res === null) {
                    setAddedToMetamask(true);
                  }
                })
                .catch((error: any) => {
                  // ignore 4001 "user rejected request" error code
                  if (error.code !== 4001) {
                    console.error(error);
                    alert(`Error ${error.code}: ${error.message}`);
                  }
                });
            } else {
              alert(
                'Metamask not found. Check if you have installed the Metamask browser extension. If you are on a mobile device, try switching to desktop.',
              );
            }
          }}
        >
          <div
            className={classes(
              'w-full',
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              'flex flex-row justify-center items-center gap-[6px]',
              'transition-all duration-500',
              addedToMetamask ? 'opacity-100 delay-500' : 'opacity-0 delay-0',
            )}
          >
            <Check size={38} color={'#0BDA51'} />
            <div
              className={classes(
                'text-white font-medium leading-[33px]',
                'text-[24px] sm:text-[27px]',
                'tracking-[-0.48px] sm:tracking-[-0.54px]',
              )}
            >
              Added to Metamask
            </div>
          </div>
          <div
            className={classes(
              'w-full',
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              'flex flex-row justify-center items-center gap-[10px]',
              'transition-all duration-500',
              addedToMetamask ? 'opacity-0 delay-0' : 'opacity-100 delay-500',
            )}
          >
            <Image
              src="/icons/metamask.png"
              height={38}
              width={38}
              alt="metamask"
              className="scale-90 sm:scale-100"
            />
            <div
              className={classes(
                'text-white font-medium leading-[33px]',
                'text-[24px] sm:text-[27px]',
                'tracking-[-0.48px] sm:tracking-[-0.54px]',
              )}
            >
              Add to Metamask
            </div>
          </div>
        </BigBlackButton>

        <div className="flex flex-row items-center gap-[7.5px] my-[11px]">
          <div className="grow border-b-[1px] h-1 border-b-black border-opacity-10"></div>
          <div
            className={classes(
              'text-black',
              'opacity-50 hover:opacity-75 cursor-pointer transition-all',
              'text-base font-normal tracking-[-0.32px] flex flex-row items-center',
              'leading-[33px]',
            )}
            onClick={() => setShowTroubleshooting(true)}
          >
            <Image
              src="/icons/question.svg"
              height={20}
              width={20}
              alt="metamask"
              className="mr-[7.25px]"
            />
            I&rsquo;m having issues
          </div>
          <div className="grow border-b-[1px] h-1 border-b-black border-opacity-10"></div>
        </div>
        <div
          className={classes(
            'fixed sm:absolute',
            'w-full top-0 left-0',
            'transform sm:transition-transform transition-colors duration-[50s]',
            showTroubleshooting ? 'translate-y-0' : 'translate-y-full',
            'h-dvh sm:h-full',
            'p-[19px]',
            'flex flex-col justify-end',
            'z-50',
            'bg-black sm:bg-transparent bg-opacity-10',
          )}
        >
          <div
            className={classes(
              'w-full',
              'bg-white rounded-[10px] border border-black border-opacity-20',
              'shadow sm:shadow-none',
              'px-[23px] py-[17px]',
              'transition-all sm:transition-none',
              showTroubleshooting
                ? 'translate-y-0'
                : 'translate-y-full sm:translate-y-0',
            )}
          >
            <div
              className={classes(
                'text-black font-medium mb-[9px] tracking-[-2%]',
                'text-[30px] sm:text-[24px]',
                'leading-[33px] sm:leading-[27px]',
              )}
            >
              Troubleshooting
            </div>
            <div
              className={classes(
                'opacity-75 text-black font-normal tracking-[-2%] mb-[32px]',
                'text-[19px] sm:text-[16px]',
                'leading-[22px] sm:leading-[19px]',
              )}
            >
              If you aren&apos;t prompted to add Protect to your wallet, you may
              already have added it. If not, try following the guide to add
              Protect manually, or reinstall the Metamask extension if you
              continue to have issues.
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="flex-1">
                <Button
                  type={'primary-black'}
                  onClick={() => setShowTroubleshooting(false)}
                >
                  Close
                </Button>
              </div>
              <div className="flex-1">
                <Button
                  type={'tertiary'}
                  href="https://flashbots.notion.site/Protect-Wallet-Guide-a929230357b64d9aaf66d2edc8b2dd5c"
                  target="_blank"
                >
                  View guide
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={classes(
            'bg-white border-black border-[1.5px] border-opacity-10',
            'rounded-[9px]',
            'px-[18px] pt-[10px] pb-[16px]',
          )}
        >
          <div className="text-black text-[21px] font-medium tracking-[-0.42px] leading-[33px]">
            Other wallets
          </div>
          <div className="opacity-50 text-black text-base font-normal tracking-[-0.32px] leading-[19px] mb-[8px]">
            For wallets besides Metamask, follow the help guide below.
          </div>
          <Button
            type="secondary"
            className="mt-[10px] active:border-t-[3px]"
            href="https://flashbots.notion.site/Protect-Wallet-Guide-a929230357b64d9aaf66d2edc8b2dd5c"
            target="_blank"
          >
            <Image src="/icons/book.svg" height={18} width={18} alt="copy" />
            <div className="text-black text-base font-medium tracking-[-0.32px] leading-[33px] ml-[8px]">
              Help guide
            </div>
          </Button>
          <Button
            type="secondary"
            className="mt-[10px] active:border-t-[3px]"
            onClick={() => {
              navigator.clipboard.writeText(constructRpcUrl().toString());
              setCopiedToClipboard(true);
            }}
          >
            <Image src="/icons/copy.svg" height={16} width={15} alt="copy" />
            <div
              className={classes(
                `text-black text-base font-medium tracking-[-0.32px] leading-[33px] ml-[8px]`,
                copiedToClipboard ? `hidden` : `visible opacity-100`,
              )}
            >
              Copy RPC URL
            </div>
            <div
              className={classes(
                `text-black text-base font-medium tracking-[-0.32px] leading-[33px] ml-[8px]`,
                copiedToClipboard ? `visible opacity-50 delay-500` : `hidden`,
              )}
            >
              Copied!
            </div>
          </Button>
        </div>
      </ActionPanel>
    </MobilePanel>
  );
}
