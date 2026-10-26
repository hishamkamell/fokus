import { useEffect, useRef, useState } from 'react';

const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;
const MIN_MS = 60_000;

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / DAY_MS),
    hours: Math.floor((diff % DAY_MS) / HOUR_MS),
    minutes: Math.floor((diff % HOUR_MS) / MIN_MS),
    seconds: Math.floor((diff % MIN_MS) / 1000),
  };
}

/**
 * Counts down to a fixed point in time, `windowDays` from the first render.
 * The target is stored in a ref so it never resets on re-render.
 */
export function useCountdown(windowDays = 14) {
  const targetRef = useRef(Date.now() + windowDays * DAY_MS);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetRef.current));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(targetRef.current));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}
