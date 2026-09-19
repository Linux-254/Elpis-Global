import type { Metadata } from 'next';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../../src/components/primitives/SectionHeading';
import { SequenceRail } from '../../../src/components/primitives/SequenceRail';
import { BRAND_STRINGS } from '../../../src/content/strings';

export const metadata: Metadata = {
  title: 'Teaching Model & Pedagogy',
  description: 'Deep dive into the 4-phase pedagogical model of Zoe Elpis Global School: Learn, Apply, Build, Impact.'
};

export default function TeachingModelPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Learning', href: '/learning' }, { label: 'Teaching Model' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-4">
                The Four-Stage Pedagogy
              </h1>
              <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Why we reject passive lecture-based certificates in favor of live enterprise execution.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-16">
            <SequenceRail steps={BRAND_STRINGS.learningModelSteps} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-[var(--color-paper-200)]">
              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Studio Critique Model</h3>
                <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                  Borrowing from architectural design studios, every business model, personal vision statement, and financial forecast is pinned up and critiqued openly by fellows and faculty.
                </p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Continuous Portfolio Defense</h3>
                <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                  Fellows graduate not by taking closed-book written exams, but by defending a portfolio of verified deliverables before an independent review jury.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
