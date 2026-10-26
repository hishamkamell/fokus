import { motion } from 'framer-motion';
import { CTAButton } from './CTAButton.jsx';
import { scrollToId } from '../utils/scroll.js';

export function FinalCTA() {
  return (
    <section className="bg-charcoal text-cream">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-6 py-24 text-center sm:px-8"
      >
        <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
          جاهز تبدأ تركز
          <br />
          <em className="not-italic text-terra">بطريقة مختلفة؟</em>
        </h2>
        <p className="text-cream/60">ابدأ تملك وقتك من النهارده. الـ FOKUS في انتظارك.</p>
        <CTAButton variant="primary" glow onClick={() => scrollToId('preorder', { focusId: 'pfName' })}>
          احجز خصم الإطلاق
        </CTAButton>
      </motion.div>
    </section>
  );
}
