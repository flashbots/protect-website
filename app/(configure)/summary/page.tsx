'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BigBlackButton } from '@/components/buttons/BigBlackButton';
import { Button } from '@/components/buttons/Button';
import { LearnMore } from '@/components/buttons/LearnMore';
import { clickableClasses } from '@/components/buttons/styling';
import { DescriptionPanel } from '@/components/description/DescriptionPanel';
import { StatusLight } from '@/components/icons/StatusLight';
import { classes } from '@/lib/classes';
import { useURLState } from '@/lib/useURLState';

const RPC_FLASHBOTS_NET = 'https://rpc.flashbots.net';
const ETH_CHAIN_ID = '0x1';
const ETH_CHAIN_NAME = 'Ethereum Mainnet';

export default function Summary() {
  const { fastMode, urlParams, speedScore, refundScore, privacyScore } =
    useURLState();

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
        <div
          className={classes(
            'border border-black border-opacity-10 p-[16px] rounded-[12px]',
            'flex flex-col gap-[9px]',
          )}
        >
          {summaryScores.map(({ text, status, url }, index) => (
            <Link href={`${url}?${urlParams}&fromSummary=true`} key={index}>
              <div
                className={classes(
                  'border border-black border-opacity-10 px-[17px] py-[7px] rounded-[12px]',
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
          ))}
        </div>
      </DescriptionPanel>

      <div
        className={classes(
          'flex flex-col grow bg-[#D9D9D9] bg-opacity-20 pt-[20px] px-[22px] gap-[8px]',
        )}
      >
        <BigBlackButton
          className="flex flex-row justify-center items-center gap-[10px]"
          paddingClassName="px-[33px] py-[26px]"
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
                  console.error('addChain failed', error);
                });
            } else {
              console.error('ethereum provider not found');
            }
          }}
        >
          <Image
            src="/icons/metamask.png"
            height={38}
            width={38}
            alt="metamask"
          />
          <div className="text-white text-[27px] font-medium tracking-[-0.54px] leading-[33px]">
            Add to Metamask
          </div>
        </BigBlackButton>

        <div className="flex flex-row items-center gap-[7.5px]">
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
            'px-[18px] py-[10px]',
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
          <Button type="secondary" className="mt-[10px]">
            <Image src="/icons/copy.svg" height={16} width={15} alt="copy" />
            <div className="text-black text-base font-medium tracking-[-0.32px] leading-[33px] ml-[8px]">
              Copy your RPC URL
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
