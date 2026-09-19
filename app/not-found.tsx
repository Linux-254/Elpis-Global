import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '../src/components/primitives/SiteHeader';
import { SiteFooter } from '../src/components/primitives/SiteFooter';
import { Compass, ArrowRight, Home, BookOpen, GraduationCap, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 flex items-center justify-center py-20 bg-[var(--color-paper-50)]">
        <div className="max-w-[720px] mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-[2px] bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] flex items-center justify-center mx-auto text-[var(--color-brand-blue-900)]">
            <Compass size={32} />
          </div>

          <div className="text-xs font-mono font-bold text-[var(--color-accent-gold-600)] uppercase tracking-wider">
            Error 404 • Page Not Found
          </div>

          <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] leading-tight">
            The page you seek is not in our registry.
          </h1>

          <p className="font-display text-lg font-light text-[var(--color-ink-700)] max-w-md mx-auto leading-relaxed">
            The link you followed may have been updated, moved, or temporarily archived.
          </p>

          {/* Useful navigation suggestions */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <Link
              href="/"
              className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] hover:border-[var(--color-brand-blue-700)] transition-colors group"
            >
              <Home size={18} className="text-[var(--color-brand-blue-700)] mb-2" />
              <strong className="text-xs text-[var(--color-ink-900)] block group-hover:text-[var(--color-brand-blue-700)]">
                Return Home →
              </strong>
              <span className="text-[11px] text-[var(--color-ink-500)]">Explore ZEGS overview</span>
            </Link>

            <Link
              href="/programs"
              className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] hover:border-[var(--color-brand-blue-700)] transition-colors group"
            >
              <GraduationCap size={18} className="text-[var(--color-brand-blue-700)] mb-2" />
              <strong className="text-xs text-[var(--color-ink-900)] block group-hover:text-[var(--color-brand-blue-700)]">
                Program Directory →
              </strong>
              <span className="text-[11px] text-[var(--color-ink-500)]">Explore all 5 tiers</span>
            </Link>

            <Link
              href="/verify"
              className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] hover:border-[var(--color-brand-blue-700)] transition-colors group"
            >
              <Search size={18} className="text-[var(--color-brand-blue-700)] mb-2" />
              <strong className="text-xs text-[var(--color-ink-900)] block group-hover:text-[var(--color-brand-blue-700)]">
                Verify Credential →
              </strong>
              <span className="text-[11px] text-[var(--color-ink-500)]">Lookup certificate code</span>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
