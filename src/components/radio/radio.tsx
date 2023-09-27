import { Radio as Component } from 'flowbite-react';
import tw from 'tailwind-styled-components';

import { cn, uuid } from '@/lib/utils';
interface Props {
  id?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  name?: string;
  value?: string;
  subtitle?: string;
  subtitleClassName?: string;
  checked?: boolean;
  disabled?: boolean;
}

const Content = tw.div`
  flex w-3/4 items-start
`;
const LabelContainer = tw.div`
  ml-2 flex flex-col items-start
`;

const Label = tw.label`
  text-sm leading-[160%] text-neutral-500
`;

const Subtitle = tw.label`
  text-xs leading-[160%] text-gray-500
`;

const commonClasses = `
  w-4 focus:ring-0 focus:ring-brand-500 text-brand-500 rounded-980xl bg-white box-border h-4 overflow-hidden shrink-0 border-[1px] border-solid border-gray-500 mt-1
`;

export default function Radio({
  id = uuid(),
  className,
  label,
  name,
  value,
  subtitle,
  checked = false,
  disabled = false,
  labelClassName,
  subtitleClassName,
}: Props) {
  return (
    <Content>
      <Component
        className={cn(commonClasses, className)}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        checked={checked ? true : undefined}
        data-testid='test-element'
      />
      <LabelContainer>
        {!!label && (
          <Label className={labelClassName} htmlFor={id}>
            {label}
          </Label>
        )}
        {!!subtitle && (
          <Subtitle className={subtitleClassName} htmlFor={id}>
            {subtitle}
          </Subtitle>
        )}
      </LabelContainer>
    </Content>
  );
}
