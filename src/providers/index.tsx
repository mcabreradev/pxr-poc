'use client';

import I18nProvider from '@/providers/i18n-provider';
import ReactQueryProvider from '@/providers/react-query-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <I18nProvider>{children}</I18nProvider>
    </ReactQueryProvider>
  );
}
