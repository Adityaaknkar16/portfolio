import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/staticData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side */}
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
            Aditya Sunil Akankar
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
            &copy; {currentYear} Personal Portfolio. All rights reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 text-slate-400 dark:text-slate-500">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            title="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            title="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
