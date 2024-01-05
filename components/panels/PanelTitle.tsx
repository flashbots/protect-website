import { BackButton } from '../buttons/BackButton';

export const PanelTitle = ({
  title,
  backHref,
}: {
  title: string;
  backHref?: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-[14px]">
      <BackButton href={backHref} />
      <div className="text-black text-[26px] font-medium leading-[33px] tracking-[-0.52px]">
        {title}
      </div>
    </div>
  );
};
