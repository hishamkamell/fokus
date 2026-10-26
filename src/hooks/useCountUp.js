import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animates a number from 0 to `target` once the returned ref scrolls
 * into view. Returns the ref to attach and the current animated value.
 */
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return { ref, value };
}
