import { motion } from 'framer-motion';
import { SocialProof } from './SocialProof.jsx';
import { Countdown } from './Countdown.jsx';
import { LeadForm } from './LeadForm.jsx';

export function PreorderCard({ onSuccess }) {
  return (
    <section className="mx-auto max-w-5xl px-6 sm:px-8" id="preorder">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 gap-10 rounded-md border border-charcoal/10 bg-sand/60 p-8 shadow-[0_20px_60px_rgba(10,10,10,0.06)] sm:p-10 md:grid-cols-2 md:gap-14"
      >
        <div>
          <div className="mb-2 text-lg font-bold">🎁 احجز خصم الإطلاق</div>
          <p className="mb-6 text-sm leading-relaxed text-ink-gray">
            كن من أول ١٠٠ شخص واحصل على خصم حصري عند نزول المنتج.
          </p>

          <div className="mb-8">
            <SocialProof />
          </div>

          <Countdown />
        </div>

        <LeadForm onSuccess={onSuccess} />
      </motion.div>
    </section>
  );
}
