import Link from 'next/link';

import { cn } from '@/lib/utils';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

interface Props {
  className?: string;
  href?: string;
  withParams?: boolean;
  children: React.ReactNode;
}

export default function BackButtonComponent({
  href = '',
  children,
  className,
  withParams = true,
}: Props) {
  return (
    <>
      <Link
        href={withParams ? `${href}${window.location.search}` : href}
        data-testid='test-element'
      >
        <div
          className={cn(
            className,
            'flex w-full max-w-3xl items-center rounded-md border-b-[1px] border-solid border-neutral-50 px-8 py-4 text-center',
          )}
        >
          <Icon variant='arrow-back' width='30' color='#848484' />

          <div className='-ml-10 flex w-full items-center justify-center'>
            <Typography
              variant='base'
              weight='medium'
              className='mx-auto text-neutral-300'
            >
              {children}
            </Typography>
          </div>
        </div>
      </Link>
    </>
  );
}
