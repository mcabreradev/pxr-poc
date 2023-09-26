import { useState } from 'react';
import Toggle from 'react-toggle';
import tw from 'tailwind-styled-components';

import 'react-toggle/style.css';

type ToggleProps = {
  className?: string;
  label?: string;
  name?: string;
  value?: string;
  subtitle?: string;
  toggled?: boolean;
  readonly?: boolean;
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

export default function ToogleComponent({
  className,
  label,
  name,
  value,
  subtitle,
  toggled = false,
  readonly = false,
}: ToggleProps) {
  const [enabled, setEnabled] = useState(toggled);

  const onChangeHandler = () => {
    if (readonly) return;
    setEnabled((prev) => !prev);
  };

  return (
    <Content>
      <CustomToggle
        name={name}
        value={value}
        checked={enabled}
        onChange={onChangeHandler}
        className={className}
        enabled={enabled}
        icons={false}
        data-testid='test-element'
      ></CustomToggle>
      <LabelContainer>
        {!!label && <Label>{label}</Label>}
        {!!subtitle && <Subtitle>{subtitle}</Subtitle>}
      </LabelContainer>
    </Content>
  );
}
