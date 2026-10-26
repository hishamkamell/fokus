import { AnimatePresence, motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown.js';

const UNITS = [
  { key: 'days', label: 'يوم' },
  { key: 'hours', label: 'ساعة' },
  { key: 'minutes', label: 'دقيقة' },
  { key: 'seconds', label: 'ثانية' },
];

function Digit({ value }) {
  const display = String(value).padStart(2, '0');
  return (
    <span className="mono relative inline-block h-7 w-9 overflow-hidden text-center text-2xl font-bold">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={display}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown() {
  const time = useCountdown(14);

  return (
    <div className="flex justify-center gap-3" role="timer" aria-label="الوقت المتبقي لخصم الإطلاق">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex min-w-[56px] flex-col items-center gap-1 rounded-sm border border-charcoal/10 bg-cream py-2.5"
        >
          <Digit value={time[unit.key]} />
          <span className="text-[10px] text-ink-light">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
