import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Sparkles, Edit3, ArrowUpRight } from 'lucide-react';
import { useTilt } from '../hooks/useTilt';

export default function ProjectCard({ project, index, onNavigate }) {
  const { ref, tiltStyle, handleMouseMove, handleMouseLeave } = useTilt(7);

  const isExternalLive = project.liveUrl && project.liveUrl.startsWith('http');

  const accentBadgeStyles = {
    indigo: 'bg-brand-indigo/15 text-brand-indigo dark:text-brand-cyan border-brand-indigo/30',
    cyan: 'bg-brand-cyan/15 text-teal-700 dark:text-brand-cyan border-brand-cyan/30',
    crimson: 'bg-brand-crimson/15 text-brand-crimson border-brand-crimson/30',
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${tiltStyle.rotateY}deg)`,
          transition: tiltStyle.isHovered
            ? 'transform 80ms ease-out'
            : 'transform 400ms ease-out',
        }}
        className={`group relative flex h-full flex-col justify-between rounded-3xl p-6 sm:p-7 glass-surface overflow-hidden transition-colors duration-300 ${
          project.isPlaceholderCard
            ? 'border-dashed border-2 border-brand-indigo/50 dark:border-brand-cyan/40'
            : 'hover:border-brand-indigo dark:hover:border-brand-cyan'
        }`}
      >
        {/* Dynamic Cursor-Following Radial Glow */}
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(380px circle at ${tiltStyle.glowX}% ${tiltStyle.glowY}%, rgba(99, 102, 241, 0.18), rgba(34, 211, 238, 0.08), transparent 70%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Top Bar: Number Index & Category */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${
                accentBadgeStyles[project.accent] || accentBadgeStyles.indigo
              }`}
            >
              <span>{project.category}</span>
            </span>

            <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
              /{project.number}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-indigo dark:group-hover:text-brand-cyan transition-colors">
            {project.title}
          </h3>

          {/* Project Description */}
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.description}
          </p>

          {/* Editable Marker Notice specifically for ANIVE.CO */}
          {project.isEditableDescription && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:text-amber-300">
              <Edit3 className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>Editable description & URL in src/data/projects.js</span>
            </div>
          )}
        </div>

        {/* Bottom Area: Tech Tags + Action Buttons */}
        <div className="relative z-10 mt-6 pt-5 border-t border-slate-300/60 dark:border-white/10">
          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies used">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-slate-200/80 dark:bg-white/[0.06] px-2.5 py-1 font-mono text-[11px] font-medium text-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          {project.isPlaceholderCard ? (
            <a
              href="/"
              onClick={(e) => onNavigate && onNavigate('contact', e)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan px-4 py-2.5 font-display text-xs sm:text-sm font-semibold text-white shadow-sm hover:opacity-95 transition-opacity"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Have a Project Idea? Let’s Build It</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href={isExternalLive ? project.liveUrl : '/'}
                onClick={
                  isExternalLive
                    ? undefined
                    : (e) => onNavigate && onNavigate('contact', e)
                }
                target={isExternalLive ? '_blank' : undefined}
                rel={isExternalLive ? 'noopener noreferrer' : undefined}
                aria-label={`View live demo of ${project.title}`}
                className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3.5 py-2.5 font-display text-xs sm:text-sm font-semibold transition-all ${
                  isExternalLive
                    ? 'bg-gradient-to-r from-brand-indigo to-brand-cyan text-white shadow-glow-indigo hover:opacity-95'
                    : 'bg-slate-900 dark:bg-white/10 text-white hover:bg-brand-indigo dark:hover:bg-brand-indigo'
                }`}
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isExternalLive ? 'Live Site' : 'Request Demo'}</span>
              </a>

              <a
                href="/"
                onClick={(e) => onNavigate && onNavigate('contact', e)}
                aria-label={`Read case study for ${project.title}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/15 bg-white/60 dark:bg-white/[0.04] px-3.5 py-2.5 font-display text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-crimson dark:hover:border-brand-cyan transition-colors"
              >
                <FileText className="h-3.5 w-3.5 text-brand-crimson" aria-hidden="true" />
                <span>Case Study</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
