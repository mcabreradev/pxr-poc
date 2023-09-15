'use client';

import I18nProvider from '@/providers/i18n-provider';
import ReactQueryProvider from '@/providers/react-query-provider';
import ThemeProvider from '@/providers/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <I18nProvider>{children}</I18nProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
