import { profile } from '../data/content';
import ScrollReveal from './ScrollReveal';
import SectionMarginFX from './SectionMarginFX';
import { SectionHeading } from './About';

const contactItems = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'Phone', value: profile.phone, href: `tel:${profile.phone.replace(/-/g, '')}` },
  { label: 'GitHub', value: 'Adityaaknkar16', href: profile.github },
  { label: 'Location', value: profile.location, href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-b border-border">
      <SectionMarginFX tag="// contact.sh" />
      <div className="relative z-10 mx-auto max-w-content px-6 md:px-8">
        <SectionHeading label="06 — Contact" title="Let's connect" direction="right" />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {contactItems.map((item, i) => (
            <ScrollReveal key={item.label} direction="depth" delay={i * 0.08}>
              <div className="group border-2 border-border bg-panel p-6 transition-all hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(0,255,102,1)]">
                <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.label === 'GitHub' ? '_blank' : undefined}
                    rel={item.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                    className="mt-3 block font-mono text-sm text-zinc-300 transition-colors group-hover:text-accent font-semibold"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 font-mono text-sm text-zinc-400">{item.value}</p>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="depth" delay={0.4}>
          <div className="mt-12 text-center">
            <a
              href={`mailto:${profile.email}?subject=Portfolio%20Inquiry`}
              className="btn-brutalist-accent inline-block px-10 py-4 font-mono text-sm uppercase tracking-wider font-bold"
            >
              Send a Message
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
