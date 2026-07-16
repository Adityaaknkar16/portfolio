import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { 
  GitBranch, 
  GitPullRequest, 
  AlertCircle, 
  Clock, 
  Calendar,
  Code2
} from 'lucide-react';

export default function StatsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/stats');
        if (res.data && res.data.success) {
          setData(res.data.data);
        } else {
          throw new Error('Failed to load stats');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Something went wrong while fetching stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-850 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => (
            <div key={n} className="h-28 bg-slate-200 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800"></div>
          ))}
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-red-500/20 bg-red-500/5 rounded-xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-bold text-red-500">Error Loading Stats</h3>
        <p className="text-slate-400 mt-2 max-w-sm text-sm">{error}</p>
      </div>
    );
  }

  const { github, wakatime } = data || {};

  // Helper to chunk heatmap array into weeks of 7 days
  const getWeeks = (heatmap) => {
    if (!heatmap) return [];
    const weeks = [];
    for (let i = 0; i < heatmap.length; i += 7) {
      weeks.push(heatmap.slice(i, i + 7));
    }
    return weeks;
  };

  const getHeatmapColor = (count) => {
    if (count === 0) return 'bg-slate-200 dark:bg-slate-900';
    if (count <= 2) return 'bg-teal-200 dark:bg-teal-950/60';
    if (count <= 4) return 'bg-teal-400 dark:bg-teal-800/80';
    if (count <= 6) return 'bg-teal-600 dark:bg-teal-600';
    return 'bg-teal-800 dark:bg-teal-400';
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Stats</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-teal-500">Developer Metrics Dashboard</p>
      </div>

      {/* GitHub Contributions Grid */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
          GitHub Activities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 hover:border-emerald-500/30 transition duration-300">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Total Commits</span>
            <div className="text-3xl font-bold font-mono mt-2">{github?.totalCommits}</div>
            <div className="flex justify-between text-xs text-slate-400 mt-3 border-t border-slate-200 dark:border-slate-800/60 pt-2 font-mono">
              <span>{github?.personal.username}: {github?.personal.commits}</span>
              <span>{github?.work.username}: {github?.work.commits}</span>
            </div>
          </div>

          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 hover:border-emerald-500/30 transition duration-300">
            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-400">Pull Requests</span>
            <div className="text-3xl font-bold font-mono mt-2">{github?.totalPRs}</div>
            <div className="flex justify-between text-xs text-slate-400 mt-3 border-t border-slate-200 dark:border-slate-800/60 pt-2 font-mono">
              <span>Personal: {github?.personal.prs}</span>
              <span>Work: {github?.work.prs}</span>
            </div>
          </div>

          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 hover:border-emerald-500/30 transition duration-300">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">Issues Closed</span>
            <div className="text-3xl font-bold font-mono mt-2">{github?.totalIssues}</div>
            <div className="flex justify-between text-xs text-slate-400 mt-3 border-t border-slate-200 dark:border-slate-800/60 pt-2 font-mono">
              <span>Personal: {github?.personal.issues}</span>
              <span>Work: {github?.work.issues}</span>
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Heatmaps */}
      <section className="space-y-6">
        {/* Personal Heatmap */}
        <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-mono">Personal Graph ({github?.personal.username})</h3>
            <span className="text-xs text-slate-400 font-mono">Past 365 Days</span>
          </div>
          <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-thin">
            {getWeeks(github?.personal.heatmap).map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
                {week.map((day, dIdx) => (
                  <div 
                    key={dIdx}
                    className={`w-[10px] h-[10px] rounded-[1px] ${getHeatmapColor(day.count)} transition duration-200`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Work Heatmap */}
        <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold font-mono">Office Graph ({github?.work.username})</h3>
            <span className="text-xs text-slate-400 font-mono">Past 365 Days</span>
          </div>
          <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-thin">
            {getWeeks(github?.work.heatmap).map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
                {week.map((day, dIdx) => (
                  <div 
                    key={dIdx}
                    className={`w-[10px] h-[10px] rounded-[1px] ${getHeatmapColor(day.count)} transition duration-200`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WakaTime Weekly Stats */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          Weekly Coding Stats (WakaTime)
        </h2>

        {/* Overall numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">Daily Average</span>
            <div className="text-2xl font-bold font-mono mt-1">{wakatime?.dailyAverage}</div>
          </div>
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">This Week Total</span>
            <div className="text-2xl font-bold font-mono mt-1">{wakatime?.thisWeekTotal}</div>
          </div>
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-5 col-span-1 sm:col-span-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400 font-sans">Best Day</span>
            <div className="text-lg font-bold font-mono mt-1 truncate">{wakatime?.bestDay}</div>
          </div>
        </div>

        {/* Breakdown Progress Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Languages card */}
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Languages
            </h3>
            <div className="space-y-4">
              {wakatime?.languages.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                    <span className="text-slate-400">{item.percent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-550" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color || '#f59e0b' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editors card */}
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Editors
            </h3>
            <div className="space-y-4">
              {wakatime?.editors.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                    <span className="text-slate-400">{item.percent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-550" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color || '#06b6d4' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories card */}
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Categories
            </h3>
            <div className="space-y-4">
              {wakatime?.categories.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                    <span className="text-slate-400">{item.percent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-550" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color || '#a855f7' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* OS card */}
          <div className="bg-slate-900/30 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-4 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Operating Systems
            </h3>
            <div className="space-y-4">
              {wakatime?.operatingSystems.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-semibold">{item.name}</span>
                    <span className="text-slate-400">{item.percent.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-550" 
                      style={{ width: `${item.percent}%`, backgroundColor: item.color || '#f43f5e' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
