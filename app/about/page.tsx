import { Button } from '@/components/buttons/Button';
import { AboutBox } from '@/components/text/AboutBox';
import { classes } from '@/lib/classes';

export default function About() {
  return (
    <div
      className={classes(
        'sm:w-[676px] sm:h-[465px] bg-white rounded-[10px]',
        'border border-black border-opacity-15',
        'shadow-[0px_2px_14px_0px_rgba(0,0,0,0.05)]',
        'flex flex-col',
        'items-center justify-start',
        'pt-[27px] sm:pt-[30px] px-[28px] sm:px-[39px]',
        'pb-[32px]',
        'overflow-scroll sm:overflow-hidden',
      )}
    >
      <div
        className={
          'text-black text-[24px] leading-[24px] tracking-[-0.48px] mb-[7px] font-semibold w-full'
        }
      >
        About Flashbots Protect
      </div>

      <div
        className={classes(
          'flex items-start justify-between',
          'flex-col sm:flex-row',
          'w-full',
          'mb-[18px] sm:mb-[23px]',
        )}
      >
        <div className={'max-w-[415px]'}>
          <div
            className={classes(
              'text-black text-[20px] font-normal',
              'leading-[26px] tracking-[-0.4px]',
              'mb-[18px] sm:mb-0',
            )}
          >
            Flashbots Protect is a user-friendly, secure, and powerful way to
            transact on Ethereum for both novices and sophisticated users.
          </div>
        </div>
        <div className={'w-full sm:w-[134px]'}>
          <Button
            type="primary-black"
            href={'/start'}
            className={'text-[19px] tracking-[-0.38px]'}
          >
            Get Protected
          </Button>
        </div>
      </div>

      <div
        className={classes(
          'flex gap-x-[25px] gap-y-[15px]',
          'flex-col sm:flex-wrap sm:flex-row',
          '',
        )}
      >
        <AboutBox title="No more frontrunning">
          Your transaction is not seen by bots hungry to frontrun you in the
          public transaction pool.
        </AboutBox>
        <AboutBox title="Earn refunds">
          Collect a portion of any extra value you generate when transacting on
          Ethereum
        </AboutBox>
        <AboutBox title="Don’t pay for failures">
          Your transaction is only included if it does not revert. You won’t pay
          if it fails.
        </AboutBox>
        <AboutBox title="Highly configurable">
          You can choose which parties you share your information and
          transactions with
        </AboutBox>
      </div>
    </div>
  );
}
