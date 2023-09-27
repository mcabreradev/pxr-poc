'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  /** @fyi ReactQueryProvider
   *  react-query default options must be set here
   */
  const options = {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus:
          Boolean(process.env.NEXT_PUBLIC_REFECTH_ON_FOCUS) || false,
        staleTime: 1000 * 60 * 1, // 1 minute
        cacheTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  };
  const [queryClient] = React.useState(() => new QueryClient(options));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
