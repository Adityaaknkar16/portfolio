import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Command, Moon, Sun, Monitor, ArrowRight, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { navLinks } from '../data/staticData';

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle, but we double check
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    ...navLinks.map(link => ({
      name: `Navigate to ${link.label}`,
      category: 'Navigation',
      action: () => {
        const element = document.querySelector(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        onClose();
      }
    })),
    {
      name: `Switch to ${isDark ? 'Light' : 'Dark'} Mode`,
      category: 'Preferences',
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      name: 'Copy Contact Email',
      category: 'Contact',
      action: () => {
        navigator.clipboard.writeText('adityaakankar@gmail.com');
        alert('Email copied to clipboard!');
        onClose();
      }
    }
  ];

  const filtered = actions.filter(act =>
    act.name.toLowerCase().includes(query.toLowerCase()) ||
    act.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Palette Body */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-all">
        {/* Search Input */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <Search className="h-5 w-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            placeholder="Type a command or search sections..."
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            onClick={onClose} 
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-sm text-slate-400">No results found.</p>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 group-hover:text-teal-200">
                    {item.category}
                  </span>
                  <span>{item.name}</span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-400">
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">ESC</span>
            <span>to close</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">↑↓</span>
            <span>to navigate</span>
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[9px]">Enter</span>
            <span>to select</span>
          </div>
        </div>
      </div>
    </div>
  );
}
