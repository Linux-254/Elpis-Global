import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Physical Campus Residencies',
  description: 'In-person workshops, executive roundtables, and weekend cohort immersions in Kampala.'
};

export default function PhysicalLearningPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Learning', href: '/learning' }, { label: 'Physical Residencies' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)]" />
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)]">
                Physical Campus Residencies
              </h1>
              <p className="font-display text-xl text-[var(--color-ink-700)] font-light leading-relaxed">
                Immersion in our training suites, boardroom simulations, and live venture workshops in Kampala.
              </p>

              <div className="space-y-4 pt-6 text-sm text-[var(--color-ink-700)] leading-relaxed">
                <p>
                  For executive roundtables, fellowship defense juries, and collaborative venture studios, face-to-face proximity sparks transformative synergy.
                </p>
                <p>
                  Our campus sessions feature structured debate, guest practitioner keynotes, and deep networking with fellow entrepreneurs and civic leaders.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/programs?mode=Physical"
                  className="inline-block px-6 py-3 text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px]"
                >
                  Browse In-Person Programmes →
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
