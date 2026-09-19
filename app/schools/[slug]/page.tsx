import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { PillarMark } from '../../../src/components/primitives/PillarMark';
import { StatusBadge } from '../../../src/components/primitives/StatusBadge';
import { dataStore } from '../../../src/data/store';
import { ArrowRight, BookOpen, Clock, Users } from 'lucide-react';

interface SchoolDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SchoolDetailPageProps) {
  const { slug } = await params;
  const school = dataStore.getSchoolBySlug(slug);
  if (!school) return { title: 'School Not Found' };
  return {
    title: `${school.name} | Zoe Elpis Global School`,
    description: school.overview || school.statement
  };
}

export default async function SchoolDetailPage({ params }: SchoolDetailPageProps) {
  const { slug } = await params;
  const school = dataStore.getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const programs = dataStore.getPrograms({ schoolId: school.id });

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumbs */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Schools', href: '/schools' }, { label: school.name }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <PillarMark pillar={school.pillar} size={32} />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent-gold-600)]">
                  Foundational Pillar • {school.pillar}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-6">
                {school.name}
              </h1>

              <p className="font-display text-xl sm:text-2xl text-[var(--color-brand-blue-700)] font-normal leading-relaxed mb-6">
                {school.focus}
              </p>

              <p className="text-base text-[var(--color-ink-700)] leading-relaxed max-w-[65ch]">
                {school.overview || school.statement}
              </p>
            </div>
          </div>
        </section>

        {/* Programs Listing for this School */}
        <section className="py-20 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <h2 className="font-display text-3xl text-[var(--color-ink-900)]">
                  Programmes in this School
                </h2>
                <p className="text-xs text-[var(--color-ink-500)] mt-1">
                  Showing {programs.length} active programmes and executive workshops.
                </p>
              </div>
              <Link
                href="/programs"
                className="mt-4 sm:mt-0 text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline inline-flex items-center gap-1"
              >
                <span>View all institutional programmes</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {programs.length === 0 ? (
              <div className="p-12 text-center bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px]">
                <p className="text-sm text-[var(--color-ink-700)]">No open cohorts currently listed under this school.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((prog) => (
                  <div
                    key={prog.id}
                    className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--color-brand-blue-700)] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <StatusBadge status="open" label="Open" />
                        <span className="text-[11px] font-semibold text-[var(--color-accent-gold-600)] uppercase tracking-wider">
                          {prog.levelSlug} • {prog.format}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl text-[var(--color-ink-900)] mb-3">
                        <Link href={`/programs/${prog.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {prog.name}
                        </Link>
                      </h3>

                      <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-6 line-clamp-3">
                        {prog.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--color-paper-200)]">
                      <div className="flex items-center justify-between text-xs text-[var(--color-ink-500)] mb-4">
                        <span>{prog.durationWeeks} weeks</span>
                        <span>{prog.deliveryMode}</span>
                        <span>UGX {((prog.fees?.amount || 1200000)).toLocaleString()}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Link
                          href={`/programs/${prog.slug}`}
                          className="flex-1 py-2 text-center text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                        >
                          View Syllabus
                        </Link>
                        <Link
                          href={`/apply?program=${prog.slug}`}
                          className="px-3 py-2 text-xs font-semibold border border-[var(--color-paper-200)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-100)] rounded-[2px]"
                        >
                          Apply
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
