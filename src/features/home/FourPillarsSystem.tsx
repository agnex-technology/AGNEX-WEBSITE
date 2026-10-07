import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Pillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  problem: string;
  target: string;
  capabilities: string[];
  outcome: string;
  route: string;
  diagramType: 'digital' | 'systems' | 'intelligence' | 'engineering';
}

const pillars: Pillar[] = [
  {
    id: 'digital',
    number: '01',
    title: 'DIGITAL',
    tagline: 'Turn attention into measurable business.',
    problem: 'Generic templates and slow, bloated frontends fail to engage enterprise buyers or support complex user journeys.',
    target: 'Growth-stage companies, venture-backed startups, and enterprises launching new digital flagships.',
    capabilities: [
      'High-performance React 19 & TypeScript flagships',
      'Sub-second edge caching & zero layout shift (CLS < 0.01)',
      'Cross-platform mobile applications (React Native / Native)',
      'WCAG 2.1 AA accessibility compliant design systems'
    ],
    outcome: 'Sub-second load times, superior conversion rates, and a brand experience that commands enterprise trust.',
    route: '/expertise#digital',
    diagramType: 'digital'
  },
  {
    id: 'systems',
    number: '02',
    title: 'SYSTEMS',
    tagline: 'Connect operations into unified software.',
    problem: 'Teams waste thousands of hours manually copying data between disconnected spreadsheets, legacy software, and fragmented silos.',
    target: 'SMEs, manufacturing, distribution networks, and operations teams outgrowing off-the-shelf tools.',
    capabilities: [
      'Bespoke ERP platforms tailored to real operations',
      'Custom CRM & customer relationship engines',
      'Multi-node inventory & warehouse reconciliation',
      'Automated billing, invoicing & payment sync'
    ],
    outcome: 'A single, dependable source of operational truth with zero double-entry and real-time ledger visibility.',
    route: '/expertise#systems',
    diagramType: 'systems'
  },
  {
    id: 'intelligence',
    number: '03',
    title: 'INTELLIGENCE',
    tagline: 'Eliminate repetitive work with practical AI.',
    problem: 'Companies struggle to harness AI safely without leaking proprietary data to public models or spending on vanity gimmicks.',
    target: 'Founders, knowledge teams, customer support operations, and data-heavy enterprises.',
    capabilities: [
      'Domain-specific workflow automation & trigger actions',
      'Intelligent document & invoice parsing pipelines',
      'Predictive analytics & operational anomaly monitors',
      'Private, zero-leakage local LLM orchestration'
    ],
    outcome: 'Immediate operational leverage, hours of manual cognitive work reclaimed weekly, and strict data governance.',
    route: '/expertise#intelligence',
    diagramType: 'intelligence'
  },
  {
    id: 'engineering',
    number: '04',
    title: 'ENGINEERING',
    tagline: 'Scale reliably without architectural fragility.',
    problem: 'Fragile monoliths and undocumented integrations crash during traffic spikes and paralyze developer velocity.',
    target: 'CTOs, VP of Engineering, platforms undergoing scale, and organizations tackling legacy technical debt.',
    capabilities: [
      'High-throughput REST & GraphQL microservices',
      'Elastic Kubernetes & rootless container deployments',
      'Automated CI/CD pipelines & zero-trust security audits',
      'Database sharding, read-replicas & disaster recovery'
    ],
    outcome: 'Fault-tolerant infrastructure designed to scale throughput effortlessly with 99.99% uptime availability.',
    route: '/expertise#engineering',
    diagramType: 'engineering'
  }
];

export default function FourPillarsSystem() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const active = pillars[selectedIdx];

  return (
    <section
      className="agnex-section four-pillars-section"
      style={{
        backgroundColor: 'var(--agnex-black)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Editorial Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
            Unified Engineering System
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
                Four Pillars. One System.
              </h2>
              <p style={{ maxWidth: '640px', margin: 0 }}>
                Explore how our four core disciplines interconnect to transform business friction into reliable digital infrastructure.
              </p>
            </div>

            {/* Systems Status Indicator */}
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--agnex-steel)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: 'var(--agnex-base-raised)',
                padding: '0.5rem 1rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-xs)'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--agnex-accent)' }} />
              <span>ACTIVE_PILLAR: {active.number} / {active.title}</span>
            </div>
          </div>
        </div>

        {/* Pillar Navigation System (Horizontal Rail) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            backgroundColor: 'var(--border-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            marginBottom: '2.5rem'
          }}
          className="pillars-nav-rail"
          role="tablist"
          aria-label="Capabilities Pillars"
        >
          {pillars.map((p, idx) => {
            const isCurrent = selectedIdx === idx;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedIdx(idx)}
                role="tab"
                aria-selected={isCurrent}
                style={{
                  backgroundColor: isCurrent ? 'var(--agnex-base-raised)' : 'var(--agnex-black)',
                  border: 'none',
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  textAlign: 'left',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {/* Active Indicator Top Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: isCurrent ? 'var(--agnex-accent)' : 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}
                />
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: isCurrent ? 'var(--agnex-accent)' : 'var(--agnex-steel)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {p.number}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 600,
                    color: isCurrent ? 'var(--agnex-white)' : 'var(--agnex-steel)',
                    letterSpacing: 'var(--tracking-tight)'
                  }}
                >
                  {p.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Pillar System Exploration Console */}
        <div
          style={{
            backgroundColor: 'var(--agnex-base-raised)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: 'clamp(1.75rem, 3.5vw, 3rem)'
          }}
        >
          <div
            style={{
              display: 'grid',
              gap: 'clamp(2rem, 3.5vw, 3.5rem)',
              alignItems: 'center'
            }}
            className="pillars-grid-container"
          >
            {/* Left 6 Columns: Narrative, Problem, Capabilities, Business Outcome */}
            <div
              style={{ minWidth: 0 }}
              className="pillar-content-col"
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--agnex-accent)',
                  marginBottom: '0.5rem',
                  letterSpacing: '0.08em'
                }}
              >
                CAPABILITY DOMAIN {active.number} // {active.title}
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.5rem)',
                  fontWeight: 600,
                  color: 'var(--agnex-white)',
                  marginBottom: '0.5rem',
                  lineHeight: 1.15
                }}
              >
                {active.tagline}
              </h3>

              {/* The Root Problem Addressed */}
              <div
                style={{
                  backgroundColor: 'var(--agnex-black)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1rem 1.25rem',
                  marginBottom: '1.75rem'
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--text-2xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--agnex-steel)',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  THE OPERATIONAL CHALLENGE
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                  {active.problem}
                </p>
              </div>

              {/* Engineered Capabilities List */}
              <div style={{ marginBottom: '2rem' }}>
                <div
                  style={{
                    fontSize: 'var(--text-2xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--agnex-steel)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  ENGINEERED DELIVERABLES
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem'
                  }}
                >
                  {active.capabilities.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--agnex-white)',
                        lineHeight: 1.5
                      }}
                    >
                      <span style={{ color: 'var(--agnex-accent)', fontFamily: 'var(--font-mono)', fontSize: '11px', marginTop: '2px' }}>
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Outcome & Action Link */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                <div style={{ maxWidth: '380px' }}>
                  <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    ENTERPRISE OUTCOME
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-white)', marginTop: '2px' }}>
                    {active.outcome}
                  </div>
                </div>

                <Link to={active.route} className="btn btn-secondary">
                  <span>Explore {active.title} Specs</span>
                  <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
                </Link>
              </div>
            </div>

            {/* Right 6 Columns: Interactive SVG System Schematic */}
            <div
              style={{ minWidth: 0 }}
              className="pillar-diagram-col"
            >
              <div
                style={{
                  backgroundColor: 'var(--agnex-black)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  padding: 'clamp(1rem, 2vw, 1.75rem)',
                  position: 'relative'
                }}
              >
                <svg
                  viewBox="0 0 540 380"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  aria-label={`${active.title} System Architecture Schematic`}
                >
                  {/* Grid framework */}
                  <rect x="10" y="10" width="520" height="360" stroke="#20242B" strokeWidth="1" />
                  <line x1="10" y1="190" x2="530" y2="190" stroke="#20242B" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="270" y1="10" x2="270" y2="370" stroke="#20242B" strokeWidth="1" strokeDasharray="3 3" />

                  {/* SCHEMATIC 01: DIGITAL ARCHITECTURE */}
                  {active.diagramType === 'digital' && (
                    <g className="schematic-digital">
                      {/* Client Request Node */}
                      <g transform="translate(40, 60)">
                        <rect x="0" y="0" width="120" height="60" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="12" y="24" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">CLIENT / USER</text>
                        <text x="12" y="42" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Web & Mobile Access</text>
                      </g>

                      {/* Edge Network Router */}
                      <line x1="160" y1="90" x2="210" y2="90" stroke="#057AEF" strokeWidth="2" />
                      <g transform="translate(210, 50)">
                        <rect x="0" y="0" width="130" height="80" fill="#12151B" stroke="#057AEF" strokeWidth="1.5" />
                        <text x="12" y="24" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">EDGE CDN MESH</text>
                        <text x="12" y="44" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Sub-Second Cache</text>
                        <text x="12" y="62" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Latency: &lt; 40ms</text>
                      </g>

                      {/* SSR & Hydration Engine */}
                      <path d="M 340 90 L 380 90 L 380 180" stroke="#F7F8FA" strokeWidth="1.5" />
                      <g transform="translate(320, 180)">
                        <rect x="0" y="0" width="160" height="75" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="14" y="24" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">REACT 19 HYDRATION</text>
                        <text x="14" y="42" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Semantic HTML5</text>
                        <text x="14" y="60" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">CLS = 0.00 / Perfect LCP</text>
                      </g>

                      {/* Accessible Design Tokens */}
                      <g transform="translate(40, 240)">
                        <rect x="0" y="0" width="190" height="80" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="14" y="24" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">DESIGN SYSTEM TOKENS</text>
                        <text x="14" y="44" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">WCAG 2.1 AA Compliance</text>
                        <text x="14" y="62" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Touch Targets &gt;= 44px</text>
                      </g>
                    </g>
                  )}

                  {/* SCHEMATIC 02: SYSTEMS ARCHITECTURE */}
                  {active.diagramType === 'systems' && (
                    <g className="schematic-systems">
                      {/* Operations Ledger */}
                      <g transform="translate(40, 60)">
                        <rect x="0" y="0" width="140" height="70" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="12" y="24" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">INVENTORY / ERP</text>
                        <text x="12" y="42" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Multi-Warehouse Sync</text>
                        <text x="12" y="58" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Atomic Ledger Locks</text>
                      </g>

                      {/* Connect to Event Bus */}
                      <line x1="180" y1="95" x2="230" y2="95" stroke="#F7F8FA" strokeWidth="2" />
                      <g transform="translate(230, 60)">
                        <rect x="0" y="0" width="120" height="70" fill="#12151B" stroke="#057AEF" strokeWidth="1.5" />
                        <text x="12" y="24" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">EVENT QUEUE</text>
                        <text x="12" y="44" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Redis / Streams</text>
                        <text x="12" y="58" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Zero Dropped Msgs</text>
                      </g>

                      {/* Direct API Bridges */}
                      <line x1="350" y1="95" x2="400" y2="95" stroke="#057AEF" strokeWidth="2" />
                      <g transform="translate(400, 60)">
                        <rect x="0" y="0" width="100" height="70" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="10" y="24" fill="#F7F8FA" fontSize="10" fontFamily="'Space Grotesk', sans-serif">CRM / BILLING</text>
                        <text x="10" y="42" fill="#7C8490" fontSize="8" fontFamily="'JetBrains Mono', monospace">Auto-Invoice</text>
                        <text x="10" y="56" fill="#10B981" fontSize="8" fontFamily="'JetBrains Mono', monospace">Real-time</text>
                      </g>

                      {/* Lakebase Postgres Vault */}
                      <g transform="translate(130, 210)">
                        <rect x="0" y="0" width="280" height="90" fill="#0B0D10" stroke="#057AEF" strokeWidth="2" />
                        <text x="16" y="28" fill="#057AEF" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">POSTGRES LAKEBASE PERSISTENCE</text>
                        <text x="16" y="52" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace">Row-Level Security (RLS) & Audit Logging</text>
                        <text x="16" y="72" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Consistent ACID Transactions Across Warehouses</text>
                      </g>
                    </g>
                  )}

                  {/* SCHEMATIC 03: INTELLIGENCE ARCHITECTURE */}
                  {active.diagramType === 'intelligence' && (
                    <g className="schematic-intelligence">
                      {/* Document / Event Ingestion */}
                      <g transform="translate(40, 80)">
                        <rect x="0" y="0" width="130" height="70" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="12" y="24" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">RAW INGESTION</text>
                        <text x="12" y="42" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">PDFs / APIs / Logs</text>
                        <text x="12" y="58" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Streaming Flow</text>
                      </g>

                      {/* Secure Tokenizer & Parser */}
                      <line x1="170" y1="115" x2="220" y2="115" stroke="#F7F8FA" strokeWidth="2" />
                      <g transform="translate(220, 70)">
                        <rect x="0" y="0" width="140" height="90" fill="#12151B" stroke="#057AEF" strokeWidth="1.5" />
                        <text x="12" y="24" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">PARSING ENGINE</text>
                        <text x="12" y="44" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Schema Extraction</text>
                        <text x="12" y="60" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Vector Embeddings</text>
                        <text x="12" y="78" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Strict PII Redaction</text>
                      </g>

                      {/* Deterministic Action Output */}
                      <line x1="360" y1="115" x2="410" y2="115" stroke="#057AEF" strokeWidth="2" />
                      <g transform="translate(410, 80)">
                        <rect x="0" y="0" width="100" height="70" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="10" y="24" fill="#F7F8FA" fontSize="10" fontFamily="'Space Grotesk', sans-serif">WORKFLOW</text>
                        <text x="10" y="42" fill="#057AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace">Action Executed</text>
                        <text x="10" y="58" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Zero Hallucination</text>
                      </g>

                      {/* Governance Boundary */}
                      <g transform="translate(80, 230)">
                        <rect x="0" y="0" width="380" height="70" stroke="#2E343E" strokeWidth="1" strokeDasharray="3 3" fill="#151820" />
                        <text x="16" y="28" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">DATA PRIVACY BOUNDARY</text>
                        <text x="16" y="48" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Isolated Enterprise Context — Never Trained on Public Models</text>
                      </g>
                    </g>
                  )}

                  {/* SCHEMATIC 04: ENGINEERING ARCHITECTURE */}
                  {active.diagramType === 'engineering' && (
                    <g className="schematic-engineering">
                      {/* Load Balancer Ingress */}
                      <g transform="translate(40, 140)">
                        <rect x="0" y="0" width="120" height="70" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="12" y="24" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">EDGE INGRESS</text>
                        <text x="12" y="42" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">TLS 1.3 Termination</text>
                        <text x="12" y="58" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">WAF & DDoS Shield</text>
                      </g>

                      {/* Microservices Pod Fleet */}
                      <line x1="160" y1="175" x2="210" y2="175" stroke="#F7F8FA" strokeWidth="2" />
                      <g transform="translate(210, 80)">
                        <rect x="0" y="0" width="160" height="190" fill="#12151B" stroke="#057AEF" strokeWidth="2" />
                        <text x="14" y="26" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">KUBERNETES FLEET</text>
                        <rect x="14" y="40" width="132" height="35" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="22" y="62" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Pod 01: Core API</text>
                        <rect x="14" y="85" width="132" height="35" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="22" y="107" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Pod 02: Workers</text>
                        <rect x="14" y="130" width="132" height="35" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="22" y="152" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Auto-Scaler (HPA)</text>
                      </g>

                      {/* Multi-Region Replication */}
                      <line x1="370" y1="175" x2="420" y2="175" stroke="#057AEF" strokeWidth="2" />
                      <g transform="translate(420, 130)">
                        <rect x="0" y="0" width="90" height="90" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                        <text x="8" y="24" fill="#F7F8FA" fontSize="9" fontFamily="'Space Grotesk', sans-serif">REPLICAS</text>
                        <text x="8" y="44" fill="#057AEF" fontSize="8" fontFamily="'JetBrains Mono', monospace">Multi-Region</text>
                        <text x="8" y="62" fill="#10B981" fontSize="8" fontFamily="'JetBrains Mono', monospace">99.99% SLA</text>
                      </g>
                    </g>
                  )}

                  {/* Architectural Footer */}
                  <g transform="translate(20, 350)">
                    <text x="0" y="0" fill="#4A515D" fontSize="9" fontFamily="'JetBrains Mono', monospace">
                      SYSTEM_CADENCE: ACTIVE // SPECIFICATION: {active.title} // TOPOGRAPHY_LAYER_0{selectedIdx + 1}
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pillars-grid-container {
          grid-template-columns: 1fr;
        }
        .pillar-content-col,
        .pillar-diagram-col {
          grid-column: 1 / -1;
          min-width: 0;
          max-width: 100%;
        }
        @media (min-width: 1024px) {
          .pillars-grid-container {
            grid-template-columns: repeat(12, 1fr);
          }
          .pillar-content-col {
            grid-column: span 6 !important;
          }
          .pillar-diagram-col {
            grid-column: span 6 !important;
          }
        }
        @media (max-width: 768px) {
          .pillars-nav-rail {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
