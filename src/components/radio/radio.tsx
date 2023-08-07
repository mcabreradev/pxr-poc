import { Radio as Component } from 'flowbite-react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';
interface Props {
  id?: string;
  className?: string;
  label?: string;
  name?: string;
  value?: string;
  subtitle?: string;
  checked?: boolean;
  disabled?: boolean;
}

const Content = tw.div`
  flex w-3/4
`;
const LabelContainer = tw.div`
  ml-3 flex flex-col
`;

const Label = tw.span`
  text-sm leading-[160%] text-neutral-500
`;

const Subtitle = tw.span`
  text-xs leading-[160%] text-gray-500
`;

const commonClasses = `
w-4 focus:ring-0 focus:ring-green text-green rounded-980xl bg-white box-border h-4 overflow-hidden shrink-0 border-[1px] border-solid border-gray-500
`;

export default function Radio({
  id,
  className,
  label,
  name,
  value,
  subtitle,
  checked = false,
  disabled = false,
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
        {!!label && <Label>{label}</Label>}
        {!!subtitle && <Subtitle>{subtitle}</Subtitle>}
      </LabelContainer>
    </Content>
  );
}
