'use client';

import { Button as Base } from '@material-tailwind/react';
import React from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface  ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant | undefined;
}

export enum ButtonVariant {
  PRIMARY,
  SECONDARY,
  ALTERNATIVE,
  WARNING,
  DANGER,
  TEXT,
}

const ButtonComponent = tw(Base)<Partial<ButtonProps>>`
  cursor-pointer
  shadow-none hover:shadow-none py-2 px-6 rounded
  text-[14px] font-normal font-poppins normal-case
  ${({ fullWidth }) => fullWidth && 'w-full'}
  ${({ disabled }) =>
    disabled
      ? 'opacity-[0.90] cursor-not-allowed'
      : 'transition hover:delay-100 hover:opacity-[0.90] duration-100 delay-100 '}
`;

export default function Button({
  className,
  children,
  variant = ButtonVariant.PRIMARY,
  fullWidth = false,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <ButtonComponent
      className={cn(className, `
        ${variant === ButtonVariant.PRIMARY && 'bg-green-500'}
        ${variant === ButtonVariant.SECONDARY && 'bg-white hover:opacity-[0.70] text-black border-[1px] border-solid border-gray'}
        ${variant === ButtonVariant.ALTERNATIVE && 'bg-blue'}
        ${variant === ButtonVariant.WARNING && 'bg-orange'}
        ${variant === ButtonVariant.DANGER && 'bg-red'}
        ${variant === ButtonVariant.TEXT && 'bg-white text-black underline hover:opacity-[0.60] border-[1px] border-solid border-white'}
      `)}
      ripple={false}
      fullWidth={fullWidth}
      data-testid='test-element'
      disabled={disabled}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
}
