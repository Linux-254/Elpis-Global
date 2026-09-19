import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { SequenceRail } from '../../src/components/primitives/SequenceRail';
import { BRAND_STRINGS } from '../../src/content/strings';
import { ArrowRight, Laptop, MapPin, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Experience & Delivery Models',
  description: 'Explore the ZEGS pedagogical philosophy, teaching progression, and flexible online, physical, and blended delivery tracks.'
};

export default function LearningPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Learning' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-4">
                The ZEGS Learning Model
              </h1>
              <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed">
                Action-oriented, research-grounded, and mentor-critiqued education designed for real institutional formation.
              </p>
            </div>
          </div>
        </section>

        {/* The 4 Stages Progression */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Four-Stage Pedagogy"
              standfirst="Every cohort follows this cyclical rhythm, guaranteeing that theoretical concepts transform into defended deliverables."
              accent="gold"
            />
            <SequenceRail steps={BRAND_STRINGS.learningModelSteps} />
          </div>
        </section>

        {/* Delivery Modes (archetype G) */}
        <section className="py-20 bg-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="Three Flexible Delivery Modes"
              standfirst="Choose how you learn based on your location, schedule, and preferred degree of in-person collaboration."
              accent="gold"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Online */}
              <div className="p-8 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[2px] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] flex items-center justify-center text-[var(--color-brand-blue-700)] mb-6">
                    <Laptop size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">
                    Online Learning
                  </h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-6">
                    Live interactive webinars, asynchronous studio portals, and global cohort breakout groups tailored for distributed professionals.
                  </p>
                </div>
                <Link href="/learning/online" className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline flex items-center gap-1">
                  <span>Explore Online Experience</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Physical */}
              <div className="p-8 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[2px] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] flex items-center justify-center text-[var(--color-accent-gold-600)] mb-6">
                    <MapPin size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">
                    Physical Campus Residencies
                  </h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-6">
                    Intensive weekend workshops, boardroom simulations, and laboratory bootcamps hosted at our Kampala learning hubs.
                  </p>
                </div>
                <Link href="/learning/physical" className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline flex items-center gap-1">
                  <span>Explore Physical Residencies</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Blended */}
              <div className="p-8 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-[2px] bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] flex items-center justify-center text-[var(--color-accent-green-700)] mb-6">
                    <Layers size={24} />
                  </div>
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">
                    Blended Cohorts
                  </h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-6">
                    The best of both worlds: digital weekly seminars combined with monthly in-person executive retreats and capstone defenses.
                  </p>
                </div>
                <Link href="/learning/blended" className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline flex items-center gap-1">
                  <span>Explore Blended Cohorts</span>
                  <ArrowRight size={13} />
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
