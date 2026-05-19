import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/content';
import { Typewriter, TypewriterLines } from './Typewriter';
import SectionMarginFX from './SectionMarginFX';

export default function Hero() {
  const [phase, setPhase] = useState(0);

  const nameLines = useMemo(
    () => [
      { text: 'Aditya', className: 'text-cream' },
      { text: 'Sunil', className: 'italic text-gold' },
      { text: 'Akankar', className: 'text-cream' },
    ],
    []
  );

  return (
    <section
      id="hero"
      className="section-surface relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <SectionMarginFX tag="// hero" />
      <motion.div
        className="pointer-events-none absolute inset-0 grid-overlay opacity-40"
        style={{ perspective: 1000 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-dark/25 to-dark/70" />

      {/* Ambient gold rays */}
      <motion.div
        className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[100px] max-[900px]:hidden"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, rotateY: 15, x: -40 }}
          animate={{ opacity: 1, rotateY: 0, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
        >
          <div className="inline-flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="hero-role-badge inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/[0.08] px-4 py-2 shadow-[0_0_32px_rgba(201,168,76,0.12)] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-gold shadow-[0_0_8px_#C9A84C]" aria-hidden />
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-gold-light sm:text-xs">
                <Typewriter
                  text={profile.heroTitle}
                  speed={48}
                  onComplete={() => setPhase(1)}
                />
              </span>
            </span>
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/45 sm:text-[11px]"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: phase >= 1 ? 1 : 0, x: phase >= 1 ? 0 : -8 }}
              transition={{ duration: 0.5 }}
            >
              {profile.heroTitleAccent}
            </motion.p>
          </div>
        </motion.div>

        {phase >= 1 && (
          <motion.h1
            className="mt-6 font-display text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, rotateX: 12, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
          >
            <TypewriterLines
              lines={nameLines}
              speed={72}
              lineDelay={280}
              onAllComplete={() => setPhase(2)}
            />
          </motion.h1>
        )}

        {phase >= 2 && (
          <motion.p
            className="typewriter-glow mt-8 max-w-xl font-mono text-base leading-relaxed text-cream/75 md:text-lg"
            initial={{ opacity: 0, rotateY: -12, x: 40 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
          >
            <Typewriter
              text={profile.summary}
              speed={18}
              onComplete={() => setPhase(3)}
            />
          </motion.p>
        )}

        {phase >= 3 && (
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#projects"
              className="cta-chamfer inline-block bg-gold px-8 py-3.5 font-mono text-sm font-medium uppercase tracking-wider text-dark transition-colors hover:bg-gold-light"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="cta-chamfer glass inline-block px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-cream transition-colors hover:border-gold/40 hover:text-gold"
            >
              Get in Touch
            </a>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div
            className="mt-16 font-mono text-xs text-cream/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Typewriter
              text={`${profile.location}  |  MERN · GenAI · RAG`}
              speed={35}
              delay={500}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
