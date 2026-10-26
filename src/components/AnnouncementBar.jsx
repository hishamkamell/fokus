import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative overflow-hidden bg-charcoal text-cream"
        >
          <div className="mono flex items-center justify-center gap-1 px-10 py-2.5 text-center text-xs tracking-wide">
            <span className="text-gold">🚀 قريباً...</span>
            <span>احجز الآن واحصل على خصم الإطلاق لأول ١٠٠ عميل.</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="إغلاق"
            className="absolute end-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <HiX size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
