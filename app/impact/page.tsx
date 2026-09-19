import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { dataStore } from '../../src/data/store';
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Institutional Impact & Verified Outcomes',
  description: 'Evidence-based impact methodology, verified alumni transformation stories, and measurable metrics at Zoe Elpis Global School.'
};

export default function ImpactPage() {
  const stories = dataStore.getImpactStories();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Impact & Outcomes' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-4">
                Evidence-Based Impact
              </h1>
              <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                We measure our success not by certificates issued, but by sustainable enterprises launched, jobs created, and ethical leaders formed.
              </p>
            </div>
          </div>
        </section>

        {/* Methodology (archetype B / C) */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Our Measurement Framework"
              standfirst="Every fellow is tracked across 6, 12, and 24-month longitudinal milestones following graduation."
              accent="gold"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono font-bold text-[var(--color-brand-blue-700)] uppercase">
                  Metric 01
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Venture Survival & Growth</h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Percentage of business capstones actively operating, achieving positive unit economics, and formalizing local employment 12 months post-cohort.
                </p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono font-bold text-[var(--color-brand-blue-700)] uppercase">
                  Metric 02
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Ethical Governance</h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Implementation of formal internal audits, transparent financial accounting, and community benefit mandates in graduate ventures.
                </p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono font-bold text-[var(--color-brand-blue-700)] uppercase">
                  Metric 03
                </div>
                <h3 className="font-display text-2xl text-[var(--color-ink-900)]">Generative Leadership</h3>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Alumni who go on to actively mentor incoming cohorts or establish structured apprenticeships within their organizations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Stories */}
        <section className="py-20 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8 space-y-16">
            <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)] pb-4 border-b border-[var(--color-paper-200)]">
              Verified Alumni Case Studies
            </h2>

            {stories.map((story) => (
              <div key={story.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] p-8 sm:p-12 rounded-[2px]">
                <div className="lg:col-span-5 aspect-[4/5] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                  <img src={story.photoUrl} alt={story.subjectName} className="w-full h-full object-cover" />
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent-green-700)]">
                    {story.programName} • Verified Outcome
                  </div>
                  <h3 className="font-display text-3xl text-[var(--color-ink-900)]">{story.subjectName}</h3>
                  <div className="text-xs font-semibold text-[var(--color-brand-blue-700)]">{story.subjectRole}</div>
                  <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">{story.narrative}</p>

                  <div className="p-4 bg-[var(--color-paper-50)] border-l-3 border-[var(--color-accent-green-700)] text-xs text-[var(--color-ink-900)] font-medium">
                    <span className="font-bold block mb-1">Demonstrated Metric:</span>
                    {story.outcomeDescription}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
