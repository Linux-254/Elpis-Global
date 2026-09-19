'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BRAND_STRINGS } from '../../content/strings';
import { dataStore } from '../../data/store';

export const SiteFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const settings = dataStore.getSettings();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[var(--color-ink-900)] text-[var(--color-paper-50)] border-t border-white/10 pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-[1320px] mx-auto">
        {/* Main 5-Column Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/15">
          {/* Col 1-4: Identity & Brand statement */}
          <div className="lg:col-span-4 space-y-5">
            {/* Stacked reversed logo */}
            <div className="space-y-3">
              <div className="w-10 h-10 text-[var(--color-paper-50)]">
                <svg viewBox="0 0 64 64" fill="currentColor" className="w-full h-full">
                  <path d="M32 6C30.5 12 25 17 25 24C25 29 28.5 32.5 32 35C35.5 32.5 39 29 39 24C39 17 33.5 12 32 6Z" />
                  <path d="M32 23C32.8 20 34.5 17.5 36 15.5C37.2 18.5 37.5 21.5 36.5 24.5C35.5 27.5 33.5 29.5 32 31C30.5 29.5 28.5 27.5 27.5 24.5C26.5 21.5 26.8 18.5 28 15.5C29.5 17.5 31.2 20 32 23Z" fillOpacity="0.4" />
                  <path d="M30.5 36L29 54H35L33.5 36C33 36.2 32.5 36.3 32 36.3C31.5 36.3 31 36.2 30.5 36Z" />
                  <path d="M27 38.5C21 37.5 13 40 8 45.5V56.5C14 51.5 21.5 50.5 27 52V38.5Z" />
                  <path d="M37 38.5C43 37.5 51 40 56 45.5V56.5C50 51.5 42.5 50.5 37 52V38.5Z" />
                </svg>
              </div>
              <div>
                <span className="font-display font-semibold text-xl tracking-wider block text-[var(--color-paper-50)]">
                  ZOE ELPIS
                </span>
                <span className="text-xs font-sans font-bold tracking-[0.16em] text-[var(--color-brand-blue-100)] block">
                  GLOBAL SCHOOL
                </span>
              </div>
            </div>

            <p className="text-xs text-[var(--color-paper-100)] opacity-80 leading-relaxed max-w-[34ch]">
              {BRAND_STRINGS.oneSentence}
            </p>

            <div className="text-xs font-semibold tracking-wider text-[var(--color-accent-gold-400)]">
              {BRAND_STRINGS.tagline}
            </div>
          </div>

          {/* Col 5-6: Explore Academic Offerings */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] border-b border-white/10 pb-2">
              Academic
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-paper-100)]">
              <li>
                <Link href="/programs" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  All Programmes
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Four Schools
                </Link>
              </li>
              <li>
                <Link href="/learning/model" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Teaching Model
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Admissions Guide
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Apply for Intake
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Mentorship Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 7-8: Institution */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] border-b border-white/10 pb-2">
              Institution
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-paper-100)]">
              <li>
                <Link href="/about/story" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/about/vision-mission" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link href="/about/values" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Core Values
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Impact & Verification
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  School Journal
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Events & Masterclasses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 9-10: Learners & Portals */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] border-b border-white/10 pb-2">
              Learners
            </h4>
            <ul className="space-y-2 text-xs text-[var(--color-paper-100)]">
              <li>
                <Link href="/student/login" className="hover:text-[var(--color-accent-gold-400)] transition-colors font-medium text-[var(--color-accent-gold-400)]">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/student/dashboard" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/verify/ZEGS-2026-883921" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Verify a Certificate
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--color-accent-gold-400)] transition-colors">
                  Admissions Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-[var(--color-accent-gold-400)] transition-colors text-white/60">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 11-12: Contact & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider text-[var(--color-accent-gold-400)] border-b border-white/10 pb-2">
              Stay Connected
            </h4>
            
            <form onSubmit={handleNewsletter} className="space-y-2">
              <label htmlFor="footer-newsletter" className="text-xs text-[var(--color-paper-100)] block">
                Receive journal essays and intake announcements.
              </label>
              {newsletterSubmitted ? (
                <div className="p-2.5 bg-[var(--color-accent-green-700)] text-xs text-[var(--color-paper-50)] rounded-[2px]">
                  Thank you. You are subscribed.
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <input
                    id="footer-newsletter"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 text-[var(--color-paper-50)] placeholder:text-white/40 focus:outline-none focus:border-[var(--color-accent-gold-400)] rounded-[2px]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-3 text-xs font-semibold bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-50)] transition-colors rounded-[2px]"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </form>

            <div className="text-xs text-[var(--color-paper-100)] space-y-1 pt-2 opacity-80">
              <p>{settings.officeLocation}</p>
              <p>{settings.contactEmail}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Related Organisation */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-paper-100)] opacity-75">
          <div>
            © {currentYear} Zoe Elpis Global School. All rights reserved.
          </div>

          <div className="text-center md:text-left text-[11px] text-[var(--color-brand-blue-100)]">
            {BRAND_STRINGS.sisterOrgText}
          </div>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-[var(--color-accent-gold-400)] underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-accent-gold-400)] underline">
              Terms & Conditions
            </Link>
            <Link href="/accessibility" className="hover:text-[var(--color-accent-gold-400)] underline">
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
