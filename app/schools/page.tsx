import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { PillarMark } from '../../src/components/primitives/PillarMark';
import { dataStore } from '../../src/data/store';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Academic Schools',
  description: 'Explore the four specialized academic schools of Zoe Elpis Global School: Purpose, Leadership, Business, and Impact.'
};

export default function SchoolsPage() {
  const schools = dataStore.getSchools();

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Schools' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="The Four Academic Schools"
              standfirst="Each school addresses a crucial dimension of human development, institution building, and sustainable enterprise."
              accent="gold"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {schools.map((school, i) => (
                <div
                  key={school.id}
                  className="bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] p-8 sm:p-10 rounded-[2px] flex flex-col justify-between hover:border-[var(--color-brand-blue-700)] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <PillarMark pillar={school.pillar} size={28} />
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-gold-600)]">
                          Pillar: {school.pillar}
                        </span>
                      </div>
                      <span className="text-xs font-mono bg-[var(--color-paper-200)] text-[var(--color-ink-700)] px-2.5 py-1 rounded-[2px]">
                        0{i + 1}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)] mb-3">
                      {school.name}
                    </h2>

                    <p className="text-sm font-semibold text-[var(--color-brand-blue-700)] mb-4">
                      {school.focus}
                    </p>

                    <p className="text-sm text-[var(--color-ink-700)] leading-relaxed mb-6">
                      {school.overview || school.statement}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-paper-200)] flex items-center justify-between">
                    <span className="text-xs text-[var(--color-ink-500)]">
                      {school.programCount} Available Programmes
                    </span>
                    <Link
                      href={`/schools/${school.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-brand-blue-900)] hover:underline"
                    >
                      <span>Explore School</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
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
