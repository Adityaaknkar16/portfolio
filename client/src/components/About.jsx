import { motion } from 'framer-motion';
import { User, Code, Heart, Sparkles } from 'lucide-react';
import { profile } from '../data/staticData';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <User className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            About Me
          </h2>
          <div className="h-1 w-12 bg-teal-500 mt-2" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Main Biography */}
          <div className="md:col-span-8 space-y-6 text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-slate-700 dark:text-slate-350 text-base leading-relaxed"
            >
              Full-stack developer with experience building scalable web apps and AI-powered systems using the MERN stack, GenAI, and RAG pipelines. My main objective is to design developer architectures that are both clean and reliable, without sacrificing modern frontend styling.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-slate-700 dark:text-slate-350 text-base leading-relaxed"
            >
              I specialize in combining traditional JavaScript frameworks like React, Node, and Express with state-of-the-art vector databases (like Qdrant) and LLM wrappers (such as LangChain) to develop intelligent retrieval applications that perform.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-slate-700 dark:text-slate-350 text-base leading-relaxed"
            >
              Whether handling asynchronous video conferencing over WebRTC, integrating robust payment processors, or modeling clean schemas in MongoDB/Mongoose, I thrive on challenging, production-ready tasks.
            </motion.p>
          </div>

          {/* Highlights sidecard */}
          <div className="md:col-span-4 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-left"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                Focus & Focus areas
              </h3>
              
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <div className="mt-1 p-1 rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
                    <Code className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">MERN Development</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Creating scalable and responsive APIs and Single Page Applications.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1 p-1 rounded-md bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">GenAI & RAG Systems</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Building context-aware AI tools using LangChain and Qdrant.</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
