import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Eyebrow + heading pair used to open every content section.
 * `title` accepts a string; `emphasis` is rendered in the terra accent
 * color, matching the <em> treatment from the original design.
 */
export function SectionTitle({ eyebrow, title, emphasis, align = 'center', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-start'} ${className}`}>
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className="mono mb-3 text-xs uppercase tracking-[3px] text-terra"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        custom={0.08}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]"
      >
        {title} {emphasis && <em className="font-bold not-italic text-terra">{emphasis}</em>}
      </motion.h2>
    </div>
  );
}
