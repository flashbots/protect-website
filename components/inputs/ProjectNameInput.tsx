import Image from 'next/image';

import { clickableClasses } from '@/components/buttons/styling';
import { FormHint } from '@/components/text/FormHint';
import { classes } from '@/lib/classes';

interface ProjectNameInputProps {
  value: string;
  onChange: (name: string) => void;
}

export function ProjectNameInput({ value, onChange }: ProjectNameInputProps) {
  return (
    <div className="my-4 sm:my-0">
      <FormHint className="font-medium flex">
        Project Name
        <span className="ml-[4px] font-normal opacity-50">(Optional)</span>
        <Image
          src="/icons/question.svg"
          height={16}
          width={16}
          alt="question"
          className="mr-[7.25px] ml-auto opacity-40 hover:opacity-60 cursor-pointer transition-all"
        />
      </FormHint>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={classes(
          'w-full h-[42px] border border-black border-opacity-10 rounded-[8px]',
          'p-[10px]',
          clickableClasses,
          'cursor-pointer',
        )}
        placeholder="exampleProject"
      />
    </div>
  );
}
