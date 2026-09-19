'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SiteHeader } from '../../../src/components/primitives/SiteHeader';
import { SiteFooter } from '../../../src/components/primitives/SiteFooter';
import { dataStore } from '../../../src/data/store';
import {
  Shield,
  BookOpen,
  Users,
  FileCheck,
  Award,
  Calendar,
  Settings,
  HelpCircle,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  Building,
  GraduationCap,
  Sparkles,
  Image as ImageIcon,
  Share2,
  Globe,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import {
  Program,
  Application,
  SchoolEvent,
  Article,
  Mentor,
  MentorSocialLink,
  Faq,
  Certificate,
  SiteSettings,
  User,
  AuditEvent,
  School
} from '../../../src/domain/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(() => dataStore.getCurrentUser());
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'programs'
    | 'applications'
    | 'schools'
    | 'events'
    | 'articles'
    | 'mentors'
    | 'faqs'
    | 'certificates'
    | 'settings'
    | 'audit'
  >('overview');

  // Datasets
  const [stats, setStats] = useState<any>(() => dataStore.getDashboardStats());
  const [programs, setPrograms] = useState<Program[]>(() => dataStore.getAllProgramsAdmin());
  const [applications, setApplications] = useState<Application[]>(() => dataStore.getApplications());
  const [schools, setSchools] = useState<School[]>(() => dataStore.getSchools());
  const [events, setEvents] = useState<SchoolEvent[]>(() => dataStore.getAllEventsAdmin());
  const [articles, setArticles] = useState<Article[]>(() => dataStore.getAllArticlesAdmin());
  const [mentors, setMentors] = useState<Mentor[]>(() => dataStore.getAllMentorsAdmin());
  const [faqs, setFaqs] = useState<Faq[]>(() => dataStore.getAllFaqsAdmin());
  const [certificates, setCertificates] = useState<Certificate[]>(() => dataStore.getAllCertificatesAdmin());
  const [auditEvents, setAuditEvents] = useState<AuditEvent[]>(() => dataStore.getAuditEvents().slice(0, 25));
  const [settings, setSettings] = useState<SiteSettings>(() => dataStore.getSettings());

  // Search & Filter States
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal / Editor States
  const [editingProgram, setEditingProgram] = useState<Partial<Program> | null>(null);
  const [editingEvent, setEditingEvent] = useState<Partial<SchoolEvent> | null>(null);
  const [editingArticle, setEditingArticle] = useState<Partial<Article> | null>(null);
  const [editingMentor, setEditingMentor] = useState<Partial<Mentor> | null>(null);
  const [editingFaq, setEditingFaq] = useState<Partial<Faq> | null>(null);
  const [issuingCert, setIssuingCert] = useState<{ holderName: string; programName: string; code: string } | null>(null);
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [statusNotification, setStatusNotification] = useState<string | null>(null);

  const refreshData = () => {
    setStats(dataStore.getDashboardStats());
    setPrograms(dataStore.getAllProgramsAdmin());
    setApplications(dataStore.getApplications());
    setSchools(dataStore.getSchools());
    setEvents(dataStore.getAllEventsAdmin());
    setArticles(dataStore.getAllArticlesAdmin());
    setMentors(dataStore.getAllMentorsAdmin());
    setFaqs(dataStore.getAllFaqsAdmin());
    setCertificates(dataStore.getAllCertificatesAdmin());
    setAuditEvents(dataStore.getAuditEvents().slice(0, 25));
    setSettings(dataStore.getSettings());
  };

  const showToast = (msg: string) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 3500);
  };

  // Program Handlers
  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProgram || !editingProgram.name) return;
    dataStore.saveProgram(editingProgram);
    setEditingProgram(null);
    refreshData();
    showToast('Program saved successfully!');
  };

  const handleDeleteProgram = (id: string) => {
    if (confirm('Are you sure you want to delete this course program?')) {
      dataStore.deleteProgram(id);
      refreshData();
      showToast('Program deleted.');
    }
  };

  // Application Handlers
  const handleUpdateAppStatus = (appId: string, status: Application['status']) => {
    dataStore.updateApplicationStatus(appId, status, `Admin updated status to ${status}`);
    refreshData();
    if (viewingApp && viewingApp.id === appId) {
      setViewingApp({ ...viewingApp, status });
    }
    showToast(`Application marked as ${status}.`);
  };

  // Event Handlers
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title) return;
    dataStore.saveEvent(editingEvent);
    setEditingEvent(null);
    refreshData();
    showToast('Event saved successfully!');
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm('Delete this event?')) {
      dataStore.deleteEvent(id);
      refreshData();
      showToast('Event removed.');
    }
  };

  // Article Handlers
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle || !editingArticle.title) return;
    dataStore.saveArticle(editingArticle);
    setEditingArticle(null);
    refreshData();
    showToast('Article published / saved!');
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm('Delete this article?')) {
      dataStore.deleteArticle(id);
      refreshData();
      showToast('Article deleted.');
    }
  };

  // Mentor Handlers
  const handleSaveMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMentor || !editingMentor.fullName) return;
    dataStore.saveMentor(editingMentor);
    setEditingMentor(null);
    refreshData();
    showToast('Mentor profile saved!');
  };

  const handleDeleteMentor = (id: string) => {
    if (confirm('Delete this mentor?')) {
      dataStore.deleteMentor(id);
      refreshData();
      showToast('Mentor deleted.');
    }
  };

  // FAQ Handlers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq || !editingFaq.question) return;
    dataStore.saveFaq(editingFaq);
    setEditingFaq(null);
    refreshData();
    showToast('FAQ updated!');
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm('Delete this FAQ entry?')) {
      dataStore.deleteFaq(id);
      refreshData();
      showToast('FAQ deleted.');
    }
  };

  // Certificate Issuance
  const handleIssueCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issuingCert || !issuingCert.holderName) return;
    const cert = dataStore.issueCertificate({
      userId: 'usr-student-manual',
      holderName: issuingCert.holderName,
      programId: 'prog-purpose-discovery',
      programName: issuingCert.programName || 'Zoe Elpis Academic Program',
      code: issuingCert.code
    });
    setIssuingCert(null);
    refreshData();
    showToast(`Certificate ${cert.code} issued to ${cert.holderName}!`);
  };

  const handleRevokeCert = (id: string) => {
    if (confirm('Revoke this digital certificate?')) {
      dataStore.revokeCertificate(id, 'Revoked by administrator');
      refreshData();
      showToast('Certificate revoked.');
    }
  };

  // Settings Handlers
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.updateSettings(settings);
    refreshData();
    showToast('Website and global settings updated!');
  };

  const handleResetDB = () => {
    if (confirm('WARNING: Reset entire database to default seed catalog? All test modifications will be re-seeded.')) {
      dataStore.resetToDefaults();
      refreshData();
      showToast('Database reset to defaults.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-paper-100)]">
      <SiteHeader variant="solid" />

      {/* Notification Toast */}
      {statusNotification && (
        <div className="fixed top-20 right-6 z-50 bg-[var(--color-brand-blue-900)] text-[var(--color-accent-gold-400)] border border-[var(--color-accent-gold-400)] px-4 py-3 rounded shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 size={16} />
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Admin Top Header Banner */}
      <section className="bg-[var(--color-brand-blue-900)] text-white border-b border-white/10 pt-8 pb-6 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[var(--color-accent-gold-400)] text-[var(--color-ink-900)] text-[10px] font-bold uppercase tracking-wider rounded-[2px]">
                Central Administrative Console
              </span>
              <span className="text-xs text-white/60">Full Institutional CMS & Portal Governance</span>
            </div>
            <h1 className="font-display font-semibold text-2xl sm:text-3xl text-white">
              Zoe Elpis Academic Governance
            </h1>
            <p className="text-xs text-[var(--color-brand-blue-100)]">
              Manage courses, tuition rates, admissions pipeline, faculty mentors, journal essays, events, and global site assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/student/dashboard"
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <GraduationCap size={14} className="text-[var(--color-accent-gold-400)]" />
              <span>Student View</span>
            </Link>

            <Link
              href="/"
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleResetDB}
              type="button"
              className="px-3 py-2 bg-red-900/40 hover:bg-red-800 text-red-200 text-xs font-medium rounded-[2px] transition-colors flex items-center gap-1"
              title="Reset to factory seed data"
            >
              <RefreshCw size={13} />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Submenu */}
      <div className="bg-white border-b border-[var(--color-paper-300)] sticky top-16 z-20 shadow-xs">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 flex items-center gap-1 sm:gap-4 overflow-x-auto py-2">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'programs', label: `Courses (${programs.length})`, icon: BookOpen },
            { id: 'applications', label: `Admissions (${applications.length})`, icon: FileCheck },
            { id: 'events', label: `Events (${events.length})`, icon: Calendar },
            { id: 'articles', label: `Journal (${articles.length})`, icon: Sparkles },
            { id: 'mentors', label: `Mentors (${mentors.length})`, icon: Users },
            { id: 'faqs', label: `FAQs (${faqs.length})`, icon: HelpCircle },
            { id: 'certificates', label: `Certificates (${certificates.length})`, icon: Award },
            { id: 'settings', label: 'Site & Socials', icon: Settings },
            { id: 'audit', label: 'Audit Logs', icon: Clock }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                }}
                className={`py-2 px-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'border-[var(--color-brand-blue-800)] text-[var(--color-brand-blue-900)] bg-[var(--color-brand-blue-100)]/30 rounded-t'
                    : 'border-transparent text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)]'
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8">
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs">
                <div className="text-xs font-semibold text-[var(--color-ink-500)] uppercase tracking-wider">
                  Active Programmes
                </div>
                <div className="font-display text-3xl font-bold text-[var(--color-brand-blue-900)] mt-1">
                  {stats.totalPrograms || programs.length}
                </div>
                <div className="text-[11px] text-[var(--color-ink-600)] mt-1">
                  Across 4 Foundational Schools
                </div>
              </div>

              <div className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs">
                <div className="text-xs font-semibold text-[var(--color-ink-500)] uppercase tracking-wider">
                  Applications Received
                </div>
                <div className="font-display text-3xl font-bold text-[var(--color-accent-gold-700)] mt-1">
                  {stats.totalApplications || applications.length}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-1">
                  {stats.pendingApplications || 0} Pending Review
                </div>
              </div>

              <div className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs">
                <div className="text-xs font-semibold text-[var(--color-ink-500)] uppercase tracking-wider">
                  Enrolled Students
                </div>
                <div className="font-display text-3xl font-bold text-[var(--color-brand-blue-900)] mt-1">
                  {stats.totalEnrolments || 1}
                </div>
                <div className="text-[11px] text-[var(--color-ink-600)] mt-1">
                  Active Cohort Progression
                </div>
              </div>

              <div className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs">
                <div className="text-xs font-semibold text-[var(--color-ink-500)] uppercase tracking-wider">
                  Certificates Issued
                </div>
                <div className="font-display text-3xl font-bold text-emerald-800 mt-1">
                  {stats.totalCertificates || certificates.length}
                </div>
                <div className="text-[11px] text-[var(--color-ink-600)] mt-1">
                  100% Cryptographically Verifiable
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions (1 Col) */}
              <div className="bg-white border border-[var(--color-paper-300)] p-6 rounded-[2px] shadow-xs space-y-4">
                <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)] pb-2 border-b border-[var(--color-paper-200)]">
                  Quick CMS Actions
                </h3>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setEditingProgram({
                        name: '',
                        schoolId: 'sch-purpose',
                        levelSlug: 'foundation',
                        durationWeeks: 6,
                        deliveryMode: 'online',
                        fees: { amount: 350000, currency: 'UGX' },
                        summary: '',
                        overview: '',
                        learningOutcomes: ['Discover unique vocational calling', 'Construct applied life blueprint'],
                        status: 'published'
                      });
                      setActiveTab('programs');
                    }}
                    className="w-full py-2.5 px-3 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded flex items-center justify-between transition-colors"
                  >
                    <span>+ Add New Course Programme</span>
                    <Plus size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setEditingEvent({
                        title: '',
                        category: 'Masterclass',
                        deliveryMode: 'online',
                        startsAt: new Date(Date.now() + 86400000 * 7).toISOString(),
                        endsAt: new Date(Date.now() + 86400000 * 7 + 7200000).toISOString(),
                        locationName: 'Online Live Classroom (Google Meet / Zoom)',
                        joinUrl: 'https://meet.google.com/zegs-live-session',
                        capacity: 100,
                        status: 'published'
                      });
                      setActiveTab('events');
                    }}
                    className="w-full py-2.5 px-3 bg-[var(--color-paper-100)] hover:bg-[var(--color-paper-200)] text-[var(--color-ink-900)] border border-[var(--color-paper-300)] text-xs font-semibold rounded flex items-center justify-between transition-colors"
                  >
                    <span>+ Schedule Live Masterclass</span>
                    <Calendar size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setEditingArticle({
                        title: '',
                        category: 'Leadership',
                        authorName: 'ZEGS Editorial Directorate',
                        authorRole: 'Academic Governance Board',
                        readMinutes: 5,
                        bodyContent: 'Enter thought leadership essay or school announcement here...',
                        status: 'published'
                      });
                      setActiveTab('articles');
                    }}
                    className="w-full py-2.5 px-3 bg-[var(--color-paper-100)] hover:bg-[var(--color-paper-200)] text-[var(--color-ink-900)] border border-[var(--color-paper-300)] text-xs font-semibold rounded flex items-center justify-between transition-colors"
                  >
                    <span>+ Publish Journal Essay</span>
                    <Sparkles size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setIssuingCert({
                        holderName: '',
                        programName: 'Purpose Discovery Program',
                        code: `ZEGS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
                      });
                      setActiveTab('certificates');
                    }}
                    className="w-full py-2.5 px-3 bg-[var(--color-accent-gold-400)] hover:bg-[var(--color-accent-gold-500)] text-[var(--color-ink-900)] text-xs font-semibold rounded flex items-center justify-between transition-colors"
                  >
                    <span>+ Issue Verified Certificate</span>
                    <Award size={14} />
                  </button>
                </div>
              </div>

              {/* Real-time Audit Activity Stream (2 Cols) */}
              <div className="lg:col-span-2 bg-white border border-[var(--color-paper-300)] p-6 rounded-[2px] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--color-paper-200)]">
                  <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)] flex items-center gap-2">
                    <Clock size={16} className="text-[var(--color-brand-blue-800)]" />
                    <span>Real-Time Audit & Activity Log</span>
                  </h3>
                  <span className="text-xs text-[var(--color-ink-500)]">System Governance</span>
                </div>

                <div className="divide-y divide-[var(--color-paper-200)] max-h-96 overflow-y-auto pr-1">
                  {auditEvents.map((evt) => (
                    <div key={evt.id} className="py-2.5 text-xs flex items-center justify-between gap-4">
                      <div>
                        <div className="font-semibold text-[var(--color-ink-900)] flex items-center gap-2">
                          <span className="px-1.5 py-0.2 bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] text-[10px] font-mono rounded">
                            {evt.action}
                          </span>
                          <span>{evt.details || `${evt.entityType} (${evt.entityId})`}</span>
                        </div>
                        <div className="text-[11px] text-[var(--color-ink-500)] mt-0.5">
                          Actor: {evt.actorEmail || evt.actorUserId} • {evt.actorRole}
                        </div>
                      </div>
                      <div className="text-[11px] font-mono text-[var(--color-ink-400)] whitespace-nowrap">
                        {new Date(evt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: COURSES & PROGRAMMES (CRUD) */}
        {activeTab === 'programs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Course Catalog & Curriculum Management
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Create and edit academic programs, tuition fees in UGX/USD, module syllabi, and learning outcomes.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingProgram({
                    name: '',
                    schoolId: 'sch-purpose',
                    levelSlug: 'foundation',
                    durationWeeks: 6,
                    deliveryMode: 'online',
                    fees: { amount: 350000, currency: 'UGX' },
                    summary: '',
                    overview: '',
                    learningOutcomes: ['Discover vocational identity', 'Construct life blueprint'],
                    status: 'published'
                  })
                }
                className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded flex items-center gap-1.5 self-start"
              >
                <Plus size={14} />
                <span>Add New Course</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--color-paper-200)] text-[var(--color-ink-800)] font-semibold border-b border-[var(--color-paper-300)]">
                  <tr>
                    <th className="p-3.5">Course Title & School</th>
                    <th className="p-3.5">Level & Duration</th>
                    <th className="p-3.5">Tuition (UGX)</th>
                    <th className="p-3.5">Delivery</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-paper-200)]">
                  {programs.map((prog) => {
                    const sch = schools.find((s) => s.id === prog.schoolId);
                    return (
                      <tr key={prog.id} className="hover:bg-[var(--color-paper-100)] transition-colors">
                        <td className="p-3.5">
                          <div className="font-semibold text-sm text-[var(--color-ink-900)]">{prog.name}</div>
                          <div className="text-[11px] text-[var(--color-ink-600)]">{sch?.name || prog.schoolId}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-[var(--color-ink-900)] uppercase text-[10px] tracking-wider">
                            {prog.levelSlug}
                          </div>
                          <div className="text-[11px] text-[var(--color-ink-500)]">{prog.durationWeeks} Weeks</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-mono font-semibold text-[var(--color-ink-900)]">
                            UGX {(prog.fees?.amount || 350000).toLocaleString()}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 bg-[var(--color-paper-200)] text-[var(--color-ink-800)] rounded text-[11px] capitalize">
                            {prog.deliveryMode}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                              prog.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {prog.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => setEditingProgram({ ...prog })}
                            className="p-1.5 text-[var(--color-brand-blue-800)] hover:bg-[var(--color-brand-blue-100)] rounded"
                            title="Edit Course"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteProgram(prog.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            title="Delete Course"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADMISSIONS & APPLICATIONS PIPELINE */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Admissions Pipeline & Applicant Review
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Review applicant statements, evaluate admissions qualifications, and grant student portal access.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--color-ink-600)]">Filter:</span>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-white border border-[var(--color-paper-300)] rounded"
                >
                  <option value="all">All Submissions</option>
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>

            {/* Applications List */}
            <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--color-paper-200)] text-[var(--color-ink-800)] font-semibold border-b border-[var(--color-paper-300)]">
                  <tr>
                    <th className="p-3.5">Applicant & Contact</th>
                    <th className="p-3.5">Selected Programme</th>
                    <th className="p-3.5">Date & Country</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-paper-200)]">
                  {applications
                    .filter((a) => (filterCategory === 'all' ? true : a.status === filterCategory))
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-[var(--color-paper-100)] transition-colors">
                        <td className="p-3.5">
                          <div className="font-semibold text-sm text-[var(--color-ink-900)]">{app.fullName}</div>
                          <div className="text-[11px] text-[var(--color-ink-600)]">{app.email} • {app.phone || 'No Phone'}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-[var(--color-ink-900)]">{app.programName || app.programId}</div>
                          <div className="text-[11px] text-[var(--color-ink-500)]">Delivery: {app.deliveryPreference}</div>
                        </td>
                        <td className="p-3.5">
                          <div>{new Date(app.createdAt).toLocaleDateString()}</div>
                          <div className="text-[11px] text-[var(--color-ink-500)]">{app.country || 'Uganda'}</div>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                              app.status === 'accepted' || app.status === 'enrolled'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'under_review'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'declined'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {app.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5">
                          <button
                            type="button"
                            onClick={() => setViewingApp(app)}
                            className="py-1 px-2.5 bg-[var(--color-brand-blue-900)] text-white text-[11px] font-medium rounded hover:bg-[var(--color-brand-blue-800)]"
                          >
                            View & Decide
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: EVENTS & MASTERCLASSES */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Live Online Events & Masterclasses
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Schedule virtual conferences, faculty office hours, and interactive Zoom/Meet workshops.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingEvent({
                    title: '',
                    category: 'Masterclass',
                    deliveryMode: 'online',
                    startsAt: new Date(Date.now() + 86400000 * 7).toISOString(),
                    endsAt: new Date(Date.now() + 86400000 * 7 + 7200000).toISOString(),
                    locationName: 'Online Live Classroom (Google Meet / Zoom)',
                    joinUrl: 'https://meet.google.com/zegs-live-session',
                    capacity: 100,
                    status: 'published'
                  })
                }
                className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Schedule Event</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] text-[10px] font-bold uppercase rounded">
                        {evt.category} • {evt.deliveryMode}
                      </span>
                      <span className="text-[11px] text-[var(--color-ink-500)]">
                        {new Date(evt.startsAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-[var(--color-ink-600)] line-clamp-2">
                      {evt.summary || evt.description}
                    </p>

                    <div className="text-[11px] text-[var(--color-ink-600)] space-y-0.5 pt-1">
                      <div>Room Link: <span className="font-mono text-[var(--color-brand-blue-800)]">{evt.joinUrl || 'Provided upon RSVP'}</span></div>
                      <div>Registrations: <span className="font-semibold">{evt.registeredCount || 0} / {evt.capacity || 100}</span></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-paper-200)] mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setEditingEvent({ ...evt })}
                      className="text-xs font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center gap-1"
                    >
                      <Edit size={13} />
                      <span>Edit Event</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteEvent(evt.id)}
                      className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: JOURNAL & PUBLICATIONS */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  School Journal & Thought Leadership
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Publish essays, academic papers, and institutional announcements.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingArticle({
                    title: '',
                    category: 'Leadership',
                    authorName: 'ZEGS Faculty Directorate',
                    authorRole: 'Senior Fellow',
                    readMinutes: 5,
                    standfirst: '',
                    bodyContent: 'Enter complete essay content here...',
                    status: 'published'
                  })
                }
                className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Write New Article</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-[var(--color-accent-gold-400)]/20 text-[var(--color-accent-gold-800)] text-[10px] font-bold uppercase rounded">
                        {art.category}
                      </span>
                      <span className="text-[11px] text-[var(--color-ink-500)]">{art.readMinutes} min read</span>
                    </div>

                    <h3 className="font-display font-semibold text-base text-[var(--color-ink-900)]">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[var(--color-ink-600)] line-clamp-2">
                      {art.standfirst || art.bodyContent}
                    </p>
                    <div className="text-[11px] text-[var(--color-ink-500)]">
                      By {art.authorName} ({art.authorRole})
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--color-paper-200)] mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setEditingArticle({ ...art })}
                      className="text-xs font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center gap-1"
                    >
                      <Edit size={13} />
                      <span>Edit Content</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(art.id)}
                      className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: MENTORSHIP FACULTY */}
        {activeTab === 'mentors' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Advisory Mentors & Executive Faculty
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Manage certified mentors who provide 1-on-1 coaching for purpose discovery and enterprise ventures.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingMentor({
                    fullName: '',
                    role: 'Enterprise Advisory Fellow',
                    organisation: 'East African Strategic Network',
                    biography: '',
                    expertise: ['Leadership', 'Business Strategy'],
                    languages: ['English', 'Luganda'],
                    mentoringFormat: ['1-on-1 Virtual Advisory'],
                    availability: 'open',
                    status: 'published'
                  })
                }
                className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add Mentor Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mentors.map((m) => (
                <div
                  key={m.id}
                  className="bg-white border border-[var(--color-paper-300)] p-5 rounded-[2px] shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--color-paper-200)] shrink-0">
                        <img
                          src={m.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                          alt={m.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-sm text-[var(--color-ink-900)]">
                          {m.fullName}
                        </h3>
                        <p className="text-[11px] text-[var(--color-brand-blue-800)]">{m.role}</p>
                        <p className="text-[10px] text-[var(--color-ink-500)]">{m.organisation}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[var(--color-ink-600)] line-clamp-3">
                      {m.biography}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {m.expertise.map((exp, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-[var(--color-paper-200)] text-[10px] text-[var(--color-ink-800)] rounded">
                          {exp}
                        </span>
                      ))}
                    </div>

                    {/* Social Media & Article Footprint indicators */}
                    {(m.linkedinUrl || m.websiteUrl || (m.socialLinks && m.socialLinks.length > 0)) && (
                      <div className="pt-2 border-t border-dashed border-[var(--color-paper-200)] flex flex-wrap items-center gap-1.5 text-[10px]">
                        {m.linkedinUrl && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#0A66C2] rounded border border-blue-200 font-medium">
                            <Linkedin size={10} />
                            <span>LinkedIn</span>
                          </span>
                        )}
                        {m.websiteUrl && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200 font-medium">
                            <Globe size={10} />
                            <span>Website</span>
                          </span>
                        )}
                        {m.socialLinks && m.socialLinks.length > 0 && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[var(--color-paper-200)] text-[var(--color-ink-700)] rounded font-medium">
                            <span>{m.socialLinks.length} {m.socialLinks.length === 1 ? 'Article' : 'Articles'}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[var(--color-paper-200)] mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingMentor({ ...m })}
                        className="text-xs font-semibold text-[var(--color-brand-blue-800)] hover:underline flex items-center gap-1"
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </button>

                      <Link
                        href={`/mentorship/${m.id}`}
                        target="_blank"
                        className="text-xs text-[var(--color-ink-600)] hover:text-[var(--color-brand-blue-800)] flex items-center gap-1"
                        title="View Public Profile"
                      >
                        <Eye size={13} />
                        <span>Profile</span>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteMentor(m.id)}
                      className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: FAQS & KNOWLEDGE BASE */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Knowledge Base & Frequently Asked Questions
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Provide transparent answers on our 100% online learning model, tuition breakdown, and technical requirements.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setEditingFaq({
                    question: '',
                    answer: '',
                    scope: 'global',
                    order: faqs.length + 1,
                    status: 'published'
                  })
                }
                className="py-2.5 px-4 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add FAQ Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white border border-[var(--color-paper-300)] p-4 rounded-[2px] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 max-w-3xl">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-[var(--color-paper-200)] text-[var(--color-ink-700)] text-[10px] font-mono uppercase rounded">
                        {faq.scope}
                      </span>
                      <h4 className="font-semibold text-xs text-[var(--color-ink-900)]">
                        {faq.question}
                      </h4>
                    </div>
                    <p className="text-xs text-[var(--color-ink-600)]">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingFaq({ ...faq })}
                      className="p-1.5 text-[var(--color-brand-blue-800)] hover:bg-[var(--color-brand-blue-100)] rounded"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: CERTIFICATES & REGISTRY */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                  Cryptographic Certificate Registry & Credentialing
                </h2>
                <p className="text-xs text-[var(--color-ink-600)]">
                  Issue unique, digitally verifiable certificate numbers, or revoke invalid credentials.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIssuingCert({
                    holderName: '',
                    programName: 'Purpose Discovery Program',
                    code: `ZEGS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
                  })
                }
                className="py-2.5 px-4 bg-[var(--color-accent-gold-400)] hover:bg-[var(--color-accent-gold-500)] text-[var(--color-ink-900)] text-xs font-semibold rounded flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Issue New Certificate</span>
              </button>
            </div>

            <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--color-paper-200)] text-[var(--color-ink-800)] font-semibold border-b border-[var(--color-paper-300)]">
                  <tr>
                    <th className="p-3.5">Certificate Code</th>
                    <th className="p-3.5">Holder Name</th>
                    <th className="p-3.5">Academic Programme</th>
                    <th className="p-3.5">Issued Date</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-paper-200)]">
                  {certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-[var(--color-paper-100)] transition-colors">
                      <td className="p-3.5 font-mono font-bold text-[var(--color-brand-blue-900)]">
                        {cert.code}
                      </td>
                      <td className="p-3.5 font-semibold text-[var(--color-ink-900)]">
                        {cert.holderName}
                      </td>
                      <td className="p-3.5 text-[var(--color-ink-700)]">
                        {cert.programName}
                      </td>
                      <td className="p-3.5 text-[var(--color-ink-600)]">
                        {cert.issuedAt}
                      </td>
                      <td className="p-3.5">
                        {cert.revokedAt ? (
                          <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold rounded">
                            REVOKED
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                            VERIFIED ACTIVE
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <Link
                          href={`/verify/${cert.code}`}
                          className="py-1 px-2.5 bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-200)] text-[11px] font-semibold rounded inline-block"
                        >
                          Public Lookup
                        </Link>
                        {!cert.revokedAt && (
                          <button
                            type="button"
                            onClick={() => handleRevokeCert(cert.id)}
                            className="py-1 px-2.5 bg-red-100 hover:bg-red-200 text-red-800 text-[11px] font-semibold rounded"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 9: SITE SETTINGS & SOCIAL LINKS */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-6 sm:p-8 shadow-xs space-y-8 max-w-4xl">
            <div>
              <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
                Online School Website Settings & Social Links
              </h2>
              <p className="text-xs text-[var(--color-ink-600)]">
                Control the hero background image, announcement notices, official social media URLs, and payment gateway instructions.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* Section 1: Visual Media & Website Photography Manager */}
              <div className="space-y-6 pb-8 border-b border-[var(--color-paper-200)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[var(--color-brand-blue-900)] flex items-center gap-2">
                      <ImageIcon size={18} />
                      <span>Website Imagery & Visual Assets Manager</span>
                    </h3>
                    <p className="text-xs text-[var(--color-ink-600)]">
                      Change photographs, banners, and media featured across the home page, about page, portal, and events.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded-[2px] self-start sm:self-auto">
                    Live CMS Controlled
                  </span>
                </div>

                {/* Grid of Image Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Slot 1: Hero Banner */}
                  <div className="p-4 bg-[var(--color-paper-50)] border border-[var(--color-paper-300)] rounded-[2px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-900)]">
                        1. Home Hero Background
                      </span>
                      <span className="text-[10px] text-[var(--color-ink-500)]">1920×1080 Landscape</span>
                    </div>
                    <div className="aspect-[16/9] bg-[var(--color-paper-200)] rounded overflow-hidden border border-[var(--color-paper-300)]">
                      <img
                        src={settings.heroPhotoUrl || settings.heroBgImageUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop'}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={settings.heroPhotoUrl || settings.heroBgImageUrl || ''}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            heroPhotoUrl: e.target.value,
                            heroBgImageUrl: e.target.value
                          })
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                      />
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, heroPhotoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop', heroBgImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Auditorium
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, heroPhotoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop', heroBgImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Executive Seminar
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, heroPhotoUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1920&auto=format&fit=crop', heroBgImageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1920&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Collaboration Room
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Slot 2: Institutional Introduction Photo */}
                  <div className="p-4 bg-[var(--color-paper-50)] border border-[var(--color-paper-300)] rounded-[2px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-900)]">
                        2. Institutional Overview Photo
                      </span>
                      <span className="text-[10px] text-[var(--color-ink-500)]">4:5 Portrait on Homepage</span>
                    </div>
                    <div className="aspect-[16/9] bg-[var(--color-paper-200)] rounded overflow-hidden border border-[var(--color-paper-300)]">
                      <img
                        src={settings.introPhotoUrl || 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop'}
                        alt="Intro preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={settings.introPhotoUrl || ''}
                        onChange={(e) => setSettings({ ...settings, introPhotoUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                      />
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, introPhotoUrl: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=800&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Team Workshop
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, introPhotoUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Strategic Session
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Slot 3: About Founding Story Photo */}
                  <div className="p-4 bg-[var(--color-paper-50)] border border-[var(--color-paper-300)] rounded-[2px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-900)]">
                        3. About Founding Story Photo
                      </span>
                      <span className="text-[10px] text-[var(--color-ink-500)]">/about Page</span>
                    </div>
                    <div className="aspect-[16/9] bg-[var(--color-paper-200)] rounded overflow-hidden border border-[var(--color-paper-300)]">
                      <img
                        src={settings.aboutStoryPhotoUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop'}
                        alt="About story preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={settings.aboutStoryPhotoUrl || ''}
                        onChange={(e) => setSettings({ ...settings, aboutStoryPhotoUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                      />
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, aboutStoryPhotoUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Lecture Hall
                        </button>
                        <button
                          type="button"
                          onClick={() => setSettings({ ...settings, aboutStoryPhotoUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=800&auto=format&fit=crop' })}
                          className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                        >
                          Academic Campus
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Slot 4: Mentorship Faculty Banner */}
                  <div className="p-4 bg-[var(--color-paper-50)] border border-[var(--color-paper-300)] rounded-[2px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-900)]">
                        4. Mentorship Banner
                      </span>
                      <span className="text-[10px] text-[var(--color-ink-500)]">/mentorship Page</span>
                    </div>
                    <div className="aspect-[16/9] bg-[var(--color-paper-200)] rounded overflow-hidden border border-[var(--color-paper-300)]">
                      <img
                        src={settings.mentorshipCoverUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'}
                        alt="Mentorship preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={settings.mentorshipCoverUrl || ''}
                        onChange={(e) => setSettings({ ...settings, mentorshipCoverUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                      />
                    </div>
                  </div>

                  {/* Slot 5: Student Portal Banner */}
                  <div className="p-4 bg-[var(--color-paper-50)] border border-[var(--color-paper-300)] rounded-[2px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-900)]">
                        5. Student Portal Banner
                      </span>
                      <span className="text-[10px] text-[var(--color-ink-500)]">/student/dashboard</span>
                    </div>
                    <div className="aspect-[16/9] bg-[var(--color-paper-200)] rounded overflow-hidden border border-[var(--color-paper-300)]">
                      <img
                        src={settings.studentPortalBannerUrl || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop'}
                        alt="Portal preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={settings.studentPortalBannerUrl || ''}
                        onChange={(e) => setSettings({ ...settings, studentPortalBannerUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                      />
                    </div>
                  </div>

                  {/* Slot 6: Executive Masterclasses & Events Banner */}
                  <div className="p-4 bg-[var(--color-paper-50)] border border-[var(--color-paper-300)] rounded-[2px] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--color-ink-900)]">
                        6. Events & Masterclasses Cover
                      </span>
                      <span className="text-[10px] text-[var(--color-ink-500)]">/events Page</span>
                    </div>
                    <div className="aspect-[16/9] bg-[var(--color-paper-200)] rounded overflow-hidden border border-[var(--color-paper-300)]">
                      <img
                        src={settings.eventsCoverUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop'}
                        alt="Events preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        value={settings.eventsCoverUrl || ''}
                        onChange={(e) => setSettings({ ...settings, eventsCoverUrl: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Announcement Bar */}
                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                    Global Announcement Bar Text Notice
                  </label>
                  <input
                    type="text"
                    value={settings.announcementText || ''}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    placeholder="✨ Applications now open for the Upcoming 2026 Online Cohort..."
                    className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                </div>
              </div>

              {/* Section 2: Social Links */}
              <div className="space-y-4 pb-6 border-b border-[var(--color-paper-200)]">
                <h3 className="font-display font-semibold text-base text-[var(--color-brand-blue-900)] flex items-center gap-2">
                  <Share2 size={16} />
                  <span>Institutional Social Links</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.linkedin || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, linkedin: e.target.value }
                        })
                      }
                      placeholder="https://linkedin.com/school/zoe-elpis-global-school"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      Twitter / X URL
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.twitter || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, twitter: e.target.value }
                        })
                      }
                      placeholder="https://twitter.com/zoeelpis"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.youtube || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, youtube: e.target.value }
                        })
                      }
                      placeholder="https://youtube.com/@zoeelpisglobalschool"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.facebook || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, facebook: e.target.value }
                        })
                      }
                      placeholder="https://facebook.com/zoeelpisglobalschool"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.instagram || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, instagram: e.target.value }
                        })
                      }
                      placeholder="https://instagram.com/zoeelpisglobalschool"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      WhatsApp Admissions Chat Link
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.whatsapp || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, whatsapp: e.target.value }
                        })
                      }
                      placeholder="https://wa.me/256700892411"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      TikTok URL
                    </label>
                    <input
                      type="url"
                      value={settings.socials?.tiktok || ''}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          socials: { ...settings.socials, tiktok: e.target.value }
                        })
                      }
                      placeholder="https://tiktok.com/@zoeelpis"
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Contact & Financial Methods */}
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-base text-[var(--color-brand-blue-900)] flex items-center gap-2">
                  <Building size={16} />
                  <span>Contact Information & Payment Providers</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      Admissions Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                      Admissions Phone Numbers
                    </label>
                    <input
                      type="text"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                    Physical & Online Hub Location Note
                  </label>
                  <input
                    type="text"
                    value={settings.officeLocation}
                    onChange={(e) => setSettings({ ...settings, officeLocation: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-ink-800)] mb-1">
                    Approved Payment Providers
                  </label>
                  <input
                    type="text"
                    value={settings.paymentProvider}
                    onChange={(e) => setSettings({ ...settings, paymentProvider: e.target.value })}
                    className="w-full p-2.5 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white font-semibold text-xs tracking-wider uppercase rounded transition-colors"
                >
                  Save Global Configuration
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 10: AUDIT LOGS EXPLORER */}
        {activeTab === 'audit' && (
          <div className="bg-white border border-[var(--color-paper-300)] rounded-[2px] p-6 shadow-xs space-y-4">
            <h2 className="font-display font-semibold text-xl text-[var(--color-ink-900)]">
              Complete Security & Governance Audit Trail
            </h2>
            <div className="divide-y divide-[var(--color-paper-200)]">
              {auditEvents.map((evt) => (
                <div key={evt.id} className="py-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="font-semibold text-[var(--color-ink-900)]">
                      [{evt.action}] {evt.details || `${evt.entityType} (${evt.entityId})`}
                    </div>
                    <div className="text-[11px] text-[var(--color-ink-500)]">
                      By: {evt.actorEmail || evt.actorUserId} ({evt.actorRole})
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-[var(--color-ink-500)]">
                    {new Date(evt.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: Edit/Create Program */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                {editingProgram.id ? 'Edit Academic Programme' : 'Add New Academic Programme'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProgram(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Course Name</label>
                <input
                  type="text"
                  required
                  value={editingProgram.name || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, name: e.target.value })}
                  placeholder="e.g., Executive Purpose & Strategic Discovery"
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Academic School</label>
                  <select
                    value={editingProgram.schoolId || 'sch-purpose'}
                    onChange={(e) => {
                      setEditingProgram({
                        ...editingProgram,
                        schoolId: e.target.value
                      });
                    }}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  >
                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Level</label>
                  <select
                    value={editingProgram.levelSlug || 'foundation'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, levelSlug: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  >
                    <option value="foundation">Foundation</option>
                    <option value="professional">Professional</option>
                    <option value="advanced">Advanced</option>
                    <option value="executive">Executive</option>
                    <option value="fellowship">Fellowship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Duration (Weeks)</label>
                  <input
                    type="number"
                    value={editingProgram.durationWeeks || 6}
                    onChange={(e) => setEditingProgram({ ...editingProgram, durationWeeks: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Tuition Amount (UGX)</label>
                  <input
                    type="number"
                    value={editingProgram.fees?.amount || 350000}
                    onChange={(e) =>
                      setEditingProgram({
                        ...editingProgram,
                        fees: { ...editingProgram.fees, amount: Number(e.target.value), currency: 'UGX' }
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Delivery Mode</label>
                  <select
                    value={editingProgram.deliveryMode || 'online'}
                    onChange={(e) => setEditingProgram({ ...editingProgram, deliveryMode: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  >
                    <option value="online">100% Online</option>
                    <option value="blended">Blended / Virtual</option>
                    <option value="physical">Physical Hub</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Summary</label>
                <textarea
                  rows={2}
                  value={editingProgram.summary || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, summary: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Overview Description</label>
                <textarea
                  rows={3}
                  value={editingProgram.overview || ''}
                  onChange={(e) => setEditingProgram({ ...editingProgram, overview: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="py-2 px-4 bg-[var(--color-paper-200)] text-[var(--color-ink-800)] rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[var(--color-brand-blue-900)] text-white rounded font-semibold"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: View & Decide Application */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <div>
                <span className="text-[10px] font-mono text-[var(--color-ink-500)] uppercase block">
                  Application Ref: {viewingApp.id}
                </span>
                <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                  {viewingApp.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setViewingApp(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="text-xs space-y-3 bg-[var(--color-paper-100)] p-4 rounded">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[var(--color-ink-500)] block">Email:</span>
                  <span className="font-medium text-[var(--color-ink-900)]">{viewingApp.email}</span>
                </div>
                <div>
                  <span className="text-[var(--color-ink-500)] block">Phone:</span>
                  <span className="font-medium text-[var(--color-ink-900)]">{viewingApp.phone || 'None'}</span>
                </div>
                <div>
                  <span className="text-[var(--color-ink-500)] block">Programme:</span>
                  <span className="font-medium text-[var(--color-ink-900)]">{viewingApp.programName || viewingApp.programId}</span>
                </div>
                <div>
                  <span className="text-[var(--color-ink-500)] block">Country:</span>
                  <span className="font-medium text-[var(--color-ink-900)]">{viewingApp.country || 'Uganda'}</span>
                </div>
              </div>

              <div>
                <span className="text-[var(--color-ink-500)] block">Statement of Purpose / Reason for Applying:</span>
                <p className="font-medium text-[var(--color-ink-900)] italic mt-1">
                  &ldquo;{viewingApp.learningGoals || 'I wish to build my leadership skills and construct a real venture plan.'}&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-[var(--color-ink-800)] block">
                Admissions Board Decision:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateAppStatus(viewingApp.id, 'accepted')}
                  className="py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded transition-colors text-center"
                >
                  Accept Candidate
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateAppStatus(viewingApp.id, 'enrolled')}
                  className="py-2.5 px-3 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white font-semibold text-xs rounded transition-colors text-center"
                >
                  Enroll to Portal
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdateAppStatus(viewingApp.id, 'declined')}
                  className="py-2.5 px-3 bg-red-700 hover:bg-red-800 text-white font-semibold text-xs rounded transition-colors text-center"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Issue Verified Certificate */}
      {issuingCert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)] flex items-center gap-2">
                <Award size={18} className="text-[var(--color-accent-gold-500)]" />
                <span>Issue Cryptographic Certificate</span>
              </h3>
              <button
                type="button"
                onClick={() => setIssuingCert(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleIssueCert} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Graduate Full Name</label>
                <input
                  type="text"
                  required
                  value={issuingCert.holderName}
                  onChange={(e) => setIssuingCert({ ...issuingCert, holderName: e.target.value })}
                  placeholder="e.g. David Mukasa"
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Graduated Programme</label>
                <select
                  value={issuingCert.programName}
                  onChange={(e) => setIssuingCert({ ...issuingCert, programName: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Certificate Unique Code</label>
                <input
                  type="text"
                  required
                  value={issuingCert.code}
                  onChange={(e) => setIssuingCert({ ...issuingCert, code: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded font-mono font-bold"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => setIssuingCert(null)}
                  className="py-2 px-4 bg-[var(--color-paper-200)] text-[var(--color-ink-800)] rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[var(--color-brand-blue-900)] text-white rounded font-semibold"
                >
                  Issue Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit / Schedule Event */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                {editingEvent.id ? 'Edit Masterclass' : 'Schedule Live Masterclass'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingEvent(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  placeholder="Masterclass: Venture Financial Modeling"
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Category</label>
                  <select
                    value={editingEvent.category || 'Masterclass'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  >
                    <option value="Masterclass">Masterclass</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Fellowship">Fellowship</option>
                    <option value="Executive programme">Executive programme</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Delivery</label>
                  <select
                    value={editingEvent.deliveryMode || 'online'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, deliveryMode: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  >
                    <option value="online">100% Online</option>
                    <option value="physical">Physical Hub</option>
                    <option value="blended">Blended / Hybrid</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Online Room Link (Google Meet / Zoom)</label>
                <input
                  type="url"
                  value={editingEvent.joinUrl || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, joinUrl: e.target.value })}
                  placeholder="https://meet.google.com/zegs-live-session"
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Description / Summary</label>
                <textarea
                  rows={3}
                  value={editingEvent.summary || editingEvent.description || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, summary: e.target.value, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="py-2 px-4 bg-[var(--color-paper-200)] text-[var(--color-ink-800)] rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[var(--color-brand-blue-900)] text-white rounded font-semibold"
                >
                  Save Masterclass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit / Publish Article */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                {editingArticle.id ? 'Edit Journal Essay' : 'Write New Journal Publication'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Article Title</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Category</label>
                  <select
                    value={editingArticle.category || 'Leadership'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value as any })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Purpose">Purpose</option>
                    <option value="Business">Business</option>
                    <option value="Impact">Impact</option>
                    <option value="Community">Community</option>
                    <option value="Events">Events</option>
                    <option value="Opportunities">Opportunities</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Author Name</label>
                  <input
                    type="text"
                    value={editingArticle.authorName || 'ZEGS Editorial Directorate'}
                    onChange={(e) => setEditingArticle({ ...editingArticle, authorName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Standfirst / Short Summary</label>
                <textarea
                  rows={2}
                  value={editingArticle.standfirst || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, standfirst: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Full Article Body Text</label>
                <textarea
                  rows={6}
                  required
                  value={editingArticle.bodyContent || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, bodyContent: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded font-sans"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="py-2 px-4 bg-[var(--color-paper-200)] text-[var(--color-ink-800)] rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[var(--color-brand-blue-900)] text-white rounded font-semibold"
                >
                  Publish Essay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit / Add Mentor */}
      {editingMentor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <div>
                <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                  {editingMentor.id ? 'Edit Mentor Profile' : 'Add Mentor Profile'}
                </h3>
                <p className="text-[11px] text-[var(--color-ink-500)]">
                  Update faculty portrait, biographical credential, role, and domain expertise.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingMentor(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveMentor} className="space-y-4 text-xs">
              {/* Photo preview & URL field */}
              <div className="p-3 bg-[var(--color-paper-100)] border border-[var(--color-paper-300)] rounded flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-paper-200)] border border-[var(--color-paper-300)] shrink-0">
                  <img
                    src={editingMentor.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                    alt={editingMentor.fullName || 'Mentor Avatar'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="block font-semibold text-[var(--color-ink-900)]">
                    Mentor Portrait / Photo URL
                  </label>
                  <input
                    type="url"
                    value={editingMentor.photoUrl || ''}
                    onChange={(e) => setEditingMentor({ ...editingMentor, photoUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    <span className="text-[10px] text-[var(--color-ink-500)] self-center">Presets:</span>
                    <button
                      type="button"
                      onClick={() => setEditingMentor({ ...editingMentor, photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop' })}
                      className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                    >
                      Executive 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMentor({ ...editingMentor, photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' })}
                      className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                    >
                      Executive 2
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMentor({ ...editingMentor, photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' })}
                      className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                    >
                      Executive 3
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingMentor({ ...editingMentor, photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop' })}
                      className="px-1.5 py-0.5 bg-white border border-[var(--color-paper-300)] text-[10px] rounded hover:bg-[var(--color-paper-200)]"
                    >
                      Executive 4
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMentor.fullName || ''}
                  onChange={(e) => setEditingMentor({ ...editingMentor, fullName: e.target.value })}
                  placeholder="e.g. Dr. Joyce Namusoke"
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Role / Specialism</label>
                  <input
                    type="text"
                    value={editingMentor.role || 'Senior Strategic Advisor'}
                    onChange={(e) => setEditingMentor({ ...editingMentor, role: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Organisation</label>
                  <input
                    type="text"
                    value={editingMentor.organisation || 'ZEGS Executive Faculty'}
                    onChange={(e) => setEditingMentor({ ...editingMentor, organisation: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">
                  Areas of Expertise (Comma-separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(editingMentor.expertise) ? editingMentor.expertise.join(', ') : ''}
                  onChange={(e) =>
                    setEditingMentor({
                      ...editingMentor,
                      expertise: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="e.g. Purpose Discovery, Commercial Strategy, Governance"
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Biography</label>
                <textarea
                  rows={3}
                  value={editingMentor.biography || ''}
                  onChange={(e) => setEditingMentor({ ...editingMentor, biography: e.target.value })}
                  placeholder="Summarize academic and executive track record..."
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                />
              </div>

              {/* SOCIAL MEDIA PRESENCE & ARTICLES SECTION */}
              <div className="pt-4 border-t border-[var(--color-paper-300)] space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-semibold text-xs text-[var(--color-ink-900)] flex items-center gap-1.5">
                      <Share2 size={14} className="text-[var(--color-brand-blue-800)]" />
                      <span>Social Media Presence</span>
                    </h4>
                    <p className="text-[11px] text-[var(--color-ink-500)]">
                      Configure verified profiles, personal websites, and specific LinkedIn articles or publications.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[var(--color-ink-800)] mb-1 flex items-center gap-1">
                      <Linkedin size={12} className="text-[#0A66C2]" />
                      <span>LinkedIn Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={editingMentor.linkedinUrl || ''}
                      onChange={(e) => setEditingMentor({ ...editingMentor, linkedinUrl: e.target.value })}
                      placeholder="https://www.linkedin.com/in/username"
                      className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[var(--color-ink-800)] mb-1 flex items-center gap-1">
                      <Globe size={12} className="text-[var(--color-accent-gold-600)]" />
                      <span>Personal Website / Portfolio</span>
                    </label>
                    <input
                      type="url"
                      value={editingMentor.websiteUrl || ''}
                      onChange={(e) => setEditingMentor({ ...editingMentor, websiteUrl: e.target.value })}
                      placeholder="https://mentor-consulting.africa"
                      className="w-full p-2 text-xs bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                    />
                  </div>
                </div>

                {/* Dynamic Links: LinkedIn Articles, Publications & Personal Websites */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-semibold text-[var(--color-ink-800)] text-[11px] uppercase tracking-wider">
                      LinkedIn Articles & Publication Links ({editingMentor.socialLinks?.length || 0})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const newLink: MentorSocialLink = {
                          id: 'lnk-' + Math.random().toString(36).substring(2, 9),
                          title: '',
                          url: '',
                          type: 'linkedin_article'
                        };
                        setEditingMentor({
                          ...editingMentor,
                          socialLinks: [...(editingMentor.socialLinks || []), newLink]
                        });
                      }}
                      className="px-2.5 py-1 bg-[var(--color-brand-blue-50)] hover:bg-[var(--color-brand-blue-100)] text-[var(--color-brand-blue-900)] text-[11px] font-semibold rounded border border-[var(--color-brand-blue-200)] flex items-center gap-1 transition-colors"
                    >
                      <Plus size={12} />
                      <span>Add Article / Link</span>
                    </button>
                  </div>

                  {(!editingMentor.socialLinks || editingMentor.socialLinks.length === 0) ? (
                    <div className="p-3 bg-[var(--color-paper-100)] border border-dashed border-[var(--color-paper-300)] rounded text-center text-[11px] text-[var(--color-ink-500)]">
                      No specific LinkedIn articles or website links added yet. Click &quot;Add Article / Link&quot; to link mentor writings.
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {editingMentor.socialLinks.map((link, idx) => (
                        <div
                          key={link.id || idx}
                          className="p-2.5 bg-[var(--color-paper-100)] border border-[var(--color-paper-300)] rounded space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <select
                              value={link.type || 'linkedin_article'}
                              onChange={(e) => {
                                const updated = [...(editingMentor.socialLinks || [])];
                                updated[idx] = { ...updated[idx], type: e.target.value as any };
                                setEditingMentor({ ...editingMentor, socialLinks: updated });
                              }}
                              className="p-1.5 text-[11px] bg-white border border-[var(--color-paper-300)] rounded font-medium text-[var(--color-ink-900)]"
                            >
                              <option value="linkedin_article">LinkedIn Article / Pulse</option>
                              <option value="website">Personal Website / Blog</option>
                              <option value="publication">Research / Whitepaper</option>
                              <option value="linkedin_profile">LinkedIn Profile</option>
                              <option value="other">Other Link</option>
                            </select>

                            <input
                              type="text"
                              required
                              value={link.title}
                              onChange={(e) => {
                                const updated = [...(editingMentor.socialLinks || [])];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setEditingMentor({ ...editingMentor, socialLinks: updated });
                              }}
                              placeholder="Title (e.g. Scaling African Ventures: Unit Economics)"
                              className="flex-1 p-1.5 text-[11px] bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                            />

                            <button
                              type="button"
                              onClick={() => {
                                const updated = (editingMentor.socialLinks || []).filter((_, i) => i !== idx);
                                setEditingMentor({ ...editingMentor, socialLinks: updated });
                              }}
                              className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                              title="Remove article link"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              required
                              value={link.url}
                              onChange={(e) => {
                                const updated = [...(editingMentor.socialLinks || [])];
                                updated[idx] = { ...updated[idx], url: e.target.value };
                                setEditingMentor({ ...editingMentor, socialLinks: updated });
                              }}
                              placeholder="https://www.linkedin.com/pulse/... or https://personal-domain.com"
                              className="flex-1 p-1.5 text-[11px] bg-white border border-[var(--color-paper-300)] rounded focus:outline-none focus:border-[var(--color-brand-blue-800)]"
                            />
                            {link.url && (
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-1 bg-white border border-[var(--color-paper-300)] text-[10px] font-medium text-[var(--color-brand-blue-800)] hover:bg-[var(--color-paper-200)] rounded flex items-center gap-1 shrink-0"
                              >
                                <ExternalLink size={11} />
                                <span>Test Link</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => setEditingMentor(null)}
                  className="py-2 px-4 bg-[var(--color-paper-200)] hover:bg-[var(--color-paper-300)] text-[var(--color-ink-800)] rounded font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[var(--color-brand-blue-900)] hover:bg-[var(--color-brand-blue-800)] text-white rounded font-semibold transition-colors"
                >
                  Save Mentor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit / Add FAQ */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 sm:p-8 rounded-[2px] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-paper-200)]">
              <h3 className="font-display font-semibold text-lg text-[var(--color-ink-900)]">
                {editingFaq.id ? 'Edit FAQ Item' : 'Add FAQ Item'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="p-1 text-[var(--color-ink-500)] hover:text-black"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Scope</label>
                <select
                  value={editingFaq.scope || 'global'}
                  onChange={(e) => setEditingFaq({ ...editingFaq, scope: e.target.value as any })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                >
                  <option value="global">Global Institutional</option>
                  <option value="admissions">Admissions & Tuition</option>
                  <option value="program">Programmes & Syllabus</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[var(--color-ink-800)] mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[var(--color-paper-300)] rounded"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-[var(--color-paper-200)]">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="py-2 px-4 bg-[var(--color-paper-200)] text-[var(--color-ink-800)] rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 bg-[var(--color-brand-blue-900)] text-white rounded font-semibold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
