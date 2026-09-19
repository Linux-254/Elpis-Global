import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Online Learning Platform',
  description: 'Digital live webinars, asynchronous cohort studio, and global mentor pairing at Zoe Elpis Global School.'
};

export default function OnlineLearningPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Learning', href: '/learning' }, { label: 'Online Learning' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)]" />
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)]">
                The ZEGS Online Experience
              </h1>
              <p className="font-display text-xl text-[var(--color-ink-700)] font-light leading-relaxed">
                High-engagement digital learning with real-time facilitator interaction and asynchronous cohort feedback.
              </p>

              <div className="space-y-4 pt-6 text-sm text-[var(--color-ink-700)] leading-relaxed">
                <p>
                  Our online cohorts are not self-paced video libraries where learners study in isolation. Every online programme features live weekly interactive masterclasses, peer studio breakout rooms, and direct mentor consultation.
                </p>
                <p>
                  Learners access course materials, submit assignments, track grades, and interact with mentors directly via the ZEGS Student Portal.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/programs?mode=Online"
                  className="inline-block px-6 py-3 text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px]"
                >
                  Browse Online Programmes →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
