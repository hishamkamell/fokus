import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle.jsx';
import { TESTIMONIALS } from '../constants/content.js';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
      <SectionTitle eyebrow="آراء العملاء" title="ناس غيّرت طريقة شغلها" emphasis="فعلاً." />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3"
      >
        {TESTIMONIALS.map((t) => (
          <motion.figure
            key={t.name}
            variants={card}
            whileHover={{ y: -4 }}
            className="flex flex-col rounded-md border border-charcoal/10 bg-white/70 p-7"
          >
            <div className="mb-3 text-gold" aria-hidden="true">
              ★★★★★
            </div>
            <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-charcoal/90">“{t.quote}”</blockquote>
            <figcaption className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra text-sm font-bold text-white">
                {t.avatar}
              </span>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-ink-light">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
