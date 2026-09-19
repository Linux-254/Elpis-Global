'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  Download,
  ChevronLeft,
  ChevronRight,
  Hand
} from 'lucide-react';
import { Enrolment, User, LiveSession, Assignment, Certificate } from '../../../src/domain/types';

type DashboardTab = 'courses' | 'sessions' | 'assignments' | 'certificates';

const TAB_ORDER: DashboardTab[] = ['courses', 'sessions', 'assignments', 'certificates'];

export default function StudentDashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(() => dataStore.getCurrentUser());

  const [enrolments, setEnrolments] = useState<Enrolment[]>(() => {
    const u = dataStore.getCurrentUser();
    return u ? dataStore.getEnrolmentsForUser(u.id) : [];
  });

  const [sessions, setSessions] = useState<LiveSession[]>(() => {
    const u = dataStore.getCurrentUser();
    return u ? dataStore.getUpcomingSessions(u.id) : [];
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const u = dataStore.getCurrentUser();
    const enrs = u ? dataStore.getEnrolmentsForUser(u.id) : [];
    return enrs.length > 0 ? dataStore.getAssignmentsForProgram(enrs[0].programId) : [];
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const u = dataStore.getCurrentUser();
    return u ? dataStore.getCertificatesForUser(u.id) : [];
  });

  const [activeTab, setActiveTab] = useState<DashboardTab>('courses');
  const [copySuccessCode, setCopySuccessCode] = useState<string | null>(null);

  // Gesture tracking refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const activeTabButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active tab into view on mobile
  useEffect(() => {
    if (activeTabButtonRef.current && tabNavRef.current) {
      activeTabButtonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeTab]);

  const handleLogout = () => {
    dataStore.logout();
    router.push('/student/login');
  };

  const handleNextTab = () => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex < TAB_ORDER.length - 1) {
      setActiveTab(TAB_ORDER[currentIndex + 1]);
    }
  };

  const handlePrevTab = () => {
    const currentIndex = TAB_ORDER.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(TAB_ORDER[currentIndex - 1]);
    }
  };

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Ensure horizontal swipe is dominant and passes threshold (minimum 45px distance)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        // Swiped left -> Go to next tab
        handleNextTab();
      } else {
        // Swiped right -> Go to previous tab
        handlePrevTab();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleShareCert = (code: string) => {
    const link = `https://zegs.ac.ug/verify/${code}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(link).catch(() => {});
    }
    setCopySuccessCode(code);
    setTimeout(() => {
      setCopySuccessCode(null);
    }, 3000);
  };

  const currentTabIndex = TAB_ORDER.indexOf(activeTab);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper-100)] touch-manipulation">
      <SiteHeader variant="solid" />

      {/* Student Campus Banner */}
      <section className="bg-[var(--color-brand-blue-900)] text-white border-b border-white/10 pt-8 pb-8 px-4 sm:px-8">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 bg-[var(--color-accent-gold-400)]/20 border border-[var(--color-accent-gold-400)]/40 text-[var(--color-accent-gold-400)] text-[11px] font-semibold tracking-wider uppercase rounded-[2px]">
                Online Learning Campus
              </span>
              <span className="text-xs text-white/70">Active Student Portal</span>
            </div>
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-[var(--color-paper-50)]">
              Welcome back, {user?.fullName || 'David Mukasa'}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-brand-blue-100)] max-w-2xl leading-relaxed">
              Student ID: <span className="font-mono text-white font-medium">{user?.id || 'usr-student-1'}</span> • Enrolled Cohort: <span className="text-white font-medium">2026 Academic Cycle</span>
            </p>
          </div>

          {/* Action Buttons with 44px+ minimum touch targets */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2 md:pt-0">
            <Link
              href="/programs"
              className="min-h-[44px] px-4 py-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white text-xs sm:text-sm font-semibold rounded-[2px] transition-all flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
            >
              <BookOpen size={16} />
              <span>Explore Programs</span>
            </Link>

            {user?.role === 'admin' && (
              <Link
                href="/admin/dashboard"
                className="min-h-[44px] px-4 py-2.5 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] hover:bg-white active:bg-paper-200 text-xs sm:text-sm font-semibold rounded-[2px] transition-all flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
              >
                <Shield size={16} />
                <span>Admin Console</span>
              </Link>
            )}

            <button
              onClick={handleLogout}
              type="button"
              className="min-h-[44px] px-4 py-2.5 bg-white/5 hover:bg-red-500/20 active:bg-red-500/30 text-white/90 hover:text-white border border-white/15 text-xs sm:text-sm font-semibold rounded-[2px] transition-all flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Summary Grid (Touch-navigable) */}
        <div className="max-w-[1320px] mx-auto mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`min-h-[58px] p-3 text-left rounded-[2px] border transition-all flex items-center justify-between touch-manipulation active:scale-[0.98] ${
              activeTab === 'courses'
                ? 'bg-white/20 border-[var(--color-accent-gold-400)] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
          >
            <div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Courses</div>
              <div className="text-base font-bold text-white font-display">{enrolments.length} Active</div>
            </div>
            <BookOpen size={18} className={activeTab === 'courses' ? 'text-[var(--color-accent-gold-400)]' : 'text-white/60'} />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sessions')}
            className={`min-h-[58px] p-3 text-left rounded-[2px] border transition-all flex items-center justify-between touch-manipulation active:scale-[0.98] ${
              activeTab === 'sessions'
                ? 'bg-white/20 border-[var(--color-accent-gold-400)] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
          >
            <div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Live Rooms</div>
              <div className="text-base font-bold text-white font-display">{sessions.length} Scheduled</div>
            </div>
            <Video size={18} className={activeTab === 'sessions' ? 'text-[var(--color-accent-gold-400)]' : 'text-white/60'} />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('assignments')}
            className={`min-h-[58px] p-3 text-left rounded-[2px] border transition-all flex items-center justify-between touch-manipulation active:scale-[0.98] ${
              activeTab === 'assignments'
                ? 'bg-white/20 border-[var(--color-accent-gold-400)] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
          >
            <div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Tasks Due</div>
              <div className="text-base font-bold text-white font-display">{assignments.length} Required</div>
            </div>
            <FileCheck2 size={18} className={activeTab === 'assignments' ? 'text-[var(--color-accent-gold-400)]' : 'text-white/60'} />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('certificates')}
            className={`min-h-[58px] p-3 text-left rounded-[2px] border transition-all flex items-center justify-between touch-manipulation active:scale-[0.98] ${
              activeTab === 'certificates'
                ? 'bg-white/20 border-[var(--color-accent-gold-400)] text-white shadow-xs'
                : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
          >
            <div>
              <div className="text-[10px] text-white/70 uppercase tracking-wider font-semibold">Credentials</div>
              <div className="text-base font-bold text-white font-display">{certificates.length} Issued</div>
            </div>
            <Award size={18} className={activeTab === 'certificates' ? 'text-[var(--color-accent-gold-400)]' : 'text-white/60'} />
          </button>
        </div>
      </section>

      {/* Navigation Tabs Bar with Touch Optimizations & Auto-Scroll */}
      <div className="bg-white border-b border-[var(--color-paper-300)] sticky top-16 z-20 shadow-xs">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-8 flex items-center justify-between">
          <div
            ref={tabNavRef}
            className="flex items-center gap-1 sm:gap-4 overflow-x-auto py-1 scrollbar-none overscroll-contain flex-1"
          >
            <button
              ref={activeTab === 'courses' ? activeTabButtonRef : undefined}
              onClick={() => setActiveTab('courses')}
              className={`min-h-[48px] py-3 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-2 touch-manipulation active:bg-[var(--color-paper-100)] ${
                activeTab === 'courses'
                  ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                  : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
              }`}
            >
              <BookOpen size={16} />
              <span>My Courses ({enrolments.length})</span>
            </button>

            <button
              ref={activeTab === 'sessions' ? activeTabButtonRef : undefined}
              onClick={() => setActiveTab('sessions')}
              className={`min-h-[48px] py-3 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-2 touch-manipulation active:bg-[var(--color-paper-100)] ${
                activeTab === 'sessions'
                  ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                  : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
              }`}
            >
              <Video size={16} />
              <span>Live Masterclasses ({sessions.length})</span>
            </button>

            <button
              ref={activeTab === 'assignments' ? activeTabButtonRef : undefined}
              onClick={() => setActiveTab('assignments')}
              className={`min-h-[48px] py-3 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-2 touch-manipulation active:bg-[var(--color-paper-100)] ${
                activeTab === 'assignments'
                  ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                  : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
              }`}
            >
              <FileCheck2 size={16} />
              <span>Assignments & Tasks ({assignments.length})</span>
            </button>

            <button
              ref={activeTab === 'certificates' ? activeTabButtonRef : undefined}
              onClick={() => setActiveTab('certificates')}
              className={`min-h-[48px] py-3 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all whitespace-nowrap flex items-center gap-2 touch-manipulation active:bg-[var(--color-paper-100)] ${
                activeTab === 'certificates'
                  ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)]'
                  : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
              }`}
            >
              <Award size={16} />
              <span>Certificates & Credentials ({certificates.length})</span>
            </button>
          </div>

          {/* Quick Gesture Navigation Controls on Mobile */}
          <div className="flex sm:hidden items-center gap-1 shrink-0 pl-2">
            <button
              type="button"
              disabled={currentTabIndex === 0}
              onClick={handlePrevTab}
              aria-label="Previous Section"
              className="p-2 min-h-[44px] min-w-[36px] flex items-center justify-center rounded text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] disabled:opacity-30 disabled:pointer-events-none active:bg-paper-200"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-[11px] font-mono font-medium text-[var(--color-ink-500)] px-1">
              {currentTabIndex + 1}/{TAB_ORDER.length}
            </span>
            <button
              type="button"
              disabled={currentTabIndex === TAB_ORDER.length - 1}
              onClick={handleNextTab}
              aria-label="Next Section"
              className="p-2 min-h-[44px] min-w-[36px] flex items-center justify-center rounded text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] disabled:opacity-30 disabled:pointer-events-none active:bg-paper-200"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Swipe Guidance Banner */}
      <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-8 pt-4 sm:hidden">
        <div className="flex items-center justify-between text-[11px] text-[var(--color-ink-500)] bg-[var(--color-paper-200)]/60 py-1.5 px-3 rounded">
          <span className="flex items-center gap-1.5">
            <Hand size={12} className="text-[var(--color-brand-blue-800)]" />
            <span>Swipe left or right to switch sections</span>
          </span>
          <div className="flex items-center gap-1">
            {TAB_ORDER.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-label={`Jump to tab ${idx + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentTabIndex
                    ? 'w-4 bg-[var(--color-brand-blue-800)]'
                    : 'bg-[var(--color-ink-300)]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Gesture-Enabled Content Area */}
      <main
        className="flex-1 max-w-[1320px] w-full mx-auto px-4 sm:px-8 py-6 sm:py-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* TAB 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-ink-900)]">
                  Active Enrolled Programmes
                </h2>
                <p className="text-xs sm:text-sm text-[var(--color-ink-600)] mt-0.5">
                  100% online coursework with structured module progression and faculty evaluations.
                </p>
              </div>
              <Link
                href="/programs"
                className="min-h-[44px] px-3 py-2 text-xs sm:text-sm font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center gap-1.5 self-start sm:self-auto touch-manipulation"
              >
                <span>Browse All Available Courses</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {enrolments.length === 0 ? (
              <div className="bg-white border border-[var(--color-paper-300)] p-8 sm:p-12 text-center rounded-[2px] space-y-4 shadow-xs">
                <BookOpen size={40} className="mx-auto text-[var(--color-ink-400)]" />
                <h3 className="font-display text-lg sm:text-xl text-[var(--color-ink-900)]">No Active Course Enrolments Yet</h3>
                <p className="text-xs sm:text-sm text-[var(--color-ink-600)] max-w-md mx-auto leading-relaxed">
                  You are not currently enrolled in any academic programmes. Browse our 4 schools or submit an application for the upcoming intake.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex min-h-[44px] items-center justify-center py-3 px-6 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs sm:text-sm font-semibold rounded-[2px] touch-manipulation active:scale-[0.98] transition-transform"
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
                      className="bg-white border border-[var(--color-paper-300)] hover:border-[var(--color-brand-blue-800)] transition-all shadow-xs rounded-[2px] p-5 sm:p-6 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="px-2.5 py-1 bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] font-semibold text-[11px] uppercase tracking-wider rounded-[2px]">
                            {program.levelSlug || 'Level'} • {program.format || program.deliveryMode}
                          </span>
                          <span className="text-xs text-[var(--color-ink-500)]">
                            Started {enr.startedAt}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display font-semibold text-lg sm:text-xl text-[var(--color-ink-900)] leading-snug">
                            {program.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-[var(--color-ink-600)] line-clamp-2 mt-1.5">
                            {program.summary}
                          </p>
                        </div>

                        {/* Progress Metric */}
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                            <span className="text-[var(--color-ink-700)]">Course Progress</span>
                            <span className="text-[var(--color-brand-blue-800)] font-bold">{calculatedPercent}% Complete</span>
                          </div>
                          <div className="w-full h-2.5 bg-[var(--color-paper-200)] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[var(--color-brand-blue-800)] rounded-full transition-all duration-500"
                              style={{ width: `${calculatedPercent}%` }}
                            />
                          </div>
                          <div className="text-[11px] sm:text-xs text-[var(--color-ink-500)] flex items-center justify-between">
                            <span>{completedCount} of {totalLessons} lessons completed</span>
                            <span>{modules.length} Modules</span>
                          </div>
                        </div>
                      </div>

                      {/* Touch-Friendly Action Buttons */}
                      <div className="pt-6 border-t border-[var(--color-paper-200)] mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <Link
                          href={`/portal/learn/${enr.id}`}
                          className="min-h-[44px] w-full sm:w-auto py-3 px-5 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] active:bg-[var(--color-brand-blue-950)] text-white text-xs sm:text-sm font-semibold rounded-[2px] transition-all flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
                        >
                          <BookOpen size={16} />
                          <span>Open Digital Classroom</span>
                        </Link>

                        <Link
                          href={`/programs/${program.slug}`}
                          className="min-h-[44px] px-3 py-2 text-xs sm:text-sm font-medium text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] flex items-center justify-center touch-manipulation"
                        >
                          Program Syllabus Details
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
              <h2 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-ink-900)]">
                Live Cohort Masterclasses & Faculty Hours
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-600)] mt-0.5">
                Participate in interactive discussions, live case study breakdowns, and peer Q&A sessions.
              </p>
            </div>

            <div className="space-y-4">
              {sessions.map((sess) => (
                <div
                  key={sess.id}
                  className="bg-white border border-[var(--color-paper-300)] p-5 sm:p-6 rounded-[2px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
                >
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold uppercase tracking-wider rounded-[2px]">
                        Live Online ({sess.platform})
                      </span>
                      <span className="text-xs sm:text-sm text-[var(--color-ink-500)] flex items-center gap-1.5">
                        <Clock size={14} />
                        {new Date(sess.startsAt).toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })} {sess.timezone}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-ink-900)]">
                      {sess.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--color-ink-600)]">
                      Facilitator: <span className="font-medium text-[var(--color-ink-800)]">{sess.facilitatorName}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-2 md:pt-0">
                    <a
                      href={sess.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] w-full sm:w-auto py-3 px-5 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] active:bg-[var(--color-brand-blue-950)] text-white text-xs sm:text-sm font-semibold rounded-[2px] transition-all flex items-center justify-center gap-2 whitespace-nowrap touch-manipulation active:scale-[0.98]"
                    >
                      <Video size={16} className="text-[var(--color-accent-gold-400)]" />
                      <span>Join Live Room</span>
                      <ExternalLink size={14} />
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
              <h2 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-ink-900)]">
                Capstone Tasks & Applied Projects
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-600)] mt-0.5">
                All ZEGS assessments require real application: project defense, unit economics spreadsheets, and life blueprints.
              </p>
            </div>

            <div className="space-y-4">
              {assignments.map((asg) => (
                <div
                  key={asg.id}
                  className="bg-white border border-[var(--color-paper-300)] p-5 sm:p-6 rounded-[2px] shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--color-paper-200)]">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-brand-blue-800)]">
                        Module Assessment
                      </span>
                      <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-ink-900)]">
                        {asg.title}
                      </h3>
                    </div>
                    <div className="text-xs sm:text-sm text-[var(--color-ink-600)]">
                      Due: <span className="font-semibold text-red-700">{new Date(asg.dueAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                    {asg.brief}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-[11px] sm:text-xs text-[var(--color-ink-500)]">
                      Allowed Formats: Text Entry, PDF/Word Upload (Max {asg.maxFileMb}MB)
                    </div>

                    <Link
                      href={enrolments.length > 0 ? `/portal/learn/${enrolments[0].id}` : '#'}
                      className="min-h-[44px] w-full sm:w-auto py-3 px-5 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] font-semibold text-xs sm:text-sm rounded-[2px] hover:bg-[var(--color-brand-blue-900)] hover:text-white transition-all flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98]"
                    >
                      <span>Submit Response in Classroom</span>
                      <ArrowRight size={14} />
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
              <h2 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-ink-900)]">
                Digitally Verifiable Credentials
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-600)] mt-0.5">
                Every certificate issued by Zoe Elpis Global School is cryptographically logged and verifiable on our public registry.
              </p>
            </div>

            {certificates.length === 0 ? (
              <div className="bg-white border border-[var(--color-paper-300)] p-8 sm:p-12 text-center rounded-[2px] shadow-xs space-y-3">
                <Award size={40} className="mx-auto text-[var(--color-ink-400)] mb-2" />
                <h3 className="font-display text-lg text-[var(--color-ink-900)]">No Issued Certificates Yet</h3>
                <p className="text-xs sm:text-sm text-[var(--color-ink-600)] max-w-md mx-auto leading-relaxed">
                  Complete your coursework and defend your capstone project to earn your official verified certificate.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white border-2 border-[var(--color-accent-gold-400)] p-5 sm:p-6 rounded-[2px] shadow-sm space-y-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-accent-gold-400)]/10 rounded-bl-full pointer-events-none" />

                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-[var(--color-brand-blue-900)] text-[var(--color-accent-gold-400)] flex items-center justify-center rounded-[2px] shrink-0">
                        <Award size={24} />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--color-brand-blue-800)] block">
                          Verified Certificate of Completion
                        </span>
                        <h3 className="font-display font-semibold text-base sm:text-lg text-[var(--color-ink-900)]">
                          {cert.programName}
                        </h3>
                      </div>
                    </div>

                    <div className="bg-[var(--color-paper-100)] p-3.5 rounded-[2px] text-xs sm:text-sm space-y-1.5 border border-[var(--color-paper-200)]">
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

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <Link
                        href={`/verify/${cert.code}`}
                        className="min-h-[44px] px-3 py-2 text-xs sm:text-sm font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center justify-center sm:justify-start gap-1.5 touch-manipulation"
                      >
                        <Shield size={15} />
                        <span>Public Registry Verification</span>
                      </Link>

                      <button
                        onClick={() => handleShareCert(cert.code)}
                        type="button"
                        className="min-h-[44px] px-4 py-2.5 bg-[var(--color-paper-200)] hover:bg-[var(--color-paper-300)] active:bg-paper-400 text-[var(--color-ink-900)] text-xs sm:text-sm font-semibold rounded-[2px] transition-all flex items-center justify-center gap-1.5 touch-manipulation active:scale-[0.98]"
                      >
                        {copySuccessCode === cert.code ? (
                          <span className="text-emerald-700 font-bold">Link Copied! ✓</span>
                        ) : (
                          <span>Share Credential</span>
                        )}
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

