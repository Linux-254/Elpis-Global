'use client';

import React, { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { BRAND_STRINGS } from '../../src/content/strings';
import { dataStore } from '../../src/data/store';
import { SEED_SETTINGS } from '../../src/data/seed';

const subscribe = (cb: () => void) => dataStore.subscribe(cb);
const getSettingsSnapshot = () => dataStore.getSettings();
const getSettingsServerSnapshot = () => SEED_SETTINGS;

export default function AboutPage() {
  const settings = useSyncExternalStore(subscribe, getSettingsSnapshot, getSettingsServerSnapshot);
  const storyImg = settings.aboutStoryPhotoUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb strip */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'About' }]} />
          </div>
        </div>

        {/* Hero Section (archetype B) */}
        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)]" />
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight">
                  About Zoe Elpis Global School
                </h1>
                <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                  {BRAND_STRINGS.shortDescription}
                </p>
              </div>
              <div className="lg:col-span-5 aspect-[4/5] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                <img
                  src={storyImg}
                  alt="Training room session at Zoe Elpis Global School"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Rationale & 10 Objectives (archetype J & C) */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Core Institutional Commitments"
              standfirst="The ten fundamental objectives that steer our academic curricula, facilitator standards, and mentorship matching."
              accent="gold"
            />

            <div className="divide-y divide-[var(--color-paper-200)] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-6 sm:p-10 rounded-[2px]">
              {BRAND_STRINGS.objectives.map((obj, i) => (
                <div key={i} className="py-5 first:pt-0 last:pb-0 flex items-start gap-5">
                  <span className="font-display text-xl text-[var(--color-accent-gold-600)] font-light shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base text-[var(--color-ink-900)] leading-relaxed pt-0.5">
                    {obj}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Philosophy Black Section (archetype D) */}
        <section className="py-20 bg-[var(--color-ink-900)] text-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-400)] mx-auto mb-4" />
              <h2 className="font-display text-3xl sm:text-4xl">Our Core Philosophy</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {BRAND_STRINGS.philosophy.map((item, idx) => (
                <div key={idx} className="border-t border-white/20 pt-6">
                  <h3 className="font-display text-xl text-[var(--color-accent-gold-400)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-paper-100)] opacity-85 leading-relaxed">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-Pages Quick Navigation */}
        <section className="py-20 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-8 pb-3 border-b border-[var(--color-paper-200)]">
              Explore Our Institution
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/about/story"
                className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] hover:border-[var(--color-brand-blue-700)] rounded-[2px] transition-colors group"
              >
                <h4 className="font-display text-xl text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-blue-700)] mb-2">
                  Our Story
                </h4>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  The founding intent, heritage, and distinction from sister community initiatives.
                </p>
              </Link>

              <Link
                href="/about/vision-mission"
                className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] hover:border-[var(--color-brand-blue-700)] rounded-[2px] transition-colors group"
              >
                <h4 className="font-display text-xl text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-blue-700)] mb-2">
                  Vision & Mission
                </h4>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Our strategic horizon for empowering enterprise builders and transformative leaders.
                </p>
              </Link>

              <Link
                href="/about/values"
                className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] hover:border-[var(--color-brand-blue-700)] rounded-[2px] transition-colors group"
              >
                <h4 className="font-display text-xl text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-blue-700)] mb-2">
                  Core Values
                </h4>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Integrity, excellence, innovation, service, and verified measurable impact.
                </p>
              </Link>

              <Link
                href="/about/leadership"
                className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] hover:border-[var(--color-brand-blue-700)] rounded-[2px] transition-colors group"
              >
                <h4 className="font-display text-xl text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-blue-700)] mb-2">
                  Leadership
                </h4>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Profiles of the academic leadership and governing directorate.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
