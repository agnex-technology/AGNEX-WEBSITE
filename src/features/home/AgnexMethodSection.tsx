import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from '../../components/primitives';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStage {
  id: string;
  step: string;
  name: string;
  meta: string;
  title: string;
  description: string;
  deliverables: string[];
  transformation: string;
}

const stages: ProcessStage[] = [
  {
    id: 'think',
    step: '01',
    name: 'THINK',
    meta: 'STAGE 01 // ANALYSIS & ARCHITECTURAL FOUNDATION',
    title: 'We start with the problem, not the technology.',
    description: 'We deconstruct business constraints, user friction, data relationships, and operational realities before writing a single line of code. We verify what needs to exist.',
    deliverables: [
      'Problem definition & system constraints',
      'Entity relationship mapping',
      'Technical feasibility ledger',
      'Architectural blueprint'
    ],
    transformation: 'CHAOS → DEFINED SYSTEM'
  },
  {
    id: 'engineer',
    step: '02',
    name: 'ENGINEER',
    meta: 'STAGE 02 // RIGOROUS IMPLEMENTATION',
    title: 'We define the system, constraints and technical direction.',
    description: 'We architect and build the product around real requirements. Strict type safety, clean API contracts, automated verification, and performance budgets at every layer.',
    deliverables: [
      'Type-safe TypeScript & React core',
      'High-throughput API endpoints',
      'Automated testing & CI/CD pipelines',
      'Sub-second edge caching architecture'
    ],
    transformation: 'BLUEPRINT → WORKING CODE'
  },
  {
    id: 'ship',
    step: '03',
    name: 'SHIP',
    meta: 'STAGE 03 // PRODUCTION & RESILIENCE',
    title: 'We deploy to production and improve as the business grows.',
    description: 'We release the engineered product to resilient cloud infrastructure, configure real-time telemetry, and partner for continuous operational enhancement.',
    deliverables: [
      'Zero-downtime rolling deployment',
      'Real-time error & telemetry observability',
      'Automated performance monitoring',
      'Scalable cloud infrastructure'
    ],
    transformation: 'CODE → PRODUCTION IMPACT'
  }
];

export default function AgnexMethodSection() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stage = stages[activeStage] || stages[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 65%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.33) {
            setActiveStage(0);
          } else if (progress < 0.66) {
            setActiveStage(1);
          } else {
            setActiveStage(2);
          }
        }
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="agnex-section agnex-blueprint-grid"
      style={{
        backgroundColor: 'var(--agnex-canvas)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(5rem, 8vw, 8.5rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8.5rem)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <SectionLabel number="02" label="Approach" />
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
            THINK.<br />
            ENGINEER.<br />
            SHIP.
          </h2>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
              maxWidth: '620px',
              marginTop: '1.5rem',
              lineHeight: 1.6
            }}
          >
            Three disciplined stages that transform raw business ideas into deterministic, production-grade technology.
          </p>
        </div>

        {/* 3-Stage Progress Nav */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '1rem',
            marginBottom: '3rem'
          }}
          className="process-stages-nav"
        >
          {stages.map((stg, idx) => {
            const isActive = idx === activeStage;
            return (
              <div
                key={stg.id}
                onClick={() => setActiveStage(idx)}
                style={{
                  cursor: 'pointer',
                  padding: '0.75rem 0',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
                data-cursor="hover"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-2xs)',
                      fontWeight: 600,
                      color: isActive ? 'var(--agnex-blue)' : 'var(--text-muted)'
                    }}
                  >
                    [{stg.step}]
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 700,
                      color: isActive ? 'var(--agnex-blue)' : 'var(--agnex-navy)'
                    }}
                  >
                    {stg.name}
                  </span>
                </div>
                {isActive && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-17px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--agnex-blue)'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Active Stage Detailed Breakdown */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Info Column */}
          <div
            style={{
              gridColumn: 'span 12',
              maxWidth: '580px'
            }}
            className="stage-info-col"
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--agnex-blue)',
                letterSpacing: '0.08em',
                fontWeight: 600,
                marginBottom: '1rem'
              }}
            >
              {stage.meta}
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                fontWeight: 700,
                color: 'var(--agnex-navy)',
                lineHeight: 1.25,
                marginBottom: '1.25rem'
              }}
            >
              {stage.title}
            </h3>

            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                marginBottom: '2rem'
              }}
            >
              {stage.description}
            </p>

            <div
              style={{
                backgroundColor: 'var(--agnex-canvas-subtle)',
                border: '1px solid var(--border-color)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                marginBottom: '2rem'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '0.85rem'
                }}
              >
                Key Deliverables:
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem'
                }}
              >
                {stage.deliverables.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--agnex-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem'
                    }}
                  >
                    <span style={{ color: 'var(--agnex-blue)', fontWeight: 700 }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--agnex-blue)',
                fontWeight: 600
              }}
            >
              TRANSFORMATION: {stage.transformation}
            </div>
          </div>

          {/* Right SVG System Flow Diagram */}
          <div
            style={{
              gridColumn: 'span 12',
              backgroundColor: 'var(--agnex-canvas-subtle)',
              border: '1px solid var(--border-strong)',
              padding: '2rem',
              borderRadius: 'var(--radius-xs)'
            }}
            className="stage-diagram-col"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.75rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                color: 'var(--text-muted)'
              }}
            >
              <span>SYS//PROGRESSION_DIAGRAM</span>
              <span style={{ color: 'var(--agnex-blue)' }}>STAGE [{stage.step}] ACTIVE</span>
            </div>

            <svg
              viewBox="0 0 540 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: 'auto' }}
            >
              {/* Continuous Blue Signal Track */}
              <line x1="40" y1="140" x2="500" y2="140" stroke="rgba(12, 28, 41, 0.1)" strokeWidth="2" />
              
              {/* Stage 1: THINK Node */}
              <g opacity={activeStage >= 0 ? 1 : 0.4}>
                <circle
                  cx="100"
                  cy="140"
                  r={activeStage === 0 ? 12 : 8}
                  fill={activeStage === 0 ? 'var(--agnex-blue)' : '#FFFFFF'}
                  stroke={activeStage === 0 ? 'var(--agnex-blue)' : 'var(--agnex-navy)'}
                  strokeWidth="2"
                />
                <rect x="50" y="50" width="100" height="50" fill="#FFFFFF" stroke={activeStage === 0 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.15)'} strokeWidth="1" />
                <text x="65" y="75" fill="#0C1C29" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">01. THINK</text>
                <text x="65" y="90" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">DIAGNOSTICS</text>
              </g>

              {/* Path 1 -> 2 */}
              <line
                x1="100"
                y1="140"
                x2="270"
                y2="140"
                stroke={activeStage >= 1 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.1)'}
                strokeWidth={activeStage >= 1 ? 2.5 : 1.5}
              />

              {/* Stage 2: ENGINEER Node */}
              <g opacity={activeStage >= 1 ? 1 : 0.4}>
                <circle
                  cx="270"
                  cy="140"
                  r={activeStage === 1 ? 12 : 8}
                  fill={activeStage === 1 ? 'var(--agnex-blue)' : '#FFFFFF'}
                  stroke={activeStage === 1 ? 'var(--agnex-blue)' : 'var(--agnex-navy)'}
                  strokeWidth="2"
                />
                <rect x="215" y="190" width="110" height="50" fill="#FFFFFF" stroke={activeStage === 1 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.15)'} strokeWidth="1" />
                <text x="228" y="215" fill="#0C1C29" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">02. ENGINEER</text>
                <text x="228" y="230" fill="#627D98" fontSize="9" fontFamily="'JetBrains Mono', monospace">ARCHITECTURE</text>
              </g>

              {/* Path 2 -> 3 */}
              <line
                x1="270"
                y1="140"
                x2="440"
                y2="140"
                stroke={activeStage === 2 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.1)'}
                strokeWidth={activeStage === 2 ? 2.5 : 1.5}
              />

              {/* Stage 3: SHIP Node */}
              <g opacity={activeStage === 2 ? 1 : 0.4}>
                <circle
                  cx="440"
                  cy="140"
                  r={activeStage === 2 ? 12 : 8}
                  fill={activeStage === 2 ? 'var(--agnex-blue)' : '#FFFFFF'}
                  stroke={activeStage === 2 ? 'var(--agnex-blue)' : 'var(--agnex-navy)'}
                  strokeWidth="2"
                />
                <rect x="390" y="50" width="100" height="50" fill="#FFFFFF" stroke={activeStage === 2 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.15)'} strokeWidth="1" />
                <text x="410" y="75" fill="#0C1C29" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600">03. SHIP</text>
                <text x="410" y="90" fill="#10B981" fontSize="9" fontFamily="'JetBrains Mono', monospace">PRODUCTION</text>
              </g>

              {/* Forward Arrow */}
              <polygon
                points="495,135 510,140 495,145"
                fill={activeStage === 2 ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.2)'}
              />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .stage-info-col {
            grid-column: span 6 !important;
          }
          .stage-diagram-col {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </section>
  );
}
