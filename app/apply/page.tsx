'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SiteHeader } from '../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../src/components/primitives/Breadcrumbs';
import { dataStore } from '../../src/data/store';
import { ApplicationDraft, Application } from '../../src/domain/types';
import { CheckCircle2, ArrowRight, ArrowLeft, Save, AlertCircle, Edit2, ShieldCheck } from 'lucide-react';

const DRAFT_KEY = 'zegs_application_draft_v1';

const INITIAL_DRAFT: ApplicationDraft = {
  step: 1,
  programId: '',
  deliveryMode: 'physical',
  intakeMonth: 'October 2026',
  fullName: '',
  email: '',
  phone: '',
  country: 'Uganda',
  city: 'Kampala',
  dob: '',
  gender: 'Prefer not to say',
  highestEducation: "Bachelor's Degree",
  currentRole: '',
  organisation: '',
  yearsExperience: 2,
  statementOfPurpose: '',
  ventureIdea: '',
  fundingSource: 'self-funded',
  scholarshipNeedReason: '',
  agreedToTerms: false
};

function ApplyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialProgramId = searchParams?.get('program') || '';

  const [draft, setDraft] = useState<ApplicationDraft>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
          return { ...INITIAL_DRAFT, ...JSON.parse(saved) };
        }
      } catch {
        // ignore
      }
    }
    return initialProgramId ? { ...INITIAL_DRAFT, programId: initialProgramId } : INITIAL_DRAFT;
  });
  const [isLoaded, setIsLoaded] = useState(true);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const programs = useMemo(() => dataStore.getPrograms(), []);
  const schools = useMemo(() => dataStore.getSchools(), []);

  // Auto-save draft
  const saveDraft = (updated: ApplicationDraft) => {
    setDraft(updated);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
      setSaveStatus('Draft saved');
      setTimeout(() => setSaveStatus(''), 2500);
    } catch {
      // ignore
    }
  };

  const selectedProgram = programs.find((p) => p.id === draft.programId);

  // Validation per step
  const validateStep = (stepNumber: number): boolean => {
    const errs: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!draft.programId) errs.programId = 'Please select a program of study.';
    } else if (stepNumber === 2) {
      if (!draft.fullName.trim()) errs.fullName = 'Full name is required.';
      if (!draft.email.trim() || !draft.email.includes('@')) errs.email = 'A valid email is required.';
      if (!draft.phone.trim()) errs.phone = 'Phone number is required.';
      if (!draft.city.trim()) errs.city = 'City of residence is required.';
    } else if (stepNumber === 3) {
      if (!draft.currentRole.trim()) errs.currentRole = 'Current occupation/role is required.';
      if (!draft.organisation.trim()) errs.organisation = 'Organisation name is required (or write Self-employed).';
    } else if (stepNumber === 4) {
      if (!draft.statementOfPurpose.trim() || draft.statementOfPurpose.length < 50) {
        errs.statementOfPurpose = 'Please provide at least 50 characters describing your calling and purpose.';
      }
    } else if (stepNumber === 5) {
      if (!draft.ventureIdea.trim() || draft.ventureIdea.length < 50) {
        errs.ventureIdea = 'Please describe your proposed capstone or venture focus (minimum 50 characters).';
      }
    } else if (stepNumber === 6) {
      if (draft.fundingSource === 'seeking-scholarship' && !draft.scholarshipNeedReason?.trim()) {
        errs.scholarshipNeedReason = 'Please explain your reason for requesting bursary assistance.';
      }
    } else if (stepNumber === 7) {
      if (!draft.agreedToTerms) {
        errs.agreedToTerms = 'You must affirm the ZEGS Academic & Ethical Declaration before submitting.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(draft.step)) {
      const nextStep = Math.min(7, draft.step + 1);
      saveDraft({ ...draft, step: nextStep });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    const prevStep = Math.max(1, draft.step - 1);
    saveDraft({ ...draft, step: prevStep });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const jumpToStep = (stepNumber: number) => {
    saveDraft({ ...draft, step: stepNumber });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(7)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const prog = programs.find((p) => p.id === draft.programId);
      const appPayload: Omit<Application, 'id' | 'reference' | 'status' | 'createdAt'> = {
        programId: draft.programId,
        programName: prog?.name || 'Executive Program',
        applicantType: 'individual',
        fullName: draft.fullName,
        email: draft.email,
        phone: draft.phone,
        country: draft.country,
        city: draft.city,
        dateOfBirth: draft.dob,
        gender: draft.gender,
        highestEducation: draft.highestEducation,
        currentOccupation: draft.currentRole,
        organisation: draft.organisation,
        relevantExperience: `${draft.yearsExperience} years experience`,
        currentProject: draft.ventureIdea,
        learningGoals: draft.statementOfPurpose,
        intendedProject: draft.ventureIdea,
        howYouHeard: 'Website',
        deliveryPreference: draft.deliveryMode === 'online' ? 'online' : draft.deliveryMode === 'blended' ? 'blended' : 'physical',
        availability: 'Evenings & Weekends',
        deviceAndConnectivity: 'Standard PC & Broadband',
        consentGivenAt: new Date().toISOString()
      };
      const record = dataStore.submitApplication(appPayload);
      localStorage.removeItem(DRAFT_KEY);
      router.push(`/apply/confirmation/${record.reference}`);
    }, 600);
  };

  if (!isLoaded) return null;

  const stepTitles = [
    'Program & Intake',
    'Personal Profile',
    'Academic & Work',
    'Statement of Purpose',
    'Capstone / Venture',
    'Funding & Bursary',
    'Review & Submit'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* Breadcrumb */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs items={[{ label: 'Admissions', href: '/admissions' }, { label: 'Online Application' }]} />
          </div>
        </div>

        {/* Header with Step Tracker */}
        <section className="py-8 sm:py-12 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[var(--color-brand-blue-700)] uppercase tracking-wider">
                  Step {draft.step} of 7 • {stepTitles[draft.step - 1]}
                </span>
                <h1 className="font-display text-2xl sm:text-4xl text-[var(--color-ink-900)] mt-1">
                  ZEGS Admissions Application
                </h1>
              </div>
              {saveStatus && (
                <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent-green-700)] font-medium">
                  <CheckCircle2 size={14} />
                  <span>{saveStatus}</span>
                </div>
              )}
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-7 gap-1">
              {stepTitles.map((title, idx) => {
                const sNum = idx + 1;
                const isComplete = draft.step > sNum;
                const isCurrent = draft.step === sNum;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => sNum < draft.step && jumpToStep(sNum)}
                    disabled={sNum > draft.step}
                    className="flex flex-col text-left group disabled:cursor-not-allowed"
                  >
                    <div
                      className={`h-1.5 w-full rounded-[1px] transition-colors mb-2 ${
                        isCurrent
                          ? 'bg-[var(--color-brand-blue-900)]'
                          : isComplete
                          ? 'bg-[var(--color-accent-green-700)]'
                          : 'bg-[var(--color-paper-200)]'
                      }`}
                    />
                    <span
                      className={`hidden sm:block text-[11px] font-mono leading-tight ${
                        isCurrent
                          ? 'font-bold text-[var(--color-ink-900)]'
                          : isComplete
                          ? 'text-[var(--color-ink-700)]'
                          : 'text-[var(--color-ink-500)]'
                      }`}
                    >
                      0{sNum}. {title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Form Body Container */}
        <section className="py-12 bg-[var(--color-paper-100)]">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-8">
            <div className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] p-6 sm:p-10 shadow-xs">
              {/* STEP 1: Program & Intake Selection */}
              {draft.step === 1 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    1. Select Program & Cohort Preferences
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    Choose your desired program track, learning mode, and intake commencement date.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                        Academic Program *
                      </label>
                      <select
                        value={draft.programId}
                        onChange={(e) => saveDraft({ ...draft, programId: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-700)]"
                      >
                        <option value="">-- Choose a Program --</option>
                        {programs.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.durationWeeks} weeks • {p.levelSlug})
                          </option>
                        ))}
                      </select>
                      {errors.programId && (
                        <p className="text-xs text-red-600 mt-1">{errors.programId}</p>
                      )}
                    </div>

                    {selectedProgram && (
                      <div className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] text-xs space-y-1">
                        <span className="font-semibold text-[var(--color-ink-900)] block">
                          Program Summary:
                        </span>
                        <p className="text-[var(--color-ink-700)]">{selectedProgram.summary}</p>
                        <div className="pt-2 text-[var(--color-brand-blue-700)] font-medium">
                          Certificate: {selectedProgram.certificateType}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Preferred Delivery Mode *
                        </label>
                        <select
                          value={draft.deliveryMode}
                          onChange={(e) => saveDraft({ ...draft, deliveryMode: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        >
                          <option value="physical">Physical (Kampala Campus)</option>
                          <option value="online">Online (Global Virtual Cohort)</option>
                          <option value="blended">Blended (Hybrid Intensive)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Intake Quarter *
                        </label>
                        <select
                          value={draft.intakeMonth}
                          onChange={(e) => saveDraft({ ...draft, intakeMonth: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        >
                          <option value="October 2026">October 2026 (Michaelmas Term)</option>
                          <option value="January 2027">January 2027 (Hilary Term)</option>
                          <option value="April 2027">April 2027 (Trinity Term)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Profile */}
              {draft.step === 2 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    2. Personal & Contact Information
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    Official identity details as they should appear on your student registration and verified certificate.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        value={draft.fullName}
                        onChange={(e) => saveDraft({ ...draft, fullName: e.target.value })}
                        placeholder="e.g. David Mukasa"
                        className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                      />
                      {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={draft.email}
                          onChange={(e) => saveDraft({ ...draft, email: e.target.value })}
                          placeholder="david@example.com"
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Primary Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          value={draft.phone}
                          onChange={(e) => saveDraft({ ...draft, phone: e.target.value })}
                          placeholder="+256 772 000 000"
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                        {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Country of Residence *
                        </label>
                        <input
                          type="text"
                          value={draft.country}
                          onChange={(e) => saveDraft({ ...draft, country: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          City / Town *
                        </label>
                        <input
                          type="text"
                          value={draft.city}
                          onChange={(e) => saveDraft({ ...draft, city: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                        {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={draft.dob}
                          onChange={(e) => saveDraft({ ...draft, dob: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Academic Background & Occupation */}
              {draft.step === 3 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    3. Academic Background & Current Role
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    This helps our admissions committee pair you with mentors of appropriate sector experience.
                  </p>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Highest Qualification Achieved *
                        </label>
                        <select
                          value={draft.highestEducation}
                          onChange={(e) => saveDraft({ ...draft, highestEducation: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        >
                          <option value="High School / UACE">High School / UACE</option>
                          <option value="Diploma / Associate">Diploma / Associate Degree</option>
                          <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                          <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                          <option value="Master's Degree">Master&apos;s Degree</option>
                          <option value="Doctorate / PhD">Doctorate / PhD</option>
                          <option value="Self-Taught / Practitioner">Self-Taught / Practitioner</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Years of Professional Experience *
                        </label>
                        <input
                          type="number"
                          min={0}
                          max={50}
                          value={draft.yearsExperience}
                          onChange={(e) => saveDraft({ ...draft, yearsExperience: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Current Title / Role *
                        </label>
                        <input
                          type="text"
                          value={draft.currentRole}
                          onChange={(e) => saveDraft({ ...draft, currentRole: e.target.value })}
                          placeholder="e.g. Managing Director / Founder"
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                        {errors.currentRole && <p className="text-xs text-red-600 mt-1">{errors.currentRole}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                          Current Organisation / Company *
                        </label>
                        <input
                          type="text"
                          value={draft.organisation}
                          onChange={(e) => saveDraft({ ...draft, organisation: e.target.value })}
                          placeholder="e.g. Nile Basin Agritech Ltd"
                          className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                        {errors.organisation && <p className="text-xs text-red-600 mt-1">{errors.organisation}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Statement of Purpose */}
              {draft.step === 4 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    4. Statement of Calling & Intent
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    Explain why you feel drawn to Zoe Elpis Global School at this specific juncture. What core purpose or mandate are you seeking to fulfill?
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                      Your Statement of Purpose (minimum 50 characters) *
                    </label>
                    <textarea
                      rows={7}
                      value={draft.statementOfPurpose}
                      onChange={(e) => saveDraft({ ...draft, statementOfPurpose: e.target.value })}
                      placeholder="Share your personal narrative, your core motivations, and how you intend to steward this knowledge for societal transformation..."
                      className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] leading-relaxed"
                    />
                    <div className="flex justify-between text-[11px] text-[var(--color-ink-500)] mt-1">
                      <span>{draft.statementOfPurpose.length} characters</span>
                      <span>Target: ~150 to 300 words</span>
                    </div>
                    {errors.statementOfPurpose && <p className="text-xs text-red-600 mt-1">{errors.statementOfPurpose}</p>}
                  </div>
                </div>
              )}

              {/* STEP 5: Capstone / Venture Idea */}
              {draft.step === 5 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    5. Proposed Capstone / Venture Defense
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    Every ZEGS candidate executes an applied capstone project: a new business launch, a corporate governance turnaround, or a community initiative.
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                      Capstone Project Focus & Problem Statement *
                    </label>
                    <textarea
                      rows={7}
                      value={draft.ventureIdea}
                      onChange={(e) => saveDraft({ ...draft, ventureIdea: e.target.value })}
                      placeholder="What specific economic, institutional, or social problem will your project address? What tangible deliverable will you produce and defend?"
                      className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] leading-relaxed"
                    />
                    <div className="flex justify-between text-[11px] text-[var(--color-ink-500)] mt-1">
                      <span>{draft.ventureIdea.length} characters</span>
                      <span>Can be refined with your mentor during Week 2</span>
                    </div>
                    {errors.ventureIdea && <p className="text-xs text-red-600 mt-1">{errors.ventureIdea}</p>}
                  </div>
                </div>
              )}

              {/* STEP 6: Funding & Bursary */}
              {draft.step === 6 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    6. Tuition Sponsorship & Commitment
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    Indicate how your tuition will be covered and confirm your weekly study commitment.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-ink-900)] mb-1.5">
                        Sponsorship / Funding Plan *
                      </label>
                      <select
                        value={draft.fundingSource}
                        onChange={(e) => saveDraft({ ...draft, fundingSource: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 text-xs bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px]"
                      >
                        <option value="self-funded">Self-Funded (Direct Payment or Installment Plan)</option>
                        <option value="employer-sponsored">Employer / Institutional Sponsorship</option>
                        <option value="seeking-scholarship">Requesting Partial Need-Based Bursary (25% - 50%)</option>
                      </select>
                    </div>

                    {draft.fundingSource === 'seeking-scholarship' && (
                      <div className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-2">
                        <label className="block text-xs font-semibold text-[var(--color-ink-900)]">
                          Bursary Request Statement *
                        </label>
                        <textarea
                          rows={4}
                          value={draft.scholarshipNeedReason || ''}
                          onChange={(e) => saveDraft({ ...draft, scholarshipNeedReason: e.target.value })}
                          placeholder="Briefly state your financial situation and how a partial bursary enables you to complete this track..."
                          className="w-full px-3 py-2 text-xs bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px]"
                        />
                        {errors.scholarshipNeedReason && (
                          <p className="text-xs text-red-600">{errors.scholarshipNeedReason}</p>
                        )}
                      </div>
                    )}

                    <div className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] text-xs text-[var(--color-ink-700)] space-y-1">
                      <span className="font-semibold text-[var(--color-ink-900)] block">Time Commitment:</span>
                      <p>
                        Fellows must commit to at least 4 to 8 hours per week for live seminar attendance, masterclass workshops, and asynchronous fieldwork.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Review & Submit */}
              {draft.step === 7 && (
                <div className="space-y-6">
                  <h2 className="font-display text-2xl text-[var(--color-ink-900)]">
                    7. Application Review & Honor Declaration
                  </h2>
                  <p className="text-xs text-[var(--color-ink-700)]">
                    Please review your submission carefully before transmitting your application to the Admissions Committee.
                  </p>

                  {/* Summary Cards with Edit Jump Buttons */}
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="text-[var(--color-ink-500)] block">Program Track</span>
                        <span className="font-semibold text-[var(--color-ink-900)] block text-sm">
                          {selectedProgram ? selectedProgram.name : 'No program selected'}
                        </span>
                        <span className="text-[var(--color-ink-600)] block">
                          Mode: {draft.deliveryMode} • Intake: {draft.intakeMonth}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => jumpToStep(1)}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand-blue-700)] hover:underline"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                    </div>

                    <div className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="text-[var(--color-ink-500)] block">Candidate Profile</span>
                        <span className="font-semibold text-[var(--color-ink-900)] block">{draft.fullName}</span>
                        <span className="text-[var(--color-ink-600)] block">{draft.email} • {draft.phone}</span>
                        <span className="text-[var(--color-ink-600)] block">{draft.city}, {draft.country}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => jumpToStep(2)}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand-blue-700)] hover:underline"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                    </div>

                    <div className="p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="text-[var(--color-ink-500)] block">Professional Position</span>
                        <span className="font-semibold text-[var(--color-ink-900)] block">{draft.currentRole} at {draft.organisation}</span>
                        <span className="text-[var(--color-ink-600)] block">{draft.yearsExperience} years experience • {draft.highestEducation}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => jumpToStep(3)}
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-brand-blue-700)] hover:underline"
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                    </div>
                  </div>

                  {/* Ethical Declaration */}
                  <div className="pt-4 border-t border-[var(--color-paper-200)]">
                    <label className="flex items-start gap-3 p-4 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draft.agreedToTerms}
                        onChange={(e) => saveDraft({ ...draft, agreedToTerms: e.target.checked })}
                        className="mt-0.5 rounded-[2px] accent-[var(--color-brand-blue-900)]"
                      />
                      <span className="text-xs text-[var(--color-ink-900)] leading-relaxed">
                        <strong>ZEGS Honor & Academic Integrity Code:</strong> I certify that all information submitted is true and authored personally by me. I agree to uphold the school&apos;s standards of ethical leadership, intellectual rigor, and respectful community conduct throughout the program.
                      </span>
                    </label>
                    {errors.agreedToTerms && (
                      <p className="text-xs text-red-600 mt-2">{errors.agreedToTerms}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-[var(--color-paper-200)] flex items-center justify-between">
                <div>
                  {draft.step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold border border-[var(--color-paper-300)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-100)] rounded-[2px] transition-colors"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {draft.step < 7 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-7 py-2.5 text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
                    >
                      Next Step <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3 text-xs font-bold uppercase tracking-wider bg-[var(--color-accent-green-700)] text-[var(--color-paper-50)] hover:bg-[var(--color-accent-green-800)] rounded-[2px] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Transmitting...' : 'Submit Application Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm">Loading application form...</div>}>
      <ApplyPageContent />
    </Suspense>
  );
}
