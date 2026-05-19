import { profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-surface-alt relative border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:px-8 md:text-left">
        <p className="font-mono text-xs text-cream/40">
          © {year} {profile.name}. Crafted with React & Framer Motion.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-gold transition-colors hover:text-gold-light"
        >
          github.com/Adityaaknkar16
        </a>
      </div>
    </footer>
  );
}
