'use client';

import React, { useState, useEffect } from 'react';
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
  Send
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
      <div className="bg-[var(--color-brand-blue-900)] text-white border-b border-white/10 px-4 sm:px-8 py-3">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/student/dashboard"
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded text-white text-xs flex items-center gap-1 transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div>
              <span className="text-[10px] text-[var(--color-accent-gold-400)] font-semibold uppercase tracking-wider block">
                {program.levelSlug} • 100% Online Delivery
              </span>
              <h1 className="font-display font-semibold text-base sm:text-lg text-white line-clamp-1">
                {program.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[11px] text-white/70 block">Course Progress</span>
              <span className="text-xs font-mono font-bold text-[var(--color-accent-gold-400)]">
                {progressPercent}% ({completedCount}/{totalLessons} completed)
              </span>
            </div>
            <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden">
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
          {/* Main Lesson View Card */}
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--color-paper-200)]">
              <div>
                <span className="text-xs font-semibold text-[var(--color-brand-blue-800)] uppercase tracking-wider">
                  {activeModule?.title || 'Current Module'}
                </span>
                <h2 className="font-display font-semibold text-xl sm:text-2xl text-[var(--color-ink-900)] mt-1">
                  {activeLesson?.title || 'Interactive Lesson'}
                </h2>
              </div>

              {activeLesson && (
                <button
                  type="button"
                  onClick={() => handleToggleLesson(activeLesson.id)}
                  className={`py-2 px-3 text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors ${
                    enrolment.completedLessons?.includes(activeLesson.id)
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-[var(--color-brand-blue-900)] text-white hover:bg-[var(--color-brand-blue-800)]'
                  }`}
                >
                  <CheckCircle2 size={15} />
                  <span>
                    {enrolment.completedLessons?.includes(activeLesson.id)
                      ? 'Completed ✓'
                      : 'Mark Lesson Complete'}
                  </span>
                </button>
              )}
            </div>

            {/* Video Lecture / Interactive Presentation Container */}
            <div className="w-full aspect-video bg-[var(--color-ink-900)] text-white rounded-[2px] flex flex-col items-center justify-center relative overflow-hidden border border-black/20 p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-gold-400)]/20 border-2 border-[var(--color-accent-gold-400)] text-[var(--color-accent-gold-400)] flex items-center justify-center mb-3 hover:scale-110 transition-transform cursor-pointer">
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

            {/* Assignment Submission Section for this module */}
            <div className="pt-6 border-t border-[var(--color-paper-200)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                  Module Assignment & Defense Submission
                </h3>
                <span className="text-[11px] font-semibold text-[var(--color-accent-gold-700)] bg-[var(--color-accent-gold-400)]/15 px-2 py-0.5 rounded">
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
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-[var(--color-ink-500)]">
                      Instant auto-save enabled.
                    </span>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded-[2px] transition-colors"
                    >
                      Submit for Evaluation
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Peer Discussion & Faculty Q&A Box */}
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-6 shadow-xs space-y-4">
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

            <form onSubmit={handlePostComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a question or share a reflection with your cohort..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
              />
              <button
                type="submit"
                className="py-2 px-3 bg-[var(--color-brand-blue-900)] text-white text-xs font-semibold rounded flex items-center gap-1 hover:bg-[var(--color-brand-blue-800)]"
              >
                <Send size={12} />
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
                          onClick={() => {
                            setActiveModule(mod);
                            setActiveLesson(lesson);
                          }}
                          className={`w-full text-left p-2.5 rounded-[2px] text-xs flex items-center justify-between transition-colors ${
                            isCurrent
                              ? 'bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] font-semibold border-l-3 border-[var(--color-brand-blue-800)]'
                              : 'hover:bg-[var(--color-paper-100)] text-[var(--color-ink-700)]'
                          }`}
                        >
                          <div className="flex items-center gap-2 line-clamp-1">
                            {isComplete ? (
                              <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                            ) : (
                              <Circle size={14} className="text-[var(--color-ink-400)] shrink-0" />
                            )}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-[var(--color-ink-500)] shrink-0">
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
                  className="p-2.5 bg-[var(--color-paper-100)] hover:bg-[var(--color-paper-200)] border border-[var(--color-paper-300)] rounded-[2px] text-xs flex items-center justify-between transition-colors block"
                >
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-[var(--color-brand-blue-800)]" />
                    <div>
                      <div className="font-semibold text-[var(--color-ink-900)]">{res.title}</div>
                      <div className="text-[10px] text-[var(--color-ink-600)]">{res.type}</div>
                    </div>
                  </div>
                  <Download size={14} className="text-[var(--color-ink-600)]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
