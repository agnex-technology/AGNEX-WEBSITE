/**
 * AGNEX Technology — Complete Selected Work & Case Studies Data Store
 * Grounded in engineering rigor, verifiable systems, and architectural depth.
 * 
 * Featured Projects:
 * 01 — RDA (Request Driver Application)
 * 02 — SKYNET v5.0 (Autonomous SOC & XDR Platform)
 * 03 — LawGuide AI (AI-Assisted Legal Research Platform)
 * 04 — SentinelX AI (Enterprise AI Cybersecurity Platform)
 */

export interface SystemFlowStep {
  step: string;
  title: string;
  detail: string;
}

export interface EngineeringDecision {
  decision: string;
  rationale: string;
  impact: string;
}

export interface SecurityReliabilityItem {
  domain: string;
  implementation: string;
}

export interface ProjectCaseStudy {
  id: string; // e.g., 'rda', 'skynet', 'lawguide-ai', 'sentinelx-ai'
  number: string; // '01', '02', '03', '04'
  name: string; // Short code name e.g. 'RDA'
  title: string; // Full official title
  category: string; // e.g. 'Logistics Technology · Mobility · Marketplace Infrastructure'
  domain: 'Logistics' | 'Cybersecurity' | 'Legal AI';
  coreEngineering: string;
  shortDescription: string;
  statusBadge?: string; // e.g. 'v0.1.0 Foundation' for SentinelX
  statusNote?: string;
  disclaimer?: string; // e.g. for LawGuide AI
  securityBoundary?: string; // e.g. for SentinelX AI & SKYNET

  // 02 — The Challenge
  challenge: {
    summary: string;
    coordinationPoints: string[];
    technicalBottlenecks: string;
  };

  // 03 — The Approach (AGNEX Methodology: Understand → Architect → Engineer → Integrate → Evolve)
  approach: {
    understand: string;
    architect: string;
    engineer: string;
    integrate: string;
    evolve: string;
  };

  // 04 — What We Built (Systems & Capabilities)
  whatWeBuilt: string[];

  // 05 — Architecture Breakdown
  architecture: {
    overview: string;
    edgeLayer: string;
    applicationServices: string[];
    dataStorage: string[];
  };

  // 06 — Engineering Decisions
  engineeringDecisions: EngineeringDecision[];

  // 07 — Technology Stack
  technologies: string[];
  techCategories: {
    category: string;
    items: string[];
  }[];

  // 08 — System Flow
  systemFlow: {
    title: string;
    description: string;
    steps: SystemFlowStep[];
  };

  // 09 — Security & Reliability
  securityReliability: SecurityReliabilityItem[];

  // 10 — Evolution / Next Engineering Frontier
  evolution: {
    label: string;
    items: {
      title: string;
      description: string;
      status: 'Potential Evolution' | 'Documented Next Frontier' | 'Roadmap Architecture';
    }[];
  };

  // Metadata
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export const projectsData: ProjectCaseStudy[] = [
  // ==========================================
  // 01 — RDA — REQUEST DRIVER APPLICATION
  // ==========================================
  {
    id: 'rda',
    number: '01',
    name: 'RDA',
    title: 'RDA — Request Driver Application',
    category: 'Logistics Technology · Mobility · Marketplace Infrastructure',
    domain: 'Logistics',
    coreEngineering: 'Marketplace + Mobility Infrastructure',
    shortDescription:
      'An enterprise-grade freight logistics and acting-driver booking platform connecting lorry fleet owners with qualified, verified heavy-vehicle drivers.',
    challenge: {
      summary:
        'Freight operations in heavy transport are severely fractured by manual phone dispatching, untracked cash advances, unverified driver licenses, and zero deterministic state tracking across long-haul trips.',
      coordinationPoints: [
        'Driver discovery across regional transport hubs',
        'Multi-vehicle fleet registry & lorry owner authorization',
        'Strict driver commercial license & identity verification',
        'Direct bilateral booking workflows & scheduling',
        'End-to-end trip lifecycle state synchronization',
        'Double-entry wallet ledgers & financial transaction safety',
        'Operational auditing and dispute mediation'
      ],
      technicalBottlenecks:
        'Disparate mobile networks, volatile GPS connections in transit, and concurrent booking lock contention between fleet dispatchers required a deterministic state machine and strict ledger isolation.'
    },
    approach: {
      understand:
        'Analyzed physical freight corridor operations, driver shift patterns, and owner trust barriers to isolate essential transaction states.',
      architect:
        'Designed a decoupled three-tier system: mobile driver client, mobile fleet owner client, and web admin portal coordinated by an API edge layer with JWT RBAC.',
      engineer:
        'Engineered atomic booking state transitions in Node.js/PostgreSQL with PostGIS geospatial indexing and Redis-backed availability caching.',
      integrate:
        'Connected Google Gemini for intelligent customer dispute triage, Cloudinary for document evidence storage, and automated SMS/push notification queues.',
      evolve:
        'Established modular service boundaries to facilitate future telemetry ingestion and offline-first edge reconciliation.'
    },
    whatWeBuilt: [
      'Lorry owner registration & business verification',
      'Multi-vehicle fleet management registry',
      'Commercial heavy-vehicle driver onboarding & background checks',
      'Driver discovery engine with license-based matching',
      'Direct on-demand & scheduled booking workflows',
      'Deterministic booking lifecycle state machine',
      'Live trip status tracking & milestone triggers',
      'Double-entry wallet & financial ledger architecture',
      'Centralized administrative audit & control dashboard',
      'Two-way ratings, reviews, and incident reporting',
      'AI-assisted customer support & inquiry routing',
      'Role-based access control (RBAC) across all touchpoints'
    ],
    architecture: {
      overview:
        'Distributed client surfaces communicating through an API Gateway to decoupled business services backed by transactional and geospatial databases.',
      edgeLayer: 'REST API Edge Gateway with JWT validation, rate limiting, and role-based policy enforcement.',
      applicationServices: [
        'Auth & Identity Service (JWT, RBAC, Phone OTP verification)',
        'Profile & Fleet Registry (Vehicle compliance, Driver licenses)',
        'Booking Orchestrator (State machine transitions, mutex locks)',
        'Wallet & Payments Engine (Atomic ledger transactions, payout queues)',
        'AI Support Engine (Gemini LLM contextual prompt pipelines)'
      ],
      dataStorage: [
        'PostgreSQL with PostGIS for geospatial radial search and relational integrity',
        'Redis for fast driver availability indices and active lock coordination',
        'Cloud Storage (Cloudinary) for encrypted driver license & vehicle document artifacts'
      ]
    },
    engineeringDecisions: [
      {
        decision: 'Deterministic State Machine for Booking Transitions',
        rationale:
          'Eliminates ambiguous states such as ghost cancellations or simultaneous confirmations by enforcing valid state transitions at the database constraint level.',
        impact: 'Zero race conditions during high-concurrency booking requests across dispatch hubs.'
      },
      {
        decision: 'Double-Entry Financial Wallet Ledger',
        rationale:
          'Ensures every debit is balanced by an immutable credit entry, preventing financial discrepancy during trip cancellations or fee deductions.',
        impact: 'Full financial auditability and zero balance discrepancy across driver advances.'
      },
      {
        decision: 'PostGIS Spatial Indexing over External Map API Polling',
        rationale:
          'Executes radial driver matching directly within the primary database engine rather than incurring third-party API latency and recurring costs.',
        impact: 'Sub-50ms driver discovery query execution without external vendor dependencies.'
      }
    ],
    technologies: [
      'Node.js',
      'TypeScript',
      'Express',
      'React',
      'Vite',
      'Flutter',
      'PostgreSQL',
      'PostGIS',
      'Redis',
      'Cloudinary',
      'JWT',
      'Google Gemini',
      'Docker',
      'Render'
    ],
    techCategories: [
      { category: 'Client Applications', items: ['Flutter (iOS/Android)', 'React 19', 'Vite', 'TypeScript'] },
      { category: 'Backend & Orchestration', items: ['Node.js', 'Express', 'JWT', 'Google Gemini AI'] },
      { category: 'Data & Caching', items: ['PostgreSQL', 'PostGIS', 'Redis', 'Cloudinary'] },
      { category: 'Infrastructure & Ops', items: ['Docker', 'Render', 'CI/CD Pipelines'] }
    ],
    systemFlow: {
      title: 'Deterministic Booking State Machine',
      description: 'Strict sequential state transitions with dedicated failure/cancellation branches.',
      steps: [
        { step: '01', title: 'PENDING', detail: 'Fleet owner initiates booking request with route and vehicle parameters.' },
        { step: '02', title: 'CONFIRMED', detail: 'Qualified driver accepts request; security deposit held in ledger.' },
        { step: '03', title: 'IN_PROGRESS', detail: 'Driver checks in at pickup node; live milestone tracking active.' },
        { step: '04', title: 'COMPLETED', detail: 'Delivery acknowledged; atomic wallet ledger transfer executed.' },
        { step: 'ALT', title: 'CANCELLED', detail: 'Valid cancellation branch with automated penalty/refund logic.' }
      ]
    },
    securityReliability: [
      { domain: 'Identity & Access', implementation: 'JWT tokens with short TTLs and role-based claim enforcement across Owner, Driver, and Admin roles.' },
      { domain: 'Document Security', implementation: 'Encrypted document uploads for driver commercial licenses and vehicle fitness certificates.' },
      { domain: 'Concurrency Safety', implementation: 'PostgreSQL row-level locking during booking confirmations to eliminate double-booking.' },
      { domain: 'Audit Logging', implementation: 'Immutable system event logs for all administrative actions, cancellations, and payout transfers.' }
    ],
    evolution: {
      label: 'Potential Evolution (Documented Production Architecture Recommendations)',
      items: [
        {
          title: 'Live GPS Telemetry Ingestion',
          description: 'High-frequency MQTT broker integration for continuous vehicle breadcrumb streams.',
          status: 'Potential Evolution'
        },
        {
          title: 'Offline-First Driver Caching',
          description: 'Local SQLite queue synchronization for areas with intermittent mobile cellular connectivity.',
          status: 'Potential Evolution'
        },
        {
          title: 'Magic-Byte Upload Inspection',
          description: 'Deep file signature inspection for commercial driver documents before cloud ingestion.',
          status: 'Potential Evolution'
        },
        {
          title: 'Automated Proof of Delivery (e-PoD)',
          description: 'Cryptographic receiver signature and geotagged photographic consignment verification.',
          status: 'Potential Evolution'
        }
      ]
    },
    seo: {
      metaTitle: 'RDA — Logistics Platform Engineering | AGNEX Technology',
      metaDescription:
        'Case study: How AGNEX engineered RDA, an enterprise freight logistics and verified driver booking infrastructure with deterministic state machines.'
    }
  },

  // ==========================================
  // 02 — SKYNET v5.0 — AUTONOMOUS SOC & XDR
  // ==========================================
  {
    id: 'skynet',
    number: '02',
    name: 'SKYNET v5.0',
    title: 'SKYNET v5.0 — Autonomous SOC & XDR Platform',
    category: 'Cybersecurity · SOC · XDR · AI-Assisted Investigation',
    domain: 'Cybersecurity',
    coreEngineering: 'SOC + XDR + AI Investigation',
    shortDescription:
      'An autonomous SOC and XDR platform combining SIEM, SOAR, threat intelligence, threat hunting, telemetry, and AI-assisted investigation in a unified operator console.',
    securityBoundary:
      'Security Principle: Automation where appropriate. Human control where it matters. SKYNET is an operational defensive platform and is not designed or deployed as an unrestricted offensive weapon.',
    challenge: {
      summary:
        'Enterprise security teams suffer from critical cognitive overload caused by fragmented security silos, thousands of un-correlated alerts, slow manual query interfaces, and disconnected response playbooks.',
      coordinationPoints: [
        'Endpoint and network telemetry aggregation',
        'Real-time rule-based & behavioral threat detection',
        'Automated alert triage and noise suppression',
        'Complex incident investigation and root-cause tracing',
        'Threat intelligence indicator correlation',
        'Proactive threat hunting across historical telemetry',
        'SOAR response playbook orchestration',
        'Strictly signed, tamper-evident audit records'
      ],
      technicalBottlenecks:
        'High-velocity telemetry streams (thousands of events per second) cause ingestion backpressure and prohibitive query latencies in traditional relational databases.'
    },
    approach: {
      understand:
        'Mapped real-world analyst workflows and alert triage fatigue to establish a human-in-the-loop autonomous response model.',
      architect:
        'Formulated a hybrid data plane utilizing ClickHouse for hyper-fast telemetry analytics, PostgreSQL for relational incident state, and Redis for real-time pub/sub.',
      engineer:
        'Built a Python/FastAPI asynchronous core integrating MITRE ATT&CK detection mapping, automated alert deduplication, and WebSocket telemetry broadcasts.',
      integrate:
        'Integrated multi-provider LLM pipelines with Retrieval-Augmented Generation (RAG) to generate grounded incident summaries with direct evidence citations.',
      evolve:
        'Engineered modular endpoint agent protocols for cross-platform telemetry ingestion across Windows and mobile Android environments.'
    },
    whatWeBuilt: [
      'Unified SIEM log aggregation and parsing pipelines',
      'SOAR response playbook automation engine',
      'Multi-source XDR cross-layer correlation architecture',
      'Threat intelligence feed integration (STIX/TAXII, OSINT)',
      'Threat hunting console with IOC & behavioral hypothesis testing',
      'AI-assisted incident investigation assistant with direct evidence grounding',
      'RAG-powered contextual threat briefing generator',
      'Cross-platform endpoint telemetry collectors (Windows & Android)',
      'Alert correlation engine with automated false-positive reduction',
      'Interactive incident timeline & evidence relationship graphs',
      'Human-in-the-loop approval workflows for high-impact containment',
      'Cryptographically signed audit logs for forensics & compliance',
      'Real-time WebSocket event bus for instant operator notifications',
      'MITRE ATT&CK framework mapping across all detection rules'
    ],
    architecture: {
      overview:
        'Endpoint agents stream structured telemetry to an ingestion buffer, where correlation engines detect threats and surface enriched incidents to an analyst console.',
      edgeLayer: 'High-throughput async ingestion gateway with mTLS agent authentication and payload validation.',
      applicationServices: [
        'Telemetry Collection Service (Async event ingestion & normalizer)',
        'Detection & Correlation Engine (Rule evaluation, MITRE ATT&CK mapping)',
        'Investigation & RAG Context Engine (LLM contextual synthesis)',
        'SOAR Automation Engine (Approval-gated response execution)',
        'Audit & Integrity Service (Signed operational log generator)'
      ],
      dataStorage: [
        'ClickHouse for petabyte-scale append-only telemetry analytics',
        'PostgreSQL for incident state, user accounts, and case notes',
        'Redis for fast pub/sub message brokering and rate-limiting queues'
      ]
    },
    engineeringDecisions: [
      {
        decision: 'Human-in-the-Loop Gate for Destructive Actions',
        rationale:
          'Prevents catastrophic automated containment actions (e.g. isolating domain controllers) by requiring authenticated analyst approval before high-severity SOAR execution.',
        impact: 'High operational trust with zero collateral network disruption.'
      },
      {
        decision: 'ClickHouse Columnar Storage for Log Telemetry',
        rationale:
          'Traditional RDBMS databases degrade rapidly when querying billions of raw log events. ClickHouse delivers sub-second analytical aggregations across massive datasets.',
        impact: '100x query performance improvement during active incident forensic searches.'
      },
      {
        decision: 'RAG Pipeline with Strictly Grounded Telemetry Context',
        rationale:
          'Eliminates LLM hallucinations by injecting verifiable event payloads, IP reputations, and process hashes directly into the prompt context window.',
        impact: 'Accurate, auditable incident summaries with direct telemetry citations.'
      }
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Next.js',
      'PostgreSQL',
      'Redis',
      'ClickHouse',
      'WebSockets',
      'RAG',
      'AI / LLM Integrations',
      'Docker',
      'Kubernetes',
      'n8n',
      'Windows Agents',
      'Android Agents'
    ],
    techCategories: [
      { category: 'Backend & Detection', items: ['Python 3.12', 'FastAPI', 'AsyncIO', 'n8n Playbooks'] },
      { category: 'Frontend & UI', items: ['Next.js', 'React', 'TypeScript', 'WebSockets', 'GSAP'] },
      { category: 'Data & Telemetry', items: ['ClickHouse', 'PostgreSQL', 'Redis Cluster'] },
      { category: 'Security & Agents', items: ['Windows C++ Agent', 'Android Agent', 'mTLS', 'MITRE ATT&CK'] }
    ],
    systemFlow: {
      title: 'Operational SOC Telemetry & Response Pipeline',
      description: 'End-to-end telemetry lifecycle from endpoint sensor to cryptographically signed containment.',
      steps: [
        { step: '01', title: 'TELEMETRY COLLECTION', detail: 'Endpoint and network sensors stream raw event logs over secure mTLS.' },
        { step: '02', title: 'DETECTION & CORRELATION', detail: 'FastAPI engine enriches logs with threat intelligence & MITRE tags.' },
        { step: '03', title: 'AI / RAG INVESTIGATION', detail: 'Retrieval pipeline extracts evidence; LLM compiles analyst briefing.' },
        { step: '04', title: 'HUMAN OPERATOR APPROVAL', detail: 'Analyst reviews generated hypothesis and authorizes specific containment.' },
        { step: '05', title: 'SOAR CONTAINMENT & SIGNED AUDIT', detail: 'Host isolated via API; immutable cryptographic record signed to disk.' }
      ]
    },
    securityReliability: [
      { domain: 'Agent Communication', implementation: 'Mutual TLS (mTLS) with pinned client certificates for all telemetry transmission.' },
      { domain: 'Operational Integrity', implementation: 'HMAC-signed audit entries with chronological hash chaining for tamper-detection.' },
      { domain: 'Access Security', implementation: 'Multi-factor authentication (MFA) and granular RBAC (Analyst, Threat Hunter, Administrator).' },
      { domain: 'Execution Isolation', implementation: 'Containment scripts run inside sandboxed runner environments with strict timeouts.' }
    ],
    evolution: {
      label: 'Documented Next Engineering Frontier',
      items: [
        {
          title: 'Distributed eBPF Linux Sensor',
          description: 'Kernel-level system call tracing without user-space performance overhead.',
          status: 'Documented Next Frontier'
        },
        {
          title: 'Federated SIEM Clustering',
          description: 'Multi-tenant telemetry sharding across multi-region cloud infrastructures.',
          status: 'Documented Next Frontier'
        },
        {
          title: 'Graph Database Attack Path Modeling',
          description: 'Neo4j integration for automated blast-radius prediction during lateral movement.',
          status: 'Documented Next Frontier'
        }
      ]
    },
    seo: {
      metaTitle: 'SKYNET v5.0 — SOC & XDR Engineering | AGNEX Technology',
      metaDescription:
        'Case study: How AGNEX engineered SKYNET v5.0, an autonomous SOC and XDR platform combining SIEM, SOAR, threat intelligence, and AI-assisted investigation.'
    }
  },

  // ==========================================
  // 03 — LAWGUIDE AI — AI LEGAL RESEARCH
  // ==========================================
  {
    id: 'lawguide-ai',
    number: '03',
    name: 'LawGuide AI',
    title: 'LawGuide AI — AI-Assisted Legal Research Platform',
    category: 'Artificial Intelligence · Legal Technology · RAG · Document Intelligence',
    domain: 'Legal AI',
    coreEngineering: 'RAG + Document Intelligence',
    shortDescription:
      'An AI-assisted legal research and practice platform focused on Indian law, combining authenticated accounts, legal analysis, document processing, retrieval-augmented generation, and practice feedback.',
    disclaimer:
      'IMPORTANT LEGAL NOTICE: LawGuide AI provides informational assistance, not legal advice. Users should consult a qualified lawyer before relying on any output or taking legal action.',
    challenge: {
      summary:
        'Legal practitioners and law students in India navigate complex statutes, decades of Supreme Court and High Court precedents, and hundreds of pages of case documents using archaic keyword search tools that fail to understand semantic legal context.',
      coordinationPoints: [
        'Secure multi-tier authenticated accounts',
        'Multi-format legal document ingestion (PDF, DOCX, scanned judgments)',
        'High-accuracy semantic legal search across vast statutory corpuses',
        'Retrieval-Augmented Generation (RAG) with verifiable citations',
        'Asynchronous background document parsing and OCR',
        'User query history, bookmarking, and collaborative practice feedback',
        'Strict audit logging of all AI queries and model outputs'
      ],
      technicalBottlenecks:
        'Large legal briefs (50–200+ pages) exceed typical LLM context windows, and generic LLMs frequently hallucinate legal citations unless constrained by deterministic vector retrieval.'
    },
    approach: {
      understand:
        'Studied Indian legal citations (e.g. AIR, SCC, neutral citations) and case structure to establish precise document chunking boundaries.',
      architect:
        'Engineered an asynchronous document pipeline: Next.js frontend with Redis/BullMQ task queues running background workers for parsing, text extraction, and vectorization.',
      engineer:
        'Integrated Google Gemini embedding models with Pinecone vector database for high-dimensional semantic search coupled with PostgreSQL for structured metadata.',
      integrate:
        'Built an interactive legal analysis interface that renders grounded citations alongside extracted statutory excerpts with side-by-side verification.',
      evolve:
        'Structured modular worker pipelines to support specialized regional language translation and automated court docket tracking.'
    },
    whatWeBuilt: [
      'Multi-tenant authenticated user accounts with role-based access',
      'AI-assisted legal research and case analysis workflows',
      'Asynchronous background document processing with BullMQ & Redis',
      'Multi-page PDF text extraction and semantic chunking pipeline',
      'Retrieval-Augmented Generation (RAG) with strict citation verification',
      'High-dimensional vector indexing and similarity search with Pinecone',
      'Structured legal query history, research folders, and bookmarking',
      'Practice feedback mechanisms and user evaluation loops',
      'Audit logging of all AI processing events and prompt payloads',
      'Payment event handling and usage tier metering',
      'Comprehensive component test suite (Vitest, Testing Library, Playwright)'
    ],
    architecture: {
      overview:
        'Document ingestion queue decouples heavy OCR and embedding generation from the interactive research UI, ensuring sub-second response times.',
      edgeLayer: 'Next.js App Router with edge-cached middleware, NextAuth authentication, and rate limiting.',
      applicationServices: [
        'Auth & Subscription Service (NextAuth, Prisma ORM)',
        'Legal Analysis Service (Gemini prompt engineering & citation formatting)',
        'Document Worker Pool (BullMQ background text extraction & chunking)',
        'RAG Pipeline Orchestrator (Vector retrieval, context fusion, reranking)'
      ],
      dataStorage: [
        'Pinecone Vector Database for legal statute and precedent embeddings',
        'PostgreSQL with Prisma for user profiles, search history, and document metadata',
        'Redis for task queues, caching, and rate limiting'
      ]
    },
    engineeringDecisions: [
      {
        decision: 'Semantic Document Chunking by Legal Section & Paragraph',
        rationale:
          'Arbitrary token chunking cuts off critical legal definitions and case holdings mid-sentence. Chunking by statutory sections preserves legal context.',
        impact: 'Significantly higher vector retrieval precision and zero out-of-context citations.'
      },
      {
        decision: 'Asynchronous BullMQ Worker Architecture for Document Parsing',
        rationale:
          'Parsing 100-page court judgments synchronously in the API request path causes gateway timeouts and server thread starvation.',
        impact: 'Reliable, non-blocking uploads with real-time progress updates via WebSockets.'
      },
      {
        decision: 'Explicit Legal Disclaimer Enforcement at Architecture Level',
        rationale:
          'Ensures regulatory compliance and user transparency by programmatically appending informational notices to every generated analysis.',
        impact: 'Safe, ethical deployment protecting users from treating AI text as professional counsel.'
      }
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'BullMQ',
      'Google Gemini',
      'Pinecone',
      'NextAuth',
      'Vitest',
      'Testing Library',
      'Playwright',
      'Storybook'
    ],
    techCategories: [
      { category: 'Frontend & Framework', items: ['Next.js 14', 'React', 'TypeScript', 'Storybook'] },
      { category: 'AI & Vector Search', items: ['Google Gemini API', 'Pinecone Vector DB', 'Custom RAG Pipeline'] },
      { category: 'Backend & Queues', items: ['Prisma ORM', 'BullMQ', 'Redis 7', 'Node.js Workers'] },
      { category: 'Data & Testing', items: ['PostgreSQL', 'NextAuth', 'Vitest', 'Playwright'] }
    ],
    systemFlow: {
      title: 'Two-Stage Legal Document Ingestion & RAG Query Pipeline',
      description: 'Document extraction flow and real-time retrieval-augmented query answering.',
      steps: [
        { step: '01', title: 'DOCUMENT INGESTION', detail: 'User uploads judgment; payload enqueued onto BullMQ processing queue.' },
        { step: '02', title: 'CHUNKING & EMBEDDING', detail: 'Worker extracts clean legal text and generates high-dimensional embeddings.' },
        { step: '03', title: 'PINECONE INDEXING', detail: 'Vectors stored with case metadata, court hierarchy, and year stamps.' },
        { step: '04', title: 'SEMANTIC RETRIEVAL', detail: 'User research query retrieves top-K matching precedents and statutory excerpts.' },
        { step: '05', title: 'SYNTHESIS WITH CITATIONS', detail: 'Gemini synthesizes legal response with verifiable paragraph citations.' }
      ]
    },
    securityReliability: [
      { domain: 'Document Privacy', implementation: 'Tenant-isolated document buckets with ephemeral worker access tokens.' },
      { domain: 'Auditability', implementation: 'Every query, vector similarity score, and LLM token count logged for verification.' },
      { domain: 'Reliability', implementation: 'BullMQ exponential backoff retry policies for external LLM API rate limits.' },
      { domain: 'Input Sanitization', implementation: 'Strict prompt injection defense preventing jailbreaks on legal statutes.' }
    ],
    evolution: {
      label: 'Documented Next Engineering Frontier',
      items: [
        {
          title: 'Regional Indian Language Translation Layer',
          description: 'Bilingual legal cross-lingual retrieval (Hindi, Tamil, Marathi to English statutory law).',
          status: 'Documented Next Frontier'
        },
        {
          title: 'Real-Time Court Docket Ingestion',
          description: 'Automated scrapers for High Court cause lists and daily order sheets.',
          status: 'Documented Next Frontier'
        },
        {
          title: 'Automated Citation Cross-Referencer',
          description: 'Graph-based citation tree verifying whether cited precedents remain good law or have been overruled.',
          status: 'Documented Next Frontier'
        }
      ]
    },
    seo: {
      metaTitle: 'LawGuide AI — Legal AI & RAG Engineering | AGNEX Technology',
      metaDescription:
        'Case study: How AGNEX engineered LawGuide AI, an AI-assisted legal research and document intelligence platform powered by RAG and Indian statutory corpuses.'
    }
  },

  // ==========================================
  // 04 — SENTINELX AI — ENTERPRISE AI CYBERSECURITY
  // ==========================================
  {
    id: 'sentinelx-ai',
    number: '04',
    name: 'SentinelX AI',
    title: 'SentinelX AI — Enterprise AI Cybersecurity Platform',
    category: 'Cybersecurity · Defensive AI · Enterprise Security',
    domain: 'Cybersecurity',
    coreEngineering: 'Defensive AI Security',
    statusBadge: 'v0.1.0 Foundation',
    statusNote:
      'Implementation started with a runnable local dashboard and API using defensive demonstration data. Governance, requirements, and architecture continue alongside the foundation implementation.',
    shortDescription:
      'An early-stage open-source enterprise AI cybersecurity platform focused exclusively on authorized defensive security work.',
    securityBoundary:
      'DEFENSIVE BOUNDARY: SentinelX AI supports authorized defensive cybersecurity exclusively. It strictly prohibits and is not designed for unauthorized access, credential theft, malware deployment, destructive disruption, or any other harmful offensive activity.',
    challenge: {
      summary:
        'Modern enterprise environments require defensive tooling that combines deterministic threat detection with machine-assisted operational insights, backed by rigorous development governance and signed auditability.',
      coordinationPoints: [
        'Local security operations visibility without cloud vendor lock-in',
        'Structured ingestion of defensive telemetry and demonstration findings',
        'Cryptographically signed development and operator sessions',
        'Strict defensive boundary validation preventing misuse',
        'Comprehensive software architecture, requirements, and standards planning',
        'Transparent open-source foundation with strict license hygiene'
      ],
      technicalBottlenecks:
        'Establishing a secure local runtime that enforces strict defensive controls, schema-validated findings, and immutable local audit logs before multi-node distributed scaling.'
    },
    approach: {
      understand:
        'Formulated rigorous engineering standards and defensive-only threat models prior to code execution.',
      architect:
        'Designed a lightweight, self-contained architecture: local security dashboard coupled with a Node.js/Express API foundation.',
      engineer:
        'Implemented schema-driven findings models, local session signing, and structured audit log recording.',
      integrate:
        'Packaged demonstration defensive datasets simulating common enterprise perimeter events and vulnerability findings.',
      evolve:
        'Documenting future enterprise scaling paths including distributed agent communication and multi-tenant security policies.'
    },
    whatWeBuilt: [
      'Local security operations dashboard interface',
      'Core defensive REST API foundation',
      'Defensive demonstration datasets & simulated telemetry streams',
      'Local findings manager with severity classifications',
      'Chronological, immutable audit history logger',
      'Server-signed development sessions with tamper-evident checks',
      'Security governance policies & ethical defensive boundaries',
      'System architecture specifications & domain data models',
      'Formal product and software engineering requirements documents',
      'Standardized clean-code linting and security testing baselines'
    ],
    architecture: {
      overview:
        'Conceptual foundation architecture routing local security events through a validated API to defensive data stores and a operator dashboard.',
      edgeLayer: 'Local Express API gateway with request validation, defensive boundary guards, and session signing.',
      applicationServices: [
        'Local Security Dashboard UI (Reactive findings explorer)',
        'SentinelX API Core (REST endpoints for telemetry and cases)',
        'Defensive Analysis Engine (Simulated correlation & risk scoring)',
        'Session Integrity Service (Server-signed development tokens)'
      ],
      dataStorage: [
        'Local JSON/SQLite findings datastore with schema validation',
        'Append-only local audit history records with cryptographic signatures'
      ]
    },
    engineeringDecisions: [
      {
        decision: 'Defensive-Only Boundary Check in API Middleware',
        rationale:
          'Rejects any request or payload that exhibits unauthorized scanning or offensive exploit signatures by default.',
        impact: 'Hard architectural guarantee that the platform remains purely defensive.'
      },
      {
        decision: 'Server-Signed Session Tokens for Local Development',
        rationale:
          'Prevents unauthorized local session tampering during testing by cryptographically signing developer session states.',
        impact: 'Tamper-evident audit trail even in early-stage local testing.'
      },
      {
        decision: 'Schema-Driven Findings Format',
        rationale:
          'Enforces structured JSON schemas for every vulnerability finding, ensuring consistency before future SIEM/XDR integrations.',
        impact: 'Native schema interoperability with standard CVE and CWE vulnerability taxonomies.'
      }
    ],
    technologies: [
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'Defensive AI Engine',
      'Audit Engine',
      'JSON Schema',
      'Vite',
      'ESLint',
      'Vitest'
    ],
    techCategories: [
      { category: 'Foundation Stack', items: ['TypeScript 5.x', 'React', 'Node.js', 'Express'] },
      { category: 'Security & Governance', items: ['Defensive Boundary Guard', 'Server-Signed Sessions', 'JSON Schema Validation'] },
      { category: 'Audit & Analysis', items: ['Append-Only Audit Engine', 'Defensive Demo Simulator', 'Vitest'] }
    ],
    systemFlow: {
      title: 'Foundation Defensive Event Processing Flow',
      description: 'Controlled local ingestion, validation, and dashboard presentation.',
      steps: [
        { step: '01', title: 'SECURITY EVENTS', detail: 'Local defensive event generator streams simulated perimeter findings.' },
        { step: '02', title: 'SENTINELX API', detail: 'Express middleware verifies defensive boundary and authenticates session.' },
        { step: '03', title: 'DATA VALIDATION', detail: 'Payloads validated against strict JSON findings schemas.' },
        { step: '04', title: 'AUDIT LOGGING', detail: 'Event and session signatures written to immutable local audit ledger.' },
        { step: '05', title: 'OPERATIONAL DASHBOARD', detail: 'Operator inspects findings, severity scores, and audit history in UI.' }
      ]
    },
    securityReliability: [
      { domain: 'Defensive Assurance', implementation: 'Explicit prohibition of weaponized tooling; all endpoints enforce defensive use policies.' },
      { domain: 'Session Signing', implementation: 'Cryptographic session validation ensuring operational events cannot be spoofed.' },
      { domain: 'Schema Hygiene', implementation: 'Strict type and payload validation eliminating malformed finding injection.' }
    ],
    evolution: {
      label: 'Documented Next Engineering Frontier',
      items: [
        {
          title: 'Distributed Telemetry Collectors',
          description: 'Expanding local ingestion into distributed multi-node network collectors.',
          status: 'Roadmap Architecture'
        },
        {
          title: 'Hardware-Security Module (HSM) Integration',
          description: 'Enterprise key management for audit log signing and identity verification.',
          status: 'Roadmap Architecture'
        },
        {
          title: 'Automated Threat Intelligence Ingestion',
          description: 'Direct ingestion of STIX/TAXII threat feeds into the defensive analysis engine.',
          status: 'Roadmap Architecture'
        }
      ]
    },
    seo: {
      metaTitle: 'SentinelX AI — Defensive AI Cybersecurity | AGNEX Technology',
      metaDescription:
        'Case study: Overview of SentinelX AI, an open-source defensive cybersecurity and AI operational platform foundation engineered by AGNEX.'
    }
  }
];

export function getProjectById(id: string): ProjectCaseStudy | undefined {
  const normalized = id.toLowerCase().trim();
  return projectsData.find((p) => p.id === normalized);
}
