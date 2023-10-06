'use client';

import { Metadata } from 'next';

import Icon from '@/components/icon';

export const metadata: Metadata = {
  title: 'Not Connected',
};

export default function NotConnected() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Icon
            variant='wifi'
            width={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Not Connection</h1>
        </div>
      </section>
    </main>
  );
}
