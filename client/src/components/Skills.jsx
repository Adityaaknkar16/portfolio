import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Layout, Database, Layers, Wrench } from 'lucide-react';
import { staticSkills } from '../data/staticData';
import api from '../lib/api';

const categoryIcons = {
  Languages: Cpu,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  'AI/GenAI': Layers,
};

export default function Skills() {
  const [skillsData, setSkillsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get('/skills');
        if (response.data && response.data.success && response.data.data && Object.keys(response.data.data).length > 0) {
          setSkillsData(response.data.data);
        } else {
          setSkillsData(staticSkills);
        }
      } catch (error) {
        console.warn('API error fetching skills. Falling back to static skills:', error);
        setSkillsData(staticSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const displayData = skillsData || staticSkills;

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Skills & Expertise
          </h2>
          <div className="h-1 w-12 bg-teal-500 mt-2" />
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(displayData).map(([category, items], catIdx) => {
            const Icon = categoryIcons[category] || Cpu;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-left hover:border-teal-500/30 transition-all duration-300 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-350 border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
