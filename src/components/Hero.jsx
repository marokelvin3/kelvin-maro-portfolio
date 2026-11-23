import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  MessageCircle,
  MapPin,
  Bot,
  Cpu,
  Database,
  ShieldCheck,
  Code2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { profileData, contactInfo } from '../data/socials';

/**
 * Magnetic CTA button wrapper that subtly pulls toward the cursor on hover.
 */
function MagneticButton({ children, onClick, className, ariaLabel }) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href="/"
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const ORBIT_ICONS = [
  { id: 'ai', Icon: Bot, label: 'AI Agents', angle: 0, color: 'text-brand-cyan' },
  { id: 'code', Icon: Code2, label: 'React & Next.js', angle: 72, color: 'text-brand-indigo' },
  { id: 'db', Icon: Database, label: 'PostgreSQL', angle: 144, color: 'text-brand-crimson' },
  { id: 'sec', Icon: ShieldCheck, label: 'Healthcare IT', angle: 216, color: 'text-brand-cyan' },
  { id: 'cpu', Icon: Cpu, label: 'Automation', angle: 288, color: 'text-brand-violet' },
];

export default function Hero({ onNavigate }) {
  const prefersReducedMotion = useReducedMotion();
  const roles = profileData.rotatingRoles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter / rotating role effect
  useEffect(() => {
    if (prefersReducedMotion) {
      const interval = setInterval(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 3200);
      return () => clearInterval(interval);
    }

    const currentFullRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentFullRole) {
        setTimeout(() => setIsDeleting(true), 1700);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? currentFullRole.substring(0, displayText.length - 1)
          : currentFullRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles, prefersReducedMotion]);

  const shownRole = prefersReducedMotion ? roles[roleIndex] : displayText;

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative min-h-[calc(100vh-80px)] pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20 overflow-hidden flex items-center"
    >
      {/* Animated Gradient Mesh / Aurora Orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-28 -left-24 h-96 w-96 rounded-full bg-brand-indigo/25 dark:bg-brand-indigo/25 blur-[110px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-brand-cyan/20 dark:bg-brand-cyan/20 blur-[120px] animate-float-slow" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-brand-crimson/15 dark:bg-brand-crimson/15 blur-[115px] animate-pulse-glow" />

        {/* Template-inspired geometric registration marks (+) */}
        <span className="hidden md:block absolute top-28 left-10 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
        <span className="hidden md:block absolute top-28 right-10 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
        <span className="hidden md:block absolute bottom-12 left-10 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
        <span className="hidden md:block absolute bottom-12 right-10 font-mono text-xs text-slate-400 dark:text-slate-600 select-none">+</span>
      </div>

      <div className="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Staggered Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-7 text-left"
          >
            {/* Status & Location Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-2xl sm:rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs font-medium glass-pill text-slate-700 dark:text-slate-200 mb-5 sm:mb-6">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-semibold text-brand-indigo dark:text-brand-cyan">
                Available for AI & Software Projects
              </span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-brand-crimson shrink-0" aria-hidden="true" />
                <span>Lagos, Nigeria · Remote Worldwide</span>
              </span>
            </div>

            {/* Greeting & Full Name */}
            <p className="font-mono text-[11px] sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-2">
              WELCOME TO MY PORTFOLIO // RUVIN IT CONSULTING
            </p>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.1rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              {profileData.name}
            </h1>

            {/* Rotating Role Line */}
            <div className="mt-3 sm:mt-4 flex items-center gap-2.5 sm:gap-3 min-h-[2.25rem] sm:min-h-[3rem]">
              <span className="inline-block h-5 sm:h-6 w-1.5 rounded-full bg-brand-crimson shrink-0" aria-hidden="true" />
              <span
                aria-live="polite"
                className="font-display text-lg sm:text-2xl md:text-3xl font-semibold text-gradient-primary truncate"
              >
                {shownRole}
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-5 sm:h-6 w-[2px] bg-brand-cyan animate-pulse shrink-0"
              />
            </div>

            {/* 2-Line Value Statement */}
            <div className="mt-5 sm:mt-6 max-w-2xl space-y-2">
              <p className="text-base sm:text-xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                “{profileData.tagline}”
              </p>
              <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {profileData.valueSubline}
              </p>
            </div>

            {/* Magnetic CTAs (Conditionally render Projects or Contact view while keeping URL '/') */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
              <MagneticButton
                onClick={(e) => onNavigate && onNavigate('projects', e)}
                ariaLabel="View Featured Projects"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-crimson p-[1.5px] font-display text-sm sm:text-base font-semibold text-white shadow-glow-indigo hover:shadow-glow-cyan transition-shadow"
              >
                <span className="inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-[14px] bg-slate-950/90 dark:bg-slate-950/80 px-6 py-3.5 text-white group-hover:bg-slate-950/60 transition-colors">
                  <Sparkles className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
                  <span>View Projects</span>
                  <ArrowRight
                    className="h-4 w-4 text-brand-crimson transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={(e) => onNavigate && onNavigate('contact', e)}
                ariaLabel="Contact Kelvin Maro U."
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-display text-sm sm:text-base font-semibold glass-surface text-slate-900 dark:text-white hover:border-brand-indigo dark:hover:border-brand-cyan transition-colors"
              >
                <Mail className="h-4 w-4 text-brand-indigo dark:text-brand-cyan" aria-hidden="true" />
                <span>Contact Me</span>
              </MagneticButton>
            </div>

            {/* Social Bar (LinkedIn, X, Email, WhatsApp) */}
            <div className="mt-9 pt-6 border-t border-slate-300/70 dark:border-white/10 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
                Connect:
              </span>

              {/* LinkedIn */}
              <a
                href={contactInfo.linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kelvin Maro U. on LinkedIn"
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium glass-pill text-slate-700 dark:text-slate-200 hover:border-brand-indigo dark:hover:border-brand-cyan hover:-translate-y-0.5 transition-all"
              >
                <svg className="h-4 w-4 fill-current text-brand-indigo dark:text-brand-cyan" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* X (Twitter) */}
              <a
                href={contactInfo.xHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kelvin Maro U. on X (@Feedngdnation)"
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium glass-pill text-slate-700 dark:text-slate-200 hover:border-brand-indigo dark:hover:border-brand-cyan hover:-translate-y-0.5 transition-all"
              >
                <svg className="h-3.5 w-3.5 fill-current text-slate-900 dark:text-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>@Feedngdnation</span>
              </a>

              {/* Email */}
              <a
                href={contactInfo.emailHref}
                aria-label="Email Kelvin Maro U."
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium glass-pill text-slate-700 dark:text-slate-200 hover:border-brand-indigo dark:hover:border-brand-cyan hover:-translate-y-0.5 transition-all"
              >
                <Mail className="h-3.5 w-3.5 text-brand-crimson" aria-hidden="true" />
                <span>Email</span>
              </a>

              {/* WhatsApp */}
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Kelvin Maro U. on WhatsApp"
                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium glass-pill text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Editorial Card + Spinning Orbit Ring + Both Pictures */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative flex items-center justify-center w-[275px] h-[275px] sm:w-[360px] sm:h-[360px] md:w-[390px] md:h-[390px]">
              {/* Template-Inspired Editorial Crimson Vertical Pillar Behind Portrait */}
              <div
                aria-hidden="true"
                className="absolute inset-y-2 w-24 sm:w-32 rounded-3xl bg-gradient-to-b from-brand-crimson via-brand-crimson/85 to-brand-indigo shadow-glow-crimson opacity-90"
              />

              {/* Outer Dashed Spinning Decorative Orbit Ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full border-2 border-dashed border-brand-indigo/40 dark:border-brand-cyan/35 animate-spin-slow"
              />

              {/* Counter-Rotating Tech-Icon Orbit */}
              <div
                aria-hidden="true"
                className="absolute inset-2.5 sm:inset-3 rounded-full border border-slate-400/30 dark:border-white/10 animate-spin-reverse-slow"
              >
                {ORBIT_ICONS.map(({ id, Icon, label, angle, color }) => {
                  const rad = (angle * Math.PI) / 180;
                  const radiusPercent = 50;
                  const left = `${50 + radiusPercent * Math.cos(rad)}%`;
                  const top = `${50 + radiusPercent * Math.sin(rad)}%`;

                  return (
                    <div
                      key={id}
                      style={{ left, top }}
                      title={label}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl glass-surface shadow-md"
                    >
                      <Icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${color}`} />
                    </div>
                  );
                })}
              </div>

              {/* Main Portrait Card (Picture #1: Kelvin.jpeg) */}
              <div className="relative z-10 w-48 h-56 sm:w-64 sm:h-72 rounded-3xl overflow-hidden border-2 border-white/80 dark:border-white/20 shadow-2xl bg-slate-900 group">
                <img
                  src={profileData.images.portrait}
                  alt="Kelvin Maro U. — AI Product Engineer standing outdoors in Lagos"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-brand-cyan">
                      RUVIN // 01
                    </p>
                    <p className="font-display text-xs font-bold">Kelvin Maro U.</p>
                  </div>
                  <span className="rounded-md bg-brand-crimson px-2 py-0.5 font-mono text-[10px] font-bold">
                    AI + IT
                  </span>
                </div>
              </div>

              {/* Floating Verified ID Badge (Picture #2: Kelvin Passport.png) */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-3 -left-2 sm:left-2 z-20 flex items-center gap-2.5 rounded-2xl glass-surface p-2 pr-3.5 shadow-xl border border-brand-cyan/40"
              >
                <img
                  src={profileData.images.passport}
                  alt="Kelvin Maro U. headshot avatar"
                  className="h-10 w-10 rounded-xl object-cover border border-brand-indigo"
                />
                <div className="text-left">
                  <p className="font-display text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    100+ Hospital Staff
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                    Supported @ MRCC Lagos
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Next Section Indicator (Opens About view conditionally without URL change) */}
        <div className="mt-12 sm:mt-14 flex justify-center">
          <a
            href="/"
            onClick={(e) => onNavigate && onNavigate('about', e)}
            aria-label="Open About section"
            className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono uppercase tracking-widest glass-pill text-slate-600 dark:text-slate-300 hover:text-brand-indigo dark:hover:text-brand-cyan hover:border-brand-cyan transition-all duration-[400ms]"
          >
            <span>Explore About & Impact Stats</span>
            <ChevronRight className="h-4 w-4 text-brand-crimson transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
