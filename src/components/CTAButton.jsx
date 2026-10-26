import { memo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  primary:
    'bg-terra text-white shadow-terra hover:bg-terra-deep hover:shadow-terra-lg px-9 py-4 text-base font-semibold',
  nav: 'bg-charcoal text-cream hover:bg-terra px-5 py-2.5 text-sm font-medium',
  reserve: 'bg-terra text-white shadow-terra hover:bg-terra-deep w-full py-4 text-base font-semibold',
  buy: 'bg-charcoal text-cream hover:bg-terra w-full py-4 text-base font-semibold shadow-terra',
};

/**
 * Shared call-to-action button. Handles ripple feedback, a subtle magnetic
 * pull toward the cursor, and an optional loading spinner for async actions.
 */
function CTAButtonBase({
  children,
  variant = 'primary',
  type = 'button',
  onClick,
  loading = false,
  disabled = false,
  glow = false,
  className = '',
  ...rest
}) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);

  const handlePointerMove = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.08;
    const y = (e.clientY - r.top - r.height / 2) * 0.18;
    el.style.setProperty('--magnet-x', `${x}px`);
    el.style.setProperty('--magnet-y', `${y}px`);
  };

  const handlePointerLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    el.style.setProperty('--magnet-x', '0px');
    el.style.setProperty('--magnet-y', '0px');
  };

  const handleClick = (e) => {
    const el = btnRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, size, x: e.clientX - r.left - size / 2, y: e.clientY - r.top - size / 2 },
      ]);
      setTimeout(() => setRipples((prev) => prev.filter((rp) => rp.id !== id)), 650);
    }
    onClick?.(e);
  };

  return (
    <motion.button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      style={{ translate: 'var(--magnet-x, 0px) var(--magnet-y, 0px)' }}
      className={`relative isolate overflow-hidden rounded-sm transition-[background-color,box-shadow] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-70 ${
        glow ? 'animate-pulseGlow' : ''
      } ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      <span className={`inline-flex items-center justify-center gap-2 transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </span>

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        </span>
      )}

      {ripples.map((rp) => (
        <span
          key={rp.id}
          className="pointer-events-none absolute rounded-full bg-white/30"
          style={{
            width: rp.size,
            height: rp.size,
            left: rp.x,
            top: rp.y,
            animation: 'ripple-expand 650ms ease-out forwards',
          }}
        />
      ))}
    </motion.button>
  );
}

export const CTAButton = memo(CTAButtonBase);
