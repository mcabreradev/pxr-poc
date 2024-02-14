/* eslint-disable simple-import-sort/imports */
import { ReactNode } from 'react';

import '@/styles/animations.css';
import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';

import { fontPoppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { siteConfig } from '@/constants/config';
import Providers from '@/providers';

export const metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: {
    follow: true,
    index: true,
  },
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    creator: '@paxer',
  },
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={cn(fontPoppins.variable)}
      suppressHydrationWarning={true}
    >
      <body
        className={cn(
          'z-0 flex min-h-screen flex-col bg-white text-left antialiased',
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
