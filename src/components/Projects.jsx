import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal direction={index % 2 === 0 ? 'depth' : 'left'} delay={index * 0.12}>
      <motion.article
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-dark-3 p-6 md:p-8"
        whileHover={{ scale: 1.01 }}
      >
        <span
          className="pointer-events-none absolute right-4 top-2 font-display text-7xl font-bold text-cream opacity-[0.08]"
          aria-hidden
        >
          {project.number}
        </span>

        <div className="relative z-10 flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl text-cream md:text-2xl">{project.title}</h3>
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-gold">
              {project.status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="font-mono text-[10px] text-cream/40">
                `{tech}`
              </span>
            ))}
          </div>

          <ul className="mt-6 flex-1 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="text-sm text-cream/65">
                → {h}
              </li>
            ))}
          </ul>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gold transition-colors hover:text-gold-light"
          >
            View on GitHub
            <span aria-hidden>↗</span>
          </a>
        </div>

        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
      </motion.article>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-surface-alt relative py-24 md:py-32">
      <SectionMarginFX tag="// projects" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <ScrollReveal direction="depth">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">03 — Projects</p>
          <h2 className="mt-2 font-display text-4xl italic text-cream md:text-5xl">
            Selected work
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
