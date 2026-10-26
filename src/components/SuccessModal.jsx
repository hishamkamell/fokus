import { AnimatePresence, motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { CTAButton } from './CTAButton.jsx';
import { Confetti } from './Confetti.jsx';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll.js';

export function SuccessModal({ open, onClose }) {
  useLockBodyScroll(open);

  return (
    <AnimatePresence>
      {open && (
        <>
          <Confetti />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/60 px-6 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full max-w-sm flex-col items-center gap-4 rounded-md bg-cream p-9 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-terra text-white"
              >
                <HiCheck size={28} />
              </motion.span>
              <h3 id="success-modal-title" className="text-xl font-bold">
                تم الحجز بنجاح!
              </h3>
              <p className="text-sm text-ink-gray">هنبعتلك رسالة بتفاصيل خصم الإطلاق قبل ما المنتج ينزل.</p>
              <CTAButton variant="primary" onClick={onClose} className="mt-2 w-full">
                تمام
              </CTAButton>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
