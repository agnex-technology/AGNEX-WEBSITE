import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, SectionLabel, TechnicalLabel, Button } from '../components/primitives';
import ScrollFade from '../components/motion/ScrollFade';

export default function Solutions() {
  const solutions = [
    {
      code: 'SOL//01',
      title: 'Enterprise Resource Planning (ERP)',
      headline: 'Unified Operational Core for Complex Business Logistics',
      description: 'Replace fragmented spreadsheets and disconnected departments with a unified operational backbone engineered around your exact manufacturing, distribution, and financial accounting pipelines.',
      modules: [
        'Real-time double-entry inventory ledger with multi-warehouse tracking',
        'Automated procurement with safety-threshold purchase order triggers',
        'Integrated billing, GST/tax reconciliation, and payment settlement audit trails',
        'Role-Based Access Control (RBAC) across dispatchers, warehouse staff, and leadership'
      ],
      link: '/services/erp-development'
    },
    {
      code: 'SOL//02',
      title: 'Customer Relationship Systems (CRM)',
      headline: 'High-Velocity Sales Pipelines Without SaaS Seat Taxes',
      description: 'Capture leads, orchestrate deal stages, and preserve full client interaction histories across WhatsApp, email, and phone calls without paying escalating monthly per-user licensing fees.',
      modules: [
        'Interactive drag-and-drop opportunity pipelines with stage validation rules',
        'Omnichannel customer timeline capturing emails, WhatsApp, and call transcripts',
        'One-click automated proposal, quote, and service contract generation',
        'Predictable pipeline revenue forecasting and sales representative conversion telemetry'
      ],
      link: '/services/crm-development'
    },
    {
      code: 'SOL//03',
      title: 'Intelligent Business Automation',
      headline: 'Deterministic Event Pipelines & Asynchronous Task Queues',
      description: 'Eliminate repetitive manual administration across accounting, customer verification, and compliance filings with reliable, code-level backend automation pipelines.',
      modules: [
        'Distributed BullMQ message queues ensuring 0% dropped transactions during traffic spikes',
        'Automated invoice and receipt extraction (OCR) feeding database ledgers directly',
        'Cryptographically signed webhook brokers synchronizing external platforms',
        'Human-in-the-loop review queues for high-value financial or compliance thresholds'
      ],
      link: '/services/business-automation'
    },
    {
      code: 'SOL//04',
      title: 'Scalable Cloud Platforms & APIs',
      headline: 'Fault-Tolerant Microservices & High-Throughput Gateways',
      description: 'Architecting resilient cloud-native backbones engineered to handle heavy operational concurrency with sub-second response times, zero downtime, and complete code ownership.',
      modules: [
        'Load-balanced Docker container clusters across AWS and hardened Linux servers',
        'PostgreSQL connection pooling, read replicas, and point-in-time recovery backups',
        'Strict OWASP ASVS Level 3 security posture with automated vulnerability scans',
        'Automated GitHub Actions CI/CD pipelines deploying zero-downtime releases'
      ],
      link: '/services/cloud-engineering'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Business Solutions Architecture | AGNEX Technology</title>
        <meta
          name="description"
          content="AGNEX Technology designs and engineers bespoke business solutions: custom ERP, CRM, workflow automation, and scalable cloud platforms tailored to your operational reality."
        />
        <link rel="canonical" href="https://agnextechnology.com/solutions" />
        <meta property="og:title" content="Business Solutions Architecture | AGNEX Technology" />
        <meta
          property="og:description"
          content="Bespoke enterprise software architectures engineered around how your business actually operates."
        />
        <meta property="og:url" content="https://agnextechnology.com/solutions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agnextechnology.com/brand/agnex-og.png" />
      </Helmet>

      {/* 01 — HERO */}
      <section
        className="agnex-section"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 3rem)',
          backgroundColor: 'var(--agnex-canvas)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <SectionLabel number="ARCHITECTURE" text="BUSINESS SOLUTIONS" />
              <TechnicalLabel code="SYS//ENTERPRISE_SOLUTIONS" status="OPERATIONAL" />
            </div>

            <div style={{ maxWidth: '920px' }}>
              <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: 'var(--agnex-navy)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                Software Engineered Around Your Actual Operating Reality.
              </h1>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '2.5rem' }}>
                Off-the-shelf software forces growing companies to distort their workflows to fit rigid third-party software constraints. AGNEX engineers bespoke enterprise platforms built strictly around your operational advantages.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Button to="/contact" variant="primary">
                  Start Technical Discovery
                </Button>
                <Button to="/work" variant="outline">
                  Inspect Case Studies
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* 02 — THE 4 PILLAR SOLUTIONS */}
      <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '3.5rem' }}>
              <div>
                <SectionLabel number="01" text="CORE ARCHITECTURES" />
                <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginTop: '0.5rem', marginBottom: 0 }}>
                  Tailored Systems Built for High-Stakes Operations
                </h2>
              </div>
              <TechnicalLabel code="DISCIPLINE//SYSTEMS" />
            </div>
          </ScrollFade>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {solutions.map((sol, idx) => (
              <ScrollFade key={sol.code} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'clamp(2rem, 4vw, 3rem)',
                    boxShadow: 'var(--shadow-subtle)',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                      {sol.code} // SOLUTION
                    </div>
                    <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                      {sol.title}
                    </h3>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '1.25rem' }}>
                      {sol.headline}
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
                      {sol.description}
                    </p>
                    <Link
                      to={sol.link}
                      className="agnex-link"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <span>Explore Technical Specification</span>
                      <span>→</span>
                    </Link>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--agnex-canvas-subtle)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '2rem'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-navy)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '0.05em' }}>
                      VERIFIED SYSTEM CAPABILITIES:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {sol.modules.map((mod, i) => (
                        <li key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-navy)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--agnex-blue)', fontWeight: 700, marginTop: '1px' }}>✓</span>
                          <span>{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — ARCHITECTURAL COMPARISON MATRIX */}
      <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <SectionLabel number="02" text="PARADIGM COMPARISON" />
                <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginTop: '0.5rem', marginBottom: 0 }}>
                  Custom AGNEX System vs Commercial Off-The-Shelf SaaS
                </h2>
              </div>
              <TechnicalLabel code="EVAL//SOVEREIGNTY" status="COMPARATIVE" />
            </div>

            <div style={{ overflowX: 'auto', marginTop: '2.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--agnex-navy)' }}>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>CRITERIA</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)' }}>AGNEX CUSTOM ARCHITECTURE</th>
                    <th style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>COMMERCIAL SAAS (SAP/HUBSPOT)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { criteria: 'IP & Code Ownership', agnex: '100% Owned by Your Company', saas: 'Rented platform, zero code ownership' },
                    { criteria: 'Recurring Per-User Cost', agnex: 'Zero per-seat licensing fees forever', saas: 'Steep monthly costs scaling per user' },
                    { criteria: 'Operational Fit', agnex: 'Engineered exactly around your workflows', saas: 'Forces your business into rigid templates' },
                    { criteria: 'Data Sovereignty', agnex: 'Your private AWS/Postgres database VPC', saas: 'Shared multi-tenant database infrastructure' },
                    { criteria: 'Custom Integrations', agnex: 'Direct database & webhook access', saas: 'Constrained by rate-limited public APIs' }
                  ].map((row, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1.25rem 1rem', fontWeight: 600, color: 'var(--agnex-navy)', fontSize: 'var(--text-sm)' }}>{row.criteria}</td>
                      <td style={{ padding: '1.25rem 1rem', color: 'var(--agnex-blue)', fontWeight: 600, fontSize: 'var(--text-sm)', backgroundColor: 'var(--agnex-canvas-subtle)' }}>{row.agnex}</td>
                      <td style={{ padding: '1.25rem 1rem', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{row.saas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* 04 — CTA */}
      <section className="agnex-section agnex-section-subtle">
        <Container>
          <ScrollFade>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                NEXT STEP // ARCHITECTURAL ASSESSMENT
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
                Let's Architect Your Operational Backbone.
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Schedule a direct technical session with our systems architect. We review your current bottlenecks and propose a structured delivery roadmap.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/contact" variant="primary">
                  Book Technical Discovery
                </Button>
                <Button to="/services" variant="outline">
                  Browse All 8 Services
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>
    </>
  );
}
