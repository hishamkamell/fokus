import { motion } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp.js';
import { PREORDER_GOAL } from '../constants/content.js';

const toArabicDigits = (num) =>
  String(num).replace(/[0-9]/g, (d) => '٠١٢٣٤٥٦٧٨٩'[d]);

export function SocialProof() {
  const { ref, value } = useCountUp(PREORDER_GOAL.booked);
  const pct = Math.min(100, (value / PREORDER_GOAL.goal) * 100);

  return (
    <div ref={ref}>
      <div className="mb-4 text-sm">
        🔥 <span className="mono font-bold text-terra">{value}</span> شخص قاموا بالحجز
      </div>

      <div className="mb-2 h-2 overflow-hidden rounded-full bg-charcoal/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-l from-terra to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <div className="mono text-xs text-ink-light">
        {toArabicDigits(value)} / {toArabicDigits(PREORDER_GOAL.goal)} حجزوا خصم الإطلاق
      </div>
    </div>
  );
}
