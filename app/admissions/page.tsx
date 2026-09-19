import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { SequenceRail } from '../../src/components/primitives/SequenceRail';
import { BRAND_STRINGS } from '../../src/content/strings';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admissions Process & Criteria',
  description: 'Understand the four-stage admissions sequence, eligibility criteria, bursary considerations, and intake schedules at Zoe Elpis Global School.'
};

export default function AdmissionsPage() {
  const steps = [
    {
      order: 1,
      label: 'Online Application',
      body: 'Complete the 7-step online application including personal statement and preliminary venture or capstone focus.'
    },
    {
      order: 2,
      label: 'Academic Review',
      body: 'Our Admissions Committee assesses readiness, ethical alignment, and intentionality within 3 business days.'
    },
    {
      order: 3,
      label: 'Diagnostic Interview',
      body: 'A 20-minute video or in-person dialogue with a faculty mentor to clarify goals, time commitment, and mentor pairing.'
    },
    {
      order: 4,
      label: 'Offer & Enrolment',
      body: 'Formal letter of admission issued with student portal credentials, cohort syllabus, and tuition confirmation.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Admissions' }]} />
          </div>
        </div>

        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-4" />
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight mb-4">
                How Admission Works
              </h1>
              <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed mb-8">
                A transparent, rigorous, and rolling admissions process designed to evaluate commitment, integrity, and venture potential.
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
              >
                Start Online Application
              </Link>
            </div>
          </div>
        </section>

        {/* 4-Stage Admissions Process (archetype F) */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <SectionHeading
              title="The Four Admissions Milestones"
              standfirst="Applications are reviewed on a rolling basis. Early submissions are given priority for mentor selection and bursary allocations."
              accent="gold"
            />
            <SequenceRail steps={steps} />
          </div>
        </section>

        {/* Eligibility & Criteria */}
        <section className="py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6 space-y-6">
                <h2 className="font-display text-3xl text-[var(--color-ink-900)]">
                  What We Look For in Candidates
                </h2>
                <div className="space-y-4 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                  <p>
                    We do not select fellows based on exam memorization or family pedigree. We look for individuals who are ready to build something of lasting value and who hold themselves to the highest ethical standard.
                  </p>
                  <ul className="space-y-3 pt-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span><strong>Clear Sense of Intent:</strong> A genuine hunger to clarify purpose or scale an ethical enterprise.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span><strong>Commitment to Execution:</strong> Willingness to dedicate 4-8 hours weekly to studio workshops and fieldwork.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span><strong>Openness to Critique:</strong> Readiness to have your ideas rigorously critiqued by mentors and peers.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="p-8 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-4">
                  <h3 className="font-display text-2xl text-[var(--color-ink-900)]">
                    Tuition Assistance & Need-Based Bursaries
                  </h3>
                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    ZEGS is committed to ensuring that transformative enterprise builders are not excluded solely due to immediate financial hardship. Partial bursaries (covering 25% to 50% of tuition) are available for qualified candidates in the Foundation and Fellowship tracks.
                  </p>
                  <p className="text-xs text-[var(--color-ink-500)] pt-2 border-t border-[var(--color-paper-200)]">
                    You can indicate your request for bursary consideration directly within Step 6 of the online application form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[var(--color-ink-900)] text-[var(--color-paper-50)] text-center">
          <div className="max-w-2xl mx-auto space-y-6 px-4">
            <h2 className="font-display text-3xl sm:text-4xl">Ready to Begin Your Application?</h2>
            <p className="text-sm text-[var(--color-paper-100)] opacity-85">
              The online application takes approximately 10-15 minutes to complete. Your progress is saved automatically.
            </p>
            <div>
              <Link
                href="/apply"
                className="inline-block px-8 py-3.5 text-xs font-bold uppercase tracking-wider bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-50)] rounded-[2px] transition-colors"
              >
                Open Application Wizard →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
