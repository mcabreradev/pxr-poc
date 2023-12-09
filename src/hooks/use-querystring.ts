import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { createQueryString, removeQueryStringParam } from '@/lib/url';

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (key: string, value: number | string | Date) => {
      router.replace(
        `${pathname}?${createQueryString(searchParams, key, value.toString())}`,
        { scroll: false },
      );
      router.refresh();
    },
    [pathname, router, searchParams],
  );

  const removeQueryString = useCallback(
    (key: string) => {
      router.replace(
        `${pathname}?${removeQueryStringParam(searchParams, key)}`,
        { scroll: false },
      );
      router.refresh();
    },
    [pathname, router, searchParams],
  );

  const removeBlacklistParam = useCallback(
    (keys) => {
      if (keys && Array.isArray(keys)) {
        keys.forEach((key) => {
          removeQueryString(key);
        });
      }
    },
    [removeQueryString],
  );

  return { updateQueryString, removeQueryString, removeBlacklistParam };
};

export default useQueryString;
