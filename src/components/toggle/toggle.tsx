import { useEffect, useRef, useState } from 'react';
import Toggle from 'react-toggle';
import tw from 'tailwind-styled-components';

import 'react-toggle/style.css';

import { cn, uuid } from '@/lib/utils';

type ToggleProps = {
  id?: string;
  className?: string;
  label?: string;
  name?: string;
  value?: string | null | undefined;
  subtitle?: string;
  disabled?: boolean;
  readonly?: boolean;
  toggled?: boolean;
  onChange?: (event: unknown) => void;
};

const Content = tw.div`
  flex items-center
`;
const LabelContainer = tw.span`
  flex flex-1 flex-col items-start justify-center gap-[2px] px-0 pb-0 pt-px
`;

const Label = tw.span`
  text-sm leading-[160%] text-neutral-500
`;

const Subtitle = tw.span`
  text-xs leading-[160%] text-gray-500
`;

const CustomToggle = tw(Toggle)<{ enabled?: boolean }>`
  ${(p) => (p.enabled ? 'bg-error-500' : 'bg-gray-50')}
  relative mr-4 inline-flex h-6 w-11 items-center rounded-full shrink-0
`;

export default function ToggleComponent({
  id = uuid(),
  className,
  label,
  name,
  value,
  subtitle,
  disabled = false,
  readonly = false,
  onChange,
  toggled = false,
}: ToggleProps) {
  const [enabled, setEnabled] = useState(false);

  const checkboxRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (e) => {
    if (readonly) return;
    setEnabled((prev) => !prev);
    onChange && onChange(e);
  };

  useEffect(() => {
    toggled && setEnabled(true);
  }, [toggled]);

  return (
    <Content>
      <CustomToggle
        id={id}
        name={name}
        value={value}
        ref={checkboxRef}
        checked={enabled || toggled}
        onChange={onChangeHandler}
        className={className}
        disabled={disabled}
        icons={false}
        data-testid='test-element'
      />
      <LabelContainer>
        {!!label && (
          <Label
            className={cn('transition-colors duration-500', {
              'text-gray-500': !enabled,
            })}
          >
            {label}
          </Label>
        )}
        {!!subtitle && (
          <Subtitle
            className={cn('transition-colors duration-500', {
              'text-gray-500': !enabled,
            })}
          >
            {subtitle}
          </Subtitle>
        )}
      </LabelContainer>
    </Content>
  );
}
