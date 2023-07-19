import { Switch as Base } from '@headlessui/react';
import { useState } from 'react';
import tw from 'tailwind-styled-components';

interface ToggleProps {
  className?: string;
  label?: string;
  name?: string;
  value?: string;
  subtitle?: string;
  toggled?: boolean;
  readonly?: boolean;
}

const Content = tw.div`
  flex items-center
`;
const LabelContainer = tw.div`
  flex flex-1 flex-col items-start justify-center gap-[2px] px-0 pb-0 pt-px
`;

const Label = tw.span`
  text-sm font-semibold leading-[160%] text-gray-900
`;

const Subtitle = tw.span`
  text-xs leading-[160%] text-gray-500
`;

const Switch = tw(Base)<{ enabled?: boolean }>`
  ${(p) => (p.enabled ? 'bg-green' : 'bg-gray-50')};
  relative mr-4 inline-flex h-6 w-11 items-center rounded-full shrink-0
`;

const SwitchDot = tw.span<{ enabled?: boolean }>`
  ${(p) => (p.enabled ? 'translate-x-5' : 'translate-x-[2px]')};
  inline-block h-5 w-5 transform rounded-full bg-white transition
`;

export default function Toogle({
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
    setEnabled(!enabled);
  };

  return (
    <Content>
      <Switch
        name={name}
        value={value}
        checked={enabled}
        onChange={onChangeHandler}
        className={className}
        enabled={enabled}
        data-testid='test-element'
      >
        <SwitchDot enabled={enabled} />
      </Switch>
      <LabelContainer>
        {!!label && <Label>{label}</Label>}
        {!!subtitle && <Subtitle>{subtitle}</Subtitle>}
      </LabelContainer>
    </Content>
  );
}
