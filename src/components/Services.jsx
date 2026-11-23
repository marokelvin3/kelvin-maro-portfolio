import React from 'react';
import { motion } from 'framer-motion';
import {
  Workflow,
  Bot,
  HeartPulse,
  Code2,
  Globe2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { consultingServices } from '../data/services';

const ICON_MAP = {
  Workflow,
  Bot,
  HeartPulse,
  Code2,
  Globe2,
};

export default function Services({ onNavigate }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="RUVIN IT Consulting"
          title="What You Can Hire Me to"
          highlight="Build & Automate"
          subtitle="Available for consulting retainers, custom AI workflow builds, and end-to-end web engineering remotely worldwide."
        />

        {/* 3-column grid on desktop (3 + 2 layout), 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          {consultingServices.map((service, idx) => {
            const IconComponent = ICON_MAP[service.icon] || Bot;
            // First 3 items take 2 columns each (3 cards in top row on lg).
            // Remaining 2 items take 3 columns each (2 cards in bottom row on lg: 3 + 2).
            const colSpanClass = idx < 3 ? 'lg:col-span-2' : 'lg:col-span-3';

            if (service.isAiSpecialty) {
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`${colSpanClass} group relative rounded-3xl p-[2px] bg-gradient-to-br from-brand-indigo via-brand-cyan to-brand-indigo shadow-glow-indigo hover:shadow-glow-cyan transition-all`}
                >
                  <div className="relative flex h-full flex-col justify-between rounded-[22px] bg-white/95 dark:bg-base-card/95 backdrop-blur-xl p-6 sm:p-7">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-indigo to-brand-cyan text-white shadow-md">
                          <IconComponent className="h-6 w-6" aria-hidden="true" />
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-indigo/15 to-brand-cyan/15 border border-brand-cyan/40 px-3 py-1 text-xs font-bold text-brand-indigo dark:text-brand-cyan">
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>{service.badge}</span>
                        </span>
                      </div>

                      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                        {service.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                      <a
                        href="/"
                        onClick={(e) => onNavigate && onNavigate('contact', e)}
                        className="inline-flex items-center gap-1.5 font-display text-xs sm:text-sm font-bold text-brand-indigo dark:text-brand-cyan group-hover:translate-x-1 transition-transform"
                      >
                        <span>Inquire About AI Solutions</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            }

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`${colSpanClass} group flex flex-col justify-between rounded-3xl p-6 sm:p-7 glass-surface hover:border-brand-indigo dark:hover:border-brand-cyan transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 dark:bg-white/10 text-white">
                      <IconComponent className="h-6 w-6 text-brand-crimson" aria-hidden="true" />
                    </div>

                    <span className="rounded-full glass-pill px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-indigo dark:group-hover:text-brand-cyan transition-colors">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-300/60 dark:border-white/10 flex items-center justify-between">
                  <a
                    href="/"
                    onClick={(e) => onNavigate && onNavigate('contact', e)}
                    className="inline-flex items-center gap-1.5 font-display text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-brand-crimson dark:hover:text-brand-cyan group-hover:translate-x-1 transition-all"
                  >
                    <span>Discuss Your Needs</span>
                    <ArrowUpRight className="h-4 w-4 text-brand-crimson" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
