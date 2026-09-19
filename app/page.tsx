'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { SiteHeader } from '../src/components/primitives/SiteHeader';
import { SiteFooter } from '../src/components/primitives/SiteFooter';
import { PillarMark } from '../src/components/primitives/PillarMark';
import { SequenceRail } from '../src/components/primitives/SequenceRail';
import { SectionHeading } from '../src/components/primitives/SectionHeading';
import { StatusBadge } from '../src/components/primitives/StatusBadge';
import { BRAND_STRINGS } from '../src/content/strings';
import { dataStore } from '../src/data/store';
import { ArrowRight, Calendar, BookOpen, Clock, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const schools = useMemo(() => dataStore.getSchools(), []);
  const featuredPrograms = useMemo(() => dataStore.getPrograms({ featuredOnly: true }), []);
  const upcomingEvents = useMemo(() => dataStore.getEvents('upcoming').slice(0, 3), []);
  const articles = useMemo(() => dataStore.getArticles().slice(0, 3), []);
  const impactStories = useMemo(() => dataStore.getImpactStories().slice(0, 1), []);
  const mentors = useMemo(() => dataStore.getMentors().slice(0, 2), []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header (over-hero on desktop) */}
      <SiteHeader variant="over-hero" />

      <main id="main-content" className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-end bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] overflow-hidden">
          {/* Background Image with Scrim */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop')`
            }}
          />
          {/* Defined Single Permitted Scrim Gradient */}
          <div className="absolute inset-0 scrim-overlay" />

          {/* Hero Content anchored to grid */}
          <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-8 pb-16 pt-32 sm:pt-40">
            <div className="max-w-3xl">
              {/* Institutional Title */}
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[0.95] text-[var(--color-paper-50)] mb-6">
                ZOE ELPIS<br />
                <span className="font-light">GLOBAL SCHOOL</span>
              </h1>

              {/* Tagline standfirst */}
              <p className="text-lg sm:text-2xl font-light font-display text-[var(--color-paper-100)] opacity-95 leading-snug mb-8 max-w-[56ch]">
                {BRAND_STRINGS.tagline}
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/programs"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-wide bg-[var(--color-paper-50)] text-[var(--color-brand-blue-900)] hover:bg-[var(--color-accent-gold-400)] hover:text-[var(--color-ink-900)] rounded-[2px] transition-colors"
                >
                  Explore Programmes
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold tracking-wide border border-white/40 text-[var(--color-paper-50)] hover:bg-white/10 rounded-[2px] transition-colors"
                >
                  Discover Zoe Elpis
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Identity Overlay Statement (archetype B) */}
        <section className="bg-[var(--color-paper-100)] py-12 sm:py-16 border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-9">
                <p className="font-display text-xl sm:text-2xl lg:text-3xl font-normal text-[var(--color-ink-900)] leading-snug">
                  {BRAND_STRINGS.oneSentence}
                </p>
              </div>
              <div className="lg:col-span-3 text-right">
                <Link
                  href="/about/story"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-blue-700)] hover:text-[var(--color-brand-blue-900)] underline underline-offset-4"
                >
                  Read our founding story →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Pillar Quick Access (archetype G - staggered vertical offsets, no card shadows) */}
        <section className="py-20 sm:py-28 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Four Foundational Pillars"
              standfirst="Every course, masterclass, and fellowship at ZEGS is architected around four distinct dimensions of human formation and enterprise."
              accent="gold"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {BRAND_STRINGS.pillars.map((p, idx) => (
                <div
                  key={p.id}
                  className={`border-t-2 border-[var(--color-paper-200)] pt-6 hover:border-[var(--color-accent-gold-600)] transition-colors flex flex-col justify-between ${
                    idx % 2 === 1 ? 'lg:translate-y-6' : ''
                  }`}
                >
                  <div>
                    <div className="text-[var(--color-brand-blue-900)] mb-4">
                      <PillarMark pillar={p.id} size={32} />
                    </div>
                    <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-3">
                      {p.label}
                    </h3>
                    <p className="text-sm text-[var(--color-ink-700)] leading-relaxed mb-6">
                      {p.statement}
                    </p>
                  </div>

                  <Link
                    href={`/schools/${p.schoolSlug}`}
                    className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline flex items-center gap-1.5"
                  >
                    <span>Explore {p.schoolName}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Institutional Introduction (archetype B - 5-7 split overlap) */}
        <section className="py-20 bg-[var(--color-paper-100)] border-y border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                  <img
                    src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop"
                    alt="Learners collaborating during a practical training session"
                    className="w-full h-full object-cover grayscale-[20%]"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] p-5 hidden sm:block max-w-[240px] text-xs leading-relaxed border border-white/10 shadow-lg">
                  <p className="font-display font-medium text-sm text-[var(--color-accent-gold-400)] mb-1">
                    Authentic Learning
                  </p>
                  <p className="opacity-80">Rigorous frameworks grounded in East African commercial & social reality.</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="w-12 h-[2px] bg-[var(--color-brand-blue-700)]" aria-hidden="true" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)] leading-tight">
                  A school built around four enduring questions.
                </h2>
                <div className="space-y-4 text-[var(--color-ink-700)] leading-relaxed text-base">
                  <p>
                    Most conventional education separates leadership from character, and business creation from community impact. At Zoe Elpis Global School, we believe sustainable institutions require all four working in concert.
                  </p>
                  <p>
                    Whether you are an entrepreneur structuring unit economics in Kampala, a project manager directing an NGO grant, or a young professional mapping your life calling, our curriculum gives you practical tools to build things that last.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                  >
                    About The School
                  </Link>
                  <Link
                    href="/learning/model"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold border border-[var(--color-ink-900)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-200)] rounded-[2px] transition-colors"
                  >
                    Our Teaching Model
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Four Schools Typographic Index Rows (archetype C) */}
        <section className="py-20 sm:py-28 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                  Academic Structure & Schools
                </h2>
              </div>
              <Link
                href="/schools"
                className="mt-4 sm:mt-0 text-sm font-semibold text-[var(--color-brand-blue-700)] hover:underline inline-flex items-center gap-1"
              >
                <span>View All Schools</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-[var(--color-paper-200)]">
              {schools.map((school) => (
                <Link
                  key={school.id}
                  href={`/schools/${school.slug}`}
                  className="group py-7 sm:py-9 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[var(--color-paper-100)] -mx-4 sm:-mx-6 px-4 sm:px-6 transition-colors"
                >
                  <div className="lg:w-1/2">
                    <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)] group-hover:text-[var(--color-brand-blue-700)] group-hover:underline underline-offset-4 transition-colors">
                      {school.name}
                    </h3>
                  </div>

                  <div className="lg:w-1/3">
                    <p className="text-sm text-[var(--color-ink-700)] leading-relaxed line-clamp-2">
                      {school.focus}
                    </p>
                  </div>

                  <div className="flex items-center justify-between lg:justify-end gap-6 text-xs font-semibold text-[var(--color-brand-blue-700)]">
                    <span className="px-2.5 py-1 bg-[var(--color-paper-200)] text-[var(--color-ink-700)] rounded-[2px]">
                      {school.programCount} Programmes
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Explore School →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Featured Signature Programmes (archetype E - Editorial mosaic) */}
        <section className="py-20 sm:py-28 bg-[var(--color-paper-100)] border-t border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                  Signature Programmes
                </h2>
                <p className="text-sm text-[var(--color-ink-700)] mt-2">
                  Cohorts open for application across our four schools.
                </p>
              </div>
              <Link
                href="/programs"
                className="mt-4 sm:mt-0 text-sm font-semibold text-[var(--color-brand-blue-700)] hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mosaic Layout: 1 Lead + 4 Secondary Index Rows */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lead Programme */}
              {featuredPrograms[0] && (
                <div className="lg:col-span-5 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] overflow-hidden rounded-[2px] mb-6 border border-[var(--color-paper-200)]">
                      <img
                        src={featuredPrograms[0].heroImageUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop'}
                        alt={featuredPrograms[0].name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-xs mb-2">
                      <StatusBadge status="open" label="Open for Application" />
                      <span className="text-[var(--color-ink-500)]">• {featuredPrograms[0].format}</span>
                    </div>
                    <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-3">
                      <Link href={`/programs/${featuredPrograms[0].slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                        {featuredPrograms[0].name}
                      </Link>
                    </h3>
                    <p className="text-sm text-[var(--color-ink-700)] leading-relaxed mb-6">
                      {featuredPrograms[0].summary}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[var(--color-paper-200)] flex items-center justify-between">
                    <span className="text-xs text-[var(--color-ink-500)]">
                      {featuredPrograms[0].durationWeeks} weeks • {featuredPrograms[0].deliveryMode}
                    </span>
                    <Link
                      href={`/programs/${featuredPrograms[0].slug}`}
                      className="px-4 py-2 text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              )}

              {/* Secondary Programmes Index */}
              <div className="lg:col-span-7 flex flex-col justify-between divide-y divide-[var(--color-paper-200)] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] p-6 sm:p-8">
                {featuredPrograms.slice(1, 5).map((prog) => (
                  <div key={prog.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="sm:max-w-[70%]">
                      <div className="text-[11px] font-semibold text-[var(--color-accent-gold-600)] uppercase tracking-wider mb-1">
                        {prog.levelSlug} • {prog.format}
                      </div>
                      <h4 className="font-display text-xl text-[var(--color-ink-900)]">
                        <Link href={`/programs/${prog.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {prog.name}
                        </Link>
                      </h4>
                      <p className="text-xs text-[var(--color-ink-700)] mt-1 line-clamp-2">
                        {prog.summary}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                      <span className="text-xs text-[var(--color-ink-500)]">
                        {prog.durationWeeks} wks • {prog.deliveryMode}
                      </span>
                      <Link
                        href={`/programs/${prog.slug}`}
                        className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline whitespace-nowrap"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 8. The Teaching Model: Learn, Apply, Build, Impact (archetype F) */}
        <section className="py-20 sm:py-28 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="The ZEGS Teaching Model"
              standfirst="Education that stops at theory creates passive observers. Our four-stage progression ensures every learner develops and defends an authentic live outcome."
              accent="gold"
            />

            <SequenceRail steps={BRAND_STRINGS.learningModelSteps} />
          </div>
        </section>

        {/* 9. Upcoming Events & Masterclasses (archetype I - Schedule Rail) */}
        <section className="py-20 bg-[var(--color-paper-100)] border-y border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                  Upcoming Masterclasses & Events
                </h2>
              </div>
              <Link
                href="/events"
                className="mt-4 sm:mt-0 text-sm font-semibold text-[var(--color-brand-blue-700)] hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Schedule</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="divide-y divide-[var(--color-paper-200)]">
              {upcomingEvents.map((event) => {
                const dateObj = new Date(event.startsAt);
                const day = dateObj.toLocaleDateString('en-GB', { day: '2-digit' });
                const month = dateObj.toLocaleDateString('en-GB', { month: 'short' });

                return (
                  <div key={event.id} className="py-7 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    {/* Date Gutter */}
                    <div className="flex items-center gap-4 md:w-44 shrink-0">
                      <div className="font-display text-3xl sm:text-4xl font-light text-[var(--color-brand-blue-900)] leading-none">
                        {day}
                      </div>
                      <div className="text-xs uppercase font-bold text-[var(--color-ink-500)] tracking-wider border-l border-[var(--color-paper-200)] pl-3">
                        {month}<br />
                        {dateObj.getFullYear()}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <StatusBadge status={event.registrationStatus} />
                        <span className="text-xs text-[var(--color-ink-500)] font-medium">
                          • {event.category} • {event.deliveryMode}
                        </span>
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-[var(--color-ink-900)]">
                        <Link href={`/events/${event.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {event.title}
                        </Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--color-ink-700)] mt-1 max-w-[65ch]">
                        {event.summary}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="md:shrink-0">
                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. School Journal & Editorial Mosaic (archetype E) */}
        <section className="py-20 sm:py-28 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                  The ZEGS Journal
                </h2>
                <p className="text-sm text-[var(--color-ink-700)] mt-1">
                  Thought leadership and institutional perspectives from our faculty and practitioners.
                </p>
              </div>
              <Link
                href="/news"
                className="mt-4 sm:mt-0 text-sm font-semibold text-[var(--color-brand-blue-700)] hover:underline inline-flex items-center gap-1"
              >
                <span>Read All Essays</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Lead Article (Cols 1-7) */}
              {articles[0] && (
                <article className="lg:col-span-7 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="aspect-[16/9] overflow-hidden rounded-[2px] mb-6 border border-[var(--color-paper-200)]">
                      <img
                        src={articles[0].heroImageUrl}
                        alt={articles[0].title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="text-xs font-semibold tracking-wider text-[var(--color-accent-gold-600)] uppercase mb-2">
                      {articles[0].category} • {articles[0].readMinutes} min read
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)] mb-3 leading-snug">
                      <Link href={`/news/${articles[0].slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                        {articles[0].title}
                      </Link>
                    </h3>
                    <p className="text-sm text-[var(--color-ink-700)] leading-relaxed mb-6">
                      {articles[0].standfirst}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[var(--color-paper-200)] text-xs text-[var(--color-ink-500)] flex items-center justify-between">
                    <span>By {articles[0].authorName}</span>
                    <Link href={`/news/${articles[0].slug}`} className="font-semibold text-[var(--color-brand-blue-700)] hover:underline">
                      Read Essay →
                    </Link>
                  </div>
                </article>
              )}

              {/* Secondary Articles Stack (Cols 8-12) */}
              <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                {articles.slice(1, 3).map((art) => (
                  <article key={art.id} className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold tracking-wider text-[var(--color-accent-gold-600)] uppercase mb-1">
                        {art.category} • {art.readMinutes} min
                      </div>
                      <h4 className="font-display text-xl text-[var(--color-ink-900)] mb-2">
                        <Link href={`/news/${art.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {art.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-[var(--color-ink-700)] leading-relaxed line-clamp-3 mb-4">
                        {art.standfirst}
                      </p>
                    </div>
                    <Link href={`/news/${art.slug}`} className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline">
                      Read full article →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. Impact & Verified Transformation (archetype B) */}
        {impactStories[0] && (
          <section className="py-20 bg-[var(--color-paper-100)] border-t border-[var(--color-paper-200)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5 aspect-[4/5] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                  <img
                    src={impactStories[0].photoUrl}
                    alt={impactStories[0].subjectName}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 space-y-5">
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent-green-700)]">
                    Verified Learner Story • {impactStories[0].programName}
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                    {impactStories[0].subjectName}
                  </h3>
                  <div className="text-sm font-semibold text-[var(--color-ink-700)]">
                    {impactStories[0].subjectRole}
                  </div>
                  <p className="text-sm sm:text-base text-[var(--color-ink-700)] leading-relaxed">
                    {impactStories[0].narrative}
                  </p>
                  <div className="p-4 bg-[var(--color-paper-50)] border-l-2 border-[var(--color-accent-green-700)] text-xs text-[var(--color-ink-900)]">
                    <span className="font-bold block mb-1">Demonstrated Outcome:</span>
                    {impactStories[0].outcomeDescription}
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/impact"
                      className="text-sm font-semibold text-[var(--color-brand-blue-700)] hover:underline"
                    >
                      Read our full impact methodology →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 12. Mentorship Network Section (archetype B) */}
        <section className="py-20 bg-[var(--color-paper-50)] border-t border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)]" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)] leading-tight">
                  Guided by practitioners, leaders, and entrepreneurs.
                </h2>
                <p className="text-base text-[var(--color-ink-700)] leading-relaxed">
                  Every programme pairs structured academic instruction with dedicated mentor critique. Learners receive one-on-one strategy feedback on their life blueprints, financial models, and grant proposals.
                </p>
                <div className="pt-2 flex gap-4">
                  <Link
                    href="/mentorship"
                    className="px-6 py-3 text-sm font-semibold bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                  >
                    Browse Mentor Directory
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {mentors.map((m) => (
                  <div key={m.id} className="p-5 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] flex items-center gap-4 rounded-[2px]">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-[var(--color-paper-200)] shrink-0 border border-[var(--color-paper-200)]">
                      <img src={m.photoUrl} alt={m.fullName} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-base text-[var(--color-ink-900)]">{m.fullName}</h4>
                      <p className="text-xs text-[var(--color-ink-500)]">{m.role} • {m.organisation}</p>
                      <div className="flex gap-1.5 mt-2">
                        {m.expertise.slice(0, 2).map((exp, idx) => (
                          <span key={idx} className="text-[10px] bg-[var(--color-paper-200)] text-[var(--color-ink-700)] px-2 py-0.5 rounded-[2px]">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. Final CTA Black Statement Section (archetype D) */}
        <section className="py-24 sm:py-32 bg-[var(--color-ink-900)] text-[var(--color-paper-50)] text-center px-4 sm:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="w-12 h-[2px] bg-[var(--color-accent-gold-400)] mx-auto" />
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[var(--color-paper-50)] leading-tight">
              Discover purpose.<br />
              Build value. Create impact.
            </h2>
            <p className="text-base sm:text-xl font-light text-[var(--color-paper-100)] opacity-90 max-w-[50ch] mx-auto leading-relaxed">
              Applications are reviewed on a rolling basis for upcoming online, physical, and blended cohorts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/apply"
                className="w-full sm:w-auto px-8 py-4 text-sm font-bold tracking-wider uppercase bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-50)] transition-colors rounded-[2px]"
              >
                Apply for Intake
              </Link>
              <Link
                href="/admissions"
                className="w-full sm:w-auto px-8 py-4 text-sm font-semibold tracking-wide border border-white/30 text-[var(--color-paper-50)] hover:bg-white/10 transition-colors rounded-[2px]"
              >
                How Admission Works
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 14. Footer */}
      <SiteFooter />
    </div>
  );
}
