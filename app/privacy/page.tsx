import type { Metadata } from 'next';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Protection',
  description: 'Official privacy statement and student data protection standards at Zoe Elpis Global School.'
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Institutional Policies', href: '/about' }, { label: 'Privacy Policy' }]} />
          </div>
        </div>

        <article className="py-16 bg-[var(--color-paper-50)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <div className="max-w-3xl space-y-8">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--color-accent-gold-600)] uppercase tracking-wider block mb-2">
                  Institutional Governance Document
                </span>
                <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-ink-900)] mb-4">
                  Privacy & Data Protection Policy
                </h1>
                <p className="text-xs text-[var(--color-ink-500)]">
                  Last updated: 1 January 2026 • Reference: ZEGS-POL-DP-01
                </p>
              </div>

              <div className="prose prose-sm max-w-none text-[var(--color-ink-900)] space-y-6 text-xs sm:text-sm leading-relaxed border-t border-[var(--color-paper-200)] pt-8">
                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">1. Purpose & Scope</h2>
                  <p>
                    Zoe Elpis Global School (&ldquo;ZEGS&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to protecting the privacy, confidentiality, and security of personal data entrusted to us by applicants, fellows, alumni, mentors, faculty, and website visitors in accordance with the Uganda Data Protection and Privacy Act (2019) and applicable international standards.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">2. Information We Collect</h2>
                  <p>We collect and process personal data solely for legitimate educational, administrative, and academic purposes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Admissions & Enrolment Data:</strong> Name, contact details, identification documents, educational transcripts, statements of purpose, and venture capstone descriptions.</li>
                    <li><strong>Academic & Progress Records:</strong> Attendance, workshop participation, mentorship evaluations, capstone scores, and certificate issuance records.</li>
                    <li><strong>Financial Information:</strong> Invoicing, tuition fee receipts, and bursary verification records. We do not store raw payment card data on our servers.</li>
                    <li><strong>Technical Telemetry:</strong> Anonymized server logs, browser type, and page access timestamps to ensure portal security and availability.</li>
                  </ul>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">3. Lawful Basis for Processing</h2>
                  <p>
                    We process your information under the lawful basis of contractual necessity (processing applications and delivering educational programs), legal compliance, and our legitimate institutional interest in maintaining verified alumni records.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">4. Credential Verification & Public Registry</h2>
                  <p>
                    To protect the integrity of ZEGS graduates against fraudulent representation, certified graduate awards (Certificate Code, Full Name, Program, and Year of Award) are published in our public verification registry accessible at <code>zegs.ac.ug/verify</code>.
                  </p>
                </section>

                <section className="space-y-2">
                  <h2 className="font-display text-xl text-[var(--color-ink-900)]">5. Data Subject Rights</h2>
                  <p>You have the right to request access to your academic file, request corrections to inaccurate records, or object to non-essential communications by writing to our Data Protection Officer at <code>privacy@zegs.ac.ug</code>.</p>
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
