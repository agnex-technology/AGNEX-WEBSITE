import { SectionLabel } from '../../components/primitives';

interface TechLayer {
  category: string;
  number: string;
  items: string[];
  rationale: string;
}

const techLayers: TechLayer[] = [
  {
    category: 'FRONTEND',
    number: '01',
    items: ['React 19', 'Next.js', 'TypeScript', 'Vite', 'Framer Motion'],
    rationale: 'Sub-second compilation, strict client-side typing, and zero layout shift rendering.'
  },
  {
    category: 'BACKEND',
    number: '02',
    items: ['Node.js', 'Express', 'REST & GraphQL APIs', 'PostgreSQL', 'Redis Streams'],
    rationale: 'Deterministic transactions, idempotent API contracts, and high-throughput connection pooling.'
  },
  {
    category: 'INTELLIGENCE',
    number: '03',
    items: ['Private AI Gateways', 'Workflow Automation', 'Predictive Analytics', 'pgvector'],
    rationale: 'Strict data privacy boundaries, anti-hallucination verification, and deterministic pipelines.'
  },
  {
    category: 'INFRASTRUCTURE',
    number: '04',
    items: ['Cloud Platforms', 'CI/CD Pipelines', 'Docker', 'Telemetry & Monitoring', 'Security Hardening'],
    rationale: 'Immutable deployments, zero-trust perimeter enforcement, and proactive error telemetry.'
  }
];

export default function TechMatrixSection() {
  return (
    <section
      id="technology"
      className="agnex-section"
      style={{
        backgroundColor: 'var(--agnex-canvas-subtle)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(5rem, 8vw, 8.5rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8.5rem)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <SectionLabel number="05" label="Technology Stack" />
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4.25rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--agnex-navy)',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            THE STACK AS AN<br />
            EVOLVING SYSTEM.
          </h2>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
              marginTop: '1.5rem',
              lineHeight: 1.6
            }}
          >
            We do not maintain a decorative wall of logos. We choose tools with strict typing, deterministic runtimes, and proven enterprise reliability.
          </p>
        </div>

        {/* 4-Layer Architectural System Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {techLayers.map((layer) => (
            <div
              key={layer.category}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-xs)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.2s ease'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '0.85rem',
                    marginBottom: '1.5rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-blue)',
                      letterSpacing: '0.08em'
                    }}
                  >
                    LAYER [{layer.number}]
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-navy)'
                    }}
                  >
                    {layer.category}
                  </span>
                </div>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '2rem'
                  }}
                >
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--agnex-navy)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <span style={{ color: 'var(--agnex-blue)' }}>//</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-color)',
                  paddingTop: '1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5
                }}
              >
                {layer.rationale}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
