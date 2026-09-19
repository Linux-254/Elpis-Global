// Data Store and Persistence Adapter for Zoe Elpis Global School

import {
  School,
  Program,
  ProgramLevel,
  SchoolEvent,
  Article,
  ImpactStory,
  ImpactIndicator,
  Mentor,
  Faq,
  Application,
  Enrolment,
  Assignment,
  AssignmentSubmission,
  LiveSession,
  SchoolResource,
  Certificate,
  Payment,
  MentorshipRequest,
  ContactEnquiry,
  AuditEvent,
  SiteSettings,
  User
} from '../domain/types';

import {
  SEED_SCHOOLS,
  SEED_LEVELS,
  SEED_PROGRAMS,
  SEED_EVENTS,
  SEED_ARTICLES,
  SEED_IMPACT_INDICATORS,
  SEED_IMPACT_STORIES,
  SEED_MENTORS,
  SEED_FAQS,
  SEED_SETTINGS,
  SEED_USERS,
  SEED_ENROLMENTS,
  SEED_ASSIGNMENTS,
  SEED_SESSIONS,
  SEED_RESOURCES,
  SEED_CERTIFICATES
} from './seed';

const STORAGE_KEY = 'zegs_db_v1';

interface DBState {
  schools: School[];
  levels: ProgramLevel[];
  programs: Program[];
  events: SchoolEvent[];
  articles: Article[];
  impactIndicators: ImpactIndicator[];
  impactStories: ImpactStory[];
  mentors: Mentor[];
  faqs: Faq[];
  applications: Application[];
  enrolments: Enrolment[];
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  sessions: LiveSession[];
  resources: SchoolResource[];
  certificates: Certificate[];
  payments: Payment[];
  mentorshipRequests: MentorshipRequest[];
  enquiries: ContactEnquiry[];
  auditEvents: AuditEvent[];
  settings: SiteSettings;
  users: User[];
  currentUser: User | null;
}

const initialDB: DBState = {
  schools: SEED_SCHOOLS,
  levels: SEED_LEVELS,
  programs: SEED_PROGRAMS,
  events: SEED_EVENTS,
  articles: SEED_ARTICLES,
  impactIndicators: SEED_IMPACT_INDICATORS,
  impactStories: SEED_IMPACT_STORIES,
  mentors: SEED_MENTORS,
  faqs: SEED_FAQS,
  applications: [],
  enrolments: SEED_ENROLMENTS,
  assignments: SEED_ASSIGNMENTS,
  submissions: [],
  sessions: SEED_SESSIONS,
  resources: SEED_RESOURCES,
  certificates: SEED_CERTIFICATES,
  payments: [],
  mentorshipRequests: [],
  enquiries: [],
  auditEvents: [
    {
      id: "aud-init",
      actorUserId: "usr-admin-1",
      actorEmail: "admin@zegs.ac.ug",
      actorRole: "admin",
      action: "DATABASE_INITIALIZED",
      entityType: "System",
      entityId: "system",
      details: "Initial school catalog and curriculum seeded.",
      createdAt: new Date().toISOString()
    }
  ],
  settings: SEED_SETTINGS,
  users: SEED_USERS,
  currentUser: SEED_USERS[1] // Default logged in as student for seamless preview
};

class DataStore {
  private state: DBState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = initialDB;
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.state = {
            ...initialDB,
            ...parsed,
            // Ensure essential seed records exist if parsed was empty
            schools: parsed.schools?.length ? parsed.schools : initialDB.schools,
            levels: parsed.levels?.length ? parsed.levels : initialDB.levels,
            programs: parsed.programs?.length ? parsed.programs : initialDB.programs,
            events: parsed.events?.length ? parsed.events : initialDB.events,
            articles: parsed.articles?.length ? parsed.articles : initialDB.articles,
            settings: {
              ...initialDB.settings,
              ...(parsed.settings || {})
            }
          };
        } else {
          this.save();
        }
      } catch {
        this.state = initialDB;
      }
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    if (typeof window !== 'undefined') {
      queueMicrotask(() => {
        this.listeners.forEach((listener) => {
          try {
            listener();
          } catch (e) {
            console.error('Listener error in DataStore:', e);
          }
        });
      });
    } else {
      this.listeners.forEach((listener) => {
        try {
          listener();
        } catch (e) {
          console.error('Listener error in DataStore:', e);
        }
      });
    }
  }

  private save() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Storage quota or error:', e);
      }
    }
    this.notify();
  }

  private recordAudit(action: string, entityType: string, entityId: string, details?: string) {
    const user = this.getCurrentUser();
    const event: AuditEvent = {
      id: 'aud-' + Math.random().toString(36).substring(2, 9),
      actorUserId: user?.id || 'anonymous',
      actorEmail: user?.email,
      actorRole: user?.role || 'student',
      action,
      entityType,
      entityId,
      details,
      createdAt: new Date().toISOString()
    };
    this.state.auditEvents = [event, ...this.state.auditEvents];
    this.save();
  }

  // Auth & User
  getCurrentUser(): User | null {
    return this.state.currentUser;
  }

  setCurrentUser(user: User | null) {
    this.state.currentUser = user;
    this.save();
  }

  login(email: string, role: 'student' | 'admin' = 'student'): User {
    let found = this.state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      found = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        email,
        fullName: email.split('@')[0],
        role,
        status: 'active',
        timezone: 'Africa/Kampala',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.state.users.push(found);
    }
    this.state.currentUser = found;
    this.recordAudit('USER_LOGIN', 'User', found.id, `User signed in as ${found.role}`);
    this.save();
    return found;
  }

  logout() {
    const user = this.state.currentUser;
    if (user) {
      this.recordAudit('USER_LOGOUT', 'User', user.id);
    }
    this.state.currentUser = null;
    this.save();
  }

  // Schools
  getSchools(): School[] {
    return this.state.schools.sort((a, b) => a.order - b.order);
  }

  getSchoolBySlug(slug: string): School | undefined {
    return this.state.schools.find(s => s.slug === slug);
  }

  updateSchool(id: string, updates: Partial<School>): School | undefined {
    const index = this.state.schools.findIndex(s => s.id === id);
    if (index === -1) return undefined;
    this.state.schools[index] = { ...this.state.schools[index], ...updates };
    this.recordAudit('UPDATE_SCHOOL', 'School', id, `Updated school ${this.state.schools[index].name}`);
    this.save();
    return this.state.schools[index];
  }

  // Levels
  getLevels(): ProgramLevel[] {
    return this.state.levels.sort((a, b) => a.order - b.order);
  }

  getLevelBySlug(slug: string): ProgramLevel | undefined {
    return this.state.levels.find(l => l.slug === slug);
  }

  // Programs
  getPrograms(filters?: {
    schoolId?: string;
    levelSlug?: string;
    format?: string;
    deliveryMode?: string;
    status?: string;
    search?: string;
    featuredOnly?: boolean;
  }): Program[] {
    let results = [...this.state.programs];

    if (filters?.schoolId) {
      results = results.filter(p => p.schoolId === filters.schoolId);
    }
    if (filters?.levelSlug) {
      results = results.filter(p => p.levelSlug === filters.levelSlug);
    }
    if (filters?.format) {
      results = results.filter(p => p.format === filters.format);
    }
    if (filters?.deliveryMode) {
      results = results.filter(p => p.deliveryMode === filters.deliveryMode);
    }
    if (filters?.status) {
      results = results.filter(p => p.status === filters.status);
    } else {
      // By default return published
      results = results.filter(p => p.status === 'published');
    }
    if (filters?.featuredOnly) {
      results = results.filter(p => p.featured);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.summary.toLowerCase().includes(q) || 
        p.overview.toLowerCase().includes(q)
      );
    }

    return results;
  }

  getAllProgramsAdmin(): Program[] {
    return this.state.programs;
  }

  getProgramBySlug(slug: string): Program | undefined {
    return this.state.programs.find(p => p.slug === slug);
  }

  getProgramById(id: string): Program | undefined {
    return this.state.programs.find(p => p.id === id);
  }

  saveProgram(program: Partial<Program>): Program {
    if (program.id) {
      const index = this.state.programs.findIndex(p => p.id === program.id);
      if (index !== -1) {
        this.state.programs[index] = { ...this.state.programs[index], ...program } as Program;
        this.recordAudit('UPDATE_PROGRAM', 'Program', program.id, `Updated program ${program.name}`);
        this.save();
        return this.state.programs[index];
      }
    }
    const newProg: Program = {
      id: 'prog-' + Math.random().toString(36).substring(2, 9),
      slug: program.slug || (program.name ? program.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-program'),
      name: program.name || 'New Program',
      schoolId: program.schoolId || 'sch-purpose',
      levelId: program.levelId || 'lvl-1',
      levelSlug: program.levelSlug || 'foundation',
      format: program.format || 'Course',
      deliveryMode: program.deliveryMode || 'blended',
      summary: program.summary || '',
      overview: program.overview || '',
      audience: program.audience || [],
      learningOutcomes: program.learningOutcomes || [],
      durationWeeks: program.durationWeeks || 6,
      language: 'English',
      certificateType: 'Certificate of Completion',
      featured: program.featured || false,
      status: program.status || 'draft',
      publishedAt: program.status === 'published' ? new Date().toISOString() : undefined,
      ...program
    } as Program;

    this.state.programs.unshift(newProg);
    this.recordAudit('CREATE_PROGRAM', 'Program', newProg.id, `Created program ${newProg.name}`);
    this.save();
    return newProg;
  }

  deleteProgram(id: string) {
    const prog = this.state.programs.find(p => p.id === id);
    this.state.programs = this.state.programs.filter(p => p.id !== id);
    this.recordAudit('DELETE_PROGRAM', 'Program', id, `Deleted program ${prog?.name}`);
    this.save();
  }

  // Applications
  getApplications(filters?: { status?: string; programId?: string; search?: string }): Application[] {
    let list = [...this.state.applications];
    if (filters?.status && filters.status !== 'all') {
      list = list.filter(a => a.status === filters.status);
    }
    if (filters?.programId) {
      list = list.filter(a => a.programId === filters.programId);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(a => 
        a.fullName.toLowerCase().includes(q) || 
        a.email.toLowerCase().includes(q) || 
        a.reference.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getApplicationByReference(reference: string): Application | undefined {
    return this.state.applications.find(a => a.reference === reference);
  }

  submitApplication(data: Omit<Application, 'id' | 'reference' | 'status' | 'createdAt'>): Application {
    // Generate server-side unique formatted reference ZEGS-YYYY-XXXXXX
    const year = new Date().getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const reference = `ZEGS-${year}-${randomHex}`;

    const app: Application = {
      ...data,
      id: 'app-' + Math.random().toString(36).substring(2, 9),
      reference,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    this.state.applications.unshift(app);
    this.recordAudit('SUBMIT_APPLICATION', 'Application', app.id, `Submitted application ${reference} for ${app.fullName}`);
    this.save();
    return app;
  }

  updateApplicationStatus(id: string, status: Application['status'], statusReason?: string): Application | undefined {
    const index = this.state.applications.findIndex(a => a.id === id);
    if (index === -1) return undefined;
    
    const app = this.state.applications[index];
    app.status = status;
    app.statusReason = statusReason;
    app.reviewedAt = new Date().toISOString();
    app.reviewedBy = this.getCurrentUser()?.fullName || 'Admin';

    // If converted to enrolled, create enrolment
    if (status === 'enrolled' || status === 'accepted') {
      const existingEnrolment = this.state.enrolments.find(e => e.applicationId === id);
      if (!existingEnrolment) {
        this.state.enrolments.push({
          id: 'enr-' + Math.random().toString(36).substring(2, 9),
          userId: app.userId || 'usr-student-1',
          programId: app.programId,
          applicationId: app.id,
          status: 'active',
          startedAt: new Date().toISOString(),
          progressPercent: 0,
          currentModuleIndex: 0,
          completedLessons: []
        });
      }
    }

    this.recordAudit('APPLICATION_STATUS_CHANGE', 'Application', id, `Changed status to ${status}`);
    this.save();
    return app;
  }

  // Student Portal: Enrolments & Progress
  getEnrolmentsForUser(userId: string): Enrolment[] {
    const list = this.state.enrolments.filter(e => e.userId === userId);
    return list.map(e => ({
      ...e,
      program: this.getProgramById(e.programId)
    }));
  }

  getEnrolmentById(id: string): Enrolment | undefined {
    const e = this.state.enrolments.find(item => item.id === id);
    if (!e) return undefined;
    return {
      ...e,
      program: this.getProgramById(e.programId)
    };
  }

  toggleLessonCompletion(enrolmentId: string, lessonId: string): Enrolment | undefined {
    const enrolment = this.state.enrolments.find(e => e.id === enrolmentId);
    if (!enrolment) return undefined;

    const exists = enrolment.completedLessons.includes(lessonId);
    if (exists) {
      enrolment.completedLessons = enrolment.completedLessons.filter(l => l !== lessonId);
    } else {
      enrolment.completedLessons.push(lessonId);
    }

    // Recompute progress
    const program = this.getProgramById(enrolment.programId);
    const totalLessons = program?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
    enrolment.progressPercent = Math.min(100, Math.round((enrolment.completedLessons.length / totalLessons) * 100));

    this.recordAudit('UPDATE_LESSON_PROGRESS', 'Enrolment', enrolmentId, `Lesson ${lessonId} toggled`);
    this.save();
    return enrolment;
  }

  // Assignments & Submissions
  getAssignmentsForProgram(programId: string): Assignment[] {
    return this.state.assignments.filter(a => a.programId === programId);
  }

  getSubmissionsForUser(userId: string): AssignmentSubmission[] {
    return this.state.submissions.filter(s => s.userId === userId);
  }

  submitAssignment(data: Omit<AssignmentSubmission, 'id' | 'submittedAt' | 'status'>): AssignmentSubmission {
    const sub: AssignmentSubmission = {
      ...data,
      id: 'sub-' + Math.random().toString(36).substring(2, 9),
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    this.state.submissions.unshift(sub);
    this.recordAudit('SUBMIT_ASSIGNMENT', 'AssignmentSubmission', sub.id, `Submitted assignment ${data.assignmentId}`);
    this.save();
    return sub;
  }

  // Certificates & Registry
  getCertificates(): Certificate[] {
    return this.state.certificates;
  }

  getAllCertificatesAdmin(): Certificate[] {
    return this.state.certificates;
  }

  getCertificatesForUser(userId: string): Certificate[] {
    return this.state.certificates.filter(c => c.userId === userId);
  }

  getCertificateByCode(code: string): Certificate | undefined {
    return this.state.certificates.find(c => c.code.toLowerCase() === code.trim().toLowerCase());
  }

  verifyCertificate(code: string): Certificate | undefined {
    return this.getCertificateByCode(code);
  }

  issueCertificate(data: {
    userId: string;
    holderName: string;
    programId: string;
    programName: string;
    enrolmentId?: string;
    code?: string;
  }): Certificate {
    const code = data.code || `ZEGS-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const cert: Certificate = {
      id: 'cert-' + Math.random().toString(36).substring(2, 9),
      code,
      userId: data.userId,
      holderName: data.holderName,
      programId: data.programId,
      programName: data.programName,
      enrolmentId: data.enrolmentId || 'enr-manual',
      issuedAt: new Date().toISOString(),
      fileUrl: '/certificates/sample-cert.pdf'
    };
    this.state.certificates.unshift(cert);
    this.recordAudit('ISSUE_CERTIFICATE', 'Certificate', cert.id, `Issued certificate ${code} to ${data.holderName}`);
    this.save();
    return cert;
  }

  revokeCertificate(id: string, reason?: string): Certificate | undefined {
    const cert = this.state.certificates.find(c => c.id === id);
    if (!cert) return undefined;
    cert.revokedAt = new Date().toISOString();
    this.recordAudit('REVOKE_CERTIFICATE', 'Certificate', id, `Revoked cert ${cert.code}. Reason: ${reason || 'Administrative action'}`);
    this.save();
    return cert;
  }

  deleteCertificate(id: string) {
    this.state.certificates = this.state.certificates.filter(c => c.id !== id);
    this.recordAudit('DELETE_CERTIFICATE', 'Certificate', id, 'Deleted certificate record');
    this.save();
  }

  // Events
  getEvents(filter?: 'upcoming' | 'past' | 'all'): SchoolEvent[] {
    const now = new Date().toISOString();
    let events = [...this.state.events].filter(e => e.status === 'published');
    if (filter === 'upcoming') {
      events = events.filter(e => e.startsAt >= now);
    } else if (filter === 'past') {
      events = events.filter(e => e.startsAt < now);
    }
    return events.sort((a, b) => (filter === 'past' ? b.startsAt.localeCompare(a.startsAt) : a.startsAt.localeCompare(b.startsAt)));
  }

  getAllEventsAdmin(): SchoolEvent[] {
    return this.state.events;
  }

  getEventBySlug(slug: string): SchoolEvent | undefined {
    return this.state.events.find(e => e.slug === slug);
  }

  saveEvent(event: Partial<SchoolEvent>): SchoolEvent {
    if (event.id) {
      const idx = this.state.events.findIndex(e => e.id === event.id);
      if (idx !== -1) {
        this.state.events[idx] = { ...this.state.events[idx], ...event } as SchoolEvent;
        this.recordAudit('UPDATE_EVENT', 'Event', event.id, `Updated event ${event.title}`);
        this.save();
        return this.state.events[idx];
      }
    }
    const newEvent: SchoolEvent = {
      id: 'evt-' + Math.random().toString(36).substring(2, 9),
      slug: event.slug || (event.title ? event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-event'),
      title: event.title || 'Masterclass',
      summary: event.summary || '',
      description: event.description || '',
      category: event.category || 'Masterclass',
      deliveryMode: event.deliveryMode || 'online',
      startsAt: event.startsAt || new Date(Date.now() + 86400000 * 7).toISOString(),
      endsAt: event.endsAt || new Date(Date.now() + 86400000 * 7 + 7200000).toISOString(),
      timezone: 'Africa/Kampala (EAT)',
      locationName: event.locationName || 'Live Online Campus (Zoom / Google Meet)',
      joinUrl: event.joinUrl || 'https://meet.google.com/zegs-live-session',
      registrationStatus: event.registrationStatus || 'open',
      waitlistEnabled: true,
      registeredCount: 0,
      capacity: event.capacity || 100,
      status: event.status || 'published',
      heroImageUrl: event.heroImageUrl || 'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=800&auto=format&fit=crop',
      ...event
    } as SchoolEvent;
    this.state.events.unshift(newEvent);
    this.recordAudit('CREATE_EVENT', 'Event', newEvent.id, `Created event ${newEvent.title}`);
    this.save();
    return newEvent;
  }

  deleteEvent(id: string) {
    this.state.events = this.state.events.filter(e => e.id !== id);
    this.recordAudit('DELETE_EVENT', 'Event', id, 'Deleted event');
    this.save();
  }

  registerForEvent(eventId: string, data: { fullName: string; email: string; phone?: string; deliveryPreference: 'online' | 'physical' | 'blended' }): string {
    const event = this.state.events.find(e => e.id === eventId);
    if (!event) throw new Error('Event not found');

    const ref = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    if (event.registeredCount !== undefined) {
      event.registeredCount += 1;
    }
    this.recordAudit('EVENT_REGISTRATION', 'Event', eventId, `Registered ${data.fullName} (${data.email})`);
    this.save();
    return ref;
  }

  // Journal / Articles
  getArticles(category?: string): Article[] {
    let list = [...this.state.articles].filter(a => a.status === 'published');
    if (category && category !== 'All') {
      list = list.filter(a => a.category === category);
    }
    return list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  getAllArticlesAdmin(): Article[] {
    return this.state.articles;
  }

  getArticleBySlug(slug: string): Article | undefined {
    return this.state.articles.find(a => a.slug === slug);
  }

  saveArticle(article: Partial<Article>): Article {
    if (article.id) {
      const idx = this.state.articles.findIndex(a => a.id === article.id);
      if (idx !== -1) {
        this.state.articles[idx] = { ...this.state.articles[idx], ...article } as Article;
        this.recordAudit('UPDATE_ARTICLE', 'Article', article.id, `Updated article ${article.title}`);
        this.save();
        return this.state.articles[idx];
      }
    }
    const newArt: Article = {
      id: 'art-' + Math.random().toString(36).substring(2, 9),
      slug: article.slug || (article.title ? article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'new-article'),
      title: article.title || 'New Insight Article',
      standfirst: article.standfirst || '',
      category: article.category || 'Leadership',
      authorName: article.authorName || 'ZEGS Editorial Board',
      authorRole: article.authorRole || 'Faculty Fellow',
      bodyContent: article.bodyContent || 'Article body text.',
      readMinutes: article.readMinutes || 5,
      status: article.status || 'published',
      publishedAt: new Date().toISOString(),
      heroImageUrl: article.heroImageUrl || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      ...article
    } as Article;
    this.state.articles.unshift(newArt);
    this.recordAudit('CREATE_ARTICLE', 'Article', newArt.id, `Created article ${newArt.title}`);
    this.save();
    return newArt;
  }

  deleteArticle(id: string) {
    this.state.articles = this.state.articles.filter(a => a.id !== id);
    this.recordAudit('DELETE_ARTICLE', 'Article', id, 'Deleted article');
    this.save();
  }

  // Mentorship
  getMentors(): Mentor[] {
    return this.state.mentors.filter(m => m.status === 'published');
  }

  getAllMentorsAdmin(): Mentor[] {
    return this.state.mentors;
  }

  getMentorById(id: string): Mentor | undefined {
    return this.state.mentors.find(m => m.id === id);
  }

  saveMentor(mentor: Partial<Mentor>): Mentor {
    if (mentor.id) {
      const idx = this.state.mentors.findIndex(m => m.id === mentor.id);
      if (idx !== -1) {
        this.state.mentors[idx] = { 
          ...this.state.mentors[idx], 
          ...mentor,
          socialLinks: mentor.socialLinks || this.state.mentors[idx].socialLinks || []
        } as Mentor;
        this.recordAudit('UPDATE_MENTOR', 'Mentor', mentor.id, `Updated mentor ${mentor.fullName}`);
        this.save();
        return this.state.mentors[idx];
      }
    }
    const newMentor: Mentor = {
      id: 'men-' + Math.random().toString(36).substring(2, 9),
      fullName: mentor.fullName || 'New Mentor',
      role: mentor.role || 'Executive Fellow',
      organisation: mentor.organisation || 'ZEGS Faculty Network',
      biography: mentor.biography || '',
      expertise: mentor.expertise || ['Leadership', 'Purpose Discovery'],
      languages: mentor.languages || ['English', 'Luganda', 'Swahili'],
      mentoringFormat: mentor.mentoringFormat || ['1-on-1 Virtual Advisory', 'Executive Office Hours'],
      availability: mentor.availability || 'open',
      consentGiven: true,
      status: mentor.status || 'published',
      photoUrl: mentor.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      linkedinUrl: mentor.linkedinUrl || '',
      websiteUrl: mentor.websiteUrl || '',
      socialLinks: mentor.socialLinks || [],
      ...mentor
    } as Mentor;
    this.state.mentors.unshift(newMentor);
    this.recordAudit('CREATE_MENTOR', 'Mentor', newMentor.id, `Added mentor ${newMentor.fullName}`);
    this.save();
    return newMentor;
  }

  deleteMentor(id: string) {
    this.state.mentors = this.state.mentors.filter(m => m.id !== id);
    this.recordAudit('DELETE_MENTOR', 'Mentor', id, 'Deleted mentor');
    this.save();
  }

  getAllMentorshipRequestsAdmin(): MentorshipRequest[] {
    return this.state.mentorshipRequests;
  }

  updateMentorshipRequestStatus(id: string, status: MentorshipRequest['status'], matchedMentorId?: string): MentorshipRequest | undefined {
    const req = this.state.mentorshipRequests.find(r => r.id === id);
    if (!req) return undefined;
    req.status = status;
    if (matchedMentorId) req.matchedMentorId = matchedMentorId;
    this.recordAudit('UPDATE_MENTORSHIP_REQUEST', 'MentorshipRequest', id, `Status set to ${status}`);
    this.save();
    return req;
  }

  requestMentorship(data: Omit<MentorshipRequest, 'id' | 'status' | 'createdAt'>): MentorshipRequest {
    const req: MentorshipRequest = {
      ...data,
      id: 'mr-' + Math.random().toString(36).substring(2, 9),
      status: 'submitted',
      createdAt: new Date().toISOString()
    };
    this.state.mentorshipRequests.unshift(req);
    this.recordAudit('REQUEST_MENTORSHIP', 'MentorshipRequest', req.id, `Mentorship request by ${data.requesterName}`);
    this.save();
    return req;
  }

  // FAQs
  getFaqs(scope?: 'global' | 'program' | 'admissions'): Faq[] {
    let list = [...this.state.faqs].filter(f => f.status === 'published');
    if (scope) {
      list = list.filter(f => f.scope === scope || f.scope === 'global');
    }
    return list.sort((a, b) => a.order - b.order);
  }

  getAllFaqsAdmin(): Faq[] {
    return this.state.faqs;
  }

  saveFaq(faq: Partial<Faq>): Faq {
    if (faq.id) {
      const idx = this.state.faqs.findIndex(f => f.id === faq.id);
      if (idx !== -1) {
        this.state.faqs[idx] = { ...this.state.faqs[idx], ...faq } as Faq;
        this.recordAudit('UPDATE_FAQ', 'Faq', faq.id, 'Updated FAQ entry');
        this.save();
        return this.state.faqs[idx];
      }
    }
    const newFaq: Faq = {
      id: 'faq-' + Math.random().toString(36).substring(2, 9),
      question: faq.question || 'New Question?',
      answer: faq.answer || 'Answer text.',
      scope: faq.scope || 'global',
      order: faq.order || this.state.faqs.length + 1,
      status: faq.status || 'published',
      ...faq
    } as Faq;
    this.state.faqs.push(newFaq);
    this.recordAudit('CREATE_FAQ', 'Faq', newFaq.id, 'Created FAQ');
    this.save();
    return newFaq;
  }

  deleteFaq(id: string) {
    this.state.faqs = this.state.faqs.filter(f => f.id !== id);
    this.recordAudit('DELETE_FAQ', 'Faq', id, 'Deleted FAQ');
    this.save();
  }

  // Impact
  getImpactIndicators(): ImpactIndicator[] {
    return this.state.impactIndicators.filter(i => i.status === 'published');
  }

  getImpactStories(): ImpactStory[] {
    return this.state.impactStories.filter(s => s.status === 'published' && s.consentGiven);
  }

  getAllImpactStoriesAdmin(): ImpactStory[] {
    return this.state.impactStories;
  }

  saveImpactStory(story: Partial<ImpactStory>): ImpactStory {
    if (story.id) {
      const idx = this.state.impactStories.findIndex(s => s.id === story.id);
      if (idx !== -1) {
        this.state.impactStories[idx] = { ...this.state.impactStories[idx], ...story } as ImpactStory;
        this.recordAudit('UPDATE_IMPACT_STORY', 'ImpactStory', story.id, `Updated impact story of ${story.subjectName}`);
        this.save();
        return this.state.impactStories[idx];
      }
    }
    const newStory: ImpactStory = {
      id: 'imp-' + Math.random().toString(36).substring(2, 9),
      slug: story.slug || (story.subjectName ? story.subjectName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'impact-story'),
      subjectName: story.subjectName || 'Graduate Practitioner',
      subjectRole: story.subjectRole || 'Social Enterprise Founder',
      programName: story.programName || 'Executive Fellowship in Social Transformation',
      narrative: story.narrative || 'Impact narrative.',
      outcomeDescription: story.outcomeDescription || 'Measurable outcome.',
      photoUrl: story.photoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      consentGiven: true,
      status: story.status || 'published',
      publishedAt: new Date().toISOString(),
      ...story
    } as ImpactStory;
    this.state.impactStories.unshift(newStory);
    this.recordAudit('CREATE_IMPACT_STORY', 'ImpactStory', newStory.id, `Created impact story for ${newStory.subjectName}`);
    this.save();
    return newStory;
  }

  deleteImpactStory(id: string) {
    this.state.impactStories = this.state.impactStories.filter(s => s.id !== id);
    this.recordAudit('DELETE_IMPACT_STORY', 'ImpactStory', id, 'Deleted impact story');
    this.save();
  }

  // Contact Enquiries
  getEnquiries(): ContactEnquiry[] {
    return this.state.enquiries;
  }

  updateEnquiryStatus(id: string, status: ContactEnquiry['status']): ContactEnquiry | undefined {
    const enq = this.state.enquiries.find(e => e.id === id);
    if (!enq) return undefined;
    enq.status = status;
    this.recordAudit('UPDATE_ENQUIRY', 'ContactEnquiry', id, `Status changed to ${status}`);
    this.save();
    return enq;
  }

  submitEnquiry(data: Omit<ContactEnquiry, 'id' | 'status' | 'createdAt'>): ContactEnquiry {
    const enq: ContactEnquiry = {
      ...data,
      id: 'enq-' + Math.random().toString(36).substring(2, 9),
      status: 'new',
      createdAt: new Date().toISOString()
    };
    this.state.enquiries.unshift(enq);
    this.recordAudit('CONTACT_ENQUIRY', 'ContactEnquiry', enq.id, `Enquiry from ${data.name}`);
    this.save();
    return enq;
  }

  // Settings
  getSettings(): SiteSettings {
    return this.state.settings;
  }

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.state.settings = {
      ...this.state.settings,
      ...updates,
      socials: {
        ...this.state.settings.socials,
        ...(updates.socials || {})
      }
    };
    this.recordAudit('UPDATE_SETTINGS', 'SiteSettings', 'global', 'Updated site configuration');
    this.save();
    return this.state.settings;
  }

  // User Management
  getUsers(): User[] {
    return this.state.users;
  }

  saveUser(user: Partial<User>): User {
    if (user.id) {
      const idx = this.state.users.findIndex(u => u.id === user.id);
      if (idx !== -1) {
        this.state.users[idx] = { ...this.state.users[idx], ...user, updatedAt: new Date().toISOString() } as User;
        this.recordAudit('UPDATE_USER', 'User', user.id, `Updated user ${user.email}`);
        this.save();
        return this.state.users[idx];
      }
    }
    const newUser: User = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email: user.email || `user-${Date.now()}@zegs.ac.ug`,
      fullName: user.fullName || 'New User',
      role: user.role || 'student',
      status: user.status || 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...user
    } as User;
    this.state.users.push(newUser);
    this.recordAudit('CREATE_USER', 'User', newUser.id, `Created user ${newUser.email}`);
    this.save();
    return newUser;
  }

  // Enrolments (Admin)
  getAllEnrolmentsAdmin(): Enrolment[] {
    return this.state.enrolments.map(e => ({
      ...e,
      program: this.getProgramById(e.programId)
    }));
  }

  // System Stats
  getDashboardStats() {
    const totalPrograms = this.state.programs.length;
    const publishedPrograms = this.state.programs.filter(p => p.status === 'published').length;
    const totalApplications = this.state.applications.length;
    const pendingApplications = this.state.applications.filter(a => a.status === 'submitted' || a.status === 'under_review').length;
    const totalEnrolments = this.state.enrolments.length;
    const totalCertificates = this.state.certificates.length;
    const totalEvents = this.state.events.length;
    const totalMentors = this.state.mentors.length;
    const totalArticles = this.state.articles.length;
    const totalEnquiries = this.state.enquiries.length;
    const newEnquiries = this.state.enquiries.filter(e => e.status === 'new').length;

    return {
      totalPrograms,
      publishedPrograms,
      totalApplications,
      pendingApplications,
      totalEnrolments,
      totalCertificates,
      totalEvents,
      totalMentors,
      totalArticles,
      totalEnquiries,
      newEnquiries
    };
  }

  // Audit Logs
  getAuditEvents(): AuditEvent[] {
    return this.state.auditEvents;
  }

  // Live Sessions
  getUpcomingSessions(userId?: string): LiveSession[] {
    return this.state.sessions;
  }

  // Resources
  getResources(programId?: string): SchoolResource[] {
    if (programId) {
      return this.state.resources.filter(r => r.programId === programId || r.visibility === 'public');
    }
    return this.state.resources;
  }

  // Reset database to default seeds
  resetToDefaults() {
    this.state = { ...initialDB };
    this.save();
    this.recordAudit('RESET_DATABASE', 'System', 'system', 'Database reset to factory seeds');
  }
}

export const dataStore = new DataStore();
