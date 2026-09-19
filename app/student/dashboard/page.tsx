'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { dataStore } from '../../../src/data/store';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  FileCheck2,
  Award,
  ArrowRight,
  Video,
  Clock,
  CheckCircle2,
  ExternalLink,
  Shield,
  LogOut,
  Sparkles,
  Users,
  Download
} from 'lucide-react';
import { Enrolment, User, LiveSession, Assignment, Certificate, Mentor } from '../../../src/domain/types';

export default function StudentDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => {
    let currentUser = dataStore.getCurrentUser();
    if (!currentUser) {
      currentUser = dataStore.login('student@zegs.ac.ug') || dataStore.getCurrentUser();
    }
    return currentUser;
  });

  const [enrolments, setEnrolments] = useState<Enrolment[]>(() => {
    const u = dataStore.getCurrentUser() || dataStore.login('student@zegs.ac.ug');
    return u ? dataStore.getEnrolmentsForUser(u.id) : [];
  });

  const [sessions, setSessions] = useState<LiveSession[]>(() => {
    const u = dataStore.getCurrentUser() || dataStore.login('student@zegs.ac.ug');
    return u ? dataStore.getUpcomingSessions(u.id) : [];
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const u = dataStore.getCurrentUser() || dataStore.login('student@zegs.ac.ug');
    const enrs = u ? dataStore.getEnrolmentsForUser(u.id) : [];
    return enrs.length > 0 ? dataStore.getAssignmentsForProgram(enrs[0].programId) : [];
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const u = dataStore.getCurrentUser() || dataStore.login('student@zegs.ac.ug');
    return u ? dataStore.getCertificatesForUser(u.id) : [];
  });

  const [activeTab, setActiveTab] = useState<'courses' | 'sessions' | 'assignments' | 'certificates'>('courses');

  const handleLogout = () => {
    dataStore.logout();
    router.push('/student/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper-100)]">
      <SiteHeader variant="solid" />

      {/* Student Campus Banner */}
      <section className="bg-[var(--color-brand-blue-900)] text-white border-b border-white/10 pt-10 pb-8 px-4 sm:px-8">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-[var(--color-accent-gold-400)]/20 border border-[var(--color-accent-gold-400)]/40 text-[var(--color-accent-gold-400)] text-[11px] font-semibold tracking-wider uppercase rounded-[2px]">
                Online Learning Campus
              </span>
              <span className="text-xs text-white/60">Active Student Portal</span>
            </div>
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--color-paper-50)]">
              Welcome back, {user?.fullName || 'David Mukasa'}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-brand-blue-100)] max-w-2xl">
              Student ID: <span className="font-mono text-white">{user?.id || 'usr-student-1'}</span> • Enrolled Cohort: <span className="text-white font-medium">2026 Academic Cycle</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/programs"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <BookOpen size={14} />
              <span>Explore Programs</span>
            </Link>

            {user?.role === 'admin' && (
              <Link
                href="/admin/dashboard"
                className="px-4 py-2.5 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] hover:bg-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
              >
                <Shield size={14} />
                <span>Admin Console</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              type="button"
              className="px-3 py-2.5 bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-white border border-white/10 text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[var(--color-paper-300)] sticky top-16 z-20 shadow-xs">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center gap-2 sm:gap-6 overflow-x-auto py-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'courses'
                ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
            }`}
          >
            <BookOpen size={16} />
            <span>My Courses ({enrolments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'sessions'
                ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
            }`}
          >
            <Video size={16} />
            <span>Live Masterclasses ({sessions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'assignments'
                ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
            }`}
          >
            <FileCheck2 size={16} />
            <span>Assignments & Tasks ({assignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-2 px-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'certificates'
                ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
            }`}
          >
            <Award size={16} />
            <span>Certificates & Credentials ({certificates.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-8 py-8">
        {/* TAB 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Active Enrolled Programmes
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  100% online coursework with structured module progression and faculty evaluations.
                </p>
              </div>
              <Link
                href="/programs"
                className="text-xs font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center gap-1"
              >
                <span>Browse All Available Courses</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {enrolments.length === 0 ? (
              <div className="bg-white border border-[var(--color-paper-300)] p-10 text-center rounded-[2px] space-y-4">
                <BookOpen size={36} className="mx-auto text-[var(--color-ink-400)]" />
                <h3 className="font-display text-lg text-[var(--color-ink-900)]">No Active Course Enrolments Yet</h3>
                <p className="text-xs text-[var(--color-ink-600)] max-w-md mx-auto">
                  You are not currently enrolled in any academic programmes. Browse our 4 schools or submit an application for the upcoming intake.
                </p>
                <Link
                  href="/programs"
                  className="inline-block py-2.5 px-5 bg-[var(--color-brand-blue-900)] text-white text-xs font-semibold rounded-[2px]"
                >
                  Explore Academic Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enrolments.map((enr) => {
                  const program = enr.program || dataStore.getProgramById(enr.programId);
                  if (!program) return null;
                  const modules = program.modules || [];
                  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
                  const completedCount = enr.completedLessons?.length || 0;
                  const calculatedPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

                  return (
                    <div
                      key={enr.id}
                      className="bg-white border border-[var(--color-paper-300)] hover:border-[var(--color-brand-blue-800)] transition-all shadow-xs rounded-[2px] p-6 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-0.5 bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] font-semibold text-[11px] uppercase tracking-wider rounded-[2px]">
                            {program.levelSlug || 'Level'} • {program.format || program.deliveryMode}
                          </span>
                          <span className="text-xs text-[var(--color-ink-500)]">
                            Started {enr.startedAt}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                            {program.name}
                          </h3>
                          <p className="text-xs text-[var(--color-ink-600)] line-clamp-2 mt-1">
                            {program.summary}
                          </p>
                        </div>

                        {/* Progress Metric */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-[var(--color-ink-700)]">Course Progress</span>
                            <span className="text-[var(--color-brand-blue-800)]">{calculatedPercent}% Complete</span>
                          </div>
                          <div className="w-full h-2 bg-[var(--color-paper-200)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--color-brand-blue-800)] rounded-full transition-all duration-500"
                              style={{ width: `${calculatedPercent}%` }}
                            />
                          </div>
                          <div className="text-[11px] text-[var(--color-ink-500)] flex items-center justify-between">
                            <span>{completedCount} of {totalLessons} lessons completed</span>
                            <span>{modules.length} Modules</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-[var(--color-paper-200)] mt-6 flex items-center justify-between">
                        <Link
                          href={`/portal/learn/${enr.id}`}
                          className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
                        >
                          <BookOpen size={14} />
                          <span>Open Digital Classroom</span>
                        </Link>

                        <Link
                          href={`/programs/${program.slug}`}
                          className="text-xs font-medium text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]"
                        >
                          Program Info
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Live Masterclasses */}
        {activeTab === 'sessions' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                Live Cohort Masterclasses & Faculty Hours
              </h2>
              <p className="text-xs text-[var(--color-ink-600)]">
                Participate in interactive discussions, live case study breakdowns, and peer Q&A sessions.
              </p>
            </div>

            <div className="space-y-4">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded">
                        Live Online ({sess.platform})
                      </span>
                      <span className="text-xs text-[var(--color-ink-500)] flex items-center gap-1">
                        <Clock size={12} />
                        {new Date(sess.startsAt).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })} {sess.timezone}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                      {sess.title}
                    </h3>
                    <p className="text-xs text-[var(--color-ink-600)]">
                      Facilitator: <span className="font-medium text-[var(--color-ink-800)]">{sess.facilitatorName}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={sess.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Video size={14} className="text-[var(--color-accent-gold-400)]" />
                      <span>Join Live Room</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Assignments & Tasks */}
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                Capstone Tasks & Applied Projects
              </h2>
              <p className="text-xs text-[var(--color-ink-600)]">
                All ZEGS assessments require real application: project defense, unit economics spreadsheets, and life blueprints.
              </p>
            </div>

            <div className="space-y-4">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="bg-white border border-[var(--color-paper-300)] p-6 rounded-[2px] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-paper-200)]">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-brand-blue-800)]">
                        Module Assessment
                      </span>
                      <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                        {asg.title}
                      </h3>
                    </div>
                    <div className="text-xs text-[var(--color-ink-600)]">
                      Due: <span className="font-semibold text-red-700">{new Date(asg.dueAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--color-ink-700)] leading-relaxed">
                    {asg.brief}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-[11px] text-[var(--color-ink-500)]">
                      Allowed Formats: Text Entry, PDF/Word Upload (Max {asg.maxFileMb}MB)
                    </div>

                    <Link
                      href={enrolments.length > 0 ? `/portal/learn/${enrolments[0].id}` : '#'}
                      className="py-2 px-4 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] font-semibold text-xs rounded-[2px] hover:bg-[var(--color-brand-blue-900)] hover:text-white transition-colors"
                    >
                      Submit Response in Classroom
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                Digitally Verifiable Credentials
              </h2>
              <p className="text-xs text-[var(--color-ink-600)]">
                Every certificate issued by Zoe Elpis Global School is cryptographically logged and verifiable on our public registry.
              </p>
            </div>

            {certificates.length === 0 ? (
              <div className="bg-white border border-[var(--color-paper-300)] p-8 text-center rounded-[2px]">
                <Award size={32} className="mx-auto text-[var(--color-ink-400)] mb-2" />
                <p className="text-xs text-[var(--color-ink-600)]">
                  Complete your coursework and defend your capstone project to earn your official verified certificate.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white border-2 border-[var(--color-accent-gold-400)] p-6 rounded-[2px] shadow-sm space-y-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent-gold-400)]/10 rounded-bl-full pointer-events-none" />

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-brand-blue-900)] text-[var(--color-accent-gold-400)] flex items-center justify-center rounded-[2px]">
                        <Award size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-brand-blue-800)] block">
                          Verified Certificate of Completion
                        </span>
                        <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                          {cert.programName}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-[var(--color-paper-100)] p-3 rounded text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[var(--color-ink-600)]">Issued To:</span>
                        <span className="font-semibold text-[var(--color-ink-900)]">{cert.holderName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-ink-600)]">Verification Code:</span>
                        <span className="font-mono font-bold text-[var(--color-brand-blue-900)]">{cert.code}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--color-ink-600)]">Date of Award:</span>
                        <span>{cert.issuedAt}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <Link
                        href={`/verify/${cert.code}`}
                        className="text-xs font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center gap-1"
                      >
                        <Shield size={13} />
                        <span>Public Registry Verification</span>
                      </Link>

                      <button
                        onClick={() => alert(`Certificate verification link copied: https://zegs.ac.ug/verify/${cert.code}`)}
                        type="button"
                        className="py-1.5 px-3 bg-[var(--color-paper-200)] hover:bg-[var(--color-paper-300)] text-[var(--color-ink-900)] text-xs font-medium rounded transition-colors"
                      >
                        Share Credential
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
