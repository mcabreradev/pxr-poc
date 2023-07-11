import { Checkbox } from 'flowbite-react';
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
  flex items-center
`;
const LabelContainer = tw.div`
  flex flex-1 flex-col items-start justify-center gap-[2px] px-0 pb-0 pt-px ml-4 
`;

const Label = tw.span`
  text-sm leading-[160%] font-semibold text-gray-900
`;

const Subtitle = tw.span`
  text-xs leading-[160%] text-gray-500
`;

const commonClasses = ` 
h-4 w-4 rounded border border-gray-300 bg-white focus:ring-0 focus:ring-green text-green
`;

export default function CheckboxComponent({
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
      <Checkbox
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
