import { education } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';
import { SectionHeading } from './About';

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32 border-b border-border">
      <SectionMarginFX tag="// education.md" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <SectionHeading label="04 — Education" title="Academic foundation" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <ScrollReveal direction="left" delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                [ DEGREES ]
              </h3>
            </ScrollReveal>
            <div className="mt-6 space-y-6">
              {education.degrees.map((item, i) => (
                <ScrollReveal key={item.degree} direction="depth" delay={0.15 + i * 0.1}>
                  <div className="border-2 border-border bg-panel p-5 transition-all hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)]">
                    <p className="font-display text-xl font-bold uppercase text-white">{item.degree}</p>
                    <p className="mt-2 font-mono text-sm text-zinc-400">{item.school}</p>
                    <p className="mt-1 font-mono text-xs text-accent font-semibold">{item.year}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div>
            <ScrollReveal direction="right" delay={0.1}>
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                [ CERTIFICATIONS ]
              </h3>
            </ScrollReveal>
            <ul className="mt-6 space-y-4">
              {education.certifications.map((cert, i) => (
                <ScrollReveal key={cert} direction="right" delay={0.15 + i * 0.08}>
                  <li className="flex gap-3 text-sm leading-relaxed text-zinc-300 font-mono">
                    <span className="font-bold text-accent">&gt;</span>
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
