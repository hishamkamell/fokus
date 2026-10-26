import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { TRUST_ITEMS } from '../constants/content.js';

export function TrustStrip() {
  return (
    <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-10 gap-y-3 px-6 py-10 text-sm text-ink-gray sm:px-8">
      {TRUST_ITEMS.map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="flex items-center gap-2"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-terra/10 text-terra">
            <HiCheck size={13} />
          </span>
          {label}
        </motion.div>
      ))}
    </div>
  );
}
