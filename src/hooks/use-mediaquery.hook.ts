/**
 * A custom hook that allows subscribing to changes in a media query.
 * @param query - The media query string to match against.
 * @returns A function that can be used to subscribe to changes in the media query, and two functions to get the current state of the media query.
 */
import { useCallback, useSyncExternalStore } from 'react';

export default function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener('change', callback);
      return () => {
        matchMedia.removeEventListener('change', callback);
      };
    },
    [query],
  );

  const getSnapshot = (): boolean => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = (): never => {
    throw Error('useMediaQuery is a client-only hook');
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
