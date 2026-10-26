import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Play } from 'lucide-react';
import { SectionTitle } from './SectionTitle.jsx';
import { GALLERY_ITEMS } from '../constants/content.js';

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);



  // إعدادات أنيميشن فائقة النعومة
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 50, damping: 15 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 50, damping: 13 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, []);

  // التمرير التلقائي كل 2000ms
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, handleNext]);

  const currentItem = GALLERY_ITEMS[currentIndex];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
      <SectionTitle eyebrow="معرض المنتج" title="شوف الـ FOKUS" emphasis="عن قرب." />

      <div
        className="relative mt-14 flex flex-col items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Carousel Viewport */}
        <div className="relative h-[380px] w-full max-w-3xl overflow-hidden rounded-2xl border border-charcoal/10 bg-sand sm:h-[450px] shadow-sm">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -40) handleNext();
                else if (offset.x > 40) handlePrev();
              }}
              className="group absolute inset-0 flex flex-col items-center justify-end p-6 select-none cursor-grab active:cursor-grabbing"
            >
              {/* Image */}
              {currentItem.src ? (
                <img
                  src={currentItem.src}
                  alt={currentItem.label}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-6xl sm:text-7xl">{currentItem.icon}</span>
                </div>
              )}

              {/* Shadow Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />

              {/* Text Label */}
              <span className="relative z-10 text-lg font-medium text-cream sm:text-xl drop-shadow-sm">
                {currentItem.label}
              </span>


            </motion.div>
          </AnimatePresence>

          {/* Smooth Timer Progress Bar (شريط تقدم الوقت) */}
          {!isHovered && (
            <motion.div
              key={`progress-${currentIndex}`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'linear' }}
              className="absolute bottom-0 left-0 h-1 bg-charcoal/40 z-20"
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handleNext}
          aria-label="Previous Slide"
          className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-8 place-items-center rounded-full border border-charcoal/10 bg-sand/90 text-ink-gray backdrop-blur-md transition-all hover:bg-charcoal hover:text-cream active:scale-95 sm:right-4 shadow-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <button
          onClick={handlePrev}
          aria-label="Next Slide"
          className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-8 place-items-center rounded-full border border-charcoal/10 bg-sand/90 text-ink-gray backdrop-blur-md transition-all hover:bg-charcoal hover:text-cream active:scale-95 sm:left-4 shadow-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Dots Indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {GALLERY_ITEMS.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${index === currentIndex
                ? 'w-8 bg-charcoal'
                : 'w-2.5 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}