/**
 * Custom hook that subscribes to changes in a store and invokes a callback function.
 * @param {Object} store - The store object to subscribe to.
 * @param {Function} onChange - The callback function to be invoked when the store changes.
 * @returns {Function} - The unsubscribe function.
 */
import { useEffect } from 'react';

export default function useSubscribeToStore(store, onChange) {
  useEffect(() => {
    const unsubscribe = store.subscribe(onChange);
    return unsubscribe;
  }, [store, onChange]);
}
