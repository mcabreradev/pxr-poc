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
  className = 'layout',
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
            'flex items-center py-4 text-center md:py-8',
          )}
        >
          <Icon variant='arrow-back' width='30' color='#848484' />

          <div className='-ml-10 flex w-full items-center justify-center md:ml-7 md:w-auto'>
            <Typography
              variant='base'
              weight='medium'
              className='mx-autos text-neutral-300 md:text-5xl'
            >
              {children}
            </Typography>
          </div>
        </div>
      </Link>
    </>
  );
}
