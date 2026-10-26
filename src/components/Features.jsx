import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle.jsx';
import { FEATURES } from '../constants/content.js';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function Features() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
      <SectionTitle eyebrow="المواصفات" title="صُممت" emphasis="لتركيزك، مش لتشتيتك." />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2"
      >
        {FEATURES.map((f) => (
          <motion.div key={f.title} variants={item} className="flex items-start gap-4">
            <motion.div
              animate={f.bounce ? { y: [0, -5, 0] } : undefined}
              transition={f.bounce ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : undefined}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-sand text-2xl"
            >
              {f.icon}
            </motion.div>
            <div>
              <h4 className="mb-1.5 font-bold">{f.title}</h4>
              <p className="text-sm leading-relaxed text-ink-gray">{f.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
