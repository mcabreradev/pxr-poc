import { ReactNode } from 'react';

import '@/styles/globals.css';

import { fontPoppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';

// import Footer from '@/components/footer';
import { Providers } from '@/providers';
const { SITE_NAME, SITE_DESCRIPTION } = process.env;

export const metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={cn(fontPoppins.variable)}
      suppressHydrationWarning={true}
    >
      <body
        className={cn('z-0 flex min-h-screen flex-col bg-white antialiased')}
      >
        <Providers>
          {children}
          {/* <Footer /> */}
        </Providers>
      </body>
    </html>
  );
}
