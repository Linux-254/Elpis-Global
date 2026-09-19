import type { Metadata } from 'next';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../../src/components/primitives/SectionHeading';
import { BRAND_STRINGS } from '../../../src/content/strings';

export const metadata: Metadata = {
  title: 'Core Values & Institutional Standards',
  description: 'The six core values that define character, academic integrity, and operational practice at Zoe Elpis Global School.'
};

export default function ValuesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'About', href: '/about' }, { label: 'Core Values' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Six Non-Negotiable Core Values"
              standfirst="Character is not an elective at ZEGS. Every facilitator, mentor, and fellow is held to these six operating standards."
              accent="gold"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BRAND_STRINGS.coreValues.map((val, idx) => (
                <div
                  key={val.id}
                  className="bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] p-8 rounded-[2px] space-y-4 hover:border-[var(--color-brand-blue-700)] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ink-500)] border-b border-[var(--color-paper-200)] pb-3">
                    <span>STANDARD 0{idx + 1}</span>
                    <span className="uppercase text-[var(--color-accent-gold-600)] font-sans font-bold">ZEGS Principle</span>
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)]">
                    {val.label}
                  </h3>
                  <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                    {val.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
