import React from 'react';
import { Home, Mail, MessageCircle } from 'lucide-react';
import { profileData, contactInfo } from '../data/socials';

const FOOTER_LINKS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer({ activeView = 'hero', onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (viewId, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(viewId, e);
  };

  return (
    <footer className="relative border-t border-slate-300/70 dark:border-white/10 bg-white/60 dark:bg-base-card/60 backdrop-blur-xl">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-300/60 dark:border-white/10">
          {/* Brand & Tagline */}
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => handleLinkClick('hero', e)}
              className="inline-flex items-center gap-2.5 font-display text-xl font-bold text-slate-900 dark:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 dark:bg-white/10 text-white text-base">
                KM<span className="text-brand-crimson">.</span>
              </span>
              <span>{profileData.name}</span>
            </a>
            <p className="mt-3 max-w-sm text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              “{profileData.tagline}”
            </p>
          </div>

          {/* Quick Nav Links (Conditionally switches view while keeping root URL '/') */}
          <nav
            aria-label="Footer Navigation"
            className="md:col-span-5 flex flex-wrap gap-x-6 gap-y-2"
          >
            {FOOTER_LINKS.map((link) => {
              const isActive = activeView === link.id;
              return (
                <a
                  key={link.id}
                  href="/"
                  onClick={(e) => handleLinkClick(link.id, e)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors duration-[400ms] ease-out ${
                    isActive
                      ? 'text-brand-indigo dark:text-brand-cyan font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand-indigo dark:hover:text-brand-cyan'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Back to Home Button */}
          <div className="md:col-span-2 flex md:justify-end">
            <a
              href="/"
              onClick={(e) => handleLinkClick('hero', e)}
              aria-label="Return to Home view"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-display font-semibold glass-pill text-slate-800 dark:text-slate-200 hover:border-brand-crimson transition-colors duration-[400ms]"
            >
              <Home className="h-3.5 w-3.5 text-brand-crimson" aria-hidden="true" />
              <span>Home</span>
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright & Social Icons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            © {currentYear} {profileData.name} · RUVIN IT Consulting. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={contactInfo.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-indigo dark:hover:text-brand-cyan transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={contactInfo.xHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-indigo dark:hover:text-brand-cyan transition-colors"
            >
              X ({contactInfo.xHandle})
            </a>
            <a
              href={contactInfo.emailHref}
              className="inline-flex items-center gap-1 hover:text-brand-indigo dark:hover:text-brand-cyan transition-colors"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Email</span>
            </a>
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-emerald-500 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
