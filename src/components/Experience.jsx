import { motion } from 'framer-motion';
import { experience } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';

export default function Experience() {
  return (
    <section id="experience" className="section-surface relative py-24 md:py-32">
      <SectionMarginFX tag="// experience" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <ScrollReveal direction="right">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">02 — Experience</p>
          <h2 className="mt-2 font-display text-4xl italic text-cream md:text-5xl">
            Professional journey
          </h2>
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-16px)] w-px bg-gold/20 md:block" />

          {experience.map((job, i) => (
            <ScrollReveal key={job.company} direction="left" delay={i * 0.15}>
              <article className="relative flex gap-8 pb-12 last:pb-0">
                <div className="relative z-10 mt-1.5 hidden shrink-0 md:block">
                  <motion.div
                    className="relative h-4 w-4 rounded-full border-2 border-gold bg-dark"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-full bg-gold/30"
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </div>

                <div className="flex-1 glass rounded-xl border border-white/5 p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl text-cream">{job.role}</h3>
                      <p className="mt-1 font-mono text-sm text-gold">{job.company}</p>
                    </div>
                    <div className="text-right font-mono text-xs text-cream/50">
                      <p>{job.period}</p>
                      <p className="mt-1 text-accent-green">{job.location}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-cream/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
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
