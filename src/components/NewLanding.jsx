import { useEffect, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { Logo } from './Logo.jsx';
import { FocusCube } from './FocusCube.jsx';
import { CTAButton } from './CTAButton.jsx';
import { PREORDER_GOAL, SOLUTION_STEPS, HOW_IT_WORKS, FEATURES, BUY_LIST, FAQS } from '../constants/contentNew.js';
import { scrollToId } from '../utils/scroll.js';
import cubeImage from '../assets/1.png';

const SectionHeading = ({ eyebrow, title, accent }) => (
  <div className="text-center">
    <p className="mono mb-3 text-xs tracking-[3px] text-terra">{eyebrow}</p>
    <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{title} {accent && <em className="not-italic text-terra">{accent}</em>}</h2>
  </div>
);

export function NewLanding({ onSuccess }) {
  const bookedPercent = (PREORDER_GOAL.booked / PREORDER_GOAL.goal) * 100;
  const scrollProgress = useMotionValue(0);
  const [reserved, setReserved] = useState(false);
  useEffect(() => {
    document.title = 'FOKUS — ركّز أكتر، أنجز أسرع';
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);
  const reserve = () => {
    setReserved(true);
    onSuccess?.();
  };

  return (
    <>
      <div className="bg-charcoal px-6 py-2.5 text-center text-xs text-cream">احجز خصم الإصدار الأول — كن من أول 100 شخص</div>
      <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-charcoal/10 bg-cream/90 px-6 py-4 backdrop-blur-md sm:px-8">
        <Logo />
        <CTAButton variant="nav" onClick={() => scrollToId('preorder', { focusId: 'reserve-button' })}>احجز خصم الإصدار الأول</CTAButton>
      </nav>

      <main>
        <header className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-24">
          <div>
            <p className="mono mb-6 text-xs tracking-[3px] text-terra">مؤقّت ذكي لتركيز أفضل</p>
            <h1 className="text-[42px] font-bold leading-[1.08] tracking-tight sm:text-6xl">ركّز أكتر.<br /><span className="text-terra">أنجز أسرع.</span></h1>
            <p className="mt-7 max-w-md leading-relaxed text-ink-gray">FOKUS مش مجرد مؤقّت دي أداتك للتركيز والإنجاز. اقلبها. ركّز. وأنجز أكثر في وقت أقل.</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-light">دير وقتك بذكاء، لإنتاجية أعلى.<br />أتقن إدارة وقتك. وارتقِ بتركيزك.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <CTAButton variant="primary" onClick={() => scrollToId('preorder', { focusId: 'reserve-button' })}>احجز خصم الإصدار الأول</CTAButton>
              <span className="text-sm text-ink-light">مؤقّت ذكي ليوم أكثر إنتاجية</span>
            </div>
          </div>
          <div className="flex justify-center"><FocusCube scrollProgress={scrollProgress} /></div>
        </header>

        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <SectionHeading eyebrow="عن قرب" title="شوف FOKUS، اعرف أكتر عن" accent="FOKUS" />
          <img src={cubeImage} alt="مؤقت FOKUS" className="mt-12 h-[360px] w-full rounded-md object-cover shadow-lg sm:h-[460px]" />
        </section>

        <section id="preorder" className="mx-auto max-w-5xl px-6 pb-20 sm:px-8">
          <div className="grid gap-10 rounded-md border border-charcoal/10 bg-sand/60 p-8 shadow-[0_20px_60px_rgba(10,10,10,0.06)] md:grid-cols-2 sm:p-10">
            <div>
              <h2 className="text-xl font-bold">احجز خصم الإصدار الأول</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-gray">كن من أول 100 شخص واحصل على خصم حصري عند نزول المنتج.</p>
              <p className="mt-7 text-sm"><strong className="text-terra">{PREORDER_GOAL.booked} قاموا بالحجز</strong></p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-charcoal/10"><div className="h-full bg-terra" style={{ width: `${bookedPercent}%` }} /></div>
              <p className="mt-3 text-sm text-ink-gray">متبقي أقل من 30 طلب</p>
            </div>
            <div className="flex flex-col justify-center">
              <CTAButton id="reserve-button" variant="reserve" onClick={reserve}>{reserved ? 'تم حجز طلبك' : 'احجز طلبي'}</CTAButton>
              <p className="mt-3 text-center text-xs text-ink-light">هيوصلك رسالة بكود الخصم لما المنتج ينزل</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <SectionHeading eyebrow="المشكلة" title="بتذاكر وبتشتغل بالساعات، وبتحس إنك" accent="مخلصتش حاجة؟" />
        </section>

        <section id="about" className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <SectionHeading eyebrow="الحل" title="تقنية مثبتة علميًا لإدارة وقتك وزيادة إنتاجيتك،" accent="على مكتبك." />
          <div className="mt-16 space-y-16">
            {SOLUTION_STEPS.map((step) => <article key={step.number} className="grid gap-6 md:grid-cols-[140px_1fr] md:items-start"><div className="flex h-28 w-28 items-center justify-center rounded-full bg-sand text-5xl">{step.emoji}</div><div><p className="mono text-xs tracking-[2px] text-terra">{step.number}</p><h3 className="mt-2 text-2xl font-bold">{step.title}</h3><p className="mt-3 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-ink-gray">{step.text}</p></div></article>)}
          </div>
        </section>

        <section className="bg-charcoal px-6 py-20 text-cream sm:px-8"><div className="mx-auto max-w-6xl"><SectionHeading eyebrow="ليه 30 دقيقة؟" title="طريقة أفضل لإدارة وقتك" /><div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">{HOW_IT_WORKS.map((item) => <article key={item.num} className="rounded-sm border border-white/10 p-6"><p className="mono text-xl text-terra">{item.num} —</p><h3 className="mt-3 font-bold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-cream/60">{item.text}</p></article>)}</div></div></section>

        <section id="features" className="mx-auto max-w-5xl px-6 py-20 sm:px-8"><SectionHeading eyebrow="المواصفات" title="صُممت لتركيزك،" accent="مش لتشتيتك" /><div className="mt-14 grid gap-8 sm:grid-cols-3">{FEATURES.map((item) => <article key={item.title}><span className="text-3xl">{item.icon}</span><h3 className="mt-3 font-bold">{item.title}</h3><p className="mt-2 text-sm text-ink-gray">{item.text}</p></article>)}</div></section>

        <section id="buy" className="bg-sand/50 px-6 py-20 sm:px-8"><div className="mx-auto max-w-4xl"><SectionHeading eyebrow="احجز دلوقتي" title="استغل وقتك صح من" accent="النهاردة" /><div className="mt-12 grid gap-8 rounded-md border border-charcoal/10 bg-white p-8 md:grid-cols-2"><div className="flex min-h-48 items-center justify-center rounded-md bg-charcoal"><span className="mono text-3xl font-bold text-cream">FOKUS CUBE</span></div><div><h3 className="text-2xl font-bold">FOKUS CUBE</h3><p className="mt-1 text-sm text-ink-gray">تايمر بومودورو بنظام الجاذبية</p><ul className="mt-6 space-y-3">{BUY_LIST.map((line) => <li key={line} className="flex gap-2 text-sm"><HiCheck className="mt-0.5 shrink-0 text-terra" size={16} />{line}</li>)}</ul><CTAButton className="mt-7" variant="buy" onClick={() => scrollToId('preorder', { focusId: 'reserve-button' })}>احجز مكانك دلوقتي</CTAButton></div></div></div></section>

        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8"><SectionHeading eyebrow="آراء العملاء" title="ناس زودت إنتاجيتها" accent="فعلاً" /></section>
        <section className="mx-auto max-w-3xl px-6 pb-24 sm:px-8"><SectionHeading eyebrow="أسئلة شائعة" title="إزاي التايمر بيشتغل؟" /><p className="mt-8 rounded-md border border-charcoal/10 p-6 text-sm leading-relaxed text-ink-gray">{FAQS[0].a}</p></section>
      </main>

      <footer className="bg-charcoal px-6 py-12 text-center text-cream"><Logo className="text-cream" /><p className="mt-4 text-sm text-cream/60">ركّز. أنجز. كرّر.</p></footer>
    </>
  );
}
