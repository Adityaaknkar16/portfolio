import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/content';
import { Typewriter, TypewriterLines } from './Typewriter';
import SectionMarginFX from './SectionMarginFX';

export default function Hero() {
  const [phase, setPhase] = useState(0);

  const nameLines = useMemo(
    () => [
      { text: 'Aditya', className: 'text-white' },
      { text: 'Sunil', className: 'text-accent font-extrabold uppercase' },
      { text: 'Akankar', className: 'text-white' },
    ],
    []
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <SectionMarginFX tag="// terminal.init()" />
      <motion.div
        className="pointer-events-none absolute inset-0 grid-hero opacity-60"
        style={{ perspective: 1000 }}
      />

      {/* Ambient accent glow */}
      <motion.div
        className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[500px] bg-accent/[0.02] blur-[120px] max-[900px]:hidden"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10 mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <span className="inline-flex items-center gap-2 border border-accent/40 bg-accent/5 px-4 py-2">
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse bg-accent shadow-[0_0_8px_#00ff66]" aria-hidden />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent sm:text-xs">
                <Typewriter
                  text={profile.heroTitle}
                  speed={48}
                  onComplete={() => setPhase(1)}
                />
              </span>
            </span>
            <motion.p
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 sm:text-[11px]"
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
            className="mt-6 font-display text-5xl leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            className="mt-8 max-w-xl font-mono text-sm leading-relaxed text-zinc-300 md:text-base border-l-2 border-accent/30 pl-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#projects"
              className="btn-brutalist-accent inline-block px-8 py-3.5 text-sm uppercase tracking-wider"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="btn-brutalist inline-block px-8 py-3.5 text-sm uppercase tracking-wider"
            >
              Get in Touch
            </a>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div
            className="mt-16 font-mono text-xs text-zinc-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-accent">&gt; </span>
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
