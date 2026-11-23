import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Bot,
  Layout,
  Database,
  ShieldCheck,
  Cloud,
  Sparkles,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { skillCategories } from '../data/skills';

const ICON_MAP = {
  Bot,
  Layout,
  Database,
  ShieldCheck,
  Cloud,
};

export default function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Capabilities"
          title="Full-Stack Engineering, AI Automation &"
          highlight="Healthcare IT Infrastructure"
          subtitle="Grouped core competencies built across live hospital production systems, enterprise support, and modern web platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => {
            const IconComponent = ICON_MAP[category.icon] || Bot;
            const isFirstCard = idx === 0;

            return (
              <motion.article
                key={category.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className={`group relative rounded-3xl p-6 sm:p-7 glass-surface transition-all duration-300 hover:border-brand-indigo dark:hover:border-brand-cyan ${
                  isFirstCard ? 'md:col-span-2 lg:col-span-1 ring-1 ring-brand-indigo/40' : ''
                }`}
              >
                {/* Top Gradient Accent Pill */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-md`}
                  >
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-indigo dark:group-hover:text-brand-cyan transition-colors">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {category.description}
                </p>

                {/* Skill Chips that float and hover-spin on interaction */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill, chipIdx) => (
                    <motion.span
                      key={skill}
                      animate={
                        prefersReducedMotion
                          ? {}
                          : {
                              y: [0, -3, 0],
                            }
                      }
                      transition={
                        prefersReducedMotion
                          ? {}
                          : {
                              duration: 3.2 + (chipIdx % 3) * 0.6,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: chipIdx * 0.15,
                            }
                      }
                      whileHover={{
                        scale: 1.06,
                        rotate: prefersReducedMotion ? 0 : [0, -4, 4, 0],
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium glass-pill text-slate-800 dark:text-slate-200 hover:border-brand-crimson dark:hover:border-brand-cyan cursor-default select-none transition-colors"
                    >
                      <Sparkles
                        className="h-3 w-3 text-brand-indigo dark:text-brand-cyan shrink-0 transition-transform duration-500 group-hover:rotate-180"
                        aria-hidden="true"
                      />
                      <span>{skill}</span>
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
