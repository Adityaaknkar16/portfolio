import React from 'react';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80',
    title: 'Workspace Design',
    category: 'Setup',
  },
  {
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    title: 'Debugging Session',
    category: 'Code',
  },
  {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
    title: 'Cloud Infrastructure',
    category: 'Architecture',
  },
  {
    url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    title: 'Mechanical Keyboards',
    category: 'Hardware',
  },
  {
    url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80',
    title: 'System Architecture Planning',
    category: 'Planning',
  },
  {
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    title: 'Coffee and Algorithms',
    category: 'Routine',
  },
];

export default function GalleryPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Gallery</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-pink-500">Visual Insights, Workspaces, and Inspirations</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx}
            className="group relative bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden aspect-video sm:aspect-square flex flex-col justify-end"
          >
            {/* Image */}
            <img 
              src={img.url} 
              alt={img.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

            {/* Content text */}
            <div className="relative p-5 z-10 space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[9px] uppercase font-bold tracking-widest font-mono bg-slate-950 border border-slate-800 text-pink-400 px-2 py-0.5 rounded-full">
                {img.category}
              </span>
              <h3 className="font-bold text-sm text-white pt-1">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
