import { motion } from 'framer-motion';
import { CTAButton } from './CTAButton.jsx';
import { Logo } from './Logo.jsx';
import { scrollToId } from '../utils/scroll.js';

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="sticky top-0 z-40 flex items-center justify-between border-b border-charcoal/10 bg-cream/85 px-6 py-4 backdrop-blur-md sm:px-8"
    >
      <Logo />
      <CTAButton variant="nav" onClick={() => scrollToId('buy')}>
        اطلب دلوقتي
      </CTAButton>
    </motion.nav>
  );
}
