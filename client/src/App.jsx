import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import DashboardLayout from './components/DashboardLayout';
import StatsPage from './pages/StatsPage';
import ProjectsPage from './pages/ProjectsPage';
import GoalsPage from './pages/GoalsPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import GuestbookPage from './pages/GuestbookPage';

// 404 Fallback page
function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl font-extrabold text-teal-600 dark:text-teal-400">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4 font-mono">Page Not Found</h2>
      <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">The section or resource you are looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-md transition-colors">
        Back to Stats
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Helmet>
        <title>Aditya Akankar | Full-Stack Software Developer Portfolio</title>
        <meta 
          name="description" 
          content="Portfolio of Aditya Sunil Akankar - MERN Stack & GenAI Developer. View stats, recent projects, goals, guestbook, and contact channels." 
        />
      </Helmet>

      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<StatsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
