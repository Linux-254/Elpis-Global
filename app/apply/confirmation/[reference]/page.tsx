'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SiteHeader } from '../../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../../src/components/primitives/Breadcrumbs';
import { dataStore } from '../../../../src/data/store';
import { Application } from '../../../../src/domain/types';
import { CheckCircle2, Printer, Calendar, Clock, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ApplicationConfirmationPage() {
  const params = useParams();
  const refNum = params?.reference as string;

  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    if (!refNum) return;
    const found = dataStore.getApplicationByReference(refNum);
    if (found) setApplication(found);
  }, [refNum]);

  if (!refNum) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Admissions', href: '/admissions' }, { label: 'Application Received' }]} />
          </div>
        </div>

        <section className="py-12 sm:py-20 bg-[var(--color-paper-50)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-8 sm:p-12 shadow-xs space-y-8">
              {/* Header Badge */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[2px] bg-[var(--color-accent-green-700)] text-[var(--color-paper-50)] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--color-accent-green-700)] uppercase tracking-wider block mb-1">
                    Application Successfully Submitted
                  </span>
                  <h1 className="font-display text-2xl sm:text-4xl text-[var(--color-ink-900)]">
                    Application Reference: {refNum}
                  </h1>
                </div>
              </div>

              {/* Overview Details */}
              <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                <div>
                  <span className="text-[var(--color-ink-500)] block mb-1">Applicant</span>
                  <span className="font-semibold text-[var(--color-ink-900)] block">
                    {application ? application.fullName : 'Registered Applicant'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-ink-500)] block mb-1">Status</span>
                  <span className="inline-flex px-2 py-0.5 font-bold uppercase text-[10px] bg-amber-100 text-amber-800 rounded-[2px]">
                    {application?.status ? application.status.replace(/_/g, ' ') : 'Under Academic Review'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-ink-500)] block mb-1">Delivery Mode</span>
                  <span className="font-semibold text-[var(--color-ink-900)] block capitalize">
                    {application ? application.deliveryPreference : 'Physical / Kampala'}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--color-ink-500)] block mb-1">Target Program</span>
                  <span className="font-semibold text-[var(--color-ink-900)] block">
                    {application ? (application.programName || 'Executive Cohort') : 'Executive Cohort'}
                  </span>
                </div>
              </div>

              {/* Next Steps Timeline */}
              <div className="space-y-4 pt-4 border-t border-[var(--color-paper-200)]">
                <h3 className="font-display text-xl text-[var(--color-ink-900)]">What Happens Next?</h3>
                <div className="space-y-3 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                  <div className="flex items-start gap-3 p-3 bg-[var(--color-paper-100)] rounded-[2px]">
                    <span className="font-mono font-bold text-[var(--color-brand-blue-700)]">01</span>
                    <div>
                      <strong className="text-[var(--color-ink-900)] block">Admissions Committee Review (Days 1–3)</strong>
                      Our academic team reviews your statement of purpose and venture proposal against cohort criteria.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[var(--color-paper-100)] rounded-[2px]">
                    <span className="font-mono font-bold text-[var(--color-brand-blue-700)]">02</span>
                    <div>
                      <strong className="text-[var(--color-ink-900)] block">Diagnostic Interview Invitation</strong>
                      You will receive an email to schedule your 20-minute video or campus interview with a faculty fellow.
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[var(--color-paper-100)] rounded-[2px]">
                    <span className="font-mono font-bold text-[var(--color-brand-blue-700)]">03</span>
                    <div>
                      <strong className="text-[var(--color-ink-900)] block">Formal Letter of Admission & Portal Access</strong>
                      Successful candidates receive cohort onboarding documents, timetable, and tutor pairing details.
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold border border-[var(--color-ink-900)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-200)] rounded-[2px] transition-colors"
                >
                  <Printer size={14} /> Print Confirmation
                </button>

                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                >
                  Browse More Programs <ArrowRight size={14} />
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
