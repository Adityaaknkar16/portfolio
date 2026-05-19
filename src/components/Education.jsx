import { education } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';

export default function Education() {
  return (
    <section id="education" className="section-surface relative py-24 md:py-32">
      <SectionMarginFX tag="// education" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <ScrollReveal direction="left">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">04 — Education</p>
          <h2 className="mt-2 font-display text-4xl italic text-cream md:text-5xl">
            Academic foundation
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-gold">Degrees</h3>
            </ScrollReveal>
            <div className="mt-6 space-y-6">
              {education.degrees.map((item, i) => (
                <ScrollReveal key={item.degree} direction="depth" delay={0.15 + i * 0.1}>
                  <div className="stat-accent glass rounded-lg p-5">
                    <p className="font-display text-xl text-cream">{item.degree}</p>
                    <p className="mt-2 font-mono text-sm text-cream/60">{item.school}</p>
                    <p className="mt-1 font-mono text-xs text-gold">{item.year}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal direction="right" delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-gold">
                Certifications
              </h3>
            </ScrollReveal>
            <ul className="mt-6 space-y-4">
              {education.certifications.map((cert, i) => (
                <ScrollReveal key={cert} direction="right" delay={0.15 + i * 0.08}>
                  <li className="stat-accent flex gap-3 text-sm leading-relaxed text-cream/75">
                    <span className="font-mono text-gold">✦</span>
                    {cert}
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
