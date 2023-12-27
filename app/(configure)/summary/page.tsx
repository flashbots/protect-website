'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BigBlackButton } from '@/components/buttons/BigBlackButton';
import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { clickableClasses } from '@/components/buttons/styling';
import { StatusLight } from '@/components/icons/StatusLight';
import { ActionPanel } from '@/components/panels/ActionPanel';
import { DescriptionPanel } from '@/components/panels/DescriptionPanel';
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
      text: 'Inclusion Speed',
      url: '/configure/refund',
      status: speedScore,
    },
    {
      text: 'Refund Likelihood',
      url: '/configure/privacy',
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

  // turn off because we don't have user address for refund and user cannot change refund likelihood (?)
  // does fast mode increase refund likelihood?
  // const supportedBuilders = useSupportedBuilders();
  // useEffect(() => {
  //   if (fastMode) {
  //     // default refund is 50%
  //     setRefundShare(50);
  //     // default builders are all
  //     setBuilders(
  //       supportedBuilders.map((builder) => builder.name) ||
  //         alwaysSelectedBuilders,
  //     );
  //   }
  // }, [fastMode, setRefundShare, setBuilders, supportedBuilders]);

  return (
    <>
      <DescriptionPanel
        title="Summary"
        dots={{
          activeIndex: fastMode ? 1 : 3,
          totalDots: fastMode ? 2 : 4,
        }}
        backHref={fastMode ? 'start' : '/configure/refund'}
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
                <Link href={`${url}?${urlParams}&fromSummary=true`} key={index}>
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
      >
        <BigBlackButton
          className="flex flex-row justify-center items-center gap-[10px]"
          paddingClassName="py-[10px] sm:py-[26px]"
          onClick={() => {
            const provider = (window as any).ethereum;
            if (provider) {
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
                .catch((error: any) => {
                  alert(`addChain failed: ${error}`);
                });
            } else {
              alert('Metamask not found');
            }
          }}
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
        </BigBlackButton>

        <div className="flex flex-row items-center gap-[7.5px] my-[11px] sm:my-[6px]">
          <div className="grow border-b-[1px] h-1 border-b-black border-opacity-10"></div>
          <div className="text-black text-opacity-50 text-base font-normal tracking-[-0.32px]">
            or
          </div>
          <div className="grow border-b-[1px] h-1 border-b-black border-opacity-10"></div>
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
            If your wallet allows you to enter a custom RPC endpoint, please use
            the URL below.
          </div>
          <LearnMore
            href="https://flashbots.notion.site/Protect-Wallet-Guide-a929230357b64d9aaf66d2edc8b2dd5c"
            textSize={16}
          />
          <Button
            type="secondary"
            className="mt-[10px] active:border-t-[3px]"
            onClick={() =>
              navigator.clipboard.writeText(constructRpcUrl().toString())
            }
          >
            <Image src="/icons/copy.svg" height={16} width={15} alt="copy" />
            <div className="text-black text-base font-medium tracking-[-0.32px] leading-[33px] ml-[8px]">
              Copy your RPC URL
            </div>
          </Button>
        </div>
      </ActionPanel>
    </>
  );
}
