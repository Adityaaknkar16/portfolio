import { profile } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';

const contactItems = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/-/g, '')}` },
  { label: 'GitHub', value: 'Adityaaknkar16', href: profile.github },
  { label: 'Location', value: profile.location, href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="section-surface relative py-24 md:py-32">
      <SectionMarginFX tag="// contact" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <ScrollReveal direction="right">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">06 — Contact</p>
          <h2 className="mt-2 font-display text-4xl italic text-cream md:text-5xl">
            Let&apos;s connect
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactItems.map((item, i) => (
            <ScrollReveal key={item.label} direction="depth" delay={i * 0.08}>
              <div className="glass group rounded-xl border border-white/5 p-6 transition-colors hover:border-gold/25">
                <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.label === 'GitHub' ? '_blank' : undefined}
                    rel={item.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                    className="mt-3 block text-sm text-cream/80 transition-colors group-hover:text-gold-light"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 text-sm text-cream/80">{item.value}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="depth" delay={0.4}>
          <div className="mt-12 text-center">
            <a
              href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
              className="cta-chamfer inline-block bg-gold px-10 py-4 font-mono text-sm font-medium uppercase tracking-wider text-dark transition-colors hover:bg-gold-light"
            >
              Send a Message
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
