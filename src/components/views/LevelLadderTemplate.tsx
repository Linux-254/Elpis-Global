'use client';

import React from 'react';
import Link from 'next/link';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { StatusBadge } from '../../../src/components/primitives/StatusBadge';
import { dataStore } from '../../../src/data/store';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface LevelPageProps {
  levelSlug: 'foundation' | 'professional' | 'advanced' | 'executive' | 'fellowship';
  title: string;
  orderNumber: number;
  description: string;
  competencyOutcome: string;
  targetAudience: string[];
}

const ALL_LEVELS = [
  { slug: 'foundation', title: 'Foundation', order: 1 },
  { slug: 'professional', title: 'Professional', order: 2 },
  { slug: 'advanced', title: 'Advanced', order: 3 },
  { slug: 'executive', title: 'Executive', order: 4 },
  { slug: 'fellowship', title: 'Fellowship', order: 5 },
];

export function LevelLadderTemplate({
  levelSlug,
  title,
  orderNumber,
  description,
  competencyOutcome,
  targetAudience
}: LevelPageProps) {
  const programs = dataStore.getPrograms({ levelSlug });

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Programmes', href: '/programs' }, { label: `${title} Level` }]} />
          </div>
        </div>

        {/* Level Progression Ladder Strip (archetype G / F) */}
        <section className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)] py-6">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="text-[11px] font-bold text-[var(--color-ink-500)] uppercase tracking-wider mb-3">
              ZEGS 5-Tier Competency Architecture
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
              {ALL_LEVELS.map((lvl) => {
                const isActive = lvl.slug === levelSlug;
                return (
                  <Link
                    key={lvl.slug}
                    href={`/programs/${lvl.slug}`}
                    className={`p-3 border rounded-[2px] text-left transition-colors ${
                      isActive
                        ? 'bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] border-[var(--color-brand-blue-900)]'
                        : 'bg-[var(--color-paper-50)] text-[var(--color-ink-700)] border-[var(--color-paper-200)] hover:border-[var(--color-brand-blue-700)]'
                    }`}
                  >
                    <div className="text-[10px] font-mono opacity-80">Tier 0{lvl.order}</div>
                    <div className="text-xs font-semibold">{lvl.title}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Level Hero */}
        <section className="py-16 sm:py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent-gold-600)] mb-2">
                Level 0{orderNumber} Certification
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] leading-tight mb-4">
                {title} Level Programmes
              </h1>
              <p className="font-display text-xl text-[var(--color-ink-700)] font-light leading-relaxed mb-6">
                {description}
              </p>

              <div className="p-5 bg-[var(--color-paper-100)] border-l-4 border-[var(--color-brand-blue-700)] rounded-[2px]">
                <div className="text-xs font-bold uppercase text-[var(--color-brand-blue-700)] mb-1">
                  Competency Outcome
                </div>
                <p className="text-sm text-[var(--color-ink-900)] font-medium">
                  {competencyOutcome}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Program list */}
        <section className="py-16 bg-[var(--color-paper-100)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)] mb-8 pb-3 border-b border-[var(--color-paper-200)]">
              Available Programmes at this Level ({programs.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-6 sm:p-7 flex flex-col justify-between hover:border-[var(--color-brand-blue-700)] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-[var(--color-accent-gold-600)] uppercase tracking-wider">
                        {prog.format}
                      </span>
                      <StatusBadge status="open" label="Open" />
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
                      <span>UGX {(((prog.fees?.amount || 1200000)) / 1000).toFixed(0)}k</span>
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
                        className="px-4 py-2 text-xs font-semibold border border-[var(--color-paper-200)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-100)] rounded-[2px]"
                      >
                        Apply
                      </Link>
                    </div>
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
