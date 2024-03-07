/**
 * Custom React hook that uses the Intersection Observer API to track the visibility of a DOM element.
 *
 * @param options - Optional configuration options for the Intersection Observer.
 * @param options.threshold - A number or an array of numbers between 0 and 1, indicating the percentage of the target element's visibility needed for the callback to be invoked. Defaults to 1.
 * @param options.root - The element that is used as the viewport for checking visibility of the target element. Defaults to null, which is the browser viewport.
 * @param options.rootMargin - A string representing the margin around the root element. Can have values similar to the CSS margin property. Defaults to '0px'.
 * @returns An object containing a ref and entry. The ref should be assigned to the element that needs to be observed, and the entry is the latest IntersectionObserverEntry object.
 */

import React from 'react';

interface Options {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export default function useIntersectionObserver(options: Options = {}) {
  const { threshold = 1, root = null, rootMargin = '0px' } = options;
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null,
  );

  const previousObserver = React.useRef<IntersectionObserver | null>(null);

  const ref = React.useCallback(
    (node) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect();
        previousObserver.current = null;
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            setEntry(entry);
          },
          { threshold, root, rootMargin },
        );

        observer.observe(node);
        previousObserver.current = observer;
      }
    },
    [threshold, root, rootMargin],
  );

  return { ref, entry };
}
