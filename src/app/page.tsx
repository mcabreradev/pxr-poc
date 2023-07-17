'use client';

import { Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

export default function Home() {
  const { t, i18n } = useTranslation();
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const onClick = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    document.cookie = `i18next=${i18n.language}`;
  };
  return (
    <main className='z-10 flex h-[100px] flex-grow flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold'>{t('test')}</h1>
      <button
        className='rounded bg-blue px-4 py-2 font-bold text-white hover:bg-blue-100'
        onClick={onClick}
      >
        Click {i18n.language}
      </button>
      <Alert color='info'>Alert!</Alert>
      <StickyDiv />
      <div className='sticky left-0 right-0 top-60'>Contacts</div>
    </main>
  );
}

const StickyDiv: React.FC = () => {
  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollPosition > 100) {
        setStickyClass(`
        fixed bottom-0 animate-fade-up animate-normal
        `);
      } else {
        setStickyClass(`
        animate-fade-up animate-reverse
        `);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={cn('z-20 bg-red p-4 text-white', stickyClass)}>
      Sticky Div
    </div>
  );
};
