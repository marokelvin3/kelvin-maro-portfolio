import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300/80 dark:border-white/15 bg-white/80 dark:bg-white/[0.06] text-slate-800 dark:text-slate-100 shadow-sm hover:border-brand-indigo dark:hover:border-brand-cyan transition-colors"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="flex items-center justify-center"
      >
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-300" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4 text-brand-indigo" aria-hidden="true" />
        )}
      </motion.span>
    </motion.button>
  );
}
