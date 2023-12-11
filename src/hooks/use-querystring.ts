import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import { createQueryString, removeQueryStringParam } from '@/lib/url';

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (key: string, value: number | string | Date) => {
      router.push(
        `${pathname}?${createQueryString(searchParams, key, value.toString())}`,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  const updateQueryStringAsync = async (
    key: string,
    value: number | string | Date,
  ) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          router.push(
            `${pathname}?${createQueryString(
              searchParams,
              key,
              value.toString(),
            )}`,
            { scroll: false },
          ),
        );
      }, 500);
    });
  };

  const removeQueryString = useCallback(
    (key: string) => {
      router.push(`${pathname}?${removeQueryStringParam(searchParams, key)}`, {
        scroll: false,
      });
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

  return {
    updateQueryString,
    removeQueryString,
    removeBlacklistParam,
    updateQueryStringAsync,
  };
};

export default useQueryString;
