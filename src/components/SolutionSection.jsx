import { motion } from 'framer-motion';
import { SectionTitle } from './SectionTitle.jsx';
import { SOLUTION_STEPS } from '../constants/content.js';

export function SolutionSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
      <SectionTitle eyebrow="الحل" title="طريقة شغل مثبتة علمياً،" emphasis="في جيبك." />

      <div className="mt-16 flex flex-col gap-16">
        {SOLUTION_STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`flex flex-col items-center gap-8 sm:gap-12 md:items-center ${
              i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-sand text-5xl sm:h-36 sm:w-36">
              {step.emoji}
            </div>
            <div className="text-center md:text-start">
              <div className="mono mb-2 text-xs tracking-[2px] text-terra">{step.number}</div>
              <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-gray">{step.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
