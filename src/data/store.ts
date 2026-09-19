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
            settings: parsed.settings || initialDB.settings
          };
        } else {
          this.save();
        }
      } catch {
        this.state = initialDB;
      }
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

  // Certificates
  getCertificates(): Certificate[] {
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

  getEventBySlug(slug: string): SchoolEvent | undefined {
    return this.state.events.find(e => e.slug === slug);
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

  getArticleBySlug(slug: string): Article | undefined {
    return this.state.articles.find(a => a.slug === slug);
  }

  // Mentorship
  getMentors(): Mentor[] {
    return this.state.mentors.filter(m => m.status === 'published');
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

  // Impact
  getImpactIndicators(): ImpactIndicator[] {
    return this.state.impactIndicators.filter(i => i.status === 'published');
  }

  getImpactStories(): ImpactStory[] {
    return this.state.impactStories.filter(s => s.status === 'published' && s.consentGiven);
  }

  // FAQs
  getFaqs(scope?: 'global' | 'program' | 'admissions'): Faq[] {
    let list = [...this.state.faqs].filter(f => f.status === 'published');
    if (scope) {
      list = list.filter(f => f.scope === scope || f.scope === 'global');
    }
    return list.sort((a, b) => a.order - b.order);
  }

  // Contact Enquiry
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
    this.state.settings = { ...this.state.settings, ...updates };
    this.recordAudit('UPDATE_SETTINGS', 'SiteSettings', 'global', 'Updated site configuration');
    this.save();
    return this.state.settings;
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
}

export const dataStore = new DataStore();
