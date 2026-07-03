import { leadership } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';
import { SectionHeading } from './About';

export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 md:py-32 border-b border-border">
      <SectionMarginFX tag="// leadership.log" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <SectionHeading label="05 — Leadership" title="Beyond the code" />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {leadership.map((item, i) => (
            <ScrollReveal
              key={item.title}
              direction={i === 0 ? 'left' : 'right'}
              delay={i * 0.12}
            >
              <article className="border-2 border-border bg-panel p-8 transition-all hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)]">
                <span className="font-mono text-xs text-accent font-bold">[ 0{i + 1} ]</span>
                <h3 className="mt-4 font-display text-2xl font-bold uppercase text-white tracking-tight">{item.title}</h3>
                <p className="mt-4 font-mono text-xs leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
