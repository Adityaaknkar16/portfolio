import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Github, ExternalLink, AlertCircle, Cpu, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/projects');
        if (res.data && res.data.success) {
          setProjects(res.data.data);
        } else {
          throw new Error('Failed to load projects');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to retrieve projects from API.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
        <span className="text-sm text-slate-400 mt-4 font-mono">Loading projects from database...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-red-500/20 bg-red-500/5 rounded-xl p-8 text-center animate-fade-in">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-bold text-red-500">Error Fetching Projects</h3>
        <p className="text-slate-400 mt-2 max-w-sm text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Projects</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-purple-500">Curated Work and Open Source Contributions</p>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border border-dashed border-slate-700/60 rounded-xl p-8 text-center text-slate-400 font-mono">
          <span>No projects found. Please run the seed command.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div 
              key={project._id} 
              className="group bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 flex flex-col"
            >
              {/* Project Card Visual Placeholder/Thumbnail */}
              <div className="h-44 bg-gradient-to-br from-slate-905 to-slate-950 border-b border-slate-200 dark:border-slate-800/60 flex flex-col justify-between p-6 relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all duration-500"></div>
                <div className="flex justify-between items-start z-10">
                  <div className="text-3xl font-bold font-mono text-slate-200/20 group-hover:text-slate-200/40 transition duration-300">
                    {project.number || '00'}
                  </div>
                  <span className="text-[10px] tracking-wider uppercase bg-slate-800/80 px-2.5 py-0.5 rounded-full border border-slate-700 font-mono text-purple-400 font-bold">
                    {project.status || 'Active'}
                  </span>
                </div>

                <div className="flex items-center space-x-3 z-10">
                  <div className="p-2.5 bg-purple-950/40 border border-purple-800/25 rounded-lg text-purple-400 group-hover:scale-105 transition-transform duration-300">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-100 line-clamp-1 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Highlights/Bullet Points */}
                  <ul className="space-y-2 text-sm text-slate-400">
                    {project.highlights?.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-500 mr-2 font-semibold font-mono">▸</span>
                        <span className="line-clamp-2">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.stack?.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-mono bg-slate-800/30 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-850 px-2 py-0.5 rounded-md text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Links */}
                <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-800/60 pt-4 font-mono text-xs">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-slate-400 hover:text-white transition duration-200"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>

                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center space-x-1.5 text-purple-400 hover:text-purple-300 transition duration-200"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
