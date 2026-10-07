import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MethodPhase {
  id: string;
  step: string;
  name: string;
  subhead: string;
  description: string;
  deliverables: string[];
  metrics: string;
}

const phases: MethodPhase[] = [
  {
    id: 'understand',
    step: '01',
    name: 'UNDERSTAND',
    subhead: 'Business Problem Diagnostics',
    description: 'We deconstruct your operational bottlenecks, business logic, user friction, and existing data models before prescribing architecture.',
    deliverables: ['Bottleneck audit & friction map', 'Domain model extraction', 'Technical feasibility ledger', 'ROI & SLA baseline'],
    metrics: 'ZERO SPECULATION — PURE LOGICAL DIAGNOSTICS'
  },
  {
    id: 'engineer',
    step: '02',
    name: 'ENGINEER',
    subhead: 'System Architecture & Data Schemas',
    description: 'We blueprint the system topography, database schemas, API contracts, security perimeters, and component specifications with mathematical rigor.',
    deliverables: ['API contract schemas (OpenAPI/GraphQL)', 'Database entity relationships (Postgres)', 'Zero-trust security rules', 'Component design system tokens'],
    metrics: 'FORMAL ARCHITECTURE BEFORE SINGLE LINE OF CODE'
  },
  {
    id: 'build',
    step: '03',
    name: 'BUILD',
    subhead: 'Deterministic Implementation',
    description: 'We craft production software with strict type safety, automated test suites, semantic markup, and zero unnecessary runtime dependencies.',
    deliverables: ['Production-ready TypeScript codebase', 'Automated CI/CD test suites', 'Edge-cached API services', 'WCAG 2.1 AA accessible frontends'],
    metrics: '100% TYPE-SAFE — SUB-SECOND PERFORMANCE'
  },
  {
    id: 'evolve',
    step: '04',
    name: 'EVOLVE',
    subhead: 'Continuous Reliability & Scaling',
    description: 'We deploy to resilient cloud infrastructure, configure real-time telemetry, and partner with your team for continuous operational enhancement.',
    deliverables: ['Real-time telemetry & error observability', 'Elastic container scaling policies', 'Zero-downtime rolling deploys', 'Iterative feature enhancement roadmaps'],
    metrics: '99.99% SYSTEM RESILIENCE & OBSERVABILITY'
  }
];

export default function AgnexMethodSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<SVGSVGElement>(null);

  // Allow GSAP ScrollTrigger to scrub through phases when pinned
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = sectionRef.current;
    const pinEl = pinWrapperRef.current;
    if (!el || !pinEl) return;

    const ctx = gsap.context(() => {
      let lastIndex = 0;
      ScrollTrigger.create({
        trigger: el,
        pin: pinEl,
        start: 'top top',
        end: '+=2000',
        scrub: 0.5,
        snap: {
          snapTo: [0, 0.33, 0.66, 1],
          duration: 0.3,
          ease: 'power1.inOut'
        },
        onUpdate: (self) => {
          const index = Math.min(3, Math.floor(self.progress * 4));
          if (index !== lastIndex) {
            lastIndex = index;
            setActiveStep(index);
          }
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const current = phases[activeStep];

  return (
    <section
      ref={sectionRef}
      className="agnex-section agnex-method-section"
      style={{
        backgroundColor: 'var(--agnex-black)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div
        ref={pinWrapperRef}
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="agnex-container">
        {/* Section Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
            The AGNEX Engineering Method
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
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: '0.5rem' }}>
                How We Engineer
              </h2>
              <p style={{ maxWidth: '580px', margin: 0 }}>
                A disciplined four-phase methodology that eliminates project risk and guarantees architectural durability.
              </p>
            </div>

            {/* Interactive Step Selector Tabs */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                backgroundColor: 'var(--agnex-base-raised)',
                padding: '0.35rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                maxWidth: '100%',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none'
              }}
              role="tablist"
              aria-label="Engineering Method Phases"
            >
              {phases.map((phase, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setActiveStep(idx)}
                    role="tab"
                    aria-selected={isActive}
                    style={{
                      background: isActive ? 'var(--agnex-graphite-light)' : 'transparent',
                      color: isActive ? 'var(--agnex-white)' : 'var(--agnex-steel)',
                      border: 'none',
                      padding: '0.45rem 0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      cursor: 'pointer',
                      borderRadius: 'var(--radius-xs)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span style={{ color: isActive ? 'var(--agnex-accent)' : 'inherit' }}>{phase.step}</span>
                    <span>{phase.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Split Layout */}
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}
          className="method-grid-container"
        >
          {/* Left Column: Phase Specification (5 Columns) */}
          <div
            style={{
              minWidth: 0
            }}
            className="method-details-col"
          >
            <div
              style={{
                backgroundColor: 'var(--agnex-base-raised)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--agnex-accent)',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>PHASE // {current.step}</span>
                <span style={{ color: 'var(--agnex-graphite-light)' }}>—</span>
                <span style={{ color: 'var(--agnex-white)' }}>{current.name}</span>
              </div>

              <h3
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 600,
                  color: 'var(--agnex-white)',
                  marginBottom: '1rem'
                }}
              >
                {current.subhead}
              </h3>

              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  marginBottom: '1.75rem'
                }}
              >
                {current.description}
              </p>

              {/* Deliverables List */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div
                  style={{
                    fontSize: 'var(--text-2xs)',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    color: 'var(--agnex-steel)',
                    letterSpacing: '0.08em',
                    marginBottom: '0.75rem'
                  }}
                >
                  ENGINEERING DELIVERABLES
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  {current.deliverables.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--agnex-white)'
                      }}
                    >
                      <span style={{ color: 'var(--agnex-accent)', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>0{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Strict Verification Metric */}
              <div
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--agnex-black)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--agnex-steel-light)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--agnex-accent)' }} />
                <span>{current.metrics}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Evolving Architectural Diagram (7 Columns) */}
          <div
            style={{
              minWidth: 0
            }}
            className="method-diagram-col"
          >
            <div
              style={{
                backgroundColor: 'var(--agnex-base-raised)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(1.25rem, 2.5vw, 2rem)',
                position: 'relative'
              }}
            >
              <svg
                ref={diagramRef}
                viewBox="0 0 640 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                aria-label={`AGNEX Method ${current.name} Architectural Diagram`}
              >
                {/* Background Coordinate System */}
                <rect x="20" y="20" width="600" height="360" stroke="#20242B" strokeWidth="1" fill="#12151B" />
                <line x1="20" y1="200" x2="620" y2="200" stroke="#20242B" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="320" y1="20" x2="320" y2="380" stroke="#20242B" strokeWidth="1" strokeDasharray="3 3" />

                {/* DIAGRAM PHASE 01: UNDERSTAND (Problem Breakdown & Node Extraction) */}
                {activeStep === 0 && (
                  <g className="phase-understand">
                    {/* Input problem vectors */}
                    <g transform="translate(60, 80)">
                      <rect x="0" y="0" width="160" height="60" fill="#151820" stroke="#2E343E" strokeWidth="1.5" />
                      <text x="14" y="26" fill="#F7F8FA" fontSize="12" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">OPERATIONAL INPUT</text>
                      <text x="14" y="44" fill="#7C8490" fontSize="10" fontFamily="'JetBrains Mono', monospace">Manual Friction Points</text>
                    </g>
                    <g transform="translate(60, 260)">
                      <rect x="0" y="0" width="160" height="60" fill="#151820" stroke="#2E343E" strokeWidth="1.5" />
                      <text x="14" y="26" fill="#F7F8FA" fontSize="12" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">LEGACY SILOS</text>
                      <text x="14" y="44" fill="#7C8490" fontSize="10" fontFamily="'JetBrains Mono', monospace">Fragmented Data Records</text>
                    </g>

                    {/* Connecting lines into Diagnostic Node */}
                    <path d="M 220 110 L 320 170" stroke="#F7F8FA" strokeWidth="2" strokeDasharray="4 2" />
                    <path d="M 220 290 L 320 230" stroke="#F7F8FA" strokeWidth="2" strokeDasharray="4 2" />

                    {/* Central Diagnostic Hub */}
                    <g transform="translate(320, 200)">
                      <circle cx="0" cy="0" r="44" fill="#0B0D10" stroke="#057AEF" strokeWidth="2" />
                      <circle cx="0" cy="0" r="32" fill="#151820" stroke="#20242B" strokeWidth="1" />
                      <text x="0" y="-4" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="600">DIAGNOSTIC</text>
                      <text x="0" y="12" fill="#057AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">EXTRACTION</text>
                    </g>

                    {/* Output specification */}
                    <line x1="364" y1="200" x2="460" y2="200" stroke="#057AEF" strokeWidth="2" />
                    <polygon points="460,195 470,200 460,205" fill="#057AEF" />
                    <g transform="translate(475, 170)">
                      <rect x="0" y="0" width="130" height="60" fill="#151820" stroke="#057AEF" strokeWidth="1" />
                      <text x="12" y="26" fill="#057AEF" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">DOMAIN MODEL</text>
                      <text x="12" y="44" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace">Verified Criteria</text>
                    </g>
                  </g>
                )}

                {/* DIAGRAM PHASE 02: ENGINEER (System Topography & Architecture) */}
                {activeStep === 1 && (
                  <g className="phase-engineer">
                    {/* Database & State Tier */}
                    <g transform="translate(80, 160)">
                      <rect x="0" y="0" width="130" height="80" fill="#151820" stroke="#2E343E" strokeWidth="1.5" />
                      <text x="14" y="28" fill="#F7F8FA" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">LAKEBASE</text>
                      <text x="14" y="44" fill="#7C8490" fontSize="10" fontFamily="'JetBrains Mono', monospace">PostgreSQL RLS</text>
                      <text x="14" y="60" fill="#057AEF" fontSize="9" fontFamily="'JetBrains Mono', monospace">Schema Schema V1</text>
                    </g>

                    {/* Connect to Core Services */}
                    <line x1="210" y1="200" x2="280" y2="200" stroke="#F7F8FA" strokeWidth="2" />
                    <circle cx="245" cy="200" r="3" fill="#057AEF" />

                    {/* API Gateway & Security Hub */}
                    <g transform="translate(280, 140)">
                      <rect x="0" y="0" width="140" height="120" fill="#0B0D10" stroke="#057AEF" strokeWidth="2" />
                      <rect x="8" y="8" width="124" height="26" fill="#151820" />
                      <text x="14" y="25" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">ZERO-TRUST GATEWAY</text>
                      <text x="14" y="58" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace">Auth & Rate-Limit</text>
                      <text x="14" y="80" fill="#7C8490" fontSize="10" fontFamily="'JetBrains Mono', monospace">Event Dispatcher</text>
                      <text x="14" y="102" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Deterministic [OK]</text>
                    </g>

                    {/* Outgoing API Consumers */}
                    <path d="M 420 180 L 490 130" stroke="#F7F8FA" strokeWidth="2" />
                    <path d="M 420 220 L 490 270" stroke="#F7F8FA" strokeWidth="2" />

                    <g transform="translate(490, 100)">
                      <rect x="0" y="0" width="120" height="50" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                      <text x="12" y="24" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace">WEB / CLIENT</text>
                      <text x="12" y="38" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">Edge Cached</text>
                    </g>
                    <g transform="translate(490, 250)">
                      <rect x="0" y="0" width="120" height="50" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                      <text x="12" y="24" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace">INTEGRATIONS</text>
                      <text x="12" y="38" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">REST / GraphQL</text>
                    </g>
                  </g>
                )}

                {/* DIAGRAM PHASE 03: BUILD (Verification & Production Deploy) */}
                {activeStep === 2 && (
                  <g className="phase-build">
                    {/* Pipeline Stage 1 */}
                    <g transform="translate(60, 160)">
                      <rect x="0" y="0" width="120" height="80" fill="#151820" stroke="#2E343E" strokeWidth="1.5" />
                      <text x="12" y="28" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">STAGE 01</text>
                      <text x="12" y="48" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">TypeScript Core</text>
                      <text x="12" y="66" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Strict Type Check</text>
                    </g>

                    <line x1="180" y1="200" x2="230" y2="200" stroke="#F7F8FA" strokeWidth="2" />

                    {/* Pipeline Stage 2 */}
                    <g transform="translate(230, 160)">
                      <rect x="0" y="0" width="120" height="80" fill="#151820" stroke="#2E343E" strokeWidth="1.5" />
                      <text x="12" y="28" fill="#7C8490" fontSize="9" fontFamily="'JetBrains Mono', monospace">STAGE 02</text>
                      <text x="12" y="48" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Automated Tests</text>
                      <text x="12" y="66" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">Vitest Suite Pass</text>
                    </g>

                    <line x1="350" y1="200" x2="400" y2="200" stroke="#057AEF" strokeWidth="2" />

                    {/* Pipeline Stage 3 */}
                    <g transform="translate(400, 140)">
                      <rect x="0" y="0" width="170" height="120" fill="#0B0D10" stroke="#057AEF" strokeWidth="2" />
                      <text x="14" y="26" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">STAGE 03 / SHIP</text>
                      <text x="14" y="52" fill="#F7F8FA" fontSize="12" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Production Bundle</text>
                      <text x="14" y="74" fill="#7C8490" fontSize="10" fontFamily="'JetBrains Mono', monospace">Vite Bundled (367ms)</text>
                      <text x="14" y="94" fill="#10B981" fontSize="10" fontFamily="'JetBrains Mono', monospace">Lighthouse: 100/100</text>
                    </g>
                  </g>
                )}

                {/* DIAGRAM PHASE 04: EVOLVE (Observability & Continuous Scaling) */}
                {activeStep === 3 && (
                  <g className="phase-evolve">
                    {/* Central Telemetry Engine */}
                    <g transform="translate(240, 130)">
                      <rect x="0" y="0" width="160" height="140" fill="#0B0D10" stroke="#057AEF" strokeWidth="2" />
                      <text x="14" y="26" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">OBSERVABILITY HUB</text>
                      <text x="14" y="54" fill="#F7F8FA" fontSize="11" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">Telemetry Stream</text>
                      <text x="14" y="76" fill="#10B981" fontSize="10" fontFamily="'JetBrains Mono', monospace">Latency: 28ms avg</text>
                      <text x="14" y="98" fill="#7C8490" fontSize="10" fontFamily="'JetBrains Mono', monospace">Availability: 99.99%</text>
                      <text x="14" y="120" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace">Auto-Scaling: READY</text>
                    </g>

                    {/* Continuous Feedback Loops */}
                    <path d="M 400 170 C 480 170, 480 90, 320 90 C 180 90, 180 170, 240 170" stroke="#057AEF" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                    <text x="320" y="78" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">FEEDBACK & EVOLUTION LOOP</text>

                    {/* Nodes along the perimeter */}
                    <circle cx="180" cy="270" r="16" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                    <text x="180" y="274" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">LOGS</text>

                    <circle cx="460" cy="270" r="16" fill="#151820" stroke="#2E343E" strokeWidth="1" />
                    <text x="460" y="274" fill="#F7F8FA" fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">APM</text>

                    <line x1="240" y1="240" x2="196" y2="264" stroke="#20242B" strokeWidth="1" />
                    <line x1="400" y1="240" x2="444" y2="264" stroke="#20242B" strokeWidth="1" />
                  </g>
                )}

                {/* Bottom Architectural Legend */}
                <g transform="translate(30, 365)">
                  <text x="0" y="0" fill="#4A515D" fontSize="9" fontFamily="'JetBrains Mono', monospace">
                    METHOD_PHASE: {current.step} / {current.name}  |  STATUS: VALIDATED  |  SCHEMA_REV: 2026.04
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

      <style>{`
        .method-grid-container {
          grid-template-columns: 1fr;
        }
        .method-details-col,
        .method-diagram-col {
          grid-column: 1 / -1;
          min-width: 0;
          max-width: 100%;
        }
        @media (min-width: 1024px) {
          .method-grid-container {
            grid-template-columns: repeat(12, 1fr);
          }
          .method-details-col {
            grid-column: span 5 !important;
          }
          .method-diagram-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
}
