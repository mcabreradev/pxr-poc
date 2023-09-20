import { AppProps } from 'next/app';

import '@/styles/globals.css';

import Providers from '@/providers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}

export default MyApp;
