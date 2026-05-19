import { leadership } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';

export default function Leadership() {
  return (
    <section id="leadership" className="section-surface-alt relative py-24 md:py-32">
      <SectionMarginFX tag="// leadership" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <ScrollReveal direction="depth">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">05 — Leadership</p>
          <h2 className="mt-2 font-display text-4xl italic text-cream md:text-5xl">
            Beyond the code
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {leadership.map((item, i) => (
            <ScrollReveal
              key={item.title}
              direction={i === 0 ? 'left' : 'right'}
              delay={i * 0.12}
            >
              <article className="glass h-full rounded-xl border border-white/5 p-8 transition-colors hover:border-gold/20">
                <span className="font-mono text-xs text-gold">0{i + 1}</span>
                <h3 className="mt-4 font-display text-2xl text-cream">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-cream/70">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
