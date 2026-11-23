import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Home } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useScrollProgress } from '../hooks/useScrollProgress';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({
  theme,
  onToggleTheme,
  activeView = 'hero',
  onNavigate,
}) {
  const { progress, isScrolled } = useScrollProgress();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on Escape key or desktop resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSelectView = (viewId, e) => {
    if (e) e.preventDefault();
    setMobileOpen(false);
    if (onNavigate) onNavigate(viewId, e);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-slate-300/30 dark:bg-white/5 overflow-hidden"
      >
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-crimson"
          style={{ scaleX: progress }}
        />
      </div>

      <div
        className={`mx-auto max-w-container px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? 'py-2.5' : 'py-4 sm:py-5'
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
            isScrolled
              ? 'py-2.5 glass-surface shadow-lg'
              : 'py-3 bg-white/50 dark:bg-base-card/50 backdrop-blur-md border border-slate-300/60 dark:border-white/10'
          }`}
        >
          {/* Logo Mark "KM." — Always switches to Home ('hero') keeping root URL '/' */}
          <a
            href="/"
            onClick={(e) => handleSelectView('hero', e)}
            className="group inline-flex items-center gap-2.5 focus:outline-none"
            aria-label="Kelvin Maro U. Home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white/[0.08] border border-slate-800 dark:border-white/15 font-display text-lg font-bold tracking-tight text-white shadow-sm group-hover:border-brand-cyan transition-colors">
              KM
              <span className="text-brand-crimson">.</span>
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-brand-crimson ring-2 ring-white dark:ring-base-dark"
              />
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                Kelvin Maro U.
              </span>
              <span className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none">
                AI Product Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (400ms hover transition, conditional view switching, root URL '/') */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeView === item.id;
              return (
                <li key={item.id}>
                  <a
                    href="/"
                    onClick={(e) => handleSelectView(item.id, e)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all duration-[400ms] ease-out ${
                      isActive
                        ? 'text-brand-indigo dark:text-brand-cyan font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        className="absolute inset-0 -z-10 rounded-xl bg-brand-indigo/10 dark:bg-white/[0.08] border border-brand-indigo/30 dark:border-brand-cyan/30"
                      />
                    )}
                    {item.id === 'hero' && (
                      <Home className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Controls: Theme Toggle + Hire Me CTA + Hamburger */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <motion.a
              href="/"
              onClick={(e) => handleSelectView('contact', e)}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-indigo to-brand-cyan p-[1px] font-display text-sm font-semibold text-white shadow-glow-indigo transition-shadow hover:shadow-glow-cyan"
            >
              <span className="inline-flex items-center gap-1.5 rounded-[11px] bg-slate-950/85 dark:bg-slate-950/75 px-4 py-2 text-white">
                <Sparkles className="h-3.5 w-3.5 text-brand-cyan" aria-hidden="true" />
                <span>Hire Me</span>
                <ArrowUpRight className="h-4 w-4 text-brand-crimson" aria-hidden="true" />
              </span>
            </motion.a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 dark:border-white/15 bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-100"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Animated Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mt-2 rounded-2xl glass-surface p-4 lg:hidden"
            >
              <ul className="flex flex-col space-y-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeView === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href="/"
                        onClick={(e) => handleSelectView(item.id, e)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-[400ms] ease-out ${
                          isActive
                            ? 'bg-brand-indigo/15 dark:bg-white/10 text-brand-indigo dark:text-brand-cyan font-semibold'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-white/5'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-brand-crimson" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 pt-3 border-t border-slate-300/60 dark:border-white/10">
                <a
                  href="/"
                  onClick={(e) => handleSelectView('contact', e)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-crimson px-4 py-3 font-display text-sm font-bold text-white shadow-glow-indigo"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  <span>Hire Me — Let’s Talk</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
