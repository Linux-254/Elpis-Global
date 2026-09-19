'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { SectionHeading } from '../../src/components/primitives/SectionHeading';
import { dataStore } from '../../src/data/store';
import { Certificate } from '../../src/domain/types';
import { Search, ShieldCheck, CheckCircle2, AlertCircle, Award, ArrowRight } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const [searchCode, setSearchCode] = useState('');
  const [result, setResult] = useState<Certificate | null | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);

  const sampleCertificates = dataStore.getCertificates();

  const handleSearch = (codeToSearch: string) => {
    const clean = codeToSearch.trim();
    if (!clean) return;
    setHasSearched(true);
    const found = dataStore.verifyCertificate(clean);
    setResult(found || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchCode);
  };

  const program = result ? dataStore.getProgramById(result.programId) : undefined;
  const school = program ? dataStore.getSchools().find((s) => s.id === program.schoolId) : undefined;

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Institutional Registry', href: '/about' }, { label: 'Verify Credentials' }]} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] text-xs font-mono text-[var(--color-brand-blue-700)]">
              <ShieldCheck size={14} /> Official Academic Registry
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-tight">
              Verify ZEGS Credentials & Certificates
            </h1>

            <p className="font-display text-lg sm:text-xl font-light text-[var(--color-ink-700)] max-w-2xl mx-auto leading-relaxed">
              Employers, academic institutions, and partners can authenticate graduate diplomas, certificates, and executive fellowship awards in real time.
            </p>

            {/* Verification Form */}
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto pt-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchCode}
                    onChange={(e) => setSearchCode(e.target.value)}
                    placeholder="Enter Certificate Code (e.g. ZEGS-CERT-2025-001)"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-300)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)] font-mono"
                  />
                  <Search size={16} className="absolute left-3.5 top-3.5 text-[var(--color-ink-500)]" />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] text-xs font-bold uppercase tracking-wider rounded-[2px] hover:bg-[var(--color-brand-blue-700)] transition-colors shrink-0"
                >
                  Verify Now
                </button>
              </div>

              {/* Sample Code Quick Links */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-[var(--color-ink-500)]">
                <span>Try sample registry codes:</span>
                {sampleCertificates.map((cert) => (
                  <button
                    key={cert.code}
                    type="button"
                    onClick={() => {
                      setSearchCode(cert.code);
                      handleSearch(cert.code);
                    }}
                    className="underline font-mono text-[var(--color-brand-blue-700)] hover:text-[var(--color-ink-900)]"
                  >
                    {cert.code}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </section>

        {/* Verification Result Display */}
        {hasSearched && (
          <section className="py-12 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
            <div className="max-w-[800px] mx-auto px-4 sm:px-8">
              {result ? (
                <div className="bg-[var(--color-paper-50)] border-2 border-[var(--color-accent-green-700)] rounded-[2px] p-8 sm:p-12 shadow-sm space-y-6 relative overflow-hidden">
                  {/* Decorative institutional ribbon */}
                  <div className="flex items-start justify-between pb-6 border-b border-[var(--color-paper-200)]">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[var(--color-accent-green-700)] tracking-wider">
                        <CheckCircle2 size={14} /> Official Verified Record
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)]">
                        {result.holderName}
                      </h2>
                    </div>
                    <div className="text-right font-mono text-xs text-[var(--color-ink-500)]">
                      <span>Code:</span>
                      <span className="font-bold text-[var(--color-ink-900)] block">{result.code}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div>
                      <span className="text-[var(--color-ink-500)] block mb-1">Academic Program</span>
                      <span className="font-semibold text-sm text-[var(--color-ink-900)] block">{result.programName}</span>
                      <span className="text-[var(--color-brand-blue-700)] font-medium capitalize">{program?.levelSlug || 'Professional'} Level</span>
                    </div>

                    <div>
                      <span className="text-[var(--color-ink-500)] block mb-1">School</span>
                      <span className="font-semibold text-[var(--color-ink-900)] block">{school?.name || 'Zoe Elpis Global School'}</span>
                    </div>

                    <div>
                      <span className="text-[var(--color-ink-500)] block mb-1">Date of Award</span>
                      <span className="font-semibold text-[var(--color-ink-900)] block">
                        {new Date(result.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <div>
                      <span className="text-[var(--color-ink-500)] block mb-1">Academic Standing</span>
                      <span className="font-semibold text-[var(--color-accent-green-700)] block">Graduated with Distinction</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-paper-200)] flex items-center justify-between text-[11px] text-[var(--color-ink-500)]">
                    <span>Issued by Academic Registrar, Zoe Elpis Global School</span>
                    <span>Status: {result.revokedAt ? 'Revoked' : 'Active & In Good Standing'}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-[var(--color-paper-50)] border border-red-200 rounded-[2px] p-8 text-center space-y-3">
                  <AlertCircle size={36} className="text-red-600 mx-auto" />
                  <h3 className="font-display text-xl text-[var(--color-ink-900)]">No Record Found</h3>
                  <p className="text-xs text-[var(--color-ink-700)] max-w-md mx-auto">
                    We could not locate any certificate matching the code <strong>&ldquo;{searchCode}&rdquo;</strong>. Please check the spelling or contact our registry office at registry@zegs.ac.ug.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Security / Fraud Notice */}
        <section className="py-16 bg-[var(--color-paper-50)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <div className="p-8 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-[var(--color-ink-700)] leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-display text-base text-[var(--color-ink-900)]">Tamper-Proof Verification</h4>
                <p>
                  Every ZEGS diploma carries an encrypted cryptographic hash linked directly to our immutable institutional ledger. Any altered or forged physical copy will fail registry verification.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-display text-base text-[var(--color-ink-900)]">Third-Party Inquiries</h4>
                <p>
                  Corporate human resources departments and international universities requiring certified transcripts can email official verification requests directly to <span className="font-mono text-[var(--color-brand-blue-700)]">registrar@zegs.ac.ug</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
