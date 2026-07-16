import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Github, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { staticProjects } from '../data/staticData';
import api from '../lib/api';

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        if (response.data && response.data.success && response.data.data && response.data.data.length > 0) {
          setProjectsData(response.data.data);
        } else {
          setProjectsData(staticProjects);
        }
      } catch (error) {
        console.warn('API error fetching projects. Using static backup data:', error);
        setProjectsData(staticProjects);
      }
    };
    fetchProjects();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              Featured Projects
            </h2>
            <div className="h-1 w-12 bg-teal-500 mt-2" />
          </div>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
            // hover for preview simulation
          </span>
        </div>

        {/* Horizontal Project Cards Stack */}
        <div className="space-y-6">
          {projectsData.map((project, idx) => {
            const isExpanded = expandedId === project._id || expandedId === idx;
            const isHovered = hoveredId === project._id || hoveredId === idx;
            const uniqueId = project._id || idx;

            return (
              <motion.div
                key={uniqueId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md hover:border-teal-500/20 transition-all duration-300 text-left relative"
                onMouseEnter={() => setHoveredId(uniqueId)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Simulated screenshot live-preview on hover */}
                {isHovered && (
                  <div className="absolute top-2 right-4 z-20 pointer-events-none hidden lg:block animate-in fade-in zoom-in-95 duration-200">
                    <div className="w-56 h-32 rounded-lg border border-teal-500/30 bg-slate-950/90 flex flex-col items-center justify-center p-3 text-center shadow-lg">
                      <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping" />
                        Live Status
                      </span>
                      <span className="text-xs font-bold text-white mb-2">{project.title}</span>
                      <span className="text-[9px] font-mono text-slate-400 truncate w-full">{project.github}</span>
                    </div>
                  </div>
                )}

                {/* Main Visible Content */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Info Column */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-mono text-teal-600 dark:text-teal-400 font-semibold">{project.number}</span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                        {project.status}
                      </span>
                    </div>

                    {/* Stack pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-teal-500/5 text-teal-600 dark:text-teal-400 border border-teal-500/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-3 self-start md:self-auto">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    
                    {/* Live Demo button simulation */}
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert('Redirecting to project sandbox live demo...'); }}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-teal-650 dark:text-slate-400 dark:hover:text-teal-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>

                    <button
                      onClick={() => toggleExpand(uniqueId)}
                      className="px-4 py-2 rounded-lg bg-teal-500/5 hover:bg-teal-500/10 text-teal-600 dark:text-teal-400 text-sm font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Case Study</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Case Study Details Expandable Box */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800"
                    >
                      <div className="p-6 md:p-8 space-y-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
                          Project Highlights & Implementation details
                        </h4>
                        <ul className="space-y-2.5">
                          {project.highlights.map((highlight, hIdx) => (
                            <li key={hIdx} className="text-sm text-slate-600 dark:text-slate-350 flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
