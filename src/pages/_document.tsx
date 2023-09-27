import { Head, Html, Main, NextScript } from 'next/document';

import { fontPoppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';

export default function Document() {
  return (
    <Html
      lang='en'
      className={cn(fontPoppins.variable)}
      suppressHydrationWarning={true}
    >
      <Head></Head>
      <body
        className={cn(
          'z-0 flex min-h-screen flex-col bg-white text-left antialiased',
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
