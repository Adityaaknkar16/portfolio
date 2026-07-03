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
      className="fixed left-0 right-0 top-0 z-50 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.nav
        className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-8 border-b-2"
        animate={{
          backgroundColor: scrolled ? '#111215' : 'transparent',
          borderBottomColor: scrolled ? '#1d2026' : 'transparent',
        }}
        style={{
          borderBottomStyle: 'solid',
        }}
      >
        <Link
          to="/"
          className="font-mono text-sm font-bold text-accent transition-colors hover:text-white"
        >
          [ ASA ]
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.hash}>
              <a
                href={link.hash}
                className="nav-link font-mono text-xs uppercase tracking-widest"
              >
                ~/ {link.label.toLowerCase()}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="font-mono text-xs text-accent border border-accent/35 px-3 py-1.5 hover:bg-accent/10 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'SYS.CLOSE()' : 'SYS.MENU()'}
        </button>
      </motion.nav>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b-2 border-border bg-panel px-6 py-6 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.hash}>
                <a
                  href={link.hash}
                  className="font-mono text-sm uppercase tracking-widest text-zinc-300 hover:text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  ~/ {link.label.toLowerCase()}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
