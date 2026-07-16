import { motion } from 'framer-motion';
import { Calendar, Award, GraduationCap } from 'lucide-react';
import { experience, education } from '../data/staticData';

export default function Timeline() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Experience Column */}
          <div className="text-left">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                Work Experience
              </h2>
              <div className="h-1 w-12 bg-teal-500 mt-2" />
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 space-y-10">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white dark:border-slate-900 bg-teal-500 transition-transform group-hover:scale-125" />
                  
                  <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wider block mb-1">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {item.company} &middot; <span className="font-normal text-xs">{item.location}</span>
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div className="text-left">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                Education
              </h2>
              <div className="h-1 w-12 bg-teal-500 mt-2" />
            </div>

            <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 space-y-10">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white dark:border-slate-900 bg-teal-500 transition-transform group-hover:scale-125" />
                  
                  <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold uppercase tracking-wider block mb-1">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.degree}
                  </h3>
                  <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
                    {item.school}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
