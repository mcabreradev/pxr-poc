'use client';

import { Metadata } from 'next';
import Link from 'next/link';

import Icon from '@/components/icon';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Icon
            variant='warning'
            width={60}
            className='drop-shadow-glow animate-flicker text-red-500'
          />
          <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
          <Link href='/'>Back to home</Link>
        </div>
      </section>
    </main>
  );
}
