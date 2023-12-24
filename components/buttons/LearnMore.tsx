import Link from 'next/link';

import { classes } from '@/lib/classes';

import { ArrowRight } from '../icons/ArrowRight';

export const LearnMore = ({ href }: { href: string }) => {
  return (
    <Link
      href={href}
      className={classes(
        'text-black text-[19px] font-medium leading-[22px] tracking-[-0.38px] flex flex-row items-center gap-1',
        'group',
      )}
    >
      <div className="group-hover:underline underline-offset-2">Learn more</div>
      <ArrowRight height={14} />
    </Link>
  );
};
