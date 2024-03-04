'use client';

import I18nProvider from './i18n.provider';
import ReactQueryProvider from './tanstack.provider';
import ThemeProvider from './theme.provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ReactQueryProvider>
        <I18nProvider>{children}</I18nProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
