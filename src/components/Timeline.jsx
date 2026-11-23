import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Activity,
  Globe,
  CloudCog,
  PenTool,
  GraduationCap,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { experienceTimeline } from '../data/experience';

const ICON_MAP = {
  Sparkles,
  Activity,
  Globe,
  CloudCog,
  PenTool,
  GraduationCap,
};

export default function Timeline() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          indexLabel="04"
          eyebrow="Career & Education"
          title="Experience &"
          highlight="Leadership Timeline"
          subtitle="From enterprise IT support and hospital technology leadership to shipping AI-assisted products."
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Vertical Spine Line */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-2 bottom-2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-indigo via-brand-cyan to-brand-crimson"
          />

          <div className="space-y-10">
            {experienceTimeline.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon] || Sparkles;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node Icon */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white border-2 border-brand-cyan shadow-glow-indigo"
                  >
                    <IconComponent className="h-5 w-5 text-brand-cyan" />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`w-full pl-16 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <div className="group glass-surface rounded-3xl p-6 hover:border-brand-indigo dark:hover:border-brand-cyan transition-all">
                      <div
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-brand-indigo/10 dark:bg-white/10 text-brand-indigo dark:text-brand-cyan mb-3`}
                      >
                        <span>{item.badge}</span>
                      </div>

                      <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h3>

                      <p className="mt-1 font-display text-sm font-semibold text-brand-crimson">
                        {item.organization}
                      </p>

                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
