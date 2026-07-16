import { motion } from 'framer-motion';
import { experience } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';
import { SectionHeading } from './About';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 border-b border-border">
      <SectionMarginFX tag="// experience.log" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <SectionHeading label="02 — Experience" title="Professional journey" direction="right" />

        <div className="relative mt-16">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-0.5 bg-accent/20 md:block" />

          {experience.map((job, i) => (
            <ScrollReveal key={job.company} direction="left" delay={i * 0.15}>
              <article className="relative flex gap-8 pb-12 last:pb-0">
                <div className="relative z-10 mt-2.5 hidden shrink-0 md:block">
                  <motion.div
                    className="relative h-3 w-3 border-2 border-accent bg-bg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-accent/30"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                <div className="flex-1 border-2 border-border bg-panel p-6 md:p-8 transition-all hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-bold uppercase text-white">{job.role}</h3>
                      <p className="mt-1 font-mono text-sm text-accent font-bold">@ {job.company}</p>
                    </div>
                    <div className="text-left md:text-right font-mono text-xs text-zinc-500">
                      <p>{job.period}</p>
                      <p className="mt-1 text-accent font-semibold">{job.location.toUpperCase()}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-zinc-400"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
