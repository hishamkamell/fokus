import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle.jsx';
import { FAQS } from '../constants/content.js';

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-b border-charcoal/10">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-5 text-start text-base font-medium"
      >
        {q}
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="mono shrink-0 text-xl text-terra"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-ink-gray">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
      <SectionTitle eyebrow="أسئلة شائعة" title="كل اللي محتاج" emphasis="تعرفه." />

      <div className="mt-12">
        {FAQS.map((item, i) => (
          <FAQItem
            key={item.q}
            q={item.q}
            a={item.a}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </section>
  );
}
