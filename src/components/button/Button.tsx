'use client';

import { Button as ButtonBase } from '@material-tailwind/react';
import React from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  type?:
    | 'primary'
    | 'secondary'
    | 'alternative'
    | 'warning'
    | 'danger'
    | 'text';
}

const commonClasses = `
  transition duration-100 delay-100 hover:delay-100
  shadow-none hover:shadow-none
  hover:opacity-[0.90]
  py-2 px-6
`;

const buttonStyles = {
  primary: 'bg-green-500',
  secondary:
    'bg-white hover:opacity-[0.70] text-black border-[0.5px] border-solid border-gray',
  alternative: 'bg-blue',
  warning: 'bg-orange',
  danger: 'bg-red',
  text: 'bg-white text-black underline hover:opacity-[0.60] border-[1px] border-solid border-white',
};

const Label = tw.span`
  text-[14px] font-normal font-poppins normal-case
`;

export default function Button({
  className,
  children,
  type = 'primary',
  ...props
}: ButtonProps) {
  return (
    <ButtonBase
      className={cn(commonClasses, buttonStyles[type], className)}
      ripple={false}
      {...props}
    >
      <Label>{children}</Label>
    </ButtonBase>
  );
}
