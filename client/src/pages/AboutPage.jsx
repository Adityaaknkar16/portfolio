import React, { useState } from 'react';
import { 
  profile, 
  experience, 
  education 
} from '../data/content';
import { 
  Download, 
  Briefcase, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  User, 
  FileText 
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('intro');
  const [expandedJobIndex, setExpandedJobIndex] = useState(null);

  const toggleJobResponsibilities = (idx) => {
    setExpandedJobIndex(prev => (prev === idx ? null : idx));
  };

  const tabs = [
    { id: 'intro', label: 'Intro', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'career', label: 'Career', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">About Me</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-purple-500">Developer Profile & Professional Background</p>
      </div>

      {/* Tabs Sub-navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800/80 gap-6 overflow-x-auto pb-px">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 py-3 border-b-2 font-mono text-sm tracking-tight transition-all duration-200 shrink-0
                ${activeTab === tab.id 
                  ? 'border-purple-500 text-purple-400 font-semibold' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="mt-8 max-w-4xl">
        {activeTab === 'intro' && (
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 p-6 md:p-8 rounded-xl space-y-6 leading-relaxed">
            <h3 className="text-lg font-bold text-slate-100 font-mono">&lt;hello_world /&gt;</h3>
            <p className="text-slate-300 font-sans text-base">
              {profile.summary}
            </p>
            <p className="text-slate-400 font-sans text-sm">
              I specialize in working with React, Node.js, Express, and MongoDB to build reliable full-stack applications. 
              Additionally, I explore modern GenAI tools, implementing Retrieval-Augmented Generation (RAG) pipelines 
              to bring contextual intelligence to web applications.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono pt-4 border-t border-slate-250 dark:border-slate-800/50">
              <div>
                <span className="text-slate-500">LOCATION:</span> <span className="text-slate-300">{profile.location}</span>
              </div>
              <div>
                <span className="text-slate-500">EMAIL:</span> <a href={`mailto:${profile.email}`} className="text-purple-400 hover:underline">{profile.email}</a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-widest">Interactive Resume Viewer</span>
              <a 
                href="/resume-placeholder.pdf" // Placeholder path to download
                download="Aditya_Akankar_Resume.pdf"
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold font-mono text-xs px-4 py-2.5 rounded-lg shadow-md transition duration-200 self-start"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>

            {/* Embedded Resume Viewer */}
            <div className="border border-slate-200 dark:border-slate-800/60 rounded-xl overflow-hidden bg-slate-900/35 h-[600px] flex items-center justify-center">
              <iframe 
                src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Static public sample doc
                title="Resume Viewer"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}

        {activeTab === 'career' && (
          <div className="space-y-6">
            {experience.map((job, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6 transition duration-300 hover:border-purple-500/20"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{job.role}</h3>
                    <div className="text-sm text-purple-400 font-semibold mt-0.5">{job.company}</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">{job.period}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-purple-400 font-mono">
                      {job.location}
                    </span>
                  </div>
                </div>

                {/* Toggle Button for Responsibilities */}
                <button
                  onClick={() => toggleJobResponsibilities(idx)}
                  className="mt-5 flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition duration-200 focus:outline-none"
                >
                  <span>{expandedJobIndex === idx ? 'Hide Responsibilities' : 'Show Responsibilities'}</span>
                  {expandedJobIndex === idx ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {/* Responsibilities list */}
                {expandedJobIndex === idx && (
                  <ul className="mt-4 space-y-2.5 pl-4 border-l-2 border-purple-500/30 text-sm text-slate-400 transition-all duration-300">
                    {job.bullets?.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start">
                        <span className="text-purple-500 mr-2 font-mono">▪</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-8">
            {/* Degree timeline */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Degree History</h3>
              <div className="space-y-6">
                {education.degrees?.map((edu, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col sm:flex-row justify-between border-l border-slate-800/80 pl-6 relative space-y-1 sm:space-y-0"
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-purple-500 -translate-x-1/2"></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">{edu.degree}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{edu.school}</p>
                    </div>
                    <span className="text-xs text-purple-400 font-mono font-semibold self-start sm:self-center">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications card */}
            <div className="border border-slate-200 dark:border-slate-800/60 bg-slate-900/30 dark:bg-slate-900/20 rounded-xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400">Professional Certifications</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {education.certifications?.map((cert, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <span className="text-purple-500 font-mono">✔</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
