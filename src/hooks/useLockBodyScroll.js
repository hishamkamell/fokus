import { useEffect } from 'react';

/**
 * Locks the document body scroll while `locked` is true.
 * Used to prevent background scroll behind the success modal.
 */
export function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}
