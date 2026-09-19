// Domain Types for Zoe Elpis Global School (ZEGS)

export type UserRole = 'admin' | 'editor' | 'facilitator' | 'student';
export type UserStatus = 'active' | 'suspended' | 'pending';

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  country?: string;
  city?: string;
  timezone?: string;
  avatarMediaId?: string;
  role: UserRole;
  status: UserStatus;
  accessibilityRequirements?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContentStatus = 'draft' | 'in_review' | 'scheduled' | 'published' | 'archived';

export type PillarId = 'purpose' | 'leadership' | 'business' | 'impact';

export interface School {
  id: string;
  slug: string;
  name: string;
  navLabel: string;
  pillar: PillarId;
  academyName: string;
  focus: string;
  statement: string;
  overview: string;
  heroMediaId?: string;
  heroImageUrl?: string;
  order: number;
  status: ContentStatus;
  programCount?: number;
}

export type ProgramLevelSlug = 'foundation' | 'professional' | 'advanced' | 'executive' | 'fellowship';

export interface ProgramLevel {
  id: string;
  slug: ProgramLevelSlug;
  label: string;
  levelNumber: number;
  description: string;
  audience: string;
  selective?: boolean;
  order: number;
}

export type ProgramFormat = 'Course' | 'Masterclass' | 'Workshop' | 'Bootcamp' | 'Fellowship' | 'Executive programme';
export type DeliveryMode = 'online' | 'physical' | 'blended';

export interface ModuleLesson {
  id: string;
  moduleId: string;
  title: string;
  summary?: string;
  durationMinutes: number;
  order: number;
  resourceIds?: string[];
  content?: string;
}

export interface ProgramModule {
  id: string;
  programId: string;
  title: string;
  summary: string;
  order: number;
  estimatedHours: number;
  lessons: ModuleLesson[];
}

export interface Intake {
  id: string;
  programId: string;
  startsAt: string;
  endsAt?: string;
  applicationOpensAt: string;
  applicationClosesAt: string;
  capacity?: number;
  deliveryMode: DeliveryMode;
  status: 'planned' | 'open' | 'closed' | 'running' | 'completed' | 'cancelled';
}

export interface ProgramFee {
  amount?: number;
  currency?: string;
  note?: string;
  confirmedAtAdmission?: boolean;
}

export interface Program {
  id: string;
  slug: string;
  name: string;
  schoolId: string;
  levelId: string;
  levelSlug: ProgramLevelSlug;
  format: ProgramFormat;
  deliveryMode: DeliveryMode;
  summary: string;
  overview: string;
  audience: string[];
  learningOutcomes: string[];
  durationWeeks: number;
  contactHours?: number;
  language: string;
  practicalProject?: string;
  certificateType: string;
  certificateRequirements?: string;
  fees?: ProgramFee | null;
  currency?: string;
  heroMediaId?: string;
  heroImageUrl?: string;
  outlineFileId?: string;
  featured: boolean;
  featureRank?: number;
  status: ContentStatus;
  publishedAt?: string;
  modules?: ProgramModule[];
  intakes?: Intake[];
  facilitatorIds?: string[];
}

export interface Facilitator {
  id: string;
  userId?: string;
  fullName: string;
  role: string;
  organisation: string;
  biography: string;
  expertise: string[];
  photoMediaId?: string;
  photoUrl?: string;
  consentGiven: boolean;
  status: ContentStatus;
}

export type MentorAvailability = 'open' | 'limited' | 'closed';

export interface MentorSocialLink {
  id: string;
  title: string;
  url: string;
  type: 'linkedin_article' | 'website' | 'linkedin_profile' | 'publication' | 'other';
}

export interface Mentor {
  id: string;
  userId?: string;
  fullName: string;
  role: string;
  organisation: string;
  biography: string;
  expertise: string[];
  languages: string[];
  mentoringFormat: string[];
  availability: MentorAvailability;
  photoMediaId?: string;
  photoUrl?: string;
  consentGiven: boolean;
  status: ContentStatus;
  linkedinUrl?: string;
  websiteUrl?: string;
  socialLinks?: MentorSocialLink[];
}

export type MentorshipRequestStatus = 'submitted' | 'under_review' | 'matched' | 'declined' | 'closed';

export interface MentorshipRequest {
  id: string;
  requesterUserId?: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone?: string;
  mentorId?: string;
  programId?: string;
  goal: string;
  format: string;
  frequency: string;
  status: MentorshipRequestStatus;
  matchedMentorId?: string;
  createdAt: string;
}

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'additional_info_required'
  | 'accepted'
  | 'waitlisted'
  | 'declined'
  | 'withdrawn'
  | 'enrolled';

export interface Application {
  id: string;
  reference: string;
  userId?: string;
  programId: string;
  programName?: string;
  intakeId?: string;
  applicantType: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth?: string;
  gender?: string;
  highestEducation: string;
  currentOccupation: string;
  organisation?: string;
  relevantExperience: string;
  currentProject?: string;
  learningGoals: string;
  intendedProject: string;
  howYouHeard: string;
  deliveryPreference: DeliveryMode;
  availability: string;
  deviceAndConnectivity: string;
  accessibilityRequirements?: string;
  documentIds?: string[];
  consentGivenAt: string;
  status: ApplicationStatus;
  statusReason?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  submittedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface ApplicationDraft {
  step: number;
  programId: string;
  deliveryMode: string;
  intakeMonth: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dob: string;
  gender: string;
  highestEducation: string;
  currentRole: string;
  organisation: string;
  yearsExperience: number;
  statementOfPurpose: string;
  ventureIdea: string;
  fundingSource: string;
  scholarshipNeedReason?: string;
  agreedToTerms: boolean;
}

export type EnrolmentStatus = 'active' | 'paused' | 'completed' | 'withdrawn';

export interface Enrolment {
  id: string;
  userId: string;
  programId: string;
  program?: Program;
  intakeId?: string;
  applicationId?: string;
  status: EnrolmentStatus;
  startedAt: string;
  completedAt?: string;
  progressPercent: number;
  currentModuleIndex: number;
  completedLessons: string[]; // lesson IDs
}

export type AssignmentStatus = 
  | 'not_started'
  | 'in_progress'
  | 'submitted'
  | 'under_review'
  | 'returned_for_revision'
  | 'graded'
  | 'late'
  | 'missed';

export interface Assignment {
  id: string;
  programId: string;
  moduleId?: string;
  title: string;
  brief: string;
  submissionTypes: ('text' | 'file' | 'link')[];
  dueAt: string;
  allowsResubmission: boolean;
  maxFiles: number;
  maxFileMb: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  enrolmentId: string;
  userId: string;
  textBody?: string;
  fileUrls?: string[];
  linkUrl?: string;
  status: AssignmentStatus;
  submittedAt: string;
  grade?: string;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: string;
}

export interface LiveSession {
  id: string;
  programId: string;
  intakeId?: string;
  title: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  platform: 'Zoom' | 'Google Meet' | 'In-Person';
  joinUrl: string;
  recordingUrl?: string;
  facilitatorName?: string;
}

export type EventCategory = 'Masterclass' | 'Workshop' | 'Seminar' | 'Bootcamp' | 'Fellowship' | 'Executive programme';
export type EventRegistrationStatus = 'open' | 'closing_soon' | 'full' | 'waitlist' | 'closed' | 'cancelled' | 'completed';

export interface SchoolEvent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: EventCategory;
  schoolId?: string;
  deliveryMode: DeliveryMode;
  startsAt: string;
  endsAt: string;
  timezone: string;
  locationName?: string;
  joinUrl?: string;
  speakerNames?: string[];
  capacity?: number;
  registeredCount?: number;
  registrationStatus: EventRegistrationStatus;
  waitlistEnabled: boolean;
  heroImageUrl?: string;
  status: ContentStatus;
}

export type EventItem = SchoolEvent;

export interface EventRegistration {
  id: string;
  eventId: string;
  userId?: string;
  fullName: string;
  email: string;
  phone?: string;
  deliveryPreference: DeliveryMode;
  status: 'registered' | 'waitlisted' | 'cancelled' | 'attended';
  reference: string;
  createdAt: string;
}

export type ArticleCategory = 'Purpose' | 'Leadership' | 'Business' | 'Impact' | 'Community' | 'Events' | 'Opportunities';

export interface Article {
  id: string;
  slug: string;
  title: string;
  standfirst: string;
  category: ArticleCategory;
  schoolId?: string;
  authorName?: string;
  authorRole?: string;
  heroImageUrl?: string;
  bodyContent: string;
  pullQuote?: string;
  pullQuoteAttribution?: string;
  readMinutes: number;
  status: ContentStatus;
  publishedAt: string;
}

export interface ImpactStory {
  id: string;
  slug: string;
  subjectName: string;
  subjectRole: string;
  programName: string;
  narrative: string;
  outcomeDescription: string;
  photoUrl?: string;
  consentGiven: boolean;
  status: ContentStatus;
  publishedAt: string;
}

export interface ImpactIndicator {
  id: string;
  label: string;
  value: string;
  unit: string;
  period: string;
  method: string;
  sourceNote: string;
  status: ContentStatus;
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string;
  programName: string;
  quote: string;
  consentGiven: boolean;
  status: ContentStatus;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  scope: 'global' | 'program' | 'admissions';
  programId?: string;
  order: number;
  status: ContentStatus;
}

export interface SchoolResource {
  id: string;
  title: string;
  type: string;
  fileUrl: string;
  programId?: string;
  programName?: string;
  moduleId?: string;
  visibility: 'public' | 'enrolled' | 'admin';
  sizeBytes: number;
  createdAt: string;
}

export interface Certificate {
  id: string;
  code: string;
  enrolmentId: string;
  userId: string;
  programId: string;
  programName: string;
  holderName: string;
  issuedAt: string;
  revokedAt?: string;
  fileUrl?: string;
}

export interface Payment {
  id: string;
  reference: string;
  userId?: string;
  applicationId?: string;
  enrolmentId?: string;
  programName?: string;
  provider: 'M-Pesa' | 'Flutterwave' | 'Paystack' | 'Stripe';
  providerReference?: string;
  amountMinor: number;
  currency: string;
  status: 'initiated' | 'pending' | 'succeeded' | 'failed' | 'refunded' | 'cancelled';
  idempotencyKey: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  linkUrl?: string;
  readAt?: string;
  createdAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  programId?: string;
  message: string;
  consentGivenAt: string;
  status: 'new' | 'in_progress' | 'closed';
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  actorUserId: string;
  actorEmail?: string;
  actorRole: UserRole;
  action: string;
  entityType: string;
  entityId: string;
  details?: string;
  createdAt: string;
}

export interface SiteSettings {
  contactEmail: string;
  contactPhone: string;
  officeLocation: string;
  officeHours: string;
  heroBgImageUrl?: string;
  heroPhotoUrl?: string;
  introPhotoUrl?: string;
  introPhotoCaption?: string;
  aboutStoryPhotoUrl?: string;
  aboutLeadershipPhotoUrl?: string;
  mentorshipBannerPhotoUrl?: string;
  mentorshipCoverUrl?: string;
  studentPortalBannerUrl?: string;
  eventsCoverUrl?: string;
  impactCoverUrl?: string;
  impactBannerPhotoUrl?: string;
  campusPhotoUrl?: string;
  announcementText?: string;
  announcementEnabled?: boolean;
  socials: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
    tiktok?: string;
  };
  intakeActive: boolean;
  paymentProvider: string;
  sisterOrgNote: string;
  onlinePlatformNotice?: string;
}
