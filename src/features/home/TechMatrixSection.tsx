const stackCategories = [
  {
    pillar: '01 / DIGITAL',
    name: 'Frontend & Digital Flagships',
    tech: ['React 19', 'TypeScript', 'Vite', 'Next.js', 'Semantic HTML5', 'Vanilla CSS', 'Tailwind CSS', 'Framer Motion'],
    standard: 'Sub-second LCP, 0ms CLS, 100% WCAG 2.1 AA accessible'
  },
  {
    pillar: '02 / SYSTEMS',
    name: 'Core Services & Operational Backends',
    tech: ['Go (Golang)', 'Node.js / Express', 'Python (FastAPI)', 'RESTful Endpoints', 'GraphQL', 'BullMQ & Redis Streams'],
    standard: 'Deterministic ACID transactions, distributed locking, idempotent APIs'
  },
  {
    pillar: '03 / INTELLIGENCE',
    name: 'Data Architecture & Practical AI',
    tech: ['PostgreSQL / Lakebase', 'pgvector', 'Redis 7', 'Local Quantized LLMs', 'Schema Extraction Pipelines', 'Prometheus & Loki'],
    standard: 'Strict data governance, zero public model leakage, audited privacy perimeters'
  },
  {
    pillar: '04 / ENGINEERING',
    name: 'Cloud Infrastructure & Reliability',
    tech: ['Docker & Rootless Pods', 'Kubernetes (K8s)', 'Cloudflare Edge', 'AWS & Multi-Cloud', 'Automated CI/CD Pipelines', 'Zero-Trust Networks'],
    standard: '99.99% availability SLA, automated regression testing, immutable infrastructure'
  }
];

export default function TechMatrixSection() {
  return (
    <section
      className="agnex-section tech-matrix-section"
      style={{
        backgroundColor: 'var(--agnex-base-raised)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
            Technical Capabilities Ledger
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem'
            }}
          >
            <div>
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: '0.75rem' }}>
                Engineering Standards & Stack
              </h2>
              <p style={{ maxWidth: '640px', margin: 0 }}>
                We choose tools based on operational longevity, strict typing, and runtime predictability — never hype.
              </p>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--agnex-steel)'
              }}
            >
              COMPATIBILITY: ENTERPRISE-GRADE // STRICT_TYPE: ON
            </div>
          </div>
        </div>

        {/* 4-Pillar Matrix Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {stackCategories.map((cat, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--agnex-black)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--agnex-accent)',
                    marginBottom: '0.5rem'
                  }}
                >
                  {cat.pillar}
                </div>

                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: 'var(--agnex-white)',
                    marginBottom: '1.25rem'
                  }}
                >
                  {cat.name}
                </h3>

                {/* Tech chips */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
                  {cat.tech.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--agnex-steel-light)',
                        backgroundColor: 'var(--agnex-base-raised)',
                        border: '1px solid var(--border-color)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standard specification */}
              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--agnex-steel)',
                  lineHeight: 1.5
                }}
              >
                <span style={{ color: 'var(--agnex-white)', fontWeight: 600 }}>Standard: </span>
                {cat.standard}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
