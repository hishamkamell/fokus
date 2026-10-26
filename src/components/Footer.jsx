import { motion } from 'framer-motion';
import { Logo } from './Logo.jsx';
import { FOOTER_LINKS } from '../constants/content.js';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-5 border-t border-charcoal/10 px-6 py-12 text-center sm:px-8"
    >
      <Logo />
      <nav className="flex flex-wrap justify-center gap-6 text-sm text-ink-gray">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noreferrer' : undefined}
            className="transition-colors hover:text-terra"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="mono text-xs text-ink-light">FOKUS © 2025 — ركّز. نفّذ. كرّر.</div>
    </motion.footer>
  );
}
