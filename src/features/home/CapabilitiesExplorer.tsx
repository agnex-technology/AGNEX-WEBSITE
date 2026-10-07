import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionLabel } from '../../components/primitives';

interface Capability {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  bulletItems: string[];
  route: string;
  diagramType: 'digital' | 'systems' | 'intelligence' | 'engineering';
}

const capabilities: Capability[] = [
  {
    id: 'digital',
    number: '01',
    title: 'DIGITAL PRODUCTS',
    subtitle: 'Websites, web applications, mobile applications & custom digital experiences.',
    summary: 'We build high-speed, human-centric interfaces and responsive applications engineered for performance, precision rendering, and real user utility.',
    bulletItems: [
      'High-performance React & TypeScript flagships',
      'Native and cross-platform mobile applications',
      'Accessible, token-driven design systems',
      'Sub-second edge caching & zero layout shift'
    ],
    route: '/expertise',
    diagramType: 'digital'
  },
  {
    id: 'systems',
    number: '02',
    title: 'BUSINESS SYSTEMS',
    subtitle: 'ERP, CRM, inventory, billing, workflow & operational software.',
    summary: 'We eliminate manual friction, disconnected spreadsheets, and fragmented silos by engineering custom software that acts as a single operational source of truth.',
    bulletItems: [
      'Tailored ERP platforms mapped to company workflows',
      'High-throughput inventory & dispatch reconciliation',
      'Automated invoicing, accounting & payment engines',
      'Role-based access control & immutable audit logs'
    ],
    route: '/expertise',
    diagramType: 'systems'
  },
  {
    id: 'intelligence',
    number: '03',
    title: 'INTELLIGENT SYSTEMS',
    subtitle: 'AI, automation, analytics & data-driven operational workflows.',
    summary: 'We implement practical, verifiable intelligence that automates complex cognitive tasks, verifies data accuracy, and extracts actionable insight from company data.',
    bulletItems: [
      'Deterministic workflow automation pipelines',
      'Intelligent document and record extraction',
      'Zero-leakage private LLM orchestration',
      'Predictive analytics & operational anomaly detection'
    ],
    route: '/expertise',
    diagramType: 'intelligence'
  },
  {
    id: 'engineering',
    number: '04',
    title: 'ENGINEERING',
    subtitle: 'Architecture, APIs, integrations, cloud infrastructure & consulting.',
    summary: 'We architect resilient backends, fault-tolerant APIs, and secure infrastructure designed to handle peak load without downtime or technical debt.',
    bulletItems: [
      'High-throughput REST & GraphQL microservices',
      'Scalable cloud infrastructure & container orchestration',
      'Zero-trust security architecture & SAST validation',
      'PostgreSQL optimization, indexing & event queues'
    ],
    route: '/expertise',
    diagramType: 'engineering'
  }
];

export default function CapabilitiesExplorer() {
  const [activeId, setActiveId] = useState<string>('digital');
  const activeCap = capabilities.find((c) => c.id === activeId) || capabilities[0];

  return (
    <section
      id="capabilities"
      className="agnex-section"
      style={{
        backgroundColor: 'var(--agnex-canvas)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(4rem, 7vw, 7.5rem)',
        paddingBottom: 'clamp(4rem, 7vw, 7.5rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="agnex-container">
        {/* Continuous Blue Signal Connector from Hero */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--agnex-blue)' }} />
            <div style={{ width: '120px', height: '2px', backgroundColor: 'var(--agnex-blue)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xs)', color: 'var(--agnex-blue)', letterSpacing: '0.1em' }}>
              SIGNAL::BRANCH_EXPLORER
            </span>
          </div>

          <SectionLabel number="01" label="Capabilities" />

          {/* Master Section Headline */}
          <h2
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3.25rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--agnex-navy)',
              maxWidth: '850px',
              marginBottom: '1.25rem',
              textTransform: 'uppercase'
            }}
          >
            WE TURN COMPLEX PROBLEMS INTO ENGINEERED SYSTEMS.
          </h2>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
              maxWidth: '680px',
              lineHeight: 1.65,
              margin: 0
            }}
          >
            From digital products to internal business platforms and intelligent automation, AGNEX works across strategy, design and engineering to build technology that is useful in the real world.
          </p>
        </div>

        {/* Interactive Editorial Capability Explorer (Zero boring cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '3rem'
          }}
        >
          {/* Left Column: Architectural Capability Selector List */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
            className="capabilities-selector-col"
          >
            {capabilities.map((cap) => {
              const isActive = cap.id === activeId;
              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveId(cap.id)}
                  onMouseEnter={() => setActiveId(cap.id)}
                  style={{
                    padding: '1.5rem 0',
                    borderBottom: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                  data-cursor="hover"
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 600,
                        color: isActive ? 'var(--agnex-blue)' : 'var(--text-muted)',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {cap.number}
                    </span>
                    <h3
                      style={{
                        fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: isActive ? 'var(--agnex-blue)' : 'var(--agnex-navy)',
                        margin: 0,
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {cap.title}
                    </h3>
                  </div>

                  {/* Subtitle preview visible under item */}
                  <p
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: isActive ? 'var(--agnex-navy)' : 'var(--text-muted)',
                      marginTop: '0.5rem',
                      marginLeft: '2.5rem',
                      marginBottom: 0,
                      transition: 'color 0.2s ease'
                    }}
                  >
                    {cap.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Architectural Visual Inspection Console */}
          <div
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'var(--agnex-canvas-subtle)',
              border: '1px solid var(--border-strong)',
              padding: 'clamp(2rem, 3.5vw, 3rem)',
              position: 'relative'
            }}
            className="capabilities-visual-col"
          >
            {/* Header Telemetry */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '1.25rem',
                marginBottom: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--agnex-blue)' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--agnex-navy)',
                    letterSpacing: '0.08em'
                  }}
                >
                  SYSTEM::{activeCap.number} — {activeCap.title}
                </span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  color: 'var(--agnex-blue)'
                }}
              >
                STATUS: PRODUCTION READY
              </span>
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--agnex-navy)',
                lineHeight: 1.65,
                marginBottom: '2rem'
              }}
            >
              {activeCap.summary}
            </p>

            {/* Architectural Diagram Rendering */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                marginBottom: '2rem',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <CapabilityVisual diagramType={activeCap.diagramType} />
            </div>

            {/* Engineering Specifications List */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '1rem'
                }}
              >
                Engineered Capabilities:
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '0.85rem'
                }}
              >
                {activeCap.bulletItems.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '0.65rem'
                    }}
                  >
                    <span style={{ color: 'var(--agnex-blue)', fontWeight: 700 }}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Link */}
            <Link
              to={activeCap.route}
              className="btn btn-secondary"
              style={{ padding: '0.65rem 1.4rem' }}
            >
              <span>Explore {activeCap.title}</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .capabilities-selector-col {
            grid-column: span 6 !important;
          }
          .capabilities-visual-col {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </section>
  );
}

function CapabilityVisual({ diagramType }: { diagramType: 'digital' | 'systems' | 'intelligence' | 'engineering' }) {
  if (diagramType === 'digital') {
    return (
      <svg viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <rect x="20" y="20" width="440" height="140" stroke="rgba(12, 28, 41, 0.12)" strokeWidth="1" fill="#FFFFFF" />
        <rect x="20" y="20" width="440" height="26" fill="#F8FAFC" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />
        <circle cx="36" cy="33" r="3" fill="#EF4444" />
        <circle cx="48" cy="33" r="3" fill="#F59E0B" />
        <circle cx="60" cy="33" r="3" fill="#10B981" />
        <text x="80" y="36" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">https://client-platform.agnex.app</text>

        <rect x="40" y="65" width="120" height="75" stroke="#017AEF" strokeWidth="1.5" fill="#EBF5FE" />
        <text x="50" y="85" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">REACT 19 SPA</text>
        <text x="50" y="105" fill="#017AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace">CLS &lt; 0.01</text>
        <text x="50" y="125" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">LCP &lt; 850ms</text>

        <line x1="160" y1="102" x2="210" y2="102" stroke="#017AEF" strokeWidth="2" />
        <polygon points="210,98 218,102 210,106" fill="#017AEF" />

        <rect x="220" y="65" width="120" height="75" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
        <text x="230" y="85" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">EDGE CDN</text>
        <text x="230" y="105" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">GLOBAL CACHE</text>
        <text x="230" y="125" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">HTTP/3 TLS 1.3</text>

        <line x1="340" y1="102" x2="380" y2="102" stroke="#0C1C29" strokeWidth="1.5" />
        <rect x="380" y="65" width="60" height="75" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
        <text x="390" y="105" fill="#0C1C29" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="600">USER</text>
      </svg>
    );
  }

  if (diagramType === 'systems') {
    return (
      <svg viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <rect x="30" y="30" width="100" height="120" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
        <text x="40" y="55" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">CRM / LEADS</text>
        <text x="40" y="80" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">REAL-TIME</text>

        <line x1="130" y1="90" x2="190" y2="90" stroke="#017AEF" strokeWidth="2" />
        <polygon points="190,86 198,90 190,94" fill="#017AEF" />

        <rect x="200" y="25" width="120" height="130" stroke="#017AEF" strokeWidth="1.5" fill="#EBF5FE" />
        <text x="210" y="50" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">CORE ERP ENGINE</text>
        <text x="210" y="75" fill="#017AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace">LEDGER SYNC</text>
        <text x="210" y="100" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">DISPATCH STATE</text>
        <text x="210" y="125" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">0% DOUBLE ENTRY</text>

        <line x1="320" y1="90" x2="360" y2="90" stroke="#017AEF" strokeWidth="2" />
        <polygon points="360,86 368,90 360,94" fill="#017AEF" />

        <rect x="370" y="30" width="80" height="120" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
        <text x="378" y="55" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">BILLING</text>
        <text x="378" y="80" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">AUTOMATED</text>
      </svg>
    );
  }

  if (diagramType === 'intelligence') {
    return (
      <svg viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
        <rect x="30" y="40" width="90" height="100" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
        <text x="40" y="65" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">DOC / INPUT</text>
        <text x="40" y="90" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">PARSER</text>

        <line x1="120" y1="90" x2="170" y2="90" stroke="#017AEF" strokeWidth="2" />
        <polygon points="170,86 178,90 170,94" fill="#017AEF" />

        <rect x="180" y="30" width="130" height="120" stroke="#017AEF" strokeWidth="1.5" fill="#EBF5FE" />
        <text x="190" y="55" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">GUARDRAIL GATE</text>
        <text x="190" y="80" fill="#017AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace">STRICT EMBEDDING</text>
        <text x="190" y="105" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">DETERMINISTIC</text>
        <text x="190" y="130" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">ANTI-HALLUCINATE</text>

        <line x1="310" y1="90" x2="360" y2="90" stroke="#017AEF" strokeWidth="2" />
        <polygon points="360,86 368,90 360,94" fill="#017AEF" />

        <rect x="370" y="40" width="80" height="100" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
        <text x="378" y="65" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">WORKFLOW</text>
        <text x="378" y="90" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">TRIGGER</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 480 180" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
      <rect x="30" y="40" width="90" height="100" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
      <text x="40" y="65" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">API GATEWAY</text>
      <text x="40" y="90" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">AUTH & RATE</text>

      <line x1="120" y1="90" x2="170" y2="90" stroke="#017AEF" strokeWidth="2" />
      <polygon points="170,86 178,90 170,94" fill="#017AEF" />

      <rect x="180" y="30" width="130" height="120" stroke="#017AEF" strokeWidth="1.5" fill="#EBF5FE" />
      <text x="190" y="55" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">MICROSERVICES</text>
      <text x="190" y="80" fill="#017AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace">EVENT QUEUES</text>
      <text x="190" y="105" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">POSTGRESQL</text>
      <text x="190" y="130" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">99.99% RESILIENT</text>

      <line x1="310" y1="90" x2="360" y2="90" stroke="#017AEF" strokeWidth="2" />
      <polygon points="360,86 368,90 360,94" fill="#017AEF" />

      <rect x="370" y="40" width="80" height="100" stroke="rgba(12, 28, 41, 0.2)" strokeWidth="1" fill="#FFFFFF" />
      <text x="378" y="65" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">CLOUD</text>
      <text x="378" y="90" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">INFRA</text>
    </svg>
  );
}
