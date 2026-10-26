import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { SectionTitle } from './SectionTitle.jsx';
import { CTAButton } from './CTAButton.jsx';
import { BRAND, BUY_LIST } from '../constants/content.js';
import { scrollToId } from '../utils/scroll.js';

export function BuySection() {
  return (
    <section id="buy" className="bg-sand/50">
      <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
        <SectionTitle eyebrow="اطلب دلوقتي" title="ابدأ تشتغل صح" emphasis="النهارده." />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-1 gap-10 rounded-md border border-charcoal/10 bg-white p-8 shadow-[0_20px_60px_rgba(10,10,10,0.08)] sm:p-10 md:grid-cols-2 md:items-center"
        >
          <div className="flex items-center justify-center rounded-md bg-charcoal p-12">
            <div className="mono flex h-32 w-32 items-center justify-center rounded-sm border border-white/10 text-4xl font-bold text-cream">
              25
            </div>
          </div>

          <div>
            <span className="mono inline-block rounded-sm bg-terra/10 px-3 py-1 text-xs font-semibold text-terra">
              ★ المنتج الأكثر طلباً
            </span>
            <h3 className="mb-1 mt-4 text-2xl font-bold">FOKUS Pro</h3>
            <p className="mb-5 text-sm text-ink-gray">ساعة البومودورو بنظام الجاذبية — أسود</p>

            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-terra">{BRAND.price}</span>
              <span className="text-base text-ink-light line-through">{BRAND.priceOld}</span>
            </div>
            <p className="mb-6 text-xs text-ink-light">شامل ضريبة القيمة المضافة • الشحن يُحسب عند الطلب</p>

            <ul className="mb-7 flex flex-col gap-2.5">
              {BUY_LIST.map((line) => (
                <li key={line} className="flex items-center gap-2 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-terra/10 text-terra">
                    <HiCheck size={13} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <CTAButton variant="buy" glow onClick={() => scrollToId('preorder', { focusId: 'pfName' })}>
              أضف للسلة — اطلب دلوقتي
            </CTAButton>
            <p className="mt-3 text-center text-xs text-ink-light">🔒 طلب آمن • شحن خلال ٢–٤ أيام عمل</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
