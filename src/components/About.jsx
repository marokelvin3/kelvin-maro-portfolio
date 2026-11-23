import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Building2, Globe2, Sparkles, Camera } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { profileData } from '../data/socials';

/**
 * Animated stat counter that counts from 0 to `target` when scrolled into view.
 */
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    let startTime = null;
    const duration = 1400;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const [activePhoto, setActivePhoto] = useState('passport');

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          indexLabel="01"
          eyebrow="About Kelvin"
          title="Trusted Healthcare Technologist &"
          highlight="AI Product Builder"
          subtitle="Bridging hospital-grade operational reliability with modern AI-assisted software engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Dual-Photo Interactive Frame with Spinning Ring */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center"
          >
            <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80">
              {/* Outer Slowly Spinning Conic/Gradient Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-brand-indigo via-brand-cyan to-brand-crimson animate-spin-slow opacity-85"
              >
                <div className="h-full w-full rounded-full bg-base-light dark:bg-base-dark" />
              </div>

              {/* Inner Reverse-Spinning Dashed Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-4 rounded-full border-2 border-dashed border-brand-indigo/50 dark:border-brand-cyan/40 animate-spin-reverse-slow"
              />

              {/* Primary Circular Profile Image (Switches between Passport & Portrait) */}
              <div className="relative z-10 h-56 w-56 sm:h-64 sm:w-64 rounded-full overflow-hidden border-4 border-white dark:border-base-card shadow-2xl bg-slate-900">
                <img
                  src={
                    activePhoto === 'passport'
                      ? profileData.images.passport
                      : profileData.images.portrait
                  }
                  alt={
                    activePhoto === 'passport'
                      ? 'Kelvin Maro U. close-up studio portrait'
                      : 'Kelvin Maro U. outdoor executive portrait'
                  }
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-all duration-500"
                />
              </div>

              {/* Secondary Picture Thumbnail Button to toggle both photos */}
              <button
                type="button"
                onClick={() =>
                  setActivePhoto((prev) =>
                    prev === 'passport' ? 'portrait' : 'passport'
                  )
                }
                aria-label="Switch profile photo view"
                title="Click to switch between studio & executive portrait"
                className="group absolute -bottom-2 right-2 z-20 flex items-center gap-2 rounded-2xl glass-surface p-2 pr-3 shadow-lg hover:border-brand-crimson transition-all"
              >
                <img
                  src={
                    activePhoto === 'passport'
                      ? profileData.images.portrait
                      : profileData.images.passport
                  }
                  alt="Alternate photo thumbnail"
                  loading="lazy"
                  className="h-11 w-11 rounded-xl object-cover object-top border border-brand-crimson"
                />
                <div className="text-left">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-brand-crimson font-bold">
                    <Camera className="h-3 w-3" aria-hidden="true" />
                    Swap View
                  </span>
                  <p className="font-display text-xs font-semibold text-slate-900 dark:text-white">
                    {activePhoto === 'passport' ? 'Outdoor Portrait' : 'Studio Headshot'}
                  </p>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Plain-Language Bio & Operational Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="glass-surface rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              {/* Top Crimson & Indigo Accent Bar */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-crimson"
              />

              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-indigo dark:text-brand-cyan mb-3">
                <Sparkles className="h-3.5 w-3.5 text-brand-crimson" aria-hidden="true" />
                <span>Plain-Language Bio</span>
              </div>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {profileData.bio}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-300/60 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-brand-indigo shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      Hospital IT Leader
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      IT Manager at MRCC Victoria Island, Lagos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe2 className="h-5 w-5 text-brand-cyan shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      RUVIN IT Consulting
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Serving healthcare & business clients worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-brand-crimson shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      Human-First Systems
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Built for non-technical teams to use effortlessly
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Stat Cards (5 Animated Counters) */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {profileData.stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="group glass-surface rounded-2xl p-5 text-center border border-slate-300/70 dark:border-white/10 hover:border-brand-indigo dark:hover:border-brand-cyan transition-all"
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-gradient-primary">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
