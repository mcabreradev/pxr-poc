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
  transition duration-100 delay-150 hover:delay-100
  shadow-none hover:shadow-none
  hover:opacity-[0.90]
  py-2 px-6
`;

const buttonStyles = {
  primary: 'bg-pax-green',
  secondary:
    'bg-pax-white hover:bg-gray-100 text-black border-[1px] border-solid border-pax-gray',
  alternative: 'bg-pax-blue',
  warning: 'bg-pax-orange',
  danger: 'bg-pax-red',
  text: 'bg-pax-white text-black underline hover:opacity-[0.60] border-[1px] border-solid border-white',
};

const Label = tw.span`
  text-[16px] font-normal font-poppins normal-case
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
