import Link from 'next/link';

import { classes } from '@/lib/classes';

import { ArrowRight } from '../icons/ArrowRight';

export const LearnMore = ({
  href,
  textSize = 19,
  className,
}: {
  href: string;
  textSize?: number;
  className?: string;
}) => {
  return (
    <Link
      href={href}
      className={classes(
        'text-black font-medium leading-[22px] tracking-[-0.38px] flex flex-row items-center gap-1',
        'group',
        className,
      )}
      target="_blank"
      style={{
        fontSize: `${textSize}px`,
      }}
    >
      <div className="group-hover:underline underline-offset-2">Learn more</div>
      <ArrowRight height={textSize - 5} />
    </Link>
  );
};
