import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle.jsx';
import { PROBLEMS } from '../constants/content.js';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <SectionTitle eyebrow="المشكلة" title="بتشتغل ساعات," emphasis="وبتحس إنك مخلّصتش حاجة؟" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {PROBLEMS.map((p) => (
          <motion.div
            key={p.title}
            variants={card}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="rounded-md border border-charcoal/10 bg-white/60 p-7"
          >
            <span className="mb-4 block text-3xl">{p.icon}</span>
            <h3 className="mb-2 text-lg font-bold">{p.title}</h3>
            <p className="text-sm leading-relaxed text-ink-gray">{p.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
