'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SiteHeader } from '../../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../../src/components/primitives/SiteFooter';
import { dataStore } from '../../../../src/data/store';
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  Download,
  FileText,
  MessageSquare,
  ArrowLeft,
  Send,
  ChevronLeft,
  ChevronRight,
  List,
  X,
  BookOpen
} from 'lucide-react';
import { Enrolment, Program, ModuleLesson, ProgramModule, SchoolResource } from '../../../../src/domain/types';

export default function LearnCoursePage() {
  const params = useParams();
  const enrolmentId = params?.enrolmentId as string;

  const [enrolment, setEnrolment] = useState<Enrolment | null>(() => {
    return dataStore.getEnrolmentById(enrolmentId) || dataStore.getEnrolmentsForUser('usr-student-1')[0] || null;
  });

  const [program, setProgram] = useState<Program | null>(() => {
    const enr = dataStore.getEnrolmentById(enrolmentId) || dataStore.getEnrolmentsForUser('usr-student-1')[0];
    return enr ? dataStore.getProgramById(enr.programId) || null : null;
  });

  const [activeModule, setActiveModule] = useState<ProgramModule | null>(() => {
    const enr = dataStore.getEnrolmentById(enrolmentId) || dataStore.getEnrolmentsForUser('usr-student-1')[0];
    const prog = enr ? dataStore.getProgramById(enr.programId) : null;
    return prog?.modules && prog.modules.length > 0 ? prog.modules[0] : null;
  });

  const [activeLesson, setActiveLesson] = useState<ModuleLesson | null>(() => {
    const enr = dataStore.getEnrolmentById(enrolmentId) || dataStore.getEnrolmentsForUser('usr-student-1')[0];
    const prog = enr ? dataStore.getProgramById(enr.programId) : null;
    const firstMod = prog?.modules && prog.modules.length > 0 ? prog.modules[0] : null;
    return firstMod?.lessons && firstMod.lessons.length > 0 ? firstMod.lessons[0] : null;
  });

  const [resources, setResources] = useState<SchoolResource[]>(() => {
    const enr = dataStore.getEnrolmentById(enrolmentId) || dataStore.getEnrolmentsForUser('usr-student-1')[0];
    const prog = enr ? dataStore.getProgramById(enr.programId) : null;
    return prog ? dataStore.getResources(prog.id) : [];
  });

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Array<{ id: string; user: string; text: string; time: string }>>([
    {
      id: 'c1',
      user: 'Grace Akello (Classmate)',
      text: 'The reflection exercise on core values really clarified how to prioritize my venture goals during high pressure.',
      time: '2 hours ago'
    },
    {
      id: 'c2',
      user: 'Faculty Advisor',
      text: 'Remember that when defending your life blueprint in Week 4, focus on concrete metrics rather than abstract ambitions.',
      time: '1 day ago'
    }
  ]);
  const [submissionText, setSubmissionText] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [isMobileSyllabusOpen, setIsMobileSyllabusOpen] = useState(false);

  // Gesture tracking refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Flatten all lessons into linear sequence for prev/next navigation
  const allLessons = useMemo(() => {
    if (!program?.modules) return [];
    const list: { module: ProgramModule; lesson: ModuleLesson; index: number }[] = [];
    let idx = 0;
    program.modules.forEach((mod) => {
      mod.lessons?.forEach((les) => {
        list.push({ module: mod, lesson: les, index: idx++ });
      });
    });
    return list;
  }, [program]);

  const currentLessonIndex = allLessons.findIndex((item) => item.lesson.id === activeLesson?.id);
  const prevLessonItem = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLessonItem = currentLessonIndex >= 0 && currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const handleSelectLesson = (mod: ProgramModule, les: ModuleLesson) => {
    setActiveModule(mod);
    setActiveLesson(les);
    setIsMobileSyllabusOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (prevLessonItem) {
      handleSelectLesson(prevLessonItem.module, prevLessonItem.lesson);
    }
  };

  const handleNextLesson = () => {
    if (nextLessonItem) {
      handleSelectLesson(nextLessonItem.module, nextLessonItem.lesson);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        // Swiped left -> Next Lesson
        handleNextLesson();
      } else {
        // Swiped right -> Previous Lesson
        handlePrevLesson();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleToggleLesson = (lessonId: string) => {
    if (!enrolment) return;
    const updated = dataStore.toggleLessonCompletion(enrolment.id, lessonId);
    if (updated) {
      setEnrolment({ ...updated });
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      ...comments,
      {
        id: 'c-' + Date.now(),
        user: 'David Mukasa (You)',
        text: commentText,
        time: 'Just now'
      }
    ]);
    setCommentText('');
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionText.trim()) return;
    setSubmittedMessage(true);
    if (activeLesson) {
      handleToggleLesson(activeLesson.id);
    }
  };

  if (!program || !enrolment) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-paper-50)]">
        <SiteHeader variant="solid" />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <h2 className="font-display text-xl text-[var(--color-ink-900)]">Loading Digital Classroom...</h2>
            <Link href="/student/dashboard" className="text-xs text-[var(--color-brand-blue-800)] underline">
              Return to Student Dashboard
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const modules = program.modules || [];
  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
  const completedCount = enrolment.completedLessons?.length || 0;
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper-50)]">
      <SiteHeader variant="solid" />

      {/* Classroom Top Bar */}
      <div className="bg-[var(--color-brand-blue-900)] text-white border-b border-white/10 px-4 sm:px-8 py-3 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3">
            <Link
              href="/student/dashboard"
              className="min-h-[44px] px-3 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Dashboard</span>
            </Link>
            
            <div className="line-clamp-1 flex-1 sm:flex-none">
              <span className="text-[10px] text-[var(--color-accent-gold-400)] font-semibold uppercase tracking-wider block">
                {program.levelSlug} • 100% Online Delivery
              </span>
              <h1 className="font-display font-semibold text-sm sm:text-base text-white line-clamp-1">
                {program.name}
              </h1>
            </div>

            {/* Mobile Syllabus Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileSyllabusOpen(true)}
              className="lg:hidden min-h-[44px] px-3 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] hover:bg-[var(--color-accent-gold-500)] active:bg-[var(--color-accent-gold-300)] rounded text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
              aria-label="Open Course Outline & Syllabus"
            >
              <List size={16} />
              <span>Syllabus</span>
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-0 border-t border-white/10 sm:border-t-0">
            <div className="text-left sm:text-right">
              <span className="text-[11px] text-white/70 block">Course Progress</span>
              <span className="text-xs font-mono font-bold text-[var(--color-accent-gold-400)]">
                {progressPercent}% ({completedCount}/{totalLessons} completed)
              </span>
            </div>
            <div className="w-28 sm:w-32 h-2.5 bg-white/20 rounded-full overflow-hidden shrink-0">
              <div
                className="h-full bg-[var(--color-accent-gold-400)] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Classroom Layout */}
      <div className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Lesson View & Content (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Lesson View Card with Swipe Gesture Support */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-5 sm:p-8 shadow-xs space-y-6 select-text"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[var(--color-brand-blue-800)] uppercase tracking-wider">
                    {activeModule?.title || 'Current Module'}
                  </span>
                  {currentLessonIndex >= 0 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-[var(--color-paper-200)] text-[var(--color-ink-700)] rounded">
                      Lesson {currentLessonIndex + 1} of {allLessons.length}
                    </span>
                  )}
                </div>
                <h2 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-ink-900)] mt-1">
                  {activeLesson?.title || 'Interactive Lesson'}
                </h2>
              </div>

              {activeLesson && (
                <button
                  type="button"
                  onClick={() => handleToggleLesson(activeLesson.id)}
                  className={`min-h-[44px] px-4 text-xs font-semibold rounded-[2px] flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs ${
                    enrolment.completedLessons?.includes(activeLesson.id)
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 active:bg-emerald-300'
                      : 'bg-[var(--color-brand-blue-900)] text-white hover:bg-[var(--color-brand-blue-800)] active:bg-[var(--color-brand-blue-950)]'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>
                    {enrolment.completedLessons?.includes(activeLesson.id)
                      ? 'Completed ✓'
                      : 'Mark Lesson Complete'}
                  </span>
                </button>
              )}
            </div>

            {/* Mobile swipe gesture tip */}
            <div className="lg:hidden flex items-center justify-between px-3 py-1.5 bg-[var(--color-paper-100)] border border-[var(--color-paper-200)] rounded text-[11px] text-[var(--color-ink-600)]">
              <span>Tip: Swipe left/right on lesson to switch</span>
              <span className="font-mono text-[10px] font-semibold text-[var(--color-brand-blue-800)]">Touch Enabled</span>
            </div>

            {/* Video Lecture / Interactive Presentation Container */}
            <div className="w-full aspect-video bg-[var(--color-ink-900)] text-white rounded-[2px] flex flex-col items-center justify-center relative overflow-hidden border border-black/20 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-gold-400)]/20 border-2 border-[var(--color-accent-gold-400)] text-[var(--color-accent-gold-400)] flex items-center justify-center mb-3 hover:scale-110 active:scale-95 transition-transform cursor-pointer shadow-sm">
                <PlayCircle size={36} />
              </div>
              <h3 className="font-display font-semibold text-lg text-white">
                Live Module Lecture: {activeLesson?.title}
              </h3>
              <p className="text-xs text-white/70 max-w-md mt-1">
                Online masterclass stream recorded with faculty fellows. Includes interactive transcript and exercise prompts.
              </p>
            </div>

            {/* Lesson Summary & Key Applied Outcomes */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                Core Conceptual Framework
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                {activeLesson?.summary ||
                  'In this lesson, you will analyze the foundational principles required to translate conceptual ideas into structured, defensible models. Review the accompanying guidebook and complete the self-assessment matrix below.'}
              </p>

              <div className="p-4 bg-[var(--color-paper-100)] border-l-3 border-[var(--color-brand-blue-800)] rounded-[2px] space-y-2">
                <span className="font-bold text-xs text-[var(--color-brand-blue-900)] uppercase tracking-wider block">
                  Practical Application Requirement:
                </span>
                <p className="text-xs text-[var(--color-ink-800)]">
                  Every concept learned in this module must be mapped directly to your final graduation project. No theoretical speculation without applied defense.
                </p>
              </div>
            </div>

            {/* Sequential Lesson Navigation Controls (Previous & Next) */}
            <div className="pt-6 border-t border-[var(--color-paper-200)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevLesson}
                disabled={!prevLessonItem}
                className={`min-h-[48px] px-4 py-2.5 rounded-[2px] border text-xs font-semibold flex items-center justify-center sm:justify-start gap-2 transition-colors ${
                  prevLessonItem
                    ? 'border-[var(--color-paper-300)] bg-white hover:bg-[var(--color-paper-100)] active:bg-[var(--color-paper-200)] text-[var(--color-ink-900)]'
                    : 'border-dashed border-[var(--color-paper-200)] text-[var(--color-ink-400)] cursor-not-allowed bg-[var(--color-paper-50)]'
                }`}
                aria-label={prevLessonItem ? `Previous lesson: ${prevLessonItem.lesson.title}` : 'No previous lesson'}
              >
                <ChevronLeft size={18} className="shrink-0" />
                <div className="text-left line-clamp-1">
                  <span className="block text-[10px] text-[var(--color-ink-500)] uppercase tracking-wider">Previous</span>
                  <span className="font-semibold line-clamp-1">{prevLessonItem ? prevLessonItem.lesson.title : 'Course Start'}</span>
                </div>
              </button>

              <button
                type="button"
                onClick={handleNextLesson}
                disabled={!nextLessonItem}
                className={`min-h-[48px] px-4 py-2.5 rounded-[2px] text-xs font-semibold flex items-center justify-center sm:justify-end gap-2 transition-colors ${
                  nextLessonItem
                    ? 'bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] active:bg-[var(--color-brand-blue-950)] text-white shadow-xs'
                    : 'border-dashed border-[var(--color-paper-200)] text-[var(--color-ink-400)] cursor-not-allowed bg-[var(--color-paper-50)]'
                }`}
                aria-label={nextLessonItem ? `Next lesson: ${nextLessonItem.lesson.title}` : 'No next lesson'}
              >
                <div className="text-right line-clamp-1">
                  <span className="block text-[10px] text-white/70 uppercase tracking-wider">Next Lesson</span>
                  <span className="font-semibold line-clamp-1">{nextLessonItem ? nextLessonItem.lesson.title : 'Course Completed'}</span>
                </div>
                <ChevronRight size={18} className="shrink-0" />
              </button>
            </div>

            {/* Assignment Submission Section for this module */}
            <div className="pt-6 border-t border-[var(--color-paper-200)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                  Module Assignment & Defense Submission
                </h3>
                <span className="text-[11px] font-semibold text-[var(--color-accent-gold-700)] bg-[var(--color-accent-gold-400)]/15 px-2.5 py-1 rounded">
                  Faculty Evaluated
                </span>
              </div>

              {submittedMessage ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-[2px] text-xs space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 size={16} className="text-emerald-700" />
                    <span>Response Successfully Submitted to Faculty Review Board</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Your applied reflection has been recorded. Your faculty advisor will provide written feedback within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitAssignment} className="space-y-3">
                  <label className="block text-xs font-semibold text-[var(--color-ink-800)]">
                    Submit your answers, reflections, or link to your defended spreadsheet/blueprint:
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    placeholder="Enter your personal reflection, business unit economics notes, or paste your project cloud document link here..."
                    className="w-full p-3 text-xs bg-white border border-[var(--color-paper-300)] text-[var(--color-ink-900)] rounded-[2px] focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-[11px] text-[var(--color-ink-500)]">
                      Instant auto-save enabled.
                    </span>
                    <button
                      type="submit"
                      className="min-h-[44px] px-6 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] active:bg-[var(--color-brand-blue-950)] text-white text-xs font-semibold rounded-[2px] transition-colors shadow-xs"
                    >
                      Submit for Evaluation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Peer Discussion & Faculty Q&A Box */}
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-paper-200)]">
              <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)] flex items-center gap-2">
                <MessageSquare size={16} className="text-[var(--color-brand-blue-800)]" />
                <span>Cohort Discussion & Live Q&A</span>
              </h3>
              <span className="text-xs text-[var(--color-ink-500)]">{comments.length} contributions</span>
            </div>

            <div className="space-y-3">
              {comments.map((c) => (
                <div key={c.id} className="p-3 bg-[var(--color-paper-100)] rounded text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--color-ink-900)]">{c.user}</span>
                    <span className="text-[10px] text-[var(--color-ink-500)]">{c.time}</span>
                  </div>
                  <p className="text-[var(--color-ink-700)]">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handlePostComment} className="flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a question or share a reflection with your cohort..."
                className="flex-1 min-h-[44px] px-3 py-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-5 bg-[var(--color-brand-blue-900)] active:bg-[var(--color-brand-blue-950)] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-[var(--color-brand-blue-800)] transition-colors shadow-xs"
              >
                <Send size={14} />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Syllabus Checklist & Course Downloads (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Syllabus Modules Accordion / List */}
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-5 shadow-xs space-y-4">
            <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)] pb-2 border-b border-[var(--color-paper-200)]">
              Course Syllabus Modules
            </h3>

            <div className="space-y-4">
              {modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="text-xs font-semibold text-[var(--color-brand-blue-900)] uppercase tracking-wider flex items-center justify-between">
                    <span>
                      Module {modIdx + 1}: {mod.title}
                    </span>
                    <span className="text-[10px] text-[var(--color-ink-500)]">{mod.estimatedHours || 10} hrs</span>
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((lesson) => {
                      const isComplete = enrolment.completedLessons?.includes(lesson.id);
                      const isCurrent = activeLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => handleSelectLesson(mod, lesson)}
                          className={`w-full text-left min-h-[44px] p-2.5 rounded-[2px] text-xs flex items-center justify-between transition-colors ${
                            isCurrent
                              ? 'bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] font-semibold border-l-3 border-[var(--color-brand-blue-800)]'
                              : 'hover:bg-[var(--color-paper-100)] active:bg-[var(--color-paper-200)] text-[var(--color-ink-700)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 line-clamp-1">
                            {isComplete ? (
                              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                            ) : (
                              <Circle size={16} className="text-[var(--color-ink-400)] shrink-0" />
                            )}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[var(--color-ink-500)] shrink-0 ml-2">
                            {lesson.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Academic Resources */}
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-5 shadow-xs space-y-3">
            <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)] pb-2 border-b border-[var(--color-paper-200)]">
              Course Guidebooks & Templates
            </h3>

            <div className="space-y-2">
              {resources.map((res) => (
                <a
                  key={res.id}
                  href={res.fileUrl}
                  download
                  className="min-h-[44px] p-3 bg-[var(--color-paper-100)] hover:bg-[var(--color-paper-200)] active:bg-[var(--color-paper-300)] border border-[var(--color-paper-300)] rounded-[2px] text-xs flex items-center justify-between transition-colors block shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText size={16} className="text-[var(--color-brand-blue-800)] shrink-0" />
                    <div>
                      <div className="font-semibold text-[var(--color-ink-900)]">{res.title}</div>
                      <div className="text-[10px] text-[var(--color-ink-600)]">{res.type}</div>
                    </div>
                  </div>
                  <Download size={16} className="text-[var(--color-ink-600)] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Syllabus Slide-Over Drawer */}
      {isMobileSyllabusOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm ml-auto bg-white h-full flex flex-col shadow-2xl border-l border-[var(--color-paper-300)] animate-in slide-in-from-right duration-200">
            <div className="p-4 bg-[var(--color-brand-blue-900)] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-[var(--color-accent-gold-400)]" />
                <h3 className="font-display font-semibold text-sm">Course Syllabus</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSyllabusOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded bg-white/10 hover:bg-white/20 active:bg-white/30 text-white"
                aria-label="Close syllabus"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-3 bg-[var(--color-paper-100)] border-b border-[var(--color-paper-200)] text-xs text-[var(--color-ink-700)] flex items-center justify-between">
              <span>{completedCount} of {totalLessons} completed</span>
              <span className="font-mono font-bold text-[var(--color-brand-blue-900)]">{progressPercent}%</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="text-xs font-semibold text-[var(--color-brand-blue-900)] uppercase tracking-wider flex items-center justify-between">
                    <span>Module {modIdx + 1}: {mod.title}</span>
                    <span className="text-[10px] text-[var(--color-ink-500)]">{mod.estimatedHours || 10} hrs</span>
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((lesson) => {
                      const isComplete = enrolment.completedLessons?.includes(lesson.id);
                      const isCurrent = activeLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => handleSelectLesson(mod, lesson)}
                          className={`w-full text-left min-h-[44px] p-3 rounded text-xs flex items-center justify-between transition-colors ${
                            isCurrent
                              ? 'bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] font-bold border-l-4 border-[var(--color-brand-blue-800)]'
                              : 'hover:bg-[var(--color-paper-100)] active:bg-[var(--color-paper-200)] text-[var(--color-ink-800)]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 line-clamp-1">
                            {isComplete ? (
                              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
                            ) : (
                              <Circle size={16} className="text-[var(--color-ink-400)] shrink-0" />
                            )}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[var(--color-ink-500)] shrink-0 ml-2">
                            {lesson.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-[var(--color-paper-200)] bg-[var(--color-paper-50)]">
              <button
                type="button"
                onClick={() => setIsMobileSyllabusOpen(false)}
                className="w-full min-h-[44px] bg-[var(--color-brand-blue-900)] text-white text-xs font-semibold rounded flex items-center justify-center active:bg-[var(--color-brand-blue-950)]"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
