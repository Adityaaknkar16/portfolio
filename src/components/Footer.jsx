import { profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t-2 border-border bg-panel py-10">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:px-8 md:text-left">
        <p className="font-mono text-xs text-zinc-500">
          © {year} {profile.name}. Crafted with React, Tailwind & Framer Motion.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-accent transition-colors hover:text-white font-bold"
        >
          github.com/Adityaaknkar16
        </a>
      </div>
    </footer>
  );
}
