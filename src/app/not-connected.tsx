'use client';

import { Metadata } from 'next';
import { useTranslation } from 'react-i18next';

import Button from '@/components/button';
import Typography from '@/components/typography';

export const metadata: Metadata = {
  title: 'Not Connected',
};

export default function Component() {
  const { t } = useTranslation();
  return (
    <div className='container flex h-screen flex-col items-center justify-center bg-white p-4'>
      <svg
        className=' h-24 w-24 text-red-500'
        fill='none'
        height='24'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
        width='24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <line x1='2' x2='22' y1='2' y2='22' />
        <path d='M8.5 16.5a5 5 0 0 1 7 0' />
        <path d='M2 8.82a15 15 0 0 1 4.17-2.65' />
        <path d='M10.66 5c4.01-.36 8.14.9 11.34 3.76' />
        <path d='M16.85 11.25a10 10 0 0 1 2.22 1.68' />
        <path d='M5 13a10 10 0 0 1 5.24-2.76' />
        <line x1='12' x2='12.01' y1='20' y2='20' />
      </svg>

      <Typography className='mt-4 text-center' variant='h1' weight='semibold'>
        {t('error.not-connected.title')}
      </Typography>

      <Typography
        className='mt-2 px-4 text-neutral-500'
        variant='sm'
        weight='normal'
      >
        {t('error.not-connected.message')}
      </Typography>
      <Button className='mt-6' type='link' href={window.location.href}>
        {t('button.try-reconnect')}
      </Button>
    </div>
  );
}
