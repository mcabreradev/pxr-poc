import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const useQueryString = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (query: { [key: string]: string | number | Date }) => {
      const params = new URLSearchParams(searchParams);
      for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
          const value = query[key];
          params.set(key, String(value));
        }
      }
      return params.toString();
    },
    [searchParams],
  );

  const removeQueryStringParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);

      return params.toString();
    },
    [searchParams],
  );

  const updateQueryString = useCallback(
    (query: { [key: string]: string | number | Date }) => {
      router.push(`${pathname}?${createQueryString(query)}`, {
        scroll: false,
      });
    },
    [createQueryString, pathname, router],
  );

  const updateQueryStringAsync = async (
    query: { [key: string]: string | number | Date },
    time?: number,
  ) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          router.push(`${pathname}?${createQueryString(query)}`, {
            scroll: false,
          }),
        );
      }, time || 500);
    });
  };

  const removeQueryString = useCallback(
    (key: string) => {
      router.push(`${pathname}?${removeQueryStringParam(key)}`, {
        scroll: false,
      });
      router.refresh();
    },
    [pathname, removeQueryStringParam, router],
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
    createQueryString,
    removeQueryStringParam,
  };
};

export default useQueryString;
