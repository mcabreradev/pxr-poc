import { Radio as RadioComponent } from 'flowbite-react';
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
  onChange?: (event: unknown) => void;
  defaultChecked?: boolean;
}

const Content = tw.div`
  flex w-3/4 items-start
`;
const LabelContainer = tw.div`
  ml-2 flex flex-col items-start
`;

const Label = tw.label`
  cursor-pointer text-sm leading-[160%] text-neutral-500
`;

const Subtitle = tw.label`
  leading-[160% cursor-pointer text-xs text-neutral-500
`;

const commonClasses = `
  w-4 focus:ring-0 focus:ring-brand-500 text-brand-500 rounded-980xl bg-white box-border h-4 overflow-hidden shrink-0 border-[1px] border-solid border-gray-500 mt-1 cursor-pointer
`;

export default function Radio({
  id = uuid(),
  className,
  label,
  name,
  value,
  subtitle,
  checked,
  disabled = false,
  labelClassName,
  subtitleClassName,
  onChange,
}: Props) {
  return (
    <Content>
      <RadioComponent
        data-testid='test-element'
        className={cn(commonClasses, className)}
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <LabelContainer>
        {!!label && (
          <Label
            className={cn(labelClassName, 'transition-colors duration-500', {
              'text-gray-500': !checked,
            })}
            htmlFor={id}
          >
            {label}
          </Label>
        )}
        {!!subtitle && (
          <Subtitle
            className={cn(subtitleClassName, 'transition-colors duration-500', {
              'text-gray-500': !checked,
            })}
            htmlFor={id}
          >
            {subtitle}
          </Subtitle>
        )}
      </LabelContainer>
    </Content>
  );
}
