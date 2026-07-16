import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './hooks/useTheme';
import App from './App';
import './index.css';

// 404 Fallback page
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 px-6 text-center">
      <h1 className="text-6xl font-extrabold text-teal-600 dark:text-teal-400">404</h1>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">Page Not Found</h2>
      <p className="text-slate-500 mt-2 max-w-sm">The section or resource you are looking for doesn't exist.</p>
      <a href="/" className="mt-6 px-5 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-medium shadow-md transition-colors">
        Back to Portfolio
      </a>
    </div>
  );
}

ReactDOMClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
