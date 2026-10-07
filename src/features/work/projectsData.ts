/**
 * AGNEX Technology — Case Studies & Project Architecture Data Store
 * Grounded in engineering rigor, business problem-solving, and verifiable architectural patterns.
 */

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  type: 'Client Engagement' | 'Internal Engineering Platform' | 'Reference Architecture';
  industry: string;
  context: string;
  challenge: string;
  approach: string;
  solution: string;
  architectureDetails: {
    frontend: string;
    backend: string;
    database: string;
    infrastructure: string;
  };
  technologies: string[];
  results: {
    metric: string;
    label: string;
  }[];
  relatedCapabilities: ('DIGITAL' | 'SYSTEMS' | 'INTELLIGENCE' | 'ENGINEERING')[];
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: 'unified-inventory-ledger',
    title: 'Multi-Node Enterprise Inventory & Operations Ledger',
    tagline: 'Eliminating multi-hour synchronization delays across distributed fulfillment nodes.',
    type: 'Reference Architecture',
    industry: 'Logistics & Distribution',
    context: 'A regional distribution network operating across 14 warehouse nodes relied on batch database replication that ran every 6 hours, leading to stock discrepancies, back-orders, and manual reconciliation overhead.',
    challenge: 'High concurrent transaction volume across warehouse barcode scanners frequently caused database lock contention and race conditions when multiple pickers reserved the same SKU simultaneously.',
    approach: 'We moved the architecture from batch cron jobs to an event-driven, log-structured event log using Go microservices with PostgreSQL row-level locks and a low-latency Redis cluster for distributed inventory reservations.',
    solution: 'Engineered an immutable ledger tracking every inventory delta (receive, reserve, transfer, dispatch). Client applications subscribe to real-time WebSocket state streams with automatic offline reconciliation.',
    architectureDetails: {
      frontend: 'React 19, TypeScript, Progressive Web App (PWA) with offline IndexedDB queue',
      backend: 'Go (Golang) microservices, gRPC internal service mesh, REST API gateway',
      database: 'PostgreSQL with connection pooling, Redis 7 for distributed locks',
      infrastructure: 'Docker containers, Kubernetes orchestrator, automated CI/CD pipelines'
    },
    technologies: ['Go', 'PostgreSQL', 'Redis', 'React 19', 'TypeScript', 'WebSockets', 'Docker', 'Kubernetes'],
    results: [
      { metric: '85ms', label: 'Cross-Node Sync Latency (down from 6 hours)' },
      { metric: '0', label: 'Stock Discrepancies & Double-Bookings' },
      { metric: '99.99%', label: 'Ledger Availability Across Peak Shifting' }
    ],
    relatedCapabilities: ['SYSTEMS', 'ENGINEERING']
  },
  {
    id: 'automated-dispatch-engine',
    title: 'Intelligent Service Ticket Triage & Autonomous Dispatch Engine',
    tagline: 'Reclaiming 20+ operations hours weekly with deterministic rule routing and private LLM triage.',
    type: 'Reference Architecture',
    industry: 'Field Operations & Facilities Management',
    context: 'Commercial facility service companies receive hundreds of unstructured emergency maintenance requests daily via email, SMS, and legacy portals, requiring human dispatchers to manually classify urgency, skill requirements, and routing.',
    challenge: 'Human dispatchers took an average of 42 minutes to assign incoming high-priority work orders, causing missed SLAs on critical heating, cooling, and electrical outages.',
    approach: 'Rather than using an unpredictable public AI wrapper, we combined a deterministic constraint-satisfaction routing solver with an air-gapped, quantized LLM parsing incoming text into structured JSON schemas.',
    solution: 'The system automatically extracts location, severity, equipment make/model, and required certifications from unstructured messages, matching them instantly to the nearest qualified technician based on real-time GPS telemetry.',
    architectureDetails: {
      frontend: 'React 19, Tailwind CSS, real-time map interface with route visualization',
      backend: 'Python (FastAPI) and Node.js orchestrator with BullMQ task queue',
      database: 'PostgreSQL with PostGIS geospatial indexing, pgvector for semantic ticket search',
      infrastructure: 'Air-gapped on-premise GPU inference node, Cloudflare Zero Trust tunnel'
    },
    technologies: ['Python', 'FastAPI', 'PostgreSQL / PostGIS', 'pgvector', 'React 19', 'BullMQ', 'Docker'],
    results: [
      { metric: '42s', label: 'Average Dispatch Time (down from 42 mins)' },
      { metric: '20+ hrs', label: 'Weekly Administrative Labor Reclaimed' },
      { metric: '100%', label: 'Data Privacy (Zero Data Transmitted to Public LLMs)' }
    ],
    relatedCapabilities: ['INTELLIGENCE', 'SYSTEMS']
  },
  {
    id: 'enterprise-digital-flagship',
    title: 'High-Throughput Enterprise Digital Experience & Booking Suite',
    tagline: 'Engineering a sub-second, accessible digital flagship that turns visitors into high-ticket inquiries.',
    type: 'Client Engagement',
    industry: 'Commercial Technology & Professional Services',
    context: 'A fast-growing technical consultancy was burdened by a bloated, plugin-heavy CMS that took over 4.8 seconds to load on mobile and experienced layout shifts that drove away enterprise decision-makers.',
    challenge: 'The marketing team needed rapid page composition flexibility, but the engineering leadership demanded strict zero-vulnerability guarantees, WCAG 2.2 AA accessibility, and instant page transitions.',
    approach: 'We engineered a static-first React + Vite architecture utilizing semantic HTML5, fluid typography scales, strict Content Security Policies, and edge-cached static distribution.',
    solution: 'Delivered an ultra-lean digital flagship platform with dynamic consultation intake workflows, progressive disclosure forms, and integrated CRM webhooks.',
    architectureDetails: {
      frontend: 'React 19, TypeScript, Vanilla CSS design tokens, Space Grotesk & Inter typography',
      backend: 'Serverless Edge Functions with webhook delivery and rate-limiting',
      database: 'Serverless PostgreSQL for consultation intake and telemetry logs',
      infrastructure: 'Edge CDN distribution, automated Lighthouse regression testing in CI'
    },
    technologies: ['React 19', 'TypeScript', 'Vite', 'Vanilla CSS', 'Edge Functions', 'PostgreSQL', 'WCAG 2.2 AA'],
    results: [
      { metric: '100', label: 'Lighthouse Performance, SEO & Accessibility Score' },
      { metric: '0.01', label: 'Cumulative Layout Shift (CLS)' },
      { metric: '+42%', label: 'Lift in Completed Enterprise Inquiry Submissions' }
    ],
    relatedCapabilities: ['DIGITAL', 'ENGINEERING']
  },
  {
    id: 'cloud-microservices-modernization',
    title: 'Monolithic Core Decoupling & Cloud Microservices Migration',
    tagline: 'Modernizing a 7-year-old legacy PHP monolith into resilient, decoupled cloud services.',
    type: 'Reference Architecture',
    industry: 'Enterprise Software & SaaS',
    context: 'An established SaaS platform serving 50,000+ daily users experienced database connection exhaustion and cascading system outages whenever batch reporting tasks ran alongside customer-facing API calls.',
    challenge: 'The codebase was a tightly coupled monolith with over 300,000 lines of legacy code. A complete rewrite was commercially unviable and carried unacceptable outage risks.',
    approach: 'We implemented the Strangler Fig pattern, routing API traffic through a resilient reverse proxy and incrementally extracting high-load reporting and authentication into standalone Go microservices.',
    solution: 'Extracted asynchronous reporting into an isolated worker pool managed by message queues, optimized database indexing, and established an automated multi-stage CI/CD delivery pipeline.',
    architectureDetails: {
      frontend: 'Modular React administrative dashboard and API client sdk',
      backend: 'Go microservices, Envoy proxy gateway, Redis pub/sub queues',
      database: 'Read/write split PostgreSQL cluster with automated failover replicas',
      infrastructure: 'Terraform-managed AWS infrastructure, EKS Kubernetes, Prometheus observability'
    },
    technologies: ['Go', 'PostgreSQL', 'Envoy Gateway', 'Redis', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus'],
    results: [
      { metric: '99.99%', label: 'System Uptime Across Peak Usage' },
      { metric: '4x', label: 'Throughput Increase With 60% Lower Cloud Compute Cost' },
      { metric: 'Zero', label: 'Production Downtime During Multi-Phase Migration' }
    ],
    relatedCapabilities: ['ENGINEERING', 'SYSTEMS']
  }
];

export function getProjectById(id: string): ProjectCaseStudy | undefined {
  return projectsData.find((p) => p.id === id);
}
