import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  indexLabel,
}) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`mb-12 md:mb-16 ${
        isCenter ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'
      }`}
    >
      <div
        className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest glass-pill text-brand-indigo dark:text-brand-cyan mb-4 ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        {indexLabel && (
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-crimson text-[10px] font-bold text-white">
            {indexLabel}
          </span>
        )}
        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
        <span>{eyebrow}</span>
      </div>

      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
        {title}{' '}
        {highlight && (
          <span className="text-gradient-primary">{highlight}</span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
