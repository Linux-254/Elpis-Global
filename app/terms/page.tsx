import type { Metadata } from 'next';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Enrolment & Academic Integrity',
  description: 'Terms and conditions governing academic enrolment, student conduct, tuition schedules, and intellectual property at Zoe Elpis Global School.'
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Institutional Policies', href: '/about' }, { label: 'Terms & Conditions' }]} />
          </div>
        </div>

        <article className="py-16 bg-[var(--color-paper-50)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl space-y-8">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--color-accent-gold-600)] uppercase tracking-wider block mb-2">
                  Academic Governance
                </span>
                <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] mb-4">
                  Terms of Enrolment & Academic Integrity
                </h1>
                <p className="text-xs text-[var(--color-ink-500)]">
                  Effective Date: 1 January 2026 • Reference: ZEGS-POL-TC-01
                </p>
              </div>

              <div className="prose prose-sm max-w-none text-[var(--color-ink-900)] space-y-6 text-xs sm:text-sm leading-relaxed border-t border-[var(--color-paper-200)] pt-8">
                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">1. Acceptance of Terms</h2>
                  <p>
                    By submitting an application, enrolling in any ZEGS program, or accessing our digital learning portals, you agree to be bound by these Terms of Enrolment and the ZEGS Code of Academic & Ethical Conduct.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">2. The ZEGS Honor Code</h2>
                  <p>
                    Zoe Elpis Global School is founded upon the principle that genuine leadership demands uncompromising integrity. Fellows must produce original work, cite sources accurately, and uphold truthfulness in all venture reports, financial projections, and peer interactions. Plagiarism or fraudulent representation is grounds for immediate expulsion and certificate revocation.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">3. Attendance & Capstone Defense Requirements</h2>
                  <p>
                    To qualify for formal graduation and certified credential issuance, fellows must satisfy minimum attendance thresholds (at least 80% of live seminars and studio workshops) and successfully defend their applied capstone project before the Academic Jury.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">4. Intellectual Property</h2>
                  <p>
                    All venture concepts, business models, and capstone intellectual property developed by fellows during their cohort remain 100% the exclusive property of the fellow/creator. ZEGS claims zero equity or IP ownership over student ventures.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">5. Inquiries & Academic Appeals</h2>
                  <p>
                    Any disputes or academic appeals should be submitted in writing to the Academic Council at <code>academic.council@zegs.ac.ug</code>.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
