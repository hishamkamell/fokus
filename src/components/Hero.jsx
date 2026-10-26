import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CTAButton } from './CTAButton.jsx';
import { FocusCube } from './FocusCube.jsx';
import { BRAND } from '../constants/content.js';
import { scrollToId } from '../utils/scroll.js';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// The H1 gets its own variant: a blur-to-sharp reveal layered on top of the
// usual fade-up, for a slightly more premium "focus pull" entrance.
const headline = {
  hidden: { opacity: 0, y: 22, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// The CTA row lands with a spring instead of an ease-out, so it has a touch
// more energy than the rest of the staggered copy.
const actionsSpring = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 18, delay: 0.05 },
  },
};

export function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Tracks scroll progress across the hero's own height: 0 when the hero
  // top hits the viewport top, 1 once the hero has fully scrolled past.
  // This drives every scroll-linked effect below — nothing here is a
  // one-time `whileInView` trigger.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax depth: copy and cube travel at different speeds as the user
  // scrolls, so the two layers separate instead of moving as one flat
  // plane (same idea as the foreground/background split on Linear/Stripe
  // heroes). The cube's own "fall away" motion (rotation/scale/opacity)
  // lives inside FocusCube — this is purely the vertical offset layer.
  const copyParallaxY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const cubeParallaxY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <header
      ref={heroRef}
      className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 md:grid-cols-2 md:py-24"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={prefersReducedMotion ? undefined : { y: copyParallaxY }}
      >
        <motion.div variants={item} className="mono mb-6 text-xs uppercase tracking-[3px] text-terra">
          الساعة اللي بتغيّر طريقة شغلك
        </motion.div>

        <motion.h1
          variants={headline}
          className="mb-6 text-balance  text-[38px] font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-[68px]"
        >
          <span> ٢٥ دقيقة كافية.</span>
          <br />
          <em className="font-bold not-italic text-terra"><p className="pt-5">لو عارف تشتغل</p>  </em>
        </motion.h1>

        <motion.p variants={item} className="mb-9 max-w-md font-light leading-relaxed text-ink-gray">
          FOKUS مش مجرد ساعة توقيت. دي أداة بتفصل بين وقت بتضيّعه، ووقت بتملكه. اقلبها، ركّز، وخلّص ضعف الشغل في نص
          الوقت.
        </motion.p>

        <motion.div variants={actionsSpring} className="flex flex-wrap items-center gap-5">
          <CTAButton variant="primary" onClick={() => scrollToId('buy')}>
            اطلب الـ FOKUS بتاعك
          </CTAButton>
          <div className="flex flex-col gap-0.5">
            <span className="text-[22px] font-bold">{BRAND.price}</span>
            <span className="text-xs text-ink-light">شامل الضريبة • دفع عند الاستلام</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={prefersReducedMotion ? undefined : { y: cubeParallaxY }}
        className="flex justify-center"
      >
        {/* scrollYProgress is passed straight through — FocusCube owns all
            the scroll-tied rotation/scale/opacity math internally, this
            wrapper only handles the parallax vertical offset. */}
        <FocusCube scrollProgress={scrollYProgress} />
      </motion.div>
    </header>
  );
}