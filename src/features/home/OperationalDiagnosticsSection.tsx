import { useState } from 'react';

interface DiagnosticItem {
  id: string;
  code: string;
  title: string;
  symptom: string;
  rootCause: string;
  remedy: string;
}

const diagnostics: DiagnosticItem[] = [
  {
    id: 'siloed-data',
    code: 'DIAG_01',
    title: 'Manual, Repetitive Processes',
    symptom: 'Staff spending 10+ hours per week copying entries across multiple tools or spreadsheets.',
    rootCause: 'Lack of automated event pipelines and bi-directional API synchronization.',
    remedy: 'Engineered event-driven background queues and real-time ledger hooks that process changes instantly.'
  },
  {
    id: 'legacy-debt',
    code: 'DIAG_02',
    title: 'Disconnected Software Silos',
    symptom: 'Inventory, billing, and CRM platforms report conflicting counts and customer states.',
    rootCause: 'Point-to-point ad-hoc webhooks without an authoritative source-of-truth state machine.',
    remedy: 'Unified database models with event streams, distributed locks, and centralized audit logging.'
  },
  {
    id: 'unstable-scaling',
    code: 'DIAG_03',
    title: 'Fragile Systems Breaking Under Surge Load',
    symptom: 'Platform crashes or experiences 10-second latency spikes during product releases or peak operations.',
    rootCause: 'Monolithic architectures with unindexed queries, blocking I/O, and missing edge caching.',
    remedy: 'Decoupled Go/Node microservices, edge-cached static distribution, and autoscaling container clusters.'
  },
  {
    id: 'low-conversion',
    code: 'DIAG_04',
    title: 'Slow, Low-Converting Digital Interfaces',
    symptom: 'High bounce rates, poor mobile engagement, and failed customer checkout flows.',
    rootCause: 'Bloated legacy frameworks, unoptimized asset pipelines, and layout shift (CLS > 0.25).',
    remedy: 'Static-first React 19 architecture, sub-second LCP, 0ms layout shift, and WCAG AA accessibility.'
  }
];

export default function OperationalDiagnosticsSection() {
  const [activeDiag, setActiveDiag] = useState<number>(0);
  const current = diagnostics[activeDiag];

  return (
    <section
      className="agnex-section operational-diagnostics-section"
      style={{
        backgroundColor: 'var(--agnex-base-raised)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Editorial Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
            Systemic Problem Solving
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '2rem',
              alignItems: 'flex-end'
            }}
          >
            <div style={{ gridColumn: 'span 12' }} className="diag-header-col">
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: '0.75rem' }}>
                Operational Diagnostics
              </h2>
              <p style={{ maxWidth: '640px', margin: 0 }}>
                Most technical initiatives fail because software is purchased before the root operational bottleneck is isolated. We engineer around the friction.
              </p>
            </div>
          </div>
        </div>

        {/* Asymmetric 2-Column Diagnostic Ledger */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 3rem)'
          }}
        >
          {/* Left Column: Interactive Diagnostic Selector List (5 Columns) */}
          <div
            style={{ gridColumn: 'span 12' }}
            className="diag-nav-col"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
              role="tablist"
              aria-label="Diagnostic Categories"
            >
              {diagnostics.map((item, idx) => {
                const isSelected = activeDiag === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveDiag(idx)}
                    role="tab"
                    aria-selected={isSelected}
                    style={{
                      backgroundColor: isSelected ? 'var(--agnex-black)' : 'var(--agnex-base-raised)',
                      border: `1px solid ${isSelected ? 'var(--agnex-accent)' : 'var(--border-color)'}`,
                      padding: '1.25rem 1.5rem',
                      textAlign: 'left',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          color: isSelected ? 'var(--agnex-accent)' : 'var(--agnex-steel)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        {item.code}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 600,
                          color: isSelected ? 'var(--agnex-white)' : 'var(--agnex-steel-light)'
                        }}
                      >
                        {item.title}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: isSelected ? 'var(--agnex-accent)' : 'var(--agnex-steel-dark)'
                      }}
                    >
                      {isSelected ? 'ACTIVE ↵' : 'SELECT →'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Architectural Breakdown of Selected Diagnostic (7 Columns) */}
          <div
            style={{ gridColumn: 'span 12' }}
            className="diag-detail-col"
          >
            <div
              style={{
                backgroundColor: 'var(--agnex-black)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '1rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--agnex-accent)',
                      fontWeight: 600
                    }}
                  >
                    DIAGNOSTIC_SPEC // {current.code}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-2xs)',
                      color: 'var(--agnex-steel)'
                    }}
                  >
                    CATEGORY: SYSTEMIC FRICTION
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    color: 'var(--agnex-white)',
                    marginBottom: '1.5rem'
                  }}
                >
                  {current.title}
                </h3>

                {/* Symptom */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-2xs)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--agnex-steel)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.35rem'
                    }}
                  >
                    OBSERVED SYMPTOM
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {current.symptom}
                  </p>
                </div>

                {/* Root Cause */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      fontSize: 'var(--text-2xs)',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--agnex-steel)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.35rem'
                    }}
                  >
                    TECHNICAL ROOT CAUSE
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {current.rootCause}
                  </p>
                </div>
              </div>

              {/* Engineered Remedy */}
              <div
                style={{
                  backgroundColor: 'var(--agnex-base-raised)',
                  border: '1px solid var(--agnex-accent-border)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.25rem 1.5rem',
                  marginTop: '1.5rem'
                }}
              >
                <div
                  style={{
                    fontSize: 'var(--text-2xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--agnex-accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.35rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--agnex-accent)' }} />
                  <span>AGNEX REMEDIATION BLUEPRINT</span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', lineHeight: 1.6, fontWeight: 500 }}>
                  {current.remedy}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .diag-nav-col {
            grid-column: span 5 !important;
          }
          .diag-detail-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
}
