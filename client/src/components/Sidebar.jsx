import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Code2, 
  CheckSquare, 
  User2, 
  Image as ImageIcon, 
  Mail, 
  BookOpen, 
  Sun, 
  Moon, 
  Menu, 
  X,
  BadgeCheck
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { isDark, toggleTheme } = useTheme();

  const links = [
    { name: 'My Stats', path: '/', icon: BarChart3 },
    { name: 'Projects', path: '/projects', icon: Code2 },
    { name: 'Goals', path: '/goals', icon: CheckSquare },
    { name: 'About', path: '/about', icon: User2 },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Contact', path: '/contact', icon: Mail },
    { name: 'Guestbook', path: '/guestbook', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-teal-400 font-bold">&lt;aditya /&gt;</span>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 text-slate-100 flex flex-col border-r border-slate-900
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Profile Card */}
        <div className="p-6 border-b border-slate-900/60 flex flex-col items-center text-center">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <img 
              src="https://avatars.githubusercontent.com/u/105417246" 
              alt="Aditya Akankar" 
              className="relative w-20 h-20 rounded-full border-2 border-slate-950 object-cover"
            />
            <span className="absolute bottom-0 right-0 bg-slate-950 p-0.5 rounded-full border border-slate-900">
              <BadgeCheck className="w-5 h-5 text-teal-400 fill-teal-950" />
            </span>
          </div>

          <h2 className="mt-4 font-bold text-lg tracking-tight flex items-center justify-center space-x-1">
            <span>Aditya Akankar</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">@adityaaknkar16</p>
          <div className="mt-2 text-[10px] uppercase font-bold tracking-widest bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-800 text-teal-400">
            MERN & GenAI Dev
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={({ isActive }) => `
                  flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-slate-900 text-teal-400 border-l-2 border-teal-500' 
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                    <span>{link.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer / Controls */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/40 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>v1.0.0</span>
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-400" />}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          onClick={toggleSidebar} 
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-20 lg:hidden"
        />
      )}
    </>
  );
}
