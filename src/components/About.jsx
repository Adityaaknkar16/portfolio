import { profile, skills, stats } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';

function SectionHeading({ label, title, direction = 'left' }) {
  return (
    <ScrollReveal direction={direction}>
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">&gt; {label}</p>
      <h2 className="mt-2 font-display text-4xl font-extrabold uppercase text-white md:text-5xl tracking-tight">{title}</h2>
    </ScrollReveal>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-b border-border">
      <SectionMarginFX tag="// about.json" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <SectionHeading label="01 — About" title="Crafting digital experiences" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 flex flex-col justify-between">
            <ScrollReveal direction="left" delay={0.1}>
              <p className="text-base leading-relaxed text-zinc-300 border-l-2 border-accent/30 pl-4">{profile.summary}</p>
            </ScrollReveal>

            <ScrollReveal direction="depth" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-accent p-6">
                    <p className="font-mono text-3xl font-bold text-accent">{stat.value}</p>
                    <p className="mt-2 font-mono text-xs uppercase tracking-wider text-zinc-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="bg-panel border-2 border-border p-6 md:p-8">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                [ TECHNICAL ARSENAL ]
              </h3>
              <div className="mt-8 space-y-8">
                {Object.entries(skills).map(([category, items], idx) => (
                  <div key={category}>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                      {String(idx + 1).padStart(2, '0')} / {category.toUpperCase()}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
export { SectionHeading };
