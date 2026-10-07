import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/motion/ScrollFade';

interface CapabilityPillar {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  problem: string;
  approach: string;
  builds: string[];
  outcome: string;
  technologies: string[];
}

export default function Services() {
  const [selectedPillar, setSelectedPillar] = useState<string>('digital');

  const capabilities: CapabilityPillar[] = [
    {
      id: 'digital',
      number: '01',
      title: 'DIGITAL',
      subtitle: 'Digital experiences designed to turn attention into business.',
      problem: 'Most corporate websites and customer portals feel like generic templates. They suffer from slow load times, poor mobile ergonomics, high bounce rates, and fail to convince enterprise decision-makers.',
      approach: 'We engineer digital products with the same rigor as mission-critical systems. Every interface combines sub-second performance, accessible semantic HTML, responsive typography, and frictionless conversion pathways.',
      builds: [
        'Enterprise Marketing Websites & Flagships',
        'Complex Single-Page & Multi-Page Web Applications',
        'Cross-Platform iOS & Android Mobile Apps',
        'Customer Portals & Digital Product Onboarding',
        'High-Conversion E-Commerce & Checkout Suites'
      ],
      outcome: 'A commanding digital flagship with 100 Lighthouse performance, sub-50ms interaction response, zero layout shift, and measurable conversion growth.',
      technologies: ['React 19', 'TypeScript', 'Next.js', 'Vite', 'Vanilla CSS', 'Tailwind CSS', 'PWA / Service Workers', 'WCAG 2.2 AA']
    },
    {
      id: 'systems',
      number: '02',
      title: 'SYSTEMS',
      subtitle: 'Connect your business operations into systems that work together.',
      problem: 'Growing companies drown in operational chaos: critical data trapped in disconnected spreadsheets, sales teams out of sync with inventory, and manual billing prone to human error.',
      approach: 'We design custom operational backbones. We map your actual organizational workflows, eliminate manual double-entry, and build unified software tailored exactly to how your business operates.',
      builds: [
        'Custom Enterprise Resource Planning (ERP)',
        'Customer Relationship Management (CRM) Systems',
        'Real-Time Inventory & Warehouse Tracking',
        'Automated Invoicing, Billing & Ledger Engines',
        'Internal Operational Portals & Workflow Dashboards',
        'Multi-Vendor & Supply Chain Distribution Portals'
      ],
      outcome: 'A unified single source of truth across operations, zero spreadsheet reconciliation delays, and automated audit-ready operational records.',
      technologies: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Drizzle / Prisma', 'Role-Based Access Control', 'Event Queues', 'WebSockets']
    },
    {
      id: 'intelligence',
      number: '03',
      title: 'INTELLIGENCE',
      subtitle: 'Help businesses eliminate repetitive work with intelligent automation.',
      problem: 'Companies want to leverage AI but fear leaking proprietary client data to public LLMs, or waste budgets on superficial chatbots that offer zero real operational value.',
      approach: 'We build targeted, governed intelligence. We deploy deterministic automations for structured tasks and private, governed AI models for document extraction, ticket triage, and operational insights.',
      builds: [
        'Automated Multi-Step Business Workflows',
        'Private, Air-Gapped Knowledge & Document Retrieval (RAG)',
        'Intelligent Email, Invoice & Order Parsing',
        'Predictive Operations & Demand Forecasting',
        'Customer Support Decision-Support Agents',
        'Automated Data Cleansing & Extraction Pipelines'
      ],
      outcome: 'Dozens of manual administrative hours reclaimed weekly per employee, zero data exposure to public models, and instant operational velocity.',
      technologies: ['Local LLMs / Quantized Models', 'Vector Databases (pgvector, Milvus)', 'LangChain / LlamaIndex', 'Python', 'FastAPI', 'Automated OCR']
    },
    {
      id: 'engineering',
      number: '04',
      title: 'ENGINEERING',
      subtitle: 'Scale without architectural fragility or mounting tech debt.',
      problem: 'Rapid growth exposes brittle architectures: APIs crash during traffic surges, database queries grind to a halt, and engineers spend all their time patching legacy debt instead of shipping features.',
      approach: 'We practice first-principles systems engineering. We decouple monoliths into resilient services, optimize database query plans, configure automated CI/CD pipelines, and enforce zero-trust security.',
      builds: [
        'Cloud-Native Microservices Architecture',
        'High-Throughput REST & GraphQL API Gateways',
        'Legacy Software Modernization & Refactoring',
        'Database Optimization, Sharding & Replication',
        'DevOps, CI/CD & Infrastructure-as-Code (Terraform)',
        'Zero-Trust Identity & Cryptographic Security Audits'
      ],
      outcome: 'Resilient, fault-tolerant infrastructure capable of handling 10x traffic surges with sub-second latency and automated zero-downtime deployments.',
      technologies: ['Docker & Rootless Pods', 'Kubernetes', 'AWS / Cloudflare', 'Terraform', 'mTLS / Zero-Trust', 'Kafka / RabbitMQ', 'Automated CI/CD Pipelines']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Engineering Capabilities & Expertise | AGNEX Technology</title>
        <meta
          name="description"
          content="Explore AGNEX Technology's core engineering pillars: Digital Platforms, Business Systems, Intelligent Automation, and Cloud Engineering."
        />
        <link rel="canonical" href="https://agnextechnology.com/expertise" />
        <meta property="og:title" content="Engineering Capabilities & Expertise | AGNEX Technology" />
        <meta
          property="og:description"
          content="We architect websites, custom business software, ERP systems, AI automation, and cloud microservices designed for business impact."
        />
        <meta property="og:url" content="https://agnextechnology.com/expertise" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://agnextechnology.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Expertise",
                      "item": "https://agnextechnology.com/expertise"
                    }
                  ]
                },
                {
                  "@type": "Service",
                  "name": "Enterprise Software Engineering",
                  "provider": {
                    "@type": "Organization",
                    "name": "AGNEX Technology",
                    "url": "https://agnextechnology.com"
                  },
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "AGNEX Capabilities",
                    "itemListElement": [
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Products & Web Platforms" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business Systems & Custom ERP" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Intelligent Automation & AI" } },
                      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud Architecture & Resilient APIs" } }
                    ]
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(4rem, 6vw, 6rem) 0 3rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--agnex-base)'
        }}
        className="agnex-grid-mesh"
      >
        <div className="agnex-container">
          <ScrollFade>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.5rem' }}>
              01 // CAPABILITIES & ARCHITECTURE
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--agnex-white)'
              }}
            >
              Engineering Capabilities
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-muted)',
                maxWidth: '720px',
                lineHeight: 1.6
              }}
            >
              We don't sell packaged licenses or generic tech stacks. We architect custom digital infrastructure designed to eliminate operational friction, connect disconnected tools, and accelerate business growth.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Interactive Quick-Jump Navigation */}
      <nav
        aria-label="Capabilities Navigation"
        style={{
          backgroundColor: 'var(--agnex-base-raised)',
          borderBottom: '1px solid var(--border-color)',
          position: 'sticky',
          top: '76px',
          zIndex: 50,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="agnex-container">
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              padding: '0.75rem 0',
              scrollbarWidth: 'none'
            }}
          >
            {capabilities.map((cap) => (
              <a
                key={cap.id}
                href={`#${cap.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPillar(cap.id);
                  const el = document.getElementById(cap.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  border: '1px solid',
                  borderColor: selectedPillar === cap.id ? 'var(--agnex-accent)' : 'var(--border-color)',
                  backgroundColor: selectedPillar === cap.id ? 'var(--agnex-accent-subtle)' : 'transparent',
                  color: selectedPillar === cap.id ? 'var(--agnex-white)' : 'var(--agnex-steel)',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ color: 'var(--agnex-accent)' }}>{cap.number}</span>
                <span>{cap.title}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 4 Deep-Dive Pillars Editorial Layout */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base)' }}>
        <div className="agnex-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
            {capabilities.map((cap) => (
              <article
                key={cap.id}
                id={cap.id}
                style={{
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  backgroundColor: 'var(--agnex-base-raised)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative'
                }}
              >
                <ScrollFade>
                  {/* Pillar Top Meta */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-lg)',
                          color: 'var(--agnex-accent)',
                          fontWeight: 700
                        }}
                      >
                        {cap.number} // PILLAR
                      </span>
                      <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', margin: 0, color: 'var(--agnex-white)' }}>
                        {cap.title}
                      </h2>
                    </div>
                    <Link to={`/contact?pillar=${cap.id}`} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: 'var(--text-xs)' }}>
                      <span>Discuss a {cap.title.toLowerCase()} project</span>
                      <span>→</span>
                    </Link>
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--text-lg)',
                      color: 'var(--agnex-white)',
                      fontWeight: 500,
                      marginBottom: '2.5rem',
                      lineHeight: 1.5
                    }}
                  >
                    {cap.subtitle}
                  </p>

                  {/* 4-Quadrant Editorial Matrix */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2.5rem',
                      marginBottom: '2.5rem'
                    }}
                  >
                    {/* Problem */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--agnex-steel)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.75rem'
                        }}
                      >
                        [01] The Problem
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        {cap.problem}
                      </p>
                    </div>

                    {/* Approach */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--agnex-accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.75rem'
                        }}
                      >
                        [02] Our Engineering Approach
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                        {cap.approach}
                      </p>
                    </div>

                    {/* What We Build */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--agnex-steel)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.75rem'
                        }}
                      >
                        [03] What We Build
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {cap.builds.map((item, i) => (
                          <li key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-white)', display: 'flex', gap: '0.5rem' }}>
                            <span style={{ color: 'var(--agnex-accent)' }}>+</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Business Outcome */}
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--agnex-steel)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          marginBottom: '0.75rem'
                        }}
                      >
                        [04] Client Business Outcome
                      </div>
                      <div
                        style={{
                          backgroundColor: 'var(--agnex-base)',
                          border: '1px solid var(--agnex-accent-border)',
                          padding: '1.25rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--text-sm)',
                          color: 'var(--agnex-white)',
                          lineHeight: 1.6
                        }}
                      >
                        {cap.outcome}
                      </div>
                    </div>
                  </div>

                  {/* Technology Tokens */}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '1.25rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        color: 'var(--agnex-steel)',
                        marginRight: '0.5rem',
                        textTransform: 'uppercase'
                      }}
                    >
                      Stack:
                    </span>
                    {cap.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-2xs)',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'var(--agnex-base)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-xs)',
                          color: 'var(--agnex-steel-light)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </ScrollFade>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base-raised)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="agnex-container">
          <ScrollFade>
            <div style={{ maxWidth: '640px', marginBottom: '4rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                Engagement Models
              </div>
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: '1rem' }}>
                How We Partner With You
              </h2>
              <p>
                Whether you need an entire bespoke platform built from scratch or high-impact modernization of existing infrastructure, we structure our engagements for clarity and velocity.
              </p>
            </div>
          </ScrollFade>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            <div className="agnex-card" style={{ backgroundColor: 'var(--agnex-base)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', marginBottom: '1rem' }}>
                MODEL // 01
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                End-to-End System Build
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                From architectural discovery through production launch, we take full ownership of designing, building, and delivering your custom software or digital product.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--agnex-white)' }}>
                <li>✓ Defined milestones & deliverables</li>
                <li>✓ Full source code & IP ownership</li>
                <li>✓ Post-launch SLA & warranty</li>
              </ul>
            </div>

            <div className="agnex-card" style={{ backgroundColor: 'var(--agnex-base)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', marginBottom: '1rem' }}>
                MODEL // 02
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Architecture & Modernization
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Refactor brittle legacy systems, optimize slow databases, integrate third-party APIs, and migrate monolithic applications to high-availability cloud microservices.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--agnex-white)' }}>
                <li>✓ Zero-downtime transition plans</li>
                <li>✓ Security & performance audits</li>
                <li>✓ Modern scalable design patterns</li>
              </ul>
            </div>

            <div className="agnex-card" style={{ backgroundColor: 'var(--agnex-base)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', marginBottom: '1rem' }}>
                MODEL // 03
              </div>
              <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Dedicated Engineering Pod
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Embed senior software architects, frontend engineers, and backend specialists directly alongside your internal team to accelerate critical roadmap initiatives.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: 'var(--text-xs)', color: 'var(--agnex-white)' }}>
                <li>✓ Senior engineers only</li>
                <li>✓ Seamless sprint & workflow integration</li>
                <li>✓ Flexible scale-up capacity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="agnex-section" style={{ textAlign: 'center', backgroundColor: 'var(--agnex-base)' }}>
        <div className="agnex-container">
          <ScrollFade>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--agnex-white)', marginBottom: '1.25rem' }}>
                Need an engineering assessment?
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Share your operational requirements with our team. We'll outline an architectural proposal and delivery timeline.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '0.875rem 2.25rem' }}>
                <span>Start a Project Consultation</span>
                <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
