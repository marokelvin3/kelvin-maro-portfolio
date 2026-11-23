import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading';
import { contactInfo } from '../data/socials';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'submitted'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Builds formatted enquiry URLs for both WhatsApp (+234 806 704 5728)
   * and Gmail / Email (kelvinumuowhero@gmail.com).
   */
  const buildEnquiryLinks = () => {
    const senderName = formData.name.trim() || 'Portfolio Visitor';
    const senderEmail = formData.email.trim() || 'Not provided';
    const enquiryBody = formData.message.trim() || 'Hello Kelvin, I would like to discuss a project.';

    const subjectText = `Portfolio Enquiry from ${senderName}`;
    const fullMessageText = `Hello Kelvin,\n\nNew portfolio enquiry details:\n• Name: ${senderName}\n• Email: ${senderEmail}\n\nMessage:\n${enquiryBody}`;

    const whatsappUrl = `${contactInfo.whatsappHref}?text=${encodeURIComponent(
      fullMessageText
    )}`;
    const mailtoUrl = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
      subjectText
    )}&body=${encodeURIComponent(fullMessageText)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      contactInfo.email
    )}&su=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(
      fullMessageText
    )}`;

    return { whatsappUrl, mailtoUrl, gmailWebUrl };
  };

  /**
   * Dispatches all form enquiries directly to both WhatsApp (+2348067045728)
   * and Gmail (kelvinumuowhero@gmail.com).
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    const { whatsappUrl, mailtoUrl } = buildEnquiryLinks();

    // 1. Open WhatsApp enquiry in a new tab with the pre-filled message
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    // 2. Trigger email / Gmail client with the exact same enquiry
    window.location.href = mailtoUrl;

    setStatus('submitted');
  };

  const handleSendViaWhatsAppOnly = () => {
    if (!formData.name && !formData.message) return;
    const { whatsappUrl } = buildEnquiryLinks();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setStatus('submitted');
  };

  const handleSendViaGmailWeb = () => {
    if (!formData.name && !formData.message) return;
    const { gmailWebUrl } = buildEnquiryLinks();
    window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');
    setStatus('submitted');
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden"
    >
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          indexLabel="06"
          eyebrow="Start a Conversation"
          title="Let’s Build Practical AI &"
          highlight="Reliable Software Together"
          subtitle="Whether you are hiring an AI Product Engineer, upgrading hospital IT systems, or launching a custom web platform through RUVIN IT Consulting."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Details & Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-surface rounded-3xl p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Direct Contact Channels
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Reach out directly via email, phone, WhatsApp, or social platforms. Based in Lagos, Nigeria and collaborating remotely with clients worldwide.
              </p>

              <div className="mt-6 space-y-4">
                {/* Email */}
                <a
                  href={contactInfo.emailHref}
                  className="group flex items-center justify-between rounded-2xl p-4 glass-pill hover:border-brand-indigo dark:hover:border-brand-cyan transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-indigo/15 text-brand-indigo dark:text-brand-cyan">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Click to Email (Gmail)
                      </p>
                      <p className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">
                        {contactInfo.email}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-brand-cyan shrink-0" />
                </a>

                {/* Click to Call */}
                <a
                  href={contactInfo.phoneHref}
                  className="group flex items-center justify-between rounded-2xl p-4 glass-pill hover:border-brand-indigo dark:hover:border-brand-cyan transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-crimson/15 text-brand-crimson">
                      <Phone className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Click to Call
                      </p>
                      <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {contactInfo.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-brand-crimson shrink-0" />
                </a>

                {/* WhatsApp */}
                <a
                  href={contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-2xl p-4 glass-pill hover:border-emerald-500 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        WhatsApp Direct
                      </p>
                      <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {contactInfo.phoneDisplay}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-500 shrink-0" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 rounded-2xl p-4 glass-pill">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-cyan/15 text-brand-cyan">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Base & Availability
                    </p>
                    <p className="font-display text-sm font-bold text-slate-900 dark:text-white">
                      {contactInfo.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Quick Buttons: LinkedIn & X */}
              <div className="mt-6 pt-6 border-t border-slate-300/60 dark:border-white/10 grid grid-cols-2 gap-3">
                <a
                  href={contactInfo.linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-display font-semibold glass-pill text-slate-800 dark:text-white hover:border-brand-indigo dark:hover:border-brand-cyan transition-all"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="h-4 w-4 text-brand-indigo dark:text-brand-cyan" />
                </a>

                <a
                  href={contactInfo.xHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-display font-semibold glass-pill text-slate-800 dark:text-white hover:border-brand-crimson dark:hover:border-brand-cyan transition-all"
                >
                  <span>X ({contactInfo.xHandle})</span>
                  <ArrowUpRight className="h-4 w-4 text-brand-crimson" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Accessible Contact Form Linked to Both WhatsApp & Gmail */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-surface rounded-3xl p-6 sm:p-9 space-y-6 relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-crimson"
              />

              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Send an Enquiry
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Every enquiry submitted here is linked directly to both my{' '}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    WhatsApp ({contactInfo.phoneDisplay})
                  </span>{' '}
                  and{' '}
                  <span className="font-semibold text-brand-indigo dark:text-brand-cyan">
                    Gmail ({contactInfo.email})
                  </span>
                  .
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Name <span className="text-brand-crimson">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Adewale / Sarah Chen"
                    className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-indigo dark:focus:border-brand-cyan transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                  >
                    Your Email <span className="text-brand-crimson">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@organization.com"
                    className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-indigo dark:focus:border-brand-cyan transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Project Details or Enquiry <span className="text-brand-crimson">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the AI product, internal tool, healthcare system, or role you'd like to discuss..."
                  className="w-full rounded-xl border border-slate-300 dark:border-white/15 bg-white/90 dark:bg-slate-950/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-indigo dark:focus:border-brand-cyan transition-colors resize-y"
                />
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Primary Submit: Dispatches to both WhatsApp & Gmail */}
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex flex-1 sm:flex-initial items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-cyan to-brand-crimson px-6 py-3.5 font-display text-sm sm:text-base font-bold text-white shadow-glow-indigo hover:shadow-glow-cyan transition-all"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Enquiry (WhatsApp & Gmail)</span>
                  </motion.button>

                  {/* Direct WhatsApp Channel Button */}
                  <button
                    type="button"
                    onClick={handleSendViaWhatsAppOnly}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3.5 font-display text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </button>

                  {/* Direct Gmail Web Compose Button */}
                  <button
                    type="button"
                    onClick={handleSendViaGmailWeb}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-brand-indigo/40 bg-brand-indigo/10 px-4 py-3.5 font-display text-xs sm:text-sm font-semibold text-brand-indigo dark:text-brand-cyan hover:bg-brand-indigo/20 transition-colors"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    <span>Gmail Web</span>
                  </button>
                </div>

                {status === 'submitted' && (
                  <p
                    role="status"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>
                      Enquiry routed to WhatsApp ({contactInfo.phoneDisplay}) and Gmail ({contactInfo.email}).
                    </span>
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
