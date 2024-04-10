import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Icon } from '@/components';

import { ACTION, BUTTON, LINK } from '@/constants';

const buttonVariants = cva(
  'cursor-pointer flex items-center justify-center flex-row shadow-none hover:shadow-none py-[10px] px-6 rounded text-[14px] font-medium font-poppins normal-case h-auto text-white flex-grow text-center gap-1 flex-wrap justify-between',
  {
    variants: {
      variant: {
        default: 'bg-green-500',
        primary: 'bg-green-500',
        secondary:
          'border-[1px] border-solid border-neutral-60 bg-white text-black hover:opacity-[0.90]',
        alternative: 'bg-blue',
        warning: 'bg-orange',
        danger: 'bg-red',
        text: 'border-[1px] border-none border-white !bg-transparent text-black underline hover:bg-white-100 px-2 py-2 rounded-lg',
      },
      size: {
        default: 'px-6',
        sm: 'px-2',
        lg: 'px-10',
        full: 'w-full',
        icon: 'h-10 w-10',
      },
      state: {
        default: '',
        disabled: 'opacity-[0.90] cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  tag?: typeof BUTTON | typeof LINK;
  id?: string;
  withSearchParams?: boolean;
  query?: { [key: string]: string };
  href?: string;
  replace?: boolean;
  scroll?: boolean;
  loading?: boolean;
  icon?: React.ReactNode | string;
  iconAlignment?: 'left' | 'right';
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      disabled,
      loading = false,
      tag = BUTTON,
      href,
      replace = true,
      scroll = true,
      icon,
      query,
      withSearchParams = false,
      iconAlignment = 'left',
      children,
      ...props
    },
    ref,
  ) => {
    const state = disabled ? 'disabled' : 'default';

    const searchParams = useSearchParams();
    const createCustomHref = (
      href,
      query,
      searchParams,
      withSearchParams: boolean,
    ) => {
      const params = new URLSearchParams(query);
      const search = new URLSearchParams(searchParams);
      search.delete(ACTION);

      return withSearchParams
        ? `${href}?${params}&${search}`
        : `${href}?${params}`;
    };

    if (tag === LINK) {
      const customHref = createCustomHref(
        href,
        query,
        searchParams.toString(),
        withSearchParams,
      );

      return (
        <Link
          ref={ref as React.RefObject<HTMLAnchorElement>}
          data-testid='test-button-element'
          className={cn(buttonVariants({ variant, size, state, className }))}
          href={customHref}
          scroll={scroll}
          replace={replace}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{!loading && icon && iconAlignment === 'left' && icon}</span>
          <span className='flex flex-row'>
            {loading && <LoadingIcon />}
            {children}
          </span>
          <span>{!loading && icon && iconAlignment === 'right' && icon}</span>
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.RefObject<HTMLButtonElement>}
        data-testid='test-button-element'
        className={cn(buttonVariants({ variant, size, state, className }))}
        disabled={disabled}
        {...props}
      >
        <span>{!loading && icon && iconAlignment === 'left' && icon}</span>
        <span className='flex flex-row'>
          {loading && <LoadingIcon />}
          {children}
        </span>
        <span>{!loading && icon && iconAlignment === 'right' && icon}</span>
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;

const LoadingIcon = () => (
  <span className='mr-2'>
    <Icon variant='loading' style={{ color: 'white' }} width={24} height={24} />
  </span>
);
