import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';
import { SectionHeading } from './About';

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 35,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 35,
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
        className="group relative flex h-full flex-col overflow-hidden border-2 border-border bg-panel"
        whileHover={{ scale: 1.01 }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b-2 border-border bg-bg/50 px-4 py-2 font-mono text-[10px] text-zinc-500">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 border border-border" />
            <span className="h-2 w-2 border border-border" />
            <span className="h-2 w-2 border border-border" />
          </div>
          <span>src/projects/{project.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.py</span>
        </div>

        <span
          className="pointer-events-none absolute right-4 bottom-14 font-display text-8xl font-black text-accent opacity-[0.03] select-none"
          aria-hidden
        >
          {project.number}
        </span>

        <div className="relative z-10 flex flex-1 flex-col p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-xl font-bold uppercase text-white tracking-tight">{project.title}</h3>
            <span className="shrink-0 border border-accent bg-accent/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-accent font-semibold">
              {project.status}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="border border-border bg-bg px-2 py-0.5 font-mono text-[9px] text-zinc-400">
                {tech}
              </span>
            ))}
          </div>

          <ul className="mt-6 flex-1 space-y-3 font-mono text-xs">
            {project.highlights.map((h) => (
              <li key={h} className="text-zinc-400 leading-relaxed flex gap-2">
                <span className="text-accent shrink-0">&gt;</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 border border-border bg-bg px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-all hover:border-accent hover:bg-accent hover:text-black font-semibold"
          >
            git clone repo
            <span aria-hidden>↗</span>
          </a>
        </div>

        <span className="absolute bottom-0 left-0 h-1 w-full bg-accent scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
      </motion.article>
    </ScrollReveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 border-b border-border">
      <SectionMarginFX tag="// projects.sh" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <SectionHeading label="03 — Projects" title="Selected work" />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
