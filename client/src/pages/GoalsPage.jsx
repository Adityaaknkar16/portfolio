import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { Target, CheckCircle2, Circle, AlertCircle, Loader2 } from 'lucide-react';

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const res = await api.get('/goals');
        if (res.data && res.data.success) {
          setGoals(res.data.data);
        } else {
          throw new Error('Failed to load goals');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unable to retrieve goals.');
      } finally {
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const handleToggle = async (id) => {
    try {
      // Optimistically update frontend state
      setGoals(prev => prev.map(g => g._id === id ? { ...g, completed: !g.completed } : g));
      
      const res = await api.put(`/goals/${id}/toggle`);
      if (!res.data || !res.data.success) {
        throw new Error('Toggle request failed');
      }
    } catch (err) {
      console.error(err);
      // Revert if backend request failed
      const res = await api.get('/goals');
      if (res.data && res.data.success) {
        setGoals(res.data.data);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-teal-500 animate-spin" />
        <span className="text-sm text-slate-400 mt-4 font-mono">Loading goals / bucket list...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] border border-red-500/20 bg-red-500/5 rounded-xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-bold text-red-500">Error Loading Goals</h3>
        <p className="text-slate-400 mt-2 max-w-sm text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Goals</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-emerald-500">My Public Development & Life Bucket List</p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Intro Info */}
        <div className="bg-slate-900/10 dark:bg-slate-900/5 border border-slate-200 dark:border-slate-800/60 p-5 rounded-xl text-sm text-slate-400 leading-relaxed">
          <p>
            An interactive dashboard tracking my developer and personal goals. 
            Clicking the checkboxes triggers a Mongoose database state update (fully dynamic!). 
            Completed items are crossed out with a green checkmark indicating completion.
          </p>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div 
              key={goal._id}
              onClick={() => handleToggle(goal._id)}
              className={`
                flex items-start space-x-4 p-4 rounded-xl border cursor-pointer select-none transition-all duration-200
                ${goal.completed 
                  ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/35' 
                  : 'bg-slate-900/20 border-slate-200 dark:border-slate-800/60 hover:border-slate-350 dark:hover:border-slate-700/80'
                }
              `}
            >
              {/* Checkbox Icon */}
              <button 
                type="button" 
                className="mt-0.5 shrink-0 text-slate-400 focus:outline-none"
                aria-label={goal.completed ? "Mark incomplete" : "Mark complete"}
              >
                {goal.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400 hover:text-emerald-500 transition-colors" />
                )}
              </button>

              {/* Goal Title & Description */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className={`
                    font-bold text-sm transition-all duration-300
                    ${goal.completed ? 'line-through text-slate-500 font-normal' : 'text-slate-200'}
                  `}>
                    {goal.title}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono border border-slate-700">
                    {goal.category}
                  </span>
                </div>
                {goal.description && (
                  <p className={`
                    text-xs transition-all duration-300
                    ${goal.completed ? 'text-slate-500 line-through' : 'text-slate-400'}
                  `}>
                    {goal.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
