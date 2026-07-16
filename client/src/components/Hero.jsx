import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowRight, Terminal, User } from 'lucide-react';
import { profile } from '../data/staticData';

export default function Hero() {
  const [whoamiActive, setWhoamiActive] = useState(false);
  const [whoamiLogs, setWhoamiLogs] = useState([]);

  const triggerWhoami = () => {
    if (whoamiActive) return;
    setWhoamiActive(true);
    const logs = [
      'Initializing whoami protocol...',
      'Mapping identity blocks...',
      'Name: Aditya Sunil Akankar',
      'Role: Full-Stack Engineer & GenAI developer',
      'Specialties: MERN (React/Node) & RAG system deployment',
      'Core Mission: Building performant, user-centric software.',
      'whoami check completed successfully.'
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setWhoamiLogs(prev => [...prev, log]);
      }, (index + 1) * 350);
    });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.06),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.12),rgba(15,23,42,0))]" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Developer Info */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Available for Opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4"
          >
            Hi, I'm <span className="text-teal-600 dark:text-teal-400">{profile.name}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 mb-6 font-mono"
          >
            {profile.heroTitleAccent}
          </motion.h2>

          {/* One-liner Intro */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-slate-600 dark:text-slate-400 text-base max-w-xl mb-8 leading-relaxed"
          >
            {profile.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/10 flex items-center gap-2"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 font-medium text-slate-800 dark:text-slate-200 transition-colors"
            >
              Get in Touch
            </a>
            <button
              onClick={triggerWhoami}
              className="px-4 py-3 rounded-lg font-mono text-xs border border-teal-500/20 hover:border-teal-500/60 bg-teal-500/5 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 transition-all flex items-center gap-2"
            >
              <User className="h-3.5 w-3.5" />
              whoami easter_egg
            </button>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-5 text-slate-400 dark:text-slate-500"
          >
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Asymmetric Interactive Terminal graphic */}
        <div className="lg:col-span-5 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xl"
          >
            {/* Terminal bar */}
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-850">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <Terminal className="h-3 w-3" />
                bash - aditya@portfolio
              </span>
            </div>

            {/* Terminal screen */}
            <div className="p-5 font-mono text-xs text-left min-h-[300px] flex flex-col gap-2.5 overflow-y-auto max-h-[350px]">
              <div>
                <span className="text-teal-400">guest@aditya-portfolio:~$ </span>
                <span className="text-slate-100">node system_status.js</span>
              </div>
              <div className="text-slate-400">--- SYSTEM STATUS REPORT ---</div>
              <div className="text-slate-400">OS: MERN-Custom-Kernel-2026</div>
              <div className="text-slate-400">Uptime: 99.9%</div>
              <div className="text-slate-400">Services Active: Client (React+Vite), Server (Express+Mongoose), DB (Atlas)</div>
              <div className="text-emerald-400">● MERN_PORTFOLIO_DAEMON [ONLINE]</div>
              
              {/* Easter Egg Logs */}
              {whoamiActive ? (
                <>
                  <div className="border-t border-slate-800 my-2 pt-2 text-slate-500">&gt; executing whoami trigger</div>
                  {whoamiLogs.map((log, i) => (
                    <div key={i} className="text-slate-100 animate-fade-in">
                      {log.startsWith('Name') || log.startsWith('Role') || log.startsWith('Specialties') ? (
                        <span className="text-amber-400">{log}</span>
                      ) : (
                        <span>{log}</span>
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="mt-4 text-slate-500 italic">
                  [Tip: Click "whoami easter_egg" button to query local environment metadata]
                </div>
              )}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
