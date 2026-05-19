import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { navLinks } from '../data/content';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 48);
  });

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 transition-colors duration-500"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-8"
        animate={{
          backgroundColor: scrolled ? 'rgba(13, 13, 13, 0.92)' : 'rgba(13, 13, 13, 0)',
          borderBottomColor: scrolled ? 'rgba(201, 168, 76, 0.15)' : 'rgba(255,255,255,0)',
        }}
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
        }}
      >
        <Link
          to="/"
          className="font-display text-lg italic text-gold transition-colors hover:text-gold-light"
        >
          ASA
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.hash}>
              <a
                href={link.hash}
                className="font-mono text-xs uppercase tracking-widest text-cream/70 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="font-mono text-xs text-gold md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </motion.nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-t border-white/5 bg-dark/95 px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <a
                  href={link.hash}
                  className="font-mono text-sm uppercase tracking-widest text-cream/80"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
