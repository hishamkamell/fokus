import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiArrowUp } from 'react-icons/hi';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="ارجع لأعلى الصفحة"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 start-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-cream shadow-lg hover:bg-terra"
        >
          <HiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
