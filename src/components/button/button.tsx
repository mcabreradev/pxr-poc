'use client';

import { Button as Base } from '@material-tailwind/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import { ACTION } from '@/constants';

interface ButtonProps {
  id?: string;
  type?: 'submit' | 'link' | 'button';
  ref?: React.MutableRefObject<null>;
  onClick?: (e: unknown) => void;
  onBlur?: (e: unknown) => void;
  onChange?: (e: unknown) => void;
  onMouseEnter?: (e: unknown) => void;
  onMouseLeave?: (e: unknown) => void;
  onFocus?: (e: unknown) => void;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  withSearchParams?: boolean;
  query?: { [key: string]: string };
  variant?:
    | 'primary'
    | 'secondary'
    | 'alternative'
    | 'warning'
    | 'danger'
    | 'text';
  href?: string;
  icon?: React.ReactNode | string;
  replace?: boolean;
  scroll?: boolean;
  loading?: boolean;
  slim?: boolean;
}

const ButtonComponent = tw(Base)<Partial<ButtonProps>>`
  cursor-pointer flex items-center justify-center flex-row
  shadow-none hover:shadow-none py-[10px] px-6 rounded
  text-[14px] font-medium font-poppins normal-case
  md:w-auto h-auto
  ${({ slim }) => !!slim && 'px-2'}
  ${({ fullWidth }) => fullWidth && 'w-full'}
  ${({ disabled }) =>
    disabled
      ? 'opacity-[0.90] cursor-not-allowed'
      : 'transition hover:delay-100 hover:opacity-[0.90] duration-100 delay-100 '}
`;

export default function Button({
  id,
  type = 'button',
  className,
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  onClick,
  onBlur,
  onChange,
  onMouseEnter,
  onMouseLeave,
  ref,
  href = '',
  icon,
  replace = true,
  scroll = true,
  slim,
  query,
  withSearchParams = false,
  loading,
  ...props
}: ButtonProps) {
  const styling = {
    primary: 'bg-green-500',
    secondary:
      'border-[1px] border-solid border-neutral-60 bg-white text-black hover:opacity-[0.90]',
    alternative: 'bg-blue',
    warning: 'bg-orange',
    danger: 'bg-red',
    text: 'border-[1px] border-solid border-white bg-white text-black underline hover:bg-white-100 px-2 py-2 rounded-lg',
  };
  const searchParams = useSearchParams();

  if (type === 'link') {
    const params = new URLSearchParams(query);
    const search = new URLSearchParams(searchParams.toString());
    search.delete(ACTION);

    const url = withSearchParams
      ? `${href}?${params}&${search}`
      : `${href}?${params}`;

    return (
      <Link
        href={disabled ? '' : url}
        className={cn('', { 'w-full': fullWidth })}
        scroll={scroll}
        replace={replace}
      >
        <ButtonComponent
          id={id}
          ref={ref}
          className={cn(styling[variant], className)}
          ripple={false}
          fullWidth={fullWidth}
          data-testid='test-element'
          disabled={disabled}
          onClick={onClick}
          onBlur={onBlur}
          onChange={onChange}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          loading={loading}
          slim={slim}
          {...props}
        >
          {icon && <span className=''>{icon}</span>}
          <span className='flex-grow cursor-pointer text-center'>
            {children}
          </span>
        </ButtonComponent>
      </Link>
    );
  }

  return (
    <ButtonComponent
      id={id}
      ref={ref}
      type={type}
      className={cn(styling[variant], className)}
      ripple={false}
      fullWidth={fullWidth}
      data-testid='test-element'
      disabled={disabled}
      onClick={onClick}
      onBlur={onBlur}
      onChange={onChange}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      loading={loading}
      slim={slim}
      {...props}
    >
      {icon && icon}
      <span className='flex-grow cursor-pointer text-center'>{children}</span>
    </ButtonComponent>
  );
}
