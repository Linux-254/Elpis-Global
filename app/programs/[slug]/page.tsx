'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { Breadcrumbs } from '../../../src/components/primitives/Breadcrumbs';
import { PillarMark } from '../../../src/components/primitives/PillarMark';
import { StatusBadge } from '../../../src/components/primitives/StatusBadge';
import { dataStore } from '../../../src/data/store';
import { Program, School, Mentor } from '../../../src/domain/types';
import {
  Calendar,
  Clock,
  BookOpen,
  Users,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [syllabusDownloaded, setSyllabusDownloaded] = useState(false);

  const program = useMemo(() => (slug ? dataStore.getProgramBySlug(slug) || null : null), [slug]);
  const school = useMemo(() => {
    if (!program) return null;
    return dataStore.getSchools().find((sc) => sc.id === program.schoolId) || null;
  }, [program]);

  if (!slug) return null;
  if (!program) {
    return (
      <div className="flex flex-col min-h-screen">
        <SiteHeader />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="font-display text-2xl text-[var(--color-ink-900)] mb-2">Programme Not Found</h1>
            <p className="text-xs text-[var(--color-ink-600)] mb-4">The requested programme slug &ldquo;{slug}&rdquo; does not exist in our active catalogue.</p>
            <Link href="/programs" className="text-xs font-semibold text-[var(--color-brand-blue-700)] underline">
              Browse all programmes →
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const relatedPrograms = dataStore.getPrograms({ schoolId: program.schoolId })
    .filter((p) => p.id !== program.id)
    .slice(0, 3);

  const toggleModule = (idx: number) => {
    setOpenModuleIndex(openModuleIndex === idx ? null : idx);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const totalHours = program.contactHours || (program.durationWeeks * 4);
  const tuitionUgx = program.fees?.amount || 1200000;
  const tuitionUsd = Math.round(tuitionUgx / 3700);
  const nextCohort = program.intakes?.[0]?.startsAt ? new Date(program.intakes[0].startsAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : 'Rolling Intake';
  const targetAudience = program.audience || [];
  const prerequisites = program.certificateRequirements || 'Open admission following statement of intent and vocational alignment review.';
  const modulesList = program.modules || [];
  const capstone = program.practicalProject || 'Applied sector-specific capstone deliverable reviewed by an advisory jury of practitioners.';
  const certification = program.certificateRequirements || `${program.certificateType} accredited through Zoe Elpis Global School competency frameworks.`;

  const programFaqs = [
    {
      question: 'What is the weekly time commitment required?',
      answer: `Fellows typically spend 4 to 6 hours per week engaging with module materials, live practitioner seminars, and project milestones.`
    },
    {
      question: 'How is mentorship delivered during the cohort?',
      answer: 'You are matched with a verified sector leader who provides bi-weekly strategic reviews and capstone advisory guidance.'
    },
    {
      question: 'Are installment payment plans available?',
      answer: 'Yes, accepted fellows can split tuition across two equal installments: 50% upon admission confirmation and 50% at the midterm milestone.'
    },
    {
      question: 'What credential will I receive upon completion?',
      answer: `You will receive a cryptographically verifiable ${program.certificateType} recognized by regional partner institutions.`
    }
  ];

  const handleDownloadSyllabus = () => {
    setSyllabusDownloaded(true);
    setTimeout(() => {
      // Trigger a clean plain text syllabus download
      const syllabusContent = `ZOE ELPIS GLOBAL SCHOOL
PROGRAMME SYLLABUS: ${program.name.toUpperCase()}
Pillar: ${school?.pillar || 'ZEGS'} | Level: ${program.levelSlug.toUpperCase()}
Format: ${program.format} | Duration: ${program.durationWeeks} Weeks (${totalHours} Total Hours)
Delivery Mode: ${program.deliveryMode}

SUMMARY:
${program.summary}

PREREQUISITES:
${prerequisites}

LEARNING OUTCOMES:
${program.learningOutcomes.map((o, i) => `${i + 1}. ${o}`).join('\n')}

CURRICULUM MODULES:
${modulesList.map((m) => `\nMODULE ${m.order}: ${m.title} (${m.estimatedHours} Hours)\n- Focus: ${m.summary}\n- Lessons:\n  * ${m.lessons.map(l => l.title).join('\n  * ')}`).join('\n')}

PRACTICAL CAPSTONE PROJECT:
${capstone}

CERTIFICATION:
${certification}

TUITION & ADMISSION:
Tuition: UGX ${tuitionUgx.toLocaleString()} (USD $${tuitionUsd})
Application: Apply online at https://zegs.ac.ug/apply?program=${program.slug}
Inquiries: registrar@zegs.ac.ug
`;

      const blob = new Blob([syllabusContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ZEGS-${program.slug}-syllabus.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main id="main-content" className="flex-1 pb-24">
        {/* 1. Breadcrumbs */}
        <div className="bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <Breadcrumbs
              items={[
                { label: 'Programmes', href: '/programs' },
                { label: school?.name || 'School', href: school ? `/schools/${school.slug}` : '/schools' },
                { label: program.name }
              ]}
            />
          </div>
        </div>

        {/* 2. Hero Section (archetype B) */}
        <section className="py-12 sm:py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Details */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  {school && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-accent-gold-600)]">
                      <PillarMark pillar={school.pillar} size={16} />
                      {school.name}
                    </span>
                  )}
                  <span className="text-[var(--color-ink-300)]">•</span>
                  <span className="text-xs font-mono uppercase bg-[var(--color-paper-200)] text-[var(--color-ink-700)] px-2.5 py-0.5 rounded-[2px]">
                    {program.levelSlug} Level
                  </span>
                  <StatusBadge status="open" label="Intake Open" />
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl text-[var(--color-ink-900)] leading-[1.05]">
                  {program.name}
                </h1>

                <p className="font-display text-xl sm:text-2xl font-light text-[var(--color-ink-700)] leading-relaxed max-w-[65ch]">
                  {program.summary}
                </p>

                {/* Meta Matrix Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[var(--color-paper-200)] text-xs">
                  <div>
                    <span className="block text-[var(--color-ink-500)] mb-1">Duration</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">{program.durationWeeks} Weeks ({totalHours} hrs)</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-ink-500)] mb-1">Format</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">{program.format} • {program.deliveryMode}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-ink-500)] mb-1">Tuition Fee</span>
                    <span className="font-semibold text-[var(--color-ink-900)]">UGX {tuitionUgx.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-ink-500)] mb-1">Next Intake</span>
                    <span className="font-semibold text-[var(--color-brand-blue-700)]">{nextCohort}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    href={`/apply?program=${program.slug}`}
                    className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-wide uppercase bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors shadow-sm"
                  >
                    Apply for this Programme
                  </Link>
                  <button
                    onClick={handleDownloadSyllabus}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold border border-[var(--color-ink-900)] text-[var(--color-ink-900)] hover:bg-[var(--color-paper-200)] rounded-[2px] transition-colors"
                  >
                    <Download size={15} />
                    <span>{syllabusDownloaded ? 'Syllabus Downloaded' : 'Download Syllabus (PDF/Text)'}</span>
                  </button>
                </div>
              </div>

              {/* Right Media / Fact Box */}
              <div className="lg:col-span-4 space-y-6">
                <div className="aspect-[16/10] bg-[var(--color-paper-200)] overflow-hidden rounded-[2px] border border-[var(--color-paper-200)]">
                  <img
                    src={program.heroImageUrl || 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'}
                    alt={program.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-blue-700)]">
                    Admissions At A Glance
                  </div>
                  <ul className="space-y-3 text-xs text-[var(--color-ink-700)]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span>Reviewed on rolling admission cycle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span>Cohort cap of 25-30 fellows per stream</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span>Dedicated 1-on-1 practitioner mentor matching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={14} className="text-[var(--color-accent-green-700)] shrink-0 mt-0.5" />
                      <span>Verifiable digital graduation credential</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Target Audience & Prerequisites */}
        <section className="py-16 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)]">
                  Who This Programme Is Designed For
                </h2>
                <div className="space-y-2.5 pt-2">
                  {targetAudience.map((aud, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px]">
                      <span className="font-mono text-xs font-bold text-[var(--color-accent-gold-600)] shrink-0">0{idx + 1}</span>
                      <p className="text-xs sm:text-sm text-[var(--color-ink-900)]">{aud}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)]">
                  Entry Prerequisites & Expectations
                </h2>
                <div className="p-6 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                  <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                    {prerequisites}
                  </p>
                  <p className="text-xs text-[var(--color-ink-500)] pt-3 border-t border-[var(--color-paper-200)]">
                    No academic degree is mandatory for Foundation and Professional tracks; admission prioritizes demonstrated commitment, integrity, and clear motivation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Numbered Learning Outcomes (archetype C) */}
        <section className="py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-12">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                Demonstrated Learning Outcomes
              </h2>
              <p className="text-sm text-[var(--color-ink-700)] mt-2">
                Upon completion of this programme, you will possess the ability and verifiable portfolio to:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {program.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="p-6 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] flex items-start gap-4">
                  <span className="font-display text-2xl font-light text-[var(--color-accent-gold-600)] shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[var(--color-ink-900)] leading-relaxed pt-1 font-medium">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Modules Accordion */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-12">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                Curriculum Structure & Weekly Modules
              </h2>
              <p className="text-sm text-[var(--color-ink-700)] mt-2">
                A structured, progressive sequence balancing theoretical foundations with practical deliverables.
              </p>
            </div>

            <div className="space-y-4">
              {modulesList.map((mod, idx) => {
                const isOpen = openModuleIndex === idx;
                return (
                  <div
                    key={mod.id}
                    className="bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleModule(idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[var(--color-paper-100)] transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-bold text-[var(--color-brand-blue-700)] bg-[var(--color-paper-200)] px-2.5 py-1 rounded-[2px]">
                          Module 0{mod.order}
                        </span>
                        <h3 className="font-display text-xl text-[var(--color-ink-900)]">
                          {mod.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-[var(--color-ink-500)] shrink-0">
                        <span className="hidden sm:inline">{mod.estimatedHours} Hours</span>
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 border-t border-[var(--color-paper-200)] space-y-4 bg-[var(--color-paper-50)]">
                        <p className="text-sm text-[var(--color-ink-700)] leading-relaxed">
                          {mod.summary}
                        </p>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-ink-900)] mb-2">
                            Curriculum Lessons:
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--color-ink-700)]">
                            {mod.lessons.map((l, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-[var(--color-accent-gold-600)] font-bold">•</span>
                                <span>{l.title} {l.durationMinutes ? `(${l.durationMinutes}m)` : ''}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Practical Project Black Section (archetype D) */}
        <section className="py-20 bg-[var(--color-ink-900)] text-[var(--color-paper-50)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-400)]" />
                <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent-gold-400)]">
                  Authentic Capstone Requirement
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-paper-50)]">
                  The Live Capstone Project
                </h2>
                <p className="text-base text-[var(--color-paper-100)] opacity-90 leading-relaxed">
                  {capstone}
                </p>
                <p className="text-xs text-[var(--color-paper-200)] opacity-75 leading-relaxed pt-2 border-t border-white/20">
                  Every fellow is assigned a dedicated faculty advisor to review iterations prior to final jury defense.
                </p>
              </div>

              <div className="lg:col-span-5 p-8 bg-[var(--color-brand-blue-900)] border border-white/20 rounded-[2px] space-y-4">
                <h3 className="font-display text-xl text-[var(--color-accent-gold-400)]">
                  Jury Evaluation Criteria
                </h3>
                <ul className="space-y-3 text-xs text-[var(--color-paper-100)] opacity-90">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[var(--color-accent-gold-400)] shrink-0 mt-0.5" />
                    <span>Real-world applicability and contextual grounding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[var(--color-accent-gold-400)] shrink-0 mt-0.5" />
                    <span>Financial viability or verifiable impact metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-[var(--color-accent-gold-400)] shrink-0 mt-0.5" />
                    <span>Ethical alignment with ZEGS stewardship values</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Certification & Verifiable Credential */}
        <section className="py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 aspect-[4/3] bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] p-8 rounded-[2px] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-ink-500)] mb-2">
                    ZEGS OFFICIAL CREDENTIAL FORMAT
                  </div>
                  <h4 className="font-display text-xl text-[var(--color-ink-900)] mb-1">
                    {program.certificateType}
                  </h4>
                  <p className="text-xs text-[var(--color-brand-blue-700)] font-semibold mb-4">
                    {program.name}
                  </p>
                </div>
                <div className="border-t border-[var(--color-paper-200)] pt-4 flex items-center justify-between text-[11px] text-[var(--color-ink-500)]">
                  <span>Cryptographically Verifiable</span>
                  <span className="font-mono">ZEGS-CERT-XXXXXX</span>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)]" />
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                  Certification & Digital Credential
                </h2>
                <p className="text-base text-[var(--color-ink-700)] leading-relaxed">
                  {certification}
                </p>
                <div className="pt-2">
                  <Link
                    href="/verify"
                    className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline flex items-center gap-1.5"
                  >
                    <span>Learn how institutions verify our credentials</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Tuition Fees & Honest Policy Note */}
        <section className="py-20 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-12">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                Tuition & Payment Policy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono text-[var(--color-ink-500)] uppercase">East African Nationals</div>
                <div className="font-display text-3xl text-[var(--color-ink-900)]">
                  UGX {tuitionUgx.toLocaleString()}
                </div>
                <p className="text-xs text-[var(--color-ink-600)]">Includes all cohort workshops, studio sessions, and mentor matching.</p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono text-[var(--color-ink-500)] uppercase">International Learners</div>
                <div className="font-display text-3xl text-[var(--color-ink-900)]">
                  USD ${tuitionUsd}
                </div>
                <p className="text-xs text-[var(--color-ink-600)]">Calculated for global participants across online and blended cohorts.</p>
              </div>

              <div className="p-8 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] space-y-3">
                <div className="text-xs font-mono text-[var(--color-brand-blue-700)] uppercase font-semibold">Payment Terms</div>
                <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                  Learners may pay tuition upfront in full or via a two-installment schedule (50% prior to week 1, 50% prior to midterm capstone). Need-based bursaries are reviewed during the application interview.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 9. FAQs Section */}
        <section className="py-20 bg-[var(--color-paper-50)] border-b border-[var(--color-paper-200)]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
            <div className="max-w-2xl mb-12">
              <div className="w-12 h-[2px] bg-[var(--color-accent-gold-600)] mb-3" />
              <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-ink-900)]">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4 max-w-4xl">
              {programFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded-[2px] overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[var(--color-paper-200)] transition-colors"
                    >
                      <span className="font-display text-lg text-[var(--color-ink-900)]">{faq.question}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm text-[var(--color-ink-700)] leading-relaxed border-t border-[var(--color-paper-200)]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. Related Programmes (archetype C) */}
        {relatedPrograms.length > 0 && (
          <section className="py-20 bg-[var(--color-paper-100)]">
            <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
              <div className="flex items-center justify-between mb-10 pb-4 border-b border-[var(--color-paper-200)]">
                <h2 className="font-display text-2xl sm:text-3xl text-[var(--color-ink-900)]">
                  Related Programmes in {school?.name || 'this School'}
                </h2>
                <Link href="/programs" className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline">
                  View Full Catalogue →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPrograms.map((rel) => (
                  <div key={rel.id} className="p-6 bg-[var(--color-paper-50)] border border-[var(--color-paper-200)] rounded-[2px] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--color-accent-gold-600)] uppercase tracking-wider block mb-2">
                        {rel.levelSlug} • {rel.format}
                      </span>
                      <h3 className="font-display text-xl text-[var(--color-ink-900)] mb-2">
                        <Link href={`/programs/${rel.slug}`} className="hover:text-[var(--color-brand-blue-700)] hover:underline">
                          {rel.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-[var(--color-ink-700)] leading-relaxed mb-4 line-clamp-2">
                        {rel.summary}
                      </p>
                    </div>

                    <Link href={`/programs/${rel.slug}`} className="text-xs font-semibold text-[var(--color-brand-blue-700)] hover:underline">
                      Learn more →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* 11. Subtle Sticky Apply Bar on bottom */}
      <aside aria-label="Quick apply action" className="sticky bottom-0 z-40 bg-[var(--color-paper-50)] border-t border-[var(--color-paper-200)] py-3.5 shadow-md">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <span className="font-display text-sm font-semibold text-[var(--color-ink-900)] block">
              {program.name}
            </span>
            <span className="text-xs text-[var(--color-ink-500)]">
              Next Intake: {nextCohort} • UGX {tuitionUgx.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href={`/apply?program=${program.slug}`}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue-900)] text-[var(--color-paper-50)] hover:bg-[var(--color-brand-blue-700)] rounded-[2px] transition-colors"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </aside>

      <SiteFooter />
    </div>
  );
}
