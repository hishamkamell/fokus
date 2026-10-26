import { motion } from 'framer-motion';
import { HOW_IT_WORKS } from '../constants/content.js';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const step = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function HowItWorks() {
  return (
    <section className="bg-charcoal text-cream">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mono mb-3 text-xs uppercase tracking-[3px] text-terra"
          >
            تقنية البومودورو
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-3xl font-bold sm:text-4xl"
          >
            ليه ٢٥ دقيقة بالظبط؟
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4"
        >
          {HOW_IT_WORKS.map((s) => (
            <motion.div
              key={s.num}
              variants={step}
              className="rounded-sm border border-white/10 px-5 py-8 text-center transition-colors hover:border-terra/50"
            >
              <div className="mono mb-3 text-2xl font-bold text-terra">{s.num}</div>
              <h4 className="mb-2 font-semibold">{s.title}</h4>
              <p className="text-sm leading-relaxed text-cream/60">{s.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
