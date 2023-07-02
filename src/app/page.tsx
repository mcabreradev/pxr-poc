'use client';

import { Alert } from 'flowbite-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

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
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{t('test')}</h1>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={onClick}
      >
        Click {i18n.language}
      </button>
      <Alert color="info">Alert!</Alert>
    </main>
  );
}
