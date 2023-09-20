'use client';

import { Button as Base } from '@material-tailwind/react';
import Link from 'next/link';
import React from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface ButtonProps {
  type?: 'submit' | 'link' | 'button';
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'alternative'
    | 'warning'
    | 'danger'
    | 'text';
  href?: string;
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
  type = 'button',
  className,
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  href,
  ...props
}: ButtonProps) {
  const styling = {
    primary: 'bg-green-500',
    secondary:
      'border-[1px] border-solid border-gray bg-white text-black hover:opacity-[0.70]',
    alternative: 'bg-blue',
    warning: 'bg-orange',
    danger: 'bg-red',
    text: 'border-[1px] border-solid border-white bg-white text-black underline hover:opacity-[0.60]',
  };

  if (type === 'link') {
    return (
      <Link href={href || '/'} className={cn({ 'w-full': fullWidth })}>
        <ButtonComponent
          className={cn(className, styling[variant])}
          ripple={false}
          fullWidth={fullWidth}
          data-testid='test-element'
          disabled={disabled}
          {...props}
        >
          {children}
        </ButtonComponent>
      </Link>
    );
  }

  return (
    <ButtonComponent
      type={type}
      className={cn(className, styling[variant])}
      ripple={false}
      fullWidth={fullWidth}
      data-testid='test-element'
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </ButtonComponent>
  );
}
