import { Checkbox as Component } from 'flowbite-react';
import tw from 'tailwind-styled-components';

import { cn, uuid } from '@/lib/utils';
interface Props {
  id?: string;
  className?: string;
  label?: string | JSX.Element;
  labelClassName?: string;
  name?: string;
  value?: string;
  subtitle?: string;
  subtitleClassName?: string;
  checked?: boolean;
  disabled?: boolean;
}

const Content = tw.div`
  flex items-center
`;
const LabelContainer = tw.div`
  ml-2 flex flex-1 flex-col items-start justify-center gap-[2px] px-0 pb-0 pt-px
`;

const Label = tw.label`
  text-sm font-semibold leading-[160%] text-gray-900
`;

const Subtitle = tw.label`
  text-xs leading-[160%] text-gray-500
`;

const commonClasses = `
  h-4 w-4 rounded border border-gray-300 bg-white focus:ring-0 focus:ring-brand-500 text-brand-500
`;

export default function Checkbox({
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
