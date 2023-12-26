import { classes } from '@/lib/classes';

export interface Status {
  lightColor: StatusLightColor;
  text: string;
}

export enum StatusLightColor {
  Gray = 'bg-[#A8A8A8]',
  Green = 'bg-[#00BE57]',
  Red = 'bg-[#FF4949]',
  Yellow = 'bg-[#FFC93A]',
}

export const StatusLight = ({
  size = 7,
  color,
}: {
  size?: number;
  color: StatusLightColor;
}) => {
  return (
    <div
      className={classes('rounded-full', 'transition-all', color)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
};
