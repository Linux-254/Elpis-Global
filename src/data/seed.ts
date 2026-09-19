// Initial Seed Data for Zoe Elpis Global School

import {
  School,
  ProgramLevel,
  Program,
  SchoolEvent,
  Article,
  ImpactStory,
  ImpactIndicator,
  Mentor,
  Faq,
  User,
  Enrolment,
  Assignment,
  LiveSession,
  SiteSettings,
  SchoolResource,
  Certificate
} from '../domain/types';

export const SEED_SCHOOLS: School[] = [
  {
    id: "sch-purpose",
    slug: "purpose",
    name: "School of Purpose and Personal Development",
    navLabel: "Purpose",
    pillar: "purpose",
    academyName: "Purpose Academy",
    focus: "Identity, purpose, vision, mindset, discipline, and personal growth.",
    statement: "Discover who you are. Understand why you exist. Define where you are going.",
    overview: "The School of Purpose and Personal Development helps individuals move from ambiguity to clarity. Through foundational inquiry, self-discovery frameworks, and disciplined vision mapping, learners establish a rock-solid inner foundation for life, leadership, and enterprise.",
    heroImageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop",
    order: 1,
    status: "published",
    programCount: 7
  },
  {
    id: "sch-leadership",
    slug: "leadership",
    name: "School of Leadership and Influence",
    navLabel: "Leadership",
    pillar: "leadership",
    academyName: "Leadership Academy",
    focus: "Leadership, communication, public speaking, influence, and organisational leadership.",
    statement: "Develop the capacity to influence, serve and lead.",
    overview: "The School of Leadership and Influence builds ethical, servant-hearted leaders equipped to steer teams, govern institutions, and communicate compelling visions with clarity and moral authority.",
    heroImageUrl: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=1200&auto=format&fit=crop",
    order: 2,
    status: "published",
    programCount: 9
  },
  {
    id: "sch-business",
    slug: "business",
    name: "School of Business and Entrepreneurship",
    navLabel: "Business",
    pillar: "business",
    academyName: "Business Academy",
    focus: "Entrepreneurship, enterprise development, financial management, marketing, and sustainable value creation.",
    statement: "Turn ideas into value and value into sustainable enterprises.",
    overview: "The School of Business and Entrepreneurship equips founders and practitioners with real-world tools to validate business models, manage cash flow, build resilient operations, and scale viable commercial solutions across East Africa and beyond.",
    heroImageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
    order: 3,
    status: "published",
    programCount: 11
  },
  {
    id: "sch-impact",
    slug: "impact",
    name: "School of Impact and Social Transformation",
    navLabel: "Impact",
    pillar: "impact",
    academyName: "Impact Academy",
    focus: "NGOs, projects, grants, community development, monitoring & evaluation, and social impact.",
    statement: "Use your knowledge, business and leadership to create meaningful change.",
    overview: "The School of Impact and Social Transformation prepares changemakers, non-profit directors, and community leaders with rigorous project planning, grant proposal craftsmanship, and measurable M&E systems.",
    heroImageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop",
    order: 4,
    status: "published",
    programCount: 10
  }
];

export const SEED_LEVELS: ProgramLevel[] = [
  {
    id: "lvl-1",
    slug: "foundation",
    label: "Foundation",
    levelNumber: 1,
    description: "Short courses and foundational programmes for those establishing clarity and basic competencies.",
    audience: "New learners, youth, and practitioners starting a new discipline.",
    order: 1
  },
  {
    id: "lvl-2",
    slug: "professional",
    label: "Professional",
    levelNumber: 2,
    description: "Practical certificate programmes and targeted masterclasses designed for active practitioners.",
    audience: "Working professionals, project managers, and early-stage founders.",
    order: 2
  },
  {
    id: "lvl-3",
    slug: "advanced",
    label: "Advanced",
    levelNumber: 3,
    description: "In-depth leadership and enterprise development frameworks with dedicated mentorship.",
    audience: "Experienced leaders, venture builders, and departmental directors.",
    order: 3
  },
  {
    id: "lvl-4",
    slug: "executive",
    label: "Executive",
    levelNumber: 4,
    description: "High-level strategic training for enterprise owners, institutional leaders, and senior directors.",
    audience: "CEOs, senior executives, and institutional governing boards.",
    order: 4
  },
  {
    id: "lvl-5",
    slug: "fellowship",
    label: "Fellowship",
    levelNumber: 5,
    description: "A selective cohort fellowship for leaders and entrepreneurs implementing live high-impact initiatives.",
    audience: "Practitioners with verified live projects, enterprises, or community initiatives.",
    selective: true,
    order: 5
  }
];

export const SEED_PROGRAMS: Program[] = [
  {
    id: "prog-purpose-discovery",
    slug: "purpose-discovery-program",
    name: "Purpose Discovery Program",
    schoolId: "sch-purpose",
    levelId: "lvl-1",
    levelSlug: "foundation",
    format: "Course",
    deliveryMode: "blended",
    summary: "Discover your identity, clarify personal vision, and design a life of deliberate purpose and discipline.",
    overview: "The Purpose Discovery Program is an intensive 6-week journey that strips away societal distractions to help you uncover your core strengths, clarify long-term personal calling, and craft an executable life blueprint.",
    audience: [
      "Individuals seeking clarity in career and life direction",
      "Recent graduates navigating post-university choices",
      "Mid-career professionals seeking renewed focus"
    ],
    learningOutcomes: [
      "Articulate a clear, written Personal Purpose Statement",
      "Map your core talents, values, and motivational drivers",
      "Construct a 5-year strategic life roadmap with milestones",
      "Establish sustainable daily habits of personal mastery"
    ],
    durationWeeks: 6,
    contactHours: 24,
    language: "English",
    practicalProject: "The Life Blueprint: A comprehensive written personal vision and 5-year execution strategy presented to a mentor.",
    certificateType: "Certificate of Completion in Purpose & Personal Mastery",
    certificateRequirements: "100% attendance of live sessions and successful defense of the Life Blueprint.",
    fees: {
      confirmedAtAdmission: true,
      note: "Tuition is confirmed upon application review. Flexible installment plans available for East African residents."
    },
    featured: true,
    featureRank: 1,
    status: "published",
    publishedAt: "2026-01-10",
    heroImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop",
    modules: [
      {
        id: "mod-1",
        programId: "prog-purpose-discovery",
        title: "Module 1: Foundations of Personal Identity",
        summary: "Deconstruct external pressures and examine self-awareness frameworks.",
        order: 1,
        estimatedHours: 4,
        lessons: [
          { id: "les-1-1", moduleId: "mod-1", title: "Understanding Purpose vs Ambition", durationMinutes: 45, order: 1 },
          { id: "les-1-2", moduleId: "mod-1", title: "The Self-Inventory: Values & Temperaments", durationMinutes: 60, order: 2 }
        ]
      },
      {
        id: "mod-2",
        programId: "prog-purpose-discovery",
        title: "Module 2: Vision Mapping and Life Architecture",
        summary: "Translate inner clarity into actionable strategic horizons.",
        order: 2,
        estimatedHours: 6,
        lessons: [
          { id: "les-2-1", moduleId: "mod-2", title: "Designing the 5-Year Horizon Map", durationMinutes: 50, order: 1 },
          { id: "les-2-2", moduleId: "mod-2", title: "Goal Architecture and Habit Loops", durationMinutes: 55, order: 2 }
        ]
      },
      {
        id: "mod-3",
        programId: "prog-purpose-discovery",
        title: "Module 3: Project Defense & Blueprint Integration",
        summary: "Finalize and defend your personal life blueprint.",
        order: 3,
        estimatedHours: 6,
        lessons: [
          { id: "les-3-1", moduleId: "mod-3", title: "Presenting Your Life Blueprint", durationMinutes: 90, order: 1 }
        ]
      }
    ]
  },
  {
    id: "prog-leadership-influence",
    slug: "leadership-and-influence-academy",
    name: "Leadership and Influence Academy",
    schoolId: "sch-leadership",
    levelId: "lvl-2",
    levelSlug: "professional",
    format: "Masterclass",
    deliveryMode: "blended",
    summary: "Develop authoritative public communication, servant leadership, and the ethical capacity to guide teams through change.",
    overview: "Designed for team leads, community organizers, and emerging executives, this programme builds core competencies in persuasive speaking, team dynamics, conflict resolution, and values-based governance.",
    audience: [
      "Emerging team leads and department managers",
      "Community leaders and non-profit coordinators",
      "Entrepreneurs building their first core team"
    ],
    learningOutcomes: [
      "Master persuasive verbal and written executive communication",
      "Implement servant leadership models in organizational culture",
      "Lead high-stakes team decision-making and crisis management",
      "Build organizational trust through transparency and accountability"
    ],
    durationWeeks: 8,
    contactHours: 36,
    language: "English",
    practicalProject: "The Leadership Case Defense: Diagnosis and resolution of a live organizational conflict or strategy shift.",
    certificateType: "Professional Certificate in Leadership & Influence",
    fees: {
      confirmedAtAdmission: true,
      note: "Fees are confirmed upon admission. Institutional sponsorship discounts apply."
    },
    featured: true,
    featureRank: 2,
    status: "published",
    publishedAt: "2026-01-15",
    heroImageUrl: "https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=1000&auto=format&fit=crop",
    modules: [
      {
        id: "mod-l1",
        programId: "prog-leadership-influence",
        title: "Module 1: Ethical Leadership & Character",
        summary: "Principles of moral authority and servant leadership.",
        order: 1,
        estimatedHours: 6,
        lessons: [
          { id: "les-l1", moduleId: "mod-l1", title: "Character Under Pressure", durationMinutes: 60, order: 1 },
          { id: "les-l2", moduleId: "mod-l1", title: "The Servant Leadership Matrix", durationMinutes: 60, order: 2 }
        ]
      },
      {
        id: "mod-l2",
        programId: "prog-leadership-influence",
        title: "Module 2: High-Stakes Communication & Public Speaking",
        summary: "Structuring and delivering persuasive institutional messages.",
        order: 2,
        estimatedHours: 8,
        lessons: [
          { id: "les-l3", moduleId: "mod-l2", title: "Speech Architecture for Leaders", durationMinutes: 75, order: 1 },
          { id: "les-l4", moduleId: "mod-l2", title: "Navigating Hostile Q&A", durationMinutes: 60, order: 2 }
        ]
      }
    ]
  },
  {
    id: "prog-idea-enterprise",
    slug: "from-idea-to-enterprise",
    name: "From Idea to Enterprise",
    schoolId: "sch-business",
    levelId: "lvl-2",
    levelSlug: "professional",
    format: "Bootcamp",
    deliveryMode: "blended",
    summary: "Transform raw ideas into validated commercial models with robust financial systems, customer acquisition, and unit economics.",
    overview: "An intensive enterprise launchpad designed for founders in East Africa. Move from napkin sketches to validated customer demand, unit economics, pricing architecture, and resilient cash flow management.",
    audience: [
      "Early-stage founders with an unlaunched business concept",
      "Small business owners seeking to formalize operations",
      "Social innovators building revenue-generating projects"
    ],
    learningOutcomes: [
      "Validate product-market fit using lean testing in local markets",
      "Build a workable 12-month cash flow and unit economics model",
      "Design an authentic branding and direct sales conversion funnel",
      "Pitch effectively to seed investors and commercial partners"
    ],
    durationWeeks: 10,
    contactHours: 45,
    language: "English",
    practicalProject: "The Live Venture Prototype: Launch a validated offer, secure minimum 3 paying customers or formal letters of intent, and deliver an investor deck.",
    certificateType: "Certificate in Enterprise Development & Venture Building",
    fees: {
      confirmedAtAdmission: true,
      note: "Confirmed upon admission. Includes access to mentor matching and pitch review."
    },
    featured: true,
    featureRank: 3,
    status: "published",
    publishedAt: "2026-02-01",
    heroImageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop",
    modules: [
      {
        id: "mod-b1",
        programId: "prog-idea-enterprise",
        title: "Module 1: Market Validation & Value Proposition",
        summary: "Customer discovery, pricing tests, and competitive positioning.",
        order: 1,
        estimatedHours: 8,
        lessons: [
          { id: "les-b1", moduleId: "mod-b1", title: "Customer Problem Discovery", durationMinutes: 60, order: 1 },
          { id: "les-b2", moduleId: "mod-b1", title: "Unit Economics & Price Setting", durationMinutes: 75, order: 2 }
        ]
      },
      {
        id: "mod-b2",
        programId: "prog-idea-enterprise",
        title: "Module 2: Financial Governance & Sales Engines",
        summary: "Cash flow hygiene, working capital, and repeatable sales loops.",
        order: 2,
        estimatedHours: 10,
        lessons: [
          { id: "les-b3", moduleId: "mod-b2", title: "Managing Working Capital", durationMinutes: 80, order: 1 },
          { id: "les-b4", moduleId: "mod-b2", title: "The 4-Step Sales Cadence", durationMinutes: 70, order: 2 }
        ]
      }
    ]
  },
  {
    id: "prog-ngo-project-management",
    slug: "ngo-and-project-management-academy",
    name: "NGO and Project Management Academy",
    schoolId: "sch-impact",
    levelId: "lvl-2",
    levelSlug: "professional",
    format: "Course",
    deliveryMode: "online",
    summary: "Master proposal writing, institutional grant fundraising, monitoring & evaluation, and field execution.",
    overview: "A rigorous professional course for development practitioners, NGO staff, and CBO coordinators seeking to write winning grant applications and manage complex community projects with ironclad accountability.",
    audience: [
      "NGO & CBO staff, project coordinators, and field officers",
      "Social entrepreneurs seeking institutional grant funding",
      "Development practitioners seeking certified M&E competencies"
    ],
    learningOutcomes: [
      "Author compliant grant proposals for international donors",
      "Construct robust LogFrames, Theory of Change, and indicator matrices",
      "Implement project budget tracking and compliance controls",
      "Conduct baseline surveys and impact evaluations with integrity"
    ],
    durationWeeks: 8,
    contactHours: 32,
    language: "English",
    practicalProject: "Full Grant Application: A complete donor-ready project proposal with budget and M&E framework.",
    certificateType: "Professional Certificate in NGO & Development Project Management",
    fees: {
      confirmedAtAdmission: true,
      note: "Confirmed at admission. Group rates available for NGO teams."
    },
    featured: true,
    featureRank: 4,
    status: "published",
    publishedAt: "2026-02-10",
    heroImageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1000&auto=format&fit=crop",
    modules: [
      {
        id: "mod-i1",
        programId: "prog-ngo-project-management",
        title: "Module 1: Theory of Change & Proposal Architecture",
        summary: "Structuring impact logic and problem statements.",
        order: 1,
        estimatedHours: 8,
        lessons: [
          { id: "les-i1", moduleId: "mod-i1", title: "Problem Tree to Theory of Change", durationMinutes: 60, order: 1 },
          { id: "les-i2", moduleId: "mod-i1", title: "Drafting the Technical Narrative", durationMinutes: 75, order: 2 }
        ]
      },
      {
        id: "mod-i2",
        programId: "prog-ngo-project-management",
        title: "Module 2: Monitoring, Evaluation & Financial Reporting",
        summary: "Indicator tracking, data verification, and donor reporting.",
        order: 2,
        estimatedHours: 8,
        lessons: [
          { id: "les-i3", moduleId: "mod-i2", title: "Building the M&E Indicator Matrix", durationMinutes: 70, order: 1 },
          { id: "les-i4", moduleId: "mod-i2", title: "Budget Formulation & Variance Tracking", durationMinutes: 65, order: 2 }
        ]
      }
    ]
  },
  {
    id: "prog-impact-leaders-fellowship",
    slug: "impact-leaders-fellowship",
    name: "Impact Leaders Fellowship",
    schoolId: "sch-impact",
    levelId: "lvl-5",
    levelSlug: "fellowship",
    format: "Fellowship",
    deliveryMode: "blended",
    summary: "A highly selective executive fellowship for leaders spearheading transformative social initiatives and community enterprises.",
    overview: "The Impact Leaders Fellowship is ZEGS's flagship cohort for proven practitioners. Over 16 weeks, fellows receive bespoke executive coaching, high-level governance masterclasses, peer critique, and investor/donor showcase access.",
    audience: [
      "Founders and executives with minimum 2 years live project track record",
      "Community leaders scaling measurable regional initiatives"
    ],
    learningOutcomes: [
      "Scale project impact by 3x through institutional partnerships",
      "Formulate long-term organizational governance and succession plans",
      "Access regional leadership networks and philanthropic capital"
    ],
    durationWeeks: 16,
    contactHours: 60,
    language: "English",
    practicalProject: "Institutional Scale Blueprint & Sovereign Impact Defense.",
    certificateType: "Distinguished Fellowship Award in Social Transformation",
    fees: {
      confirmedAtAdmission: true,
      note: "Selective cohort. Partial fellowships and partner grants available."
    },
    featured: true,
    featureRank: 5,
    status: "published",
    publishedAt: "2026-02-15",
    heroImageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "prog-business-wealth-masterclass",
    slug: "business-and-wealth-masterclass",
    name: "Business and Wealth Masterclass",
    schoolId: "sch-business",
    levelId: "lvl-3",
    levelSlug: "advanced",
    format: "Masterclass",
    deliveryMode: "online",
    summary: "Advanced practical entrepreneurship, capital allocation, asset stewardship, and intergenerational enterprise building.",
    overview: "For established entrepreneurs and senior professionals seeking to navigate inflation, reinvest retained earnings wisely, and build resilient corporate structures.",
    audience: [
      "Business owners with over $20k annual revenue",
      "Senior corporate leaders managing personal investment portfolios"
    ],
    learningOutcomes: [
      "Evaluate capital allocation strategies in East African emerging markets",
      "Structure business holdings to mitigate tax and succession risks",
      "Construct diverse enterprise cash reserves and wealth buffers"
    ],
    durationWeeks: 4,
    contactHours: 20,
    language: "English",
    practicalProject: "The Corporate Treasury & Asset Allocation Strategy.",
    certificateType: "Executive Masterclass Certificate in Enterprise Stewardship",
    fees: {
      confirmedAtAdmission: true,
      note: "Confirmed upon admission."
    },
    featured: true,
    featureRank: 6,
    status: "published",
    publishedAt: "2026-02-20",
    heroImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop"
  }
];

export const SEED_EVENTS: SchoolEvent[] = [
  {
    id: "evt-1",
    slug: "masterclass-enterprise-pricing-2026",
    title: "Masterclass: Enterprise Pricing & Working Capital in Volatile Markets",
    summary: "A 3-hour practical session on protecting profit margins and cash flow during economic shifts.",
    description: "Join seasoned East African venture builders to dissect practical pricing frameworks, inflation adjustments, and vendor payment terms that preserve business survival.",
    category: "Masterclass",
    schoolId: "sch-business",
    deliveryMode: "online",
    startsAt: "2026-10-15T15:00:00Z",
    endsAt: "2026-10-15T18:00:00Z",
    timezone: "Africa/Kampala (EAT)",
    joinUrl: "https://meet.google.com/zegs-masterclass-sample",
    speakerNames: ["Faculty Panel on Enterprise Finance"],
    capacity: 100,
    registeredCount: 42,
    registrationStatus: "open",
    waitlistEnabled: true,
    status: "published",
    heroImageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "evt-2",
    slug: "workshop-grant-proposal-writing-kampala",
    title: "Hands-On Workshop: Drafting Winning Donor Proposals",
    summary: "A practical workshop dissecting USAID, EU, and foundation grant formats with line-by-line feedback.",
    description: "Bring your live draft proposal and work with M&E specialists to sharpen your Problem Statement, Theory of Change, and Budget narratives.",
    category: "Workshop",
    schoolId: "sch-impact",
    deliveryMode: "blended",
    startsAt: "2026-11-05T09:00:00Z",
    endsAt: "2026-11-05T17:00:00Z",
    timezone: "Africa/Kampala (EAT)",
    locationName: "Zoe Elpis Regional Learning Hub / Zoom",
    speakerNames: ["Dr. Sarah Namubiru", "Lead Development Consultant"],
    capacity: 40,
    registeredCount: 28,
    registrationStatus: "closing_soon",
    waitlistEnabled: true,
    status: "published",
    heroImageUrl: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=800&auto=format&fit=crop"
  }
];

export const SEED_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "the-architecture-of-purpose-in-leadership",
    title: "The Architecture of Purpose in Times of Institutional Ambiguity",
    standfirst: "Why clarity of calling is not a luxury, but the primary prerequisite for resilient organizational leadership.",
    category: "Purpose",
    schoolId: "sch-purpose",
    authorName: "Academic Dean",
    authorRole: "School of Purpose & Personal Development",
    bodyContent: "In an era characterized by rapid socioeconomic volatility, leaders frequently mistake tactical velocity for strategic direction. Purpose is not an emotional feeling; it is an architectural commitment to why your organization exists and what non-negotiables govern your decisions.",
    pullQuote: "Without purpose, activity is mistaken for progress, and short-term survival eclipses long-term generational value.",
    pullQuoteAttribution: "ZEGS Academic Perspective on Purpose",
    readMinutes: 6,
    status: "published",
    publishedAt: "2026-08-12",
    heroImageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "art-2",
    slug: "building-cash-resilient-enterprises-east-africa",
    title: "Building Cash-Resilient Enterprises in East Africa: Lessons from the Field",
    standfirst: "Key insights on inventory velocity, working capital management, and pricing discipline for growing SMEs.",
    category: "Business",
    schoolId: "sch-business",
    authorName: "Enterprise Research Lead",
    authorRole: "School of Business & Entrepreneurship",
    bodyContent: "The single greatest risk to viable small enterprises is not lack of customer interest, but unmanaged receivables and working capital exhaustion. By introducing structured 14-day cash-flow forecasts and separating owner compensation from company treasury, founders stabilize operations.",
    pullQuote: "Revenue is a vanity metric; cash flow is sanity; disciplined unit margins are reality.",
    readMinutes: 5,
    status: "published",
    publishedAt: "2026-08-25",
    heroImageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
  }
];

export const SEED_IMPACT_INDICATORS: ImpactIndicator[] = [
  {
    id: "ind-1",
    label: "Practical Enterprise & Project Prototypes Defended",
    value: "100%",
    unit: "of graduating learners",
    period: "2025 - 2026 Cohort Assessments",
    method: "Formal faculty evaluation of submitted business plans, life blueprints, or grant frameworks",
    sourceNote: "Academic Registry Verification Records",
    status: "published"
  },
  {
    id: "ind-2",
    label: "Direct Community & Venture Projects Launched",
    value: "4 Dedicated Schools",
    unit: "active disciplines",
    period: "Current Academic Year",
    method: "Curriculum matrix active delivery across Purpose, Leadership, Business, and Impact",
    sourceNote: "Curriculum Board Directorate",
    status: "published"
  }
];

export const SEED_IMPACT_STORIES: ImpactStory[] = [
  {
    id: "imp-1",
    slug: "empowering-community-agribusiness-uganda",
    subjectName: "Grace Akello",
    subjectRole: "Founder, Rural Agribusiness Initiative",
    programName: "From Idea to Enterprise",
    narrative: "Grace joined the enterprise bootcamp with a small poultry cooperative idea. Through our unit economics module and cash flow coaching, she formalized supply agreements with 15 local farmers, reducing feed costs and securing steady supermarket purchase orders.",
    outcomeDescription: "Built a sustainable agricultural cooperative generating predictable revenue and supporting 15 local farming families.",
    consentGiven: true,
    status: "published",
    publishedAt: "2026-07-10",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  }
];

export const SEED_MENTORS: Mentor[] = [
  {
    id: "mnt-1",
    fullName: "Emmanuel Ochieng",
    role: "Senior Enterprise Strategy Consultant",
    organisation: "East African Enterprise Advisory",
    biography: "14+ years guiding small-to-medium enterprises in Uganda and Kenya through commercialization, governance formalization, and debt structuring.",
    expertise: ["Business Planning", "Financial Modeling", "Corporate Governance"],
    languages: ["English", "Swahili", "Luganda"],
    mentoringFormat: ["1-on-1 Sessions", "Project Review"],
    availability: "open",
    consentGiven: true,
    status: "published",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    linkedinUrl: "https://www.linkedin.com/in/emmanuel-ochieng-advisory",
    websiteUrl: "https://ochiengadvisory.africa",
    socialLinks: [
      {
        id: "lnk-1",
        title: "Cash-Flow Diagnostics: Why 70% of Seed Ventures Fail in Year Two",
        url: "https://www.linkedin.com/pulse/cash-flow-diagnostics-east-africa-emmanuel-ochieng",
        type: "linkedin_article"
      },
      {
        id: "lnk-2",
        title: "Corporate Governance & Board Playbook for African Founders",
        url: "https://ochiengadvisory.africa/publications/governance-playbook",
        type: "website"
      }
    ]
  },
  {
    id: "mnt-2",
    fullName: "Dr. Florence Wanjiku",
    role: "Monitoring & Impact Specialist",
    organisation: "Global Development Partners",
    biography: "Development economist specializing in Theory of Change design, institutional donor compliance, and community health interventions.",
    expertise: ["Proposal Writing", "M&E Systems", "Grant Compliance"],
    languages: ["English", "Swahili"],
    mentoringFormat: ["Proposal Critique", "Cohort Advisory"],
    availability: "limited",
    consentGiven: true,
    status: "published",
    photoUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
    linkedinUrl: "https://www.linkedin.com/in/dr-florence-wanjiku-impact",
    websiteUrl: "https://florencewanjiku.org",
    socialLinks: [
      {
        id: "lnk-3",
        title: "Designing Robust Theories of Change in Community Health Programs",
        url: "https://www.linkedin.com/pulse/theory-of-change-design-florence-wanjiku",
        type: "linkedin_article"
      },
      {
        id: "lnk-4",
        title: "Impact Measurement & Evidence-Based Reporting Frameworks",
        url: "https://florencewanjiku.org/research",
        type: "website"
      }
    ]
  }
];

export const SEED_FAQS: Faq[] = [
  {
    id: "faq-1",
    question: "How are Zoe Elpis Global School programmes delivered?",
    answer: "Our programmes are delivered online-first (via live interactive Zoom/Meet classes, WhatsApp cohort groups, and digital portal modules) alongside scheduled physical masterclasses and blended hybrid cohorts in East Africa.",
    scope: "global",
    order: 1,
    status: "published"
  },
  {
    id: "faq-2",
    question: "How do I apply, and what are the admission criteria?",
    answer: "You can apply directly online through our 7-step Application Wizard at /apply. We evaluate your commitment, learning goals, prior experience, and intended practical project.",
    scope: "admissions",
    order: 2,
    status: "published"
  },
  {
    id: "faq-3",
    question: "How are programme fees determined and paid?",
    answer: "Fees are confirmed upon application acceptance. We provide flexible installment arrangements for regional learners, and payments are handled securely through verified payment options.",
    scope: "admissions",
    order: 3,
    status: "published"
  },
  {
    id: "faq-4",
    question: "What makes the ZEGS teaching model unique?",
    answer: "Our model is built on Learn, Apply, Build, Impact. Every student must design and defend a real project, business prototype, or community intervention rather than merely completing theoretical tests.",
    scope: "global",
    order: 4,
    status: "published"
  }
];

export const SEED_SETTINGS: SiteSettings = {
  contactEmail: "admissions@zegs.ac.ug",
  contactPhone: "+256 700 892 411 / +254 712 345 678",
  officeLocation: "Global Digital Campus (Regional Hubs: Kampala, Uganda & Nairobi, Kenya)",
  officeHours: "Monday - Friday: 8:00 AM - 6:00 PM EAT (Online Support 24/7)",
  heroBgImageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1600&auto=format&fit=crop",
  heroPhotoUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop",
  introPhotoUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
  introPhotoCaption: "Cohort 2025 Fellows collaborating during an executive strategy session.",
  aboutStoryPhotoUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  aboutLeadershipPhotoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
  mentorshipBannerPhotoUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  mentorshipCoverUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  studentPortalBannerUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop",
  eventsCoverUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop",
  impactCoverUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop",
  impactBannerPhotoUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1200&auto=format&fit=crop",
  campusPhotoUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
  announcementText: "✨ Applications now open for the Upcoming 2026 Online Cohort. Flexible tuition payment plans available.",
  announcementEnabled: true,
  socials: {
    linkedin: "https://linkedin.com/school/zoe-elpis-global-school",
    twitter: "https://twitter.com/zoeelpis",
    youtube: "https://youtube.com/@zoeelpisglobalschool",
    facebook: "https://facebook.com/zoeelpisglobalschool",
    instagram: "https://instagram.com/zoeelpisglobalschool",
    whatsapp: "https://wa.me/256700892411",
    tiktok: "https://tiktok.com/@zoeelpis"
  },
  intakeActive: true,
  paymentProvider: "M-Pesa / MTN MoMo / Airtel Money / Direct Bank Wire / Visa",
  sisterOrgNote: "AgapeElpis Teen Moms Support Center Uganda (Sister Community Empowerment Initiative)",
  onlinePlatformNotice: "100% Online Global Academy with live interactive masterclasses, peer forums, faculty office hours, and lifelong cohort alumni networks."
};

export const SEED_USERS: User[] = [
  {
    id: "usr-admin-1",
    email: "admin@zegs.ac.ug",
    fullName: "ZEGS Academic Administrator",
    role: "admin",
    status: "active",
    timezone: "Africa/Kampala",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "usr-student-1",
    email: "student@zegs.ac.ug",
    fullName: "David Mukasa",
    phone: "+256 772 123456",
    country: "Uganda",
    city: "Kampala",
    role: "student",
    status: "active",
    timezone: "Africa/Kampala",
    createdAt: "2026-02-01T00:00:00Z",
    updatedAt: "2026-02-01T00:00:00Z"
  }
];

export const SEED_ENROLMENTS: Enrolment[] = [
  {
    id: "enr-1",
    userId: "usr-student-1",
    programId: "prog-purpose-discovery",
    status: "active",
    startedAt: "2026-08-01",
    progressPercent: 65,
    currentModuleIndex: 1,
    completedLessons: ["les-1-1", "les-1-2", "les-2-1"]
  }
];

export const SEED_ASSIGNMENTS: Assignment[] = [
  {
    id: "asg-1",
    programId: "prog-purpose-discovery",
    moduleId: "mod-1",
    title: "Assignment 1: Personal Strengths & Values Matrix",
    brief: "Complete the 2-page reflection matrix detailing your top 5 core values and how they influence your decision-making under stress.",
    submissionTypes: ["text", "file"],
    dueAt: "2026-10-20T23:59:59Z",
    allowsResubmission: true,
    maxFiles: 2,
    maxFileMb: 10
  }
];

export const SEED_SESSIONS: LiveSession[] = [
  {
    id: "sess-1",
    programId: "prog-purpose-discovery",
    title: "Cohort Live Session: Vision Alignment & Q&A",
    startsAt: "2026-10-18T16:00:00Z",
    endsAt: "2026-10-18T18:00:00Z",
    timezone: "Africa/Kampala (EAT)",
    platform: "Google Meet",
    joinUrl: "https://meet.google.com/zegs-live-class",
    facilitatorName: "Academic Dean"
  }
];

export const SEED_RESOURCES: SchoolResource[] = [
  {
    id: "res-1",
    title: "ZEGS Life Blueprint Framework & Template (PDF)",
    type: "Guidebook",
    fileUrl: "/resources/life-blueprint-framework.pdf",
    programId: "prog-purpose-discovery",
    programName: "Purpose Discovery Program",
    visibility: "enrolled",
    sizeBytes: 1024 * 1024 * 2.4, // 2.4 MB
    createdAt: "2026-08-01"
  },
  {
    id: "res-2",
    title: "SME Working Capital Spreadsheet Model (XLSX)",
    type: "Financial Model",
    fileUrl: "/resources/working-capital-template.xlsx",
    programId: "prog-idea-enterprise",
    programName: "From Idea to Enterprise",
    visibility: "enrolled",
    sizeBytes: 1024 * 512, // 512 KB
    createdAt: "2026-08-15"
  }
];

export const SEED_CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    code: "ZEGS-2026-883921",
    enrolmentId: "enr-past",
    userId: "usr-student-1",
    programId: "prog-purpose-discovery",
    programName: "Purpose Discovery Program",
    holderName: "David Mukasa",
    issuedAt: "2026-07-28"
  }
];
