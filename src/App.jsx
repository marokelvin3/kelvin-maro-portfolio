import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Services from './components/Services';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import CursorGlow from './components/CursorGlow';

export default function App() {
  // Default theme: dark (#0A0A0F), stored strictly in React state only (no localStorage)
  const [theme, setTheme] = useState('dark');

  // Conditional view state: defaults to 'hero' (Home view).
  // Clicking any nav link switches activeView without adding #hash or changing the root URL.
  const [activeView, setActiveView] = useState('hero');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Ensure the browser address bar ALWAYS displays only the root URL ('/')
  useEffect(() => {
    if (window.location.hash || window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
    if (typeof window.__setPortfolioTitle === 'function') {
      window.__setPortfolioTitle(activeView);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  const handleNavigate = useCallback((viewId, e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (window.location.hash || window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }
    setActiveView(viewId);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'skills':
        return <Skills onNavigate={handleNavigate} />;
      case 'projects':
        return <Projects onNavigate={handleNavigate} />;
      case 'experience':
        return <Timeline onNavigate={handleNavigate} />;
      case 'services':
        return <Services onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactForm onNavigate={handleNavigate} />;
      case 'hero':
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Accessible Skip-to-Content Link */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          const mainEl = document.getElementById('main-content');
          if (mainEl) mainEl.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-brand-indigo focus:px-4 focus:py-2.5 focus:font-display focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Desktop Ambient Cursor Spotlight */}
      <CursorGlow />

      {/* Sticky Shrinking Glass Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onNavigate={handleNavigate}
      />

      {/* Conditional Single-View Area (Keeps page short & focused, root URL '/' at all times) */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 flex flex-col justify-center focus:outline-none"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer activeView={activeView} onNavigate={handleNavigate} />
    </div>
  );
}
