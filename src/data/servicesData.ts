/**
 * AGNEX Technology — Verified Services Data
 * Grounded in engineering rigor, verifiable systems, and actual technologies.
 */

export interface ServiceProblem {
  title: string;
  description: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
  impact: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailItem {
  slug: string;
  number: string;
  discipline: 'DIGITAL' | 'SYSTEMS' | 'INTELLIGENCE' | 'ENGINEERING';
  title: string;
  headline: string;
  description: string;
  overview: string;
  problemsSolved: ServiceProblem[];
  features: ServiceFeature[];
  benefits: ServiceBenefit[];
  useCases: ServiceUseCase[];
  technologies: {
    category: string;
    items: string[];
  }[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: ServiceFaq[];
}

export const servicesData: Record<string, ServiceDetailItem> = {
  'web-development': {
    slug: 'web-development',
    number: '01',
    discipline: 'DIGITAL',
    title: 'Web Application Development',
    headline: 'High-Performance Web Applications, Corporate Portals & SaaS Platforms',
    description: 'We engineer responsive, sub-second web applications, corporate digital headquarters, and multi-tenant SaaS products designed for high conversion, rigorous SEO, and long-term architectural stability.',
    overview: 'Modern web platforms must do more than display static text. They are dynamic software engines that orchestrate authentication, real-time data synchronization, distributed asset delivery, and mission-critical transactions. AGNEX builds web platforms utilizing modern React and Next.js architectures, avoiding bloated WordPress plugins or generic templates.',
    problemsSolved: [
      {
        title: 'Bloated, Slow Legacy CMS Sites',
        description: 'WordPress and legacy CMS platforms suffering from 4+ second load times, plugin vulnerability rot, and poor search engine crawl efficiency.'
      },
      {
        title: 'Fragile Client-Side Renders',
        description: 'Single-page applications that fail Core Web Vitals, suffer from Cumulative Layout Shifts (CLS), or hide indexable content from search engine and AI crawlers.'
      },
      {
        title: 'Inflexible SaaS Product Architectures',
        description: 'Web applications that cannot support multi-tenancy, custom role permissions (RBAC), or secure third-party API webhook ingestion.'
      }
    ],
    features: [
      {
        title: 'Server-Side Rendering & Edge Delivery',
        description: 'Optimized hybrid SSR/SSG caching pipelines utilizing Vercel and Cloudflare edge networks for global sub-100ms time to first byte.'
      },
      {
        title: 'Type-Safe Modular Architecture',
        description: 'End-to-end TypeScript codebases with strict compile-time validation across component props, data fetching, and backend contracts.'
      },
      {
        title: 'State & Cache Management',
        description: 'Resilient client state architecture with TanStack Query and Zustand ensuring zero redundant network waterfalls and instant optimistic updates.'
      },
      {
        title: 'Comprehensive SEO & Schema JSON-LD',
        description: 'Full semantic HTML5 structure, automated XML sitemaps, OpenGraph protocols, and deep Schema.org structured data for traditional and AI search engines.'
      }
    ],
    benefits: [
      {
        title: 'Sub-Second Page Transitions',
        description: 'Eradicate bounce rates with ultra-fast page speeds passing all Core Web Vitals (LCP < 1.5s, INP < 100ms, CLS < 0.02).'
      },
      {
        title: 'Lower Maintenance Overhead',
        description: 'Modular component design systems prevent regression bugs and allow rapid shipping of new product features.'
      },
      {
        title: 'Maximized Organic Discovery',
        description: 'Flawless semantic hierarchy and metadata ensure superior indexing across Google, Perplexity, and AI search engines.'
      }
    ],
    useCases: [
      {
        title: 'Enterprise Corporate Platforms',
        description: 'High-authority digital flagships for technology firms, logistics groups, and professional service institutions requiring brand prestige.',
        impact: 'Elevated client credibility and zero downtime during traffic spikes.'
      },
      {
        title: 'B2B Customer & Partner Portals',
        description: 'Authenticated customer areas for document sharing, order tracking, invoice settlement, and real-time support.',
        impact: 'Eliminates repetitive email coordination and streamlines operations.'
      },
      {
        title: 'Multi-Tenant SaaS Frontends',
        description: 'Scalable subscription platforms with isolated team workspaces, Stripe billing flows, and tiered feature toggles.',
        impact: 'Accelerated time-to-market for digital software founders.'
      }
    ],
    technologies: [
      { category: 'Frontend Frameworks', items: ['React 18/19', 'Next.js App Router', 'Vite', 'TypeScript'] },
      { category: 'Styling & UI Systems', items: ['Tailwind CSS', 'CSS Modules', 'Framer Motion', 'Radix UI Primitives'] },
      { category: 'Data & Networking', items: ['TanStack Query', 'Axios', 'REST APIs', 'GraphQL', 'WebSockets'] },
      { category: 'Testing & Infrastructure', items: ['Vitest', 'Playwright', 'Vercel', 'Cloudflare Edge CDN'] }
    ],
    process: [
      { step: '01', title: 'Information Architecture', description: 'User flow mapping, sitemap planning, and core entity schema definitions.' },
      { step: '02', title: 'Design System Engineering', description: 'Component design tokens, responsive typography grids, and interactive prototypes.' },
      { step: '03', title: 'Full-Stack Implementation', description: 'Clean component development, state wiring, API integration, and edge caching.' },
      { step: '04', title: 'Lighthouse & Core Web Vitals Pass', description: 'Rigorous performance auditing, accessibility testing, and responsive device QA.' },
      { step: '05', title: 'Production Deployment & Monitoring', description: 'Automated CI/CD release, SSL provisioning, and real-user telemetry logging.' }
    ],
    faqs: [
      {
        question: 'Do you use pre-made WordPress or Webflow templates?',
        answer: 'No. We engineer completely custom web applications using modern React and TypeScript architectures. This guarantees complete intellectual property ownership, zero vendor lock-in, and benchmark performance.'
      },
      {
        question: 'How do you ensure the web application is fast on mobile devices?',
        answer: 'We design mobile-first with responsive breakpoints (320px to 1920px+), optimize image delivery with modern WebP/AVIF formats, split code bundles per route, and eliminate render-blocking third-party scripts.'
      },
      {
        question: 'Can you integrate our existing backend or headless CMS?',
        answer: 'Yes. We frequently connect Next.js and React frontends to custom REST APIs, GraphQL services, headless CMSs (Strapi, Sanity), or Postgres databases.'
      }
    ]
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    number: '02',
    discipline: 'DIGITAL',
    title: 'Mobile Application Engineering',
    headline: 'Native & Cross-Platform iOS & Android Applications Built for Scale',
    description: 'We design and develop high-performance mobile applications that deliver smooth 60fps animations, robust offline synchronization, and deterministic hardware integration (BLE, NFC, camera, biometric auth).',
    overview: 'Mobile applications require meticulous attention to memory management, background battery consumption, intermittent network connectivity, and operating system human interface guidelines. AGNEX engineers cross-platform mobile solutions using React Native and TypeScript, delivering near-native performance while maintaining a single, unified codebase.',
    problemsSolved: [
      {
        title: 'Duplicated Engineering Overhead',
        description: 'Building separate Swift and Kotlin codebases doubles engineering costs, slows feature synchronization, and multiplies bug vectors.'
      },
      {
        title: 'Offline Failures & Data Conflicts',
        description: 'Apps that crash or display blank screens when users lose cellular signal in warehouses, in transit, or in field operations.'
      },
      {
        title: 'Sluggish UI & Memory Leaks',
        description: 'Laggy list scrolling, delayed touch responses, and excessive background resource usage that leads to App Store uninstalls.'
      }
    ],
    features: [
      {
        title: 'Cross-Platform React Native Architecture',
        description: 'Single type-safe codebase powering both iOS and Android with native platform bridges for camera, biometric auth, and GPS.'
      },
      {
        title: 'Offline-First SQLite Synchronization',
        description: 'Local persistent storage with WatermelonDB/SQLite and background queue reconciliation when connectivity is restored.'
      },
      {
        title: 'Hardware & Sensor Telemetry',
        description: 'Direct integration with geolocation tracking, Bluetooth peripherals, push notification daemons, and biometric keychains.'
      },
      {
        title: 'Automated Fastlane Deployment CI/CD',
        description: 'Continuous integration pipelines automatically compiling signed release builds for TestFlight and Google Play Internal tracks.'
      }
    ],
    benefits: [
      {
        title: '50% Faster Feature Delivery',
        description: 'Deploy updates simultaneously across Apple App Store and Google Play without maintaining divergent code repositories.'
      },
      {
        title: 'Uncompromised Field Reliability',
        description: 'Field operators and logistics drivers can record data offline with automatic delta-syncing upon reconnection.'
      },
      {
        title: 'App Store Compliance Guaranteed',
        description: 'Built strictly according to Apple Human Interface Guidelines and Google Material Design specifications.'
      }
    ],
    useCases: [
      {
        title: 'Logistics Driver & Dispatch Applications',
        description: 'Real-time vehicle tracking, route manifests, radial driver matching, and digital proof-of-delivery signatures.',
        impact: 'As demonstrated in our RDA Freight Platform architecture.'
      },
      {
        title: 'Field Service & Inspection Tools',
        description: 'Offline-capable checklists, photo capture with watermarks, equipment barcode scanning, and instant PDF report generation.',
        impact: 'Eliminates paper logs and accelerates compliance sign-offs.'
      },
      {
        title: 'Consumer SaaS Mobile Companions',
        description: 'Push-notification-driven client engagement platforms with biometrics, in-app purchases, and live messaging.',
        impact: 'Higher daily active retention and user engagement.'
      }
    ],
    technologies: [
      { category: 'Mobile Frameworks', items: ['React Native', 'Expo Application Services', 'TypeScript'] },
      { category: 'Local Database & Sync', items: ['SQLite', 'WatermelonDB', 'MMKV Storage', 'TanStack Query'] },
      { category: 'Native Integrations', items: ['Apple APNs', 'Firebase Cloud Messaging (FCM)', 'Geolocation API', 'Biometrics (FaceID/Fingerprint)'] },
      { category: 'Build & Release', items: ['Fastlane', 'GitHub Actions', 'TestFlight', 'Google Play Console'] }
    ],
    process: [
      { step: '01', title: 'Platform & Device Strategy', description: 'Mapping target iOS/Android versions, hardware sensor requirements, and offline workflows.' },
      { step: '02', title: 'Touch-Optimized UX Architecture', description: 'Designing thumb-zone navigation, haptic feedback triggers, and responsive layout scaling.' },
      { step: '03', title: 'Native Bridge Implementation', description: 'Developing core mobile business logic, background sync workers, and hardware sensor listeners.' },
      { step: '04', title: 'Device Lab Testing & Profiling', description: 'Testing across physical iOS and Android devices for frame drops, memory spikes, and battery consumption.' },
      { step: '05', title: 'Store Submission & OTA Updates', description: 'Managing App Store review guidelines, metadata submissions, and over-the-air hotfix channels.' }
    ],
    faqs: [
      {
        question: 'Is React Native as fast as native Swift or Kotlin?',
        answer: 'With the modern React Native New Architecture (Fabric renderer and TurboModules), JavaScript communicates directly with native C++ components without JSON bridge serialization. It delivers genuine 60fps performance for enterprise applications.'
      },
      {
        question: 'Do you handle the App Store and Google Play submission process?',
        answer: 'Yes. We manage certificates, provisioning profiles, privacy nutrition labels, store review guidelines, and staging TestFlight builds from start to finish.'
      },
      {
        question: 'Can the app work completely offline?',
        answer: 'Yes. We engineer offline-first architectures that persist data locally to SQLite/MMKV and queue mutations for automated background sync once network connection returns.'
      }
    ]
  },

  'custom-software': {
    slug: 'custom-software',
    number: '03',
    discipline: 'SYSTEMS',
    title: 'Custom Software & Internal Tools',
    headline: 'Tailored Business Engines, Custom Portals & Mission-Critical Systems',
    description: 'We engineer bespoke software platforms designed precisely around your proprietary business workflows, eliminating spreadsheet chaos and replacing rigid commercial off-the-shelf software.',
    overview: 'Generic software forces companies to distort their business operations to fit third-party templates. AGNEX builds custom enterprise applications with fine-grained relational data models, role-based security, automated workflows, and high-performance APIs tailored specifically to your unique competitive advantages.',
    problemsSolved: [
      {
        title: 'Spreadsheet & Fragmented Data Hell',
        description: 'Critical business data trapped across hundreds of disconnected Excel files with zero version control, concurrent edit locks, or audit history.'
      },
      {
        title: 'Rigid Off-the-Shelf Software Constraints',
        description: 'Paying exorbitant per-seat licensing fees for enterprise software that only solves 40% of your workflow and cannot be customized.'
      },
      {
        title: 'Lack of Relational Auditability',
        description: 'Inability to track who modified transactions, changed inventory counts, or approved customer credit limits.'
      }
    ],
    features: [
      {
        title: 'Bespoke Relational Data Architecture',
        description: 'PostgreSQL schemas engineered with strict foreign key constraints, ACID compliance, and zero data duplication.'
      },
      {
        title: 'Granular Role-Based Access Control (RBAC)',
        description: 'Hierarchical permission boundaries ensuring administrators, managers, and operators only see data authorized for their security tier.'
      },
      {
        title: 'High-Throughput Internal APIs',
        description: 'REST and gRPC microservices with parameter sanitization, rate limiting, and structured logging.'
      },
      {
        title: 'Immutable Audit Logging',
        description: 'Automated chronological event ledger recording every data alteration, user identity, IP address, and timestamp for compliance.'
      }
    ],
    benefits: [
      {
        title: 'Eliminate Per-Seat SaaS Taxes',
        description: 'You own the software completely. Add unlimited internal users, operators, and locations without paying rising recurring monthly fees.'
      },
      {
        title: '100% Operational Alignment',
        description: 'The software mirrors your exact operational checklist rather than forcing your team to change how they deliver value.'
      },
      {
        title: 'Proprietary Enterprise Asset',
        description: 'Custom software becomes a valuable, proprietary intellectual property asset that increases company enterprise valuation.'
      }
    ],
    useCases: [
      {
        title: 'Operational Dispatch & Fulfillment Platforms',
        description: 'Centralized command consoles for scheduling, equipment tracking, order assignment, and real-time status updates.',
        impact: 'Reduces operational overhead by over 60%.'
      },
      {
        title: 'Custom Quote-to-Cash Systems',
        description: 'Tailored quoting engines with complex custom pricing matrices, tiered discount logic, and automated contract generation.',
        impact: 'Shortens quote generation time from days to minutes.'
      },
      {
        title: 'Internal Administrative Dashboards',
        description: 'Unified administrative control centers consolidating support ticketing, customer status, transaction verification, and overrides.',
        impact: 'Provides unified operational clarity across leadership.'
      }
    ],
    technologies: [
      { category: 'Backend Runtimes', items: ['Node.js', 'TypeScript', 'Python', 'FastAPI', 'Express'] },
      { category: 'Databases & Storage', items: ['PostgreSQL', 'Redis', 'Neon Postgres', 'AWS S3'] },
      { category: 'Frontend Admin UI', items: ['React', 'Next.js', 'Tailwind CSS', 'TanStack Table'] },
      { category: 'Architecture & DevOps', items: ['Docker', 'Linux/Ubuntu', 'Nginx', 'GitHub Actions'] }
    ],
    process: [
      { step: '01', title: 'Workflow Decomposition', description: 'Deep operational walkthrough of every human step, spreadsheet, and data handoff.' },
      { step: '02', title: 'Data Modeling & Schema Design', description: 'Creating normalized PostgreSQL entity-relationship diagrams and state machines.' },
      { step: '03', title: 'Iterative Sprint Implementation', description: 'Building backend APIs and responsive user interfaces in bi-weekly functional staging drops.' },
      { step: '04', title: 'Data Migration & User Testing', description: 'Migrating legacy historical records, running sanitization scripts, and staff acceptance testing.' },
      { step: '05', title: 'Deployment & Knowledge Handover', description: 'Deploying to dedicated cloud infrastructure with complete documentation and code handover.' }
    ],
    faqs: [
      {
        question: 'Who owns the intellectual property of the custom software?',
        answer: 'You own 100% of the code, database schemas, and documentation. Everything is committed directly to your company git repository with zero licensing strings attached.'
      },
      {
        question: 'Can you migrate data from our existing Excel sheets or legacy database?',
        answer: 'Yes. We write automated data ingestion scripts that cleanse, deduplicate, validate, and migrate your legacy spreadsheet records into clean PostgreSQL schemas.'
      },
      {
        question: 'What happens if we need new features in a year?',
        answer: 'Because we build clean, modular TypeScript codebases with standard documentation, your internal team or AGNEX can extend the system incrementally without rewriting the foundation.'
      }
    ]
  },

  'erp-development': {
    slug: 'erp-development',
    number: '04',
    discipline: 'SYSTEMS',
    title: 'Enterprise Resource Planning (ERP)',
    headline: 'Unified Inventory, Financial & Operational Core Systems',
    description: 'We engineer tailor-made ERP platforms that connect procurement, multi-warehouse inventory, accounting, and order fulfillment into a single real-time operational single source of truth.',
    overview: 'Generic legacy ERPs like SAP or NetSuite require millions of dollars in consulting fees and months of configuration, yet still leave teams struggling with clunky interfaces. AGNEX engineers streamlined, bespoke ERP solutions that accurately reflect your exact manufacturing or distribution pipeline with sub-second execution.',
    problemsSolved: [
      {
        title: 'Inventory Desynchronization',
        description: 'Physical inventory does not match digital records, causing stockouts, backorders, and costly emergency procurement.'
      },
      {
        title: 'Fragmented Financial Reconciliation',
        description: 'Invoices, purchase orders, and payment receipts stored across separate platforms requiring days of manual accounting reconciliations each month.'
      },
      {
        title: 'Multi-Location Blind Spots',
        description: 'Operations managers unable to see real-time stock levels, transfer requests, or fulfillment velocity across distributed branch locations.'
      }
    ],
    features: [
      {
        title: 'Real-Time Double-Entry Inventory Ledger',
        description: 'Immutable transaction ledger where every stock movement requires a corresponding debit and credit, ensuring 100% balance accuracy.'
      },
      {
        title: 'Multi-Warehouse & Bin Location Tracking',
        description: 'Granular tracking across regional hubs, local warehouses, transit vehicles, and individual storage bins.'
      },
      {
        title: 'Automated Procurement & Reorder Rules',
        description: 'Dynamic reorder point algorithms that automatically generate purchase orders when stock reaches predefined safety thresholds.'
      },
      {
        title: 'Integrated Financial & Invoicing Engine',
        description: 'Automated tax calculation, payment gateway settlement reconciliation, and exportable financial audit reporting.'
      }
    ],
    benefits: [
      {
        title: 'Zero Inventory Discrepancies',
        description: 'Real-time synchronization ensures sales reps never sell stock that does not physically exist in the warehouse.'
      },
      {
        title: 'Drastic Working Capital Optimization',
        description: 'Eliminate bloated dead stock and optimize cash flow with precision replenishment triggers.'
      },
      {
        title: 'Fast Financial Month-End Close',
        description: 'Close accounting books in hours instead of weeks with automated transaction matching.'
      }
    ],
    useCases: [
      {
        title: 'Distribution & Wholesale Operations',
        description: 'High-volume order processing with batch picking, packing slip generation, and carrier integration.',
        impact: 'Accelerates warehouse turnaround time by 3x.'
      },
      {
        title: 'Custom Manufacturing Workflows',
        description: 'Bill of Materials (BOM) management, work order scheduling, raw material tracking, and finished goods assembly.',
        impact: 'Provides real-time unit economics and yield transparency.'
      },
      {
        title: 'Fleet & Equipment Asset Management',
        description: 'Maintenance schedules, fuel logging, part consumption, and lifecycle depreciation accounting.',
        impact: 'Reduces equipment downtime and prevents surprise repair expenses.'
      }
    ],
    technologies: [
      { category: 'Data Core & Transactions', items: ['PostgreSQL (ACID)', 'Prisma ORM', 'Redis Cache', 'TimescaleDB'] },
      { category: 'Server Architecture', items: ['Node.js', 'TypeScript', 'FastAPI', 'BullMQ Queue System'] },
      { category: 'Frontend Management', items: ['React', 'Next.js', 'Tailwind CSS', 'Data Visualizations'] },
      { category: 'Cloud Infrastructure', items: ['Docker', 'AWS RDS', 'S3 File Storage', 'Automated Daily Backups'] }
    ],
    process: [
      { step: '01', title: 'Operational Value Stream Mapping', description: 'Auditing physical inventory paths, ledger requirements, and approval hierarchies.' },
      { step: '02', title: 'Transactional Architecture', description: 'Designing double-entry accounting schemas and warehouse state machines.' },
      { step: '03', title: 'Core Engine Build', description: 'Implementing inventory ledger, purchase order flows, and role-based permissions.' },
      { step: '04', title: 'Hardware & Barcode Integration', description: 'Connecting handheld barcode scanners, label printers, and warehouse terminals.' },
      { step: '05', title: 'Live Cutover & Training', description: 'Executing parallel test runs, data migration, and on-site staff training.' }
    ],
    faqs: [
      {
        question: 'Why choose a custom ERP over NetSuite or SAP?',
        answer: 'Enterprise ERPs cost hundreds of thousands in licensing and force you into complex workflows you will never use. A custom AGNEX ERP gives you exact fit, zero recurring seat costs, faster load times, and complete ownership.'
      },
      {
        question: 'Can the ERP handle barcode and QR code scanners?',
        answer: 'Yes. We build responsive scanner interfaces compatible with standard USB/Bluetooth handheld barcode readers and mobile camera scanners.'
      },
      {
        question: 'How do you safeguard our financial and inventory records?',
        answer: 'We enforce automated point-in-time database backups, strict ACID transactions, role-based encryption, and immutable audit logs that prevent record deletion.'
      }
    ]
  },

  'crm-development': {
    slug: 'crm-development',
    number: '05',
    discipline: 'SYSTEMS',
    title: 'Customer Relationship Systems (CRM)',
    headline: 'High-Velocity Sales Pipelines & Omnichannel Client Telemetry',
    description: 'We build proprietary CRM systems that give sales, operations, and account executives unified visibility into leads, deal pipelines, customer interactions, and revenue health.',
    overview: 'Generic CRMs are bloated with complex configurations, slow interfaces, and excessive monthly per-user costs. AGNEX develops bespoke CRM architectures built specifically for your sales velocity, customer lifecycle, and communication channels without software clutter.',
    problemsSolved: [
      {
        title: 'Leads Slipping Through the Cracks',
        description: 'Unassigned inquiries and slow response times causing prospective clients to seek competitors before sales teams follow up.'
      },
      {
        title: 'Siloed Communication History',
        description: 'Customer emails, WhatsApp messages, call notes, and quotes scattered across private inboxes with zero shared organizational context.'
      },
      {
        title: 'Inaccurate Revenue Forecasting',
        description: 'Sales leaders unable to view real-time stage progression, deal velocity, or accurate pipeline projections.'
      }
    ],
    features: [
      {
        title: 'Visual Kanban Deal Pipelines',
        description: 'Drag-and-drop opportunity tracking with automated stage change triggers, required fields, and milestone tracking.'
      },
      {
        title: 'Omnichannel Communication Timeline',
        description: 'Unified interaction feed capturing email threads, WhatsApp messages, call summaries, and internal handover notes.'
      },
      {
        title: 'Automated Lead Distribution & Scoring',
        description: 'Intelligent round-robin routing and automated qualification scoring based on deal size, industry, and buyer readiness.'
      },
      {
        title: 'Contract & Document Generation',
        description: 'One-click generation of professional proposals, NDAs, and service agreements populated directly from deal data.'
      }
    ],
    benefits: [
      {
        title: 'Faster Deal Cycle Velocity',
        description: 'Automate repetitive follow-ups and notifications, reducing average closing cycles.'
      },
      {
        title: 'Complete Institutional Memory',
        description: 'Never lose client relationships when sales reps transition; every interaction is permanently recorded in the system.'
      },
      {
        title: 'Zero User License Traps',
        description: 'Add as many sales reps, account managers, and administrative users as your business demands with zero per-seat fees.'
      }
    ],
    useCases: [
      {
        title: 'B2B Enterprise Sales Teams',
        description: 'Complex multi-stakeholder deals requiring long sales cycles, committee approvals, and structured technical proposals.',
        impact: 'Provides unified account intelligence and milestone tracking.'
      },
      {
        title: 'High-Volume Inbound Service Companies',
        description: 'Rapid triage of inbound inquiries with auto-responders, SMS/WhatsApp notifications, and immediate rep assignment.',
        impact: 'Cuts initial lead response time from hours to under 3 minutes.'
      },
      {
        title: 'Client Account Management & Renewals',
        description: 'Tracking SLA health, contract expiry dates, recurring revenue milestones, and upsell opportunities.',
        impact: 'Protects gross retention and drives predictable expansion revenue.'
      }
    ],
    technologies: [
      { category: 'Application Stack', items: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS'] },
      { category: 'Data & Search Engine', items: ['PostgreSQL', 'Redis', 'Full-Text Search (Elastic/Postgres tsvector)'] },
      { category: 'Communication Gateways', items: ['SendGrid API', 'Twilio SMS/WhatsApp', 'WebSockets for live updates'] },
      { category: 'Document Services', items: ['PDF generation engines', 'Secure S3 asset storage', 'Digital signature workflows'] }
    ],
    process: [
      { step: '01', title: 'Sales Funnel Diagnostics', description: 'Documenting your exact qualification criteria, sales stages, and handoff protocols.' },
      { step: '02', title: 'Pipeline & Entity Modeling', description: 'Defining customer, contact, deal, activity, and contract relationships.' },
      { step: '03', title: 'Omnichannel Integration', description: 'Hooking up email webhooks, messaging gateways, and form capture endpoints.' },
      { step: '04', title: 'Reporting & Analytics Setup', description: 'Building real-time executive dashboards for pipeline health and rep conversion ratios.' },
      { step: '05', title: 'Deployment & Team Onboarding', description: 'Migrating legacy contacts, verifying permissions, and training sales staff.' }
    ],
    faqs: [
      {
        question: 'Can this integrate with our website contact forms and WhatsApp?',
        answer: 'Yes. We engineer direct webhook capture from website forms, landing pages, and WhatsApp Business APIs directly into your CRM inbox.'
      },
      {
        question: 'How does this compare to Salesforce or HubSpot?',
        answer: 'Salesforce and HubSpot charge steep monthly per-seat fees that escalate rapidly. A custom AGNEX CRM is tailored precisely to your exact workflow, runs blazing fast, and carries zero per-seat licensing costs.'
      },
      {
        question: 'Can we restrict which reps see certain accounts?',
        answer: 'Yes. We implement comprehensive Role-Based Access Control (RBAC) allowing you to isolate leads by territory, team, or seniority tier.'
      }
    ]
  },

  'ai-development': {
    slug: 'ai-development',
    number: '06',
    discipline: 'INTELLIGENCE',
    title: 'AI Engineering & Autonomous Agents',
    headline: 'Production AI Applications, Grounded RAG & Autonomous Workflows',
    description: 'We engineer production-ready AI systems: grounded Retrieval-Augmented Generation (RAG), domain-specific LLM agents, and automated data pipelines that eliminate hallucination and deliver measurable business leverage.',
    overview: 'Generic AI demos fail in enterprise production because of hallucinations, slow latency, lack of domain grounding, and compliance risks. AGNEX engineers deterministic AI architectures utilizing vector databases, structured schema outputs, multi-stage retrieval verification, and automated evaluation frameworks.',
    problemsSolved: [
      {
        title: 'Hallucinations & Inaccurate Outputs',
        description: 'Standard language models generating fictional citations, fabricated pricing, or invalid contractual clauses in customer-facing workflows.'
      },
      {
        title: 'Data Privacy & Security Leakage',
        description: 'Unregulated employee use of consumer AI tools exposing confidential client records, intellectual property, or source code.'
      },
      {
        title: 'Disconnected AI Toys vs. Business Systems',
        description: 'Standalone chatbots that cannot query your internal databases, trigger real workflows, or perform verified system actions.'
      }
    ],
    features: [
      {
        title: 'Grounded Retrieval-Augmented Generation (RAG)',
        description: 'Hybrid dense and sparse vector retrieval over internal enterprise documentation with strict attribution and citation proofs.'
      },
      {
        title: 'Autonomous Multi-Step AI Agents',
        description: 'ReAct-pattern agents capable of reasoning, executing API calls, querying databases, and validating intermediate results before answering.'
      },
      {
        title: 'Deterministic JSON Output Enforcement',
        description: 'Pydantic and Zod schema-enforced LLM responses ensuring predictable data structures for downstream system consumption.'
      },
      {
        title: 'Private & Local Model Deployments',
        description: 'Hosting open-weights models (Llama 3, Mistral) on dedicated virtual private clouds (VPC) for total data sovereignty.'
      }
    ],
    benefits: [
      {
        title: 'Zero Hallucination Tolerance',
        description: 'Every answer is backed by verified chunk citations from your proprietary documentation and internal databases.'
      },
      {
        title: '100% Data Privacy & Compliance',
        description: 'Your proprietary training data and customer records never leave your designated secure cloud perimeter.'
      },
      {
        title: 'Direct Operational Time Savings',
        description: 'Automate hours of complex document analysis, legal research, customer triage, and code auditing.'
      }
    ],
    useCases: [
      {
        title: 'AI-Assisted Legal & Regulatory Research',
        description: 'Parsing thousands of statutes, case law precedents, and contractual agreements with verified citation grounds.',
        impact: 'As engineered in our LawGuide AI platform architecture.'
      },
      {
        title: 'Autonomous Threat Detection & SOC Analysis',
        description: 'Correlating security logs, mapping adversary tactics against MITRE ATT&CK, and proposing containment rules.',
        impact: 'As engineered in our SKYNET v5.0 and SentinelX architectures.'
      },
      {
        title: 'Internal Knowledge Base Intelligence',
        description: 'Instant natural-language querying across years of engineering manuals, SOPs, tickets, and customer histories.',
        impact: 'Reduces internal onboarding and support ticket escalation by over 70%.'
      }
    ],
    technologies: [
      { category: 'AI & Orchestration', items: ['LangChain', 'LlamaIndex', 'Python', 'FastAPI', 'OpenAI API / Anthropic Claude'] },
      { category: 'Vector Stores & Embeddings', items: ['pgvector (PostgreSQL)', 'Qdrant', 'FAISS', 'OpenAI text-embedding-3'] },
      { category: 'Agent Evaluation & Safety', items: ['Ragas', 'Guardrails AI', 'Pydantic Schema Validation'] },
      { category: 'Hosting & Deployment', items: ['AWS EC2 GPU instances', 'Docker', 'Ollama', 'vLLM'] }
    ],
    process: [
      { step: '01', title: 'Data Ingestion & Chunking Strategy', description: 'Analyzing source documents, cleaning text, and designing recursive chunking pipelines.' },
      { step: '02', title: 'Vector Pipeline & Hybrid Retrieval', description: 'Setting up embedding models, pgvector indexing, and BM25 hybrid search rerankers.' },
      { step: '03', title: 'Agent Tooling & Guardrail Design', description: 'Equipping agents with API tools, schema validation, and defensive boundary rules.' },
      { step: '04', title: 'Evaluation & Benchmark Testing', description: 'Benchmarking context precision, faithfulness, and latency across hundreds of test prompts.' },
      { step: '05', title: 'Production Rollout & Telemetry', description: 'Deploying with token monitoring, cost controls, latency caching, and audit logging.' }
    ],
    faqs: [
      {
        question: 'Will our proprietary data be used to train public AI models?',
        answer: 'Never. We configure zero-retention enterprise API endpoints or deploy dedicated private models on your own AWS infrastructure where data never leaves your environment.'
      },
      {
        question: 'How do you prevent the AI from making up false answers (hallucinating)?',
        answer: 'We employ strict Grounded RAG with relevance threshold filtering. If relevant verified source material does not exist in the vector index, the model is architected to state that the information is unavailable.'
      },
      {
        question: 'Can the AI agent perform actions like creating tickets or querying SQL?',
        answer: 'Yes. We build function-calling agents with strict schema validation and human-in-the-loop confirmation gates for sensitive operations.'
      }
    ]
  },

  'business-automation': {
    slug: 'business-automation',
    number: '07',
    discipline: 'SYSTEMS',
    title: 'Business Workflow Automation',
    headline: 'Deterministic Event Pipelines, Webhook Brokers & Queue Systems',
    description: 'We engineer automated backend pipelines that connect disparate business tools, process asynchronous data events, and eliminate manual administrative tasks.',
    overview: 'Brittle no-code tools like Zapier break when data volume surges, charge steep tiered fees, and offer zero error recovery when webhooks fail. AGNEX engineers deterministic, code-level backend automation pipelines using Redis queues, BullMQ, and transactional retry engines designed for 99.99% event delivery.',
    problemsSolved: [
      {
        title: 'Broken Webhooks & Lost Transactions',
        description: 'Third-party payment or lead webhooks silently failing without alerts, leaving orders unprocessed and customers frustrated.'
      },
      {
        title: 'Manual Data Re-Entry Between Tools',
        description: 'Staff spending hours copy-pasting data between Shopify, accounting software, CRM inboxes, and shipping portals.'
      },
      {
        title: 'Spike Inability & Rate Limit Failures',
        description: 'Scripts crashing when third-party APIs enforce rate limits during flash sales or heavy operational traffic surges.'
      }
    ],
    features: [
      {
        title: 'Distributed Message Queues (BullMQ / Redis)',
        description: 'Asynchronous event processing ensuring zero lost tasks even during high-concurrency traffic bursts.'
      },
      {
        title: 'Exponential Backoff & Dead-Letter Queues',
        description: 'Automated retry algorithms with jitter that gracefully handle transient network drops and route failed payloads to inspection queues.'
      },
      {
        title: 'Document & Receipt Parsing (OCR)',
        description: 'Automated extraction of line items, tax numbers, and dates from invoices and PDF contracts into database records.'
      },
      {
        title: 'Real-Time Operational Alerts',
        description: 'Instant notification dispatch via Slack, WhatsApp, SMS, or email when mission-critical events or exceptions occur.'
      }
    ],
    benefits: [
      {
        title: 'Zero Dropped Events',
        description: 'Deterministic queues guarantee at-least-once or exactly-once event processing with full replay capability.'
      },
      {
        title: 'Hundreds of Manual Hours Saved',
        description: 'Free your operational personnel from repetitive clerical data entry so they can focus on high-value business development.'
      },
      {
        title: 'Fraction of No-Code Costs',
        description: 'Process millions of monthly webhook events on lightweight Node.js/Redis infrastructure without expensive per-task pricing.'
      }
    ],
    useCases: [
      {
        title: 'E-Commerce & Logistics Synchronization',
        description: 'Instant sync of customer orders into warehouse pick lists, label generation, carrier dispatch, and inventory reduction.',
        impact: 'Cuts order processing latency from hours to seconds.'
      },
      {
        title: 'Automated Invoice Reconciliation',
        description: 'Parsing incoming supplier invoices, verifying against purchase orders, and queuing payment approvals.',
        impact: 'Prevents overpayments and accelerates financial bookkeeping.'
      },
      {
        title: 'Customer Onboarding Pipelines',
        description: 'Creating customer workspaces, provisioning database credentials, issuing welcome documentation, and setting up CRM records.',
        impact: 'Delivers a frictionless, instant customer onboarding experience.'
      }
    ],
    technologies: [
      { category: 'Queue & Worker Engines', items: ['BullMQ', 'Redis', 'Node.js', 'Python Celery'] },
      { category: 'Data & Orchestration', items: ['Temporal.io', 'PostgreSQL', 'Docker', 'Express/FastAPI'] },
      { category: 'Protocols & Gateways', items: ['Webhooks (HMAC verification)', 'REST APIs', 'gRPC', 'WebSockets'] },
      { category: 'Monitoring & Alerts', items: ['Prometheus', 'Slack Webhooks', 'SendGrid', 'Twilio API'] }
    ],
    process: [
      { step: '01', title: 'System Boundary & API Audit', description: 'Cataloging third-party API rate limits, authentication protocols, and payload schemas.' },
      { step: '02', title: 'State Machine & Queue Design', description: 'Defining task states, retry backoffs, and dead-letter queue exception handlers.' },
      { step: '03', title: 'Worker Implementation', description: 'Developing containerized Node.js/Python microservices that ingest and process event queues.' },
      { step: '04', title: 'Stress & Chaos Testing', description: 'Simulating upstream API outages and load surges to verify queue resilience and re-delivery.' },
      { step: '05', title: 'Telemetry & Alert Provisioning', description: 'Deploying visual queue metrics dashboards and urgent Slack/email alerting thresholds.' }
    ],
    faqs: [
      {
        question: 'Why not just use Zapier or Make.com?',
        answer: 'No-code tools become prohibitively expensive at scale ($500-$2,000+/month), lack custom database transaction safety, and offer poor debugging tools when workflows fail. Our code-based worker queues handle millions of jobs reliably at a fraction of the cost.'
      },
      {
        question: 'What happens if a third-party API goes down?',
        answer: 'Our BullMQ queues automatically hold the job and retry using exponential backoff. If it fails permanently, it enters a Dead-Letter Queue (DLQ) for inspection and manual one-click replay.'
      },
      {
        question: 'Are webhooks secure against forgery?',
        answer: 'Yes. We enforce cryptographic HMAC-SHA256 signature verification on all incoming webhooks to ensure payloads originate exclusively from verified senders.'
      }
    ]
  },

  'cloud-engineering': {
    slug: 'cloud-engineering',
    number: '08',
    discipline: 'ENGINEERING',
    title: 'Cloud Architecture & DevOps Engineering',
    headline: 'Resilient Cloud Infrastructure, CI/CD Automation & Zero-Downtime Deployments',
    description: 'We architect and maintain secure, scalable cloud infrastructure across AWS, Docker, and Linux environments, implementing automated deployment pipelines and production telemetry.',
    overview: 'Unmanaged cloud infrastructure leads to escalating hosting bills, security vulnerabilities, database performance bottlenecks, and terrifying midnight downtime. AGNEX engineers immutable Infrastructure as Code (IaC), containerized Docker workflows, hardened Linux environments, and automated CI/CD pipelines built for continuous uptime.',
    problemsSolved: [
      {
        title: 'Unpredictable Cloud Costs',
        description: 'Over-provisioned AWS instances and unmonitored resources causing massive monthly billing waste.'
      },
      {
        title: 'Manual, Stressful Deployments',
        description: 'Developers manually copying files via SSH or FTP, resulting in configuration drift, broken releases, and unexpected downtime.'
      },
      {
        title: 'Lack of Observability & Monitoring',
        description: 'Discovering production outages only when furious customers send complaints because no uptime monitors or alert systems exist.'
      }
    ],
    features: [
      {
        title: 'Immutable Containerization (Docker)',
        description: 'Multi-stage Docker builds ensuring parity between development, staging, and production environments.'
      },
      {
        title: 'Automated GitHub Actions CI/CD',
        description: 'Automated pipelines running test suites, linting, security scans, and zero-downtime blue/green deployments on every merge.'
      },
      {
        title: 'Hardened Linux & Reverse Proxy Gateways',
        description: 'Ubuntu LTS servers configured with UFW firewalls, fail2ban, automated SSL renewal, and Nginx reverse proxies.'
      },
      {
        title: 'Real-Time Telemetry & Health Checks',
        description: 'Prometheus, Grafana, and uptime monitoring capturing CPU spikes, memory leaks, disk limits, and HTTP 5xx errors.'
      }
    ],
    benefits: [
      {
        title: '99.9% Production Availability',
        description: 'Zero-downtime rolling deployments ensure users never experience maintenance downtime during feature releases.'
      },
      {
        title: 'Eliminate Release Fear',
        description: 'Automated testing and one-click rollback mechanisms make shipping code routine and stress-free.'
      },
      {
        title: 'Optimized Cloud Spend',
        description: 'Right-sized infrastructure, serverless scale-to-zero databases (Neon/Postgres), and efficient caching cut hosting bills by up to 40%.'
      }
    ],
    useCases: [
      {
        title: 'High-Traffic Web & API Clusters',
        description: 'Auto-scaling load-balanced web services engineered to handle sudden traffic spikes without degraded latency.',
        impact: 'Protects business continuity during peak marketing events.'
      },
      {
        title: 'Cloud Migration from Legacy Shared Hosting',
        description: 'Containerizing monolithic legacy applications and moving them to modern AWS or Vercel cloud environments.',
        impact: 'Delivers a 10x performance boost and removes hosting bottlenecks.'
      },
      {
        title: 'Enterprise Compliance Infrastructure Hardening',
        description: 'Configuring encrypted disks (AES-256), TLS 1.3, strict IAM least-privilege policies, and automated audit logs.',
        impact: 'Meets SOC 2, ISO 27001, and enterprise vendor security assessments.'
      }
    ],
    technologies: [
      { category: 'Cloud Providers', items: ['AWS (EC2, S3, RDS, Lambda, CloudFront)', 'Cloudflare', 'Vercel', 'DigitalOcean'] },
      { category: 'Containers & Linux', items: ['Docker', 'Docker Compose', 'Ubuntu Server', 'Nginx Reverse Proxy'] },
      { category: 'CI/CD & Automation', items: ['GitHub Actions', 'Terraform (IaC)', 'Bash Scripting', 'Fastlane'] },
      { category: 'Monitoring & Logs', items: ['Prometheus', 'Grafana', 'Sentry Error Tracking', 'Uptime Kuma'] }
    ],
    process: [
      { step: '01', title: 'Infrastructure Audit & Cost Optimization', description: 'Reviewing current servers, database load, network security rules, and recurring billing.' },
      { step: '02', title: 'Containerization & Environment Parity', description: 'Creating optimized multi-stage Dockerfiles and local development orchestration.' },
      { step: '03', title: 'CI/CD Pipeline Construction', description: 'Writing GitHub Actions workflows for automated linting, testing, image building, and deployment.' },
      { step: '04', title: 'Security Hardening & SSL Setup', description: 'Configuring firewall rules, disabling root SSH access, setting up fail2ban, and Let\'s Encrypt SSL.' },
      { step: '05', title: 'Monitoring & Alert Activation', description: 'Setting up automated health probes, database backup verification, and incident alerting.' }
    ],
    faqs: [
      {
        question: 'Do we have to use AWS, or do you support other cloud providers?',
        answer: 'We architect infrastructure tailored to your needs. While AWS is our standard for complex enterprise backbones, we also leverage Cloudflare, Vercel, DigitalOcean, and dedicated bare-metal servers where cost or simplicity demands.'
      },
      {
        question: 'How do you handle database backups?',
        answer: 'We configure automated daily encrypted snapshots with Point-In-Time Recovery (PITR) and off-site geographic replication to prevent catastrophic data loss.'
      },
      {
        question: 'Can you set up CI/CD so our team can deploy easily?',
        answer: 'Yes. We build complete GitHub Actions pipelines so pushing code to the `main` branch automatically runs tests, builds containers, and deploys with zero manual server intervention.'
      }
    ]
  }
};
