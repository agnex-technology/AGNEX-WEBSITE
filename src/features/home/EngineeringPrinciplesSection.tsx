import { SectionLabel } from '../../components/primitives';

interface Principle {
  number: string;
  statement: string;
  description: string;
}

const principles: Principle[] = [
  {
    number: '01',
    statement: 'CLARITY OVER COMPLEXITY',
    description: 'If a system cannot be explained simply, it is poorly engineered. We strip away unnecessary abstractions and build software that is legible, maintainable, and deterministic.'
  },
  {
    number: '02',
    statement: 'SYSTEMS OVER FEATURES',
    description: 'Isolated features create technical debt. We design connected architectures where data models, API boundaries, and user workflows reinforce one another as a cohesive whole.'
  },
  {
    number: '03',
    statement: 'USEFULNESS OVER HYPE',
    description: 'We do not implement technologies just because they trend. We engineer solutions that solve real operational bottlenecks, eliminate human error, and generate measurable impact.'
  },
  {
    number: '04',
    statement: 'PERFORMANCE OVER DECORATION',
    description: 'Fast, accessible, and lightweight beats bloated decoration every time. Sub-second execution, zero layout shifts, and resilience are first-class engineering requirements.'
  },
  {
    number: '05',
    statement: 'ENGINEERING OVER SHORTCUTS',
    description: 'Templates and unverified shortcuts always fail under enterprise load. We build durable foundations designed to survive organizational growth and scale.'
  }
];

export default function EngineeringPrinciplesSection() {
  return (
    <section
      id="principles"
      className="agnex-section agnex-blueprint-grid"
      style={{
        backgroundColor: 'var(--agnex-canvas)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(5.5rem, 9vw, 9.5rem)',
        paddingBottom: 'clamp(5.5rem, 9vw, 9.5rem)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Section Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <SectionLabel number="03" label="Principles" />
          <h2
            style={{
              fontSize: 'clamp(2.75rem, 5.5vw, 5.5rem)',
              fontWeight: 800,
              lineHeight: 0.98,
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--agnex-navy)',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            TECHNOLOGY<br />
            SHOULD DO<br />
            SOMETHING.
          </h2>
          <p
            style={{
              fontSize: 'var(--text-md)',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              marginTop: '1.75rem',
              lineHeight: 1.6
            }}
          >
            Five non-negotiable engineering standards that govern every system, architecture, and line of code we build.
          </p>
        </div>

        {/* Editorial Typographic List (Zero cards, pure typographic hierarchy) */}
        <div style={{ borderTop: '2px solid var(--agnex-navy)' }}>
          {principles.map((item) => (
            <div
              key={item.number}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 'clamp(1.5rem, 3vw, 3rem)',
                padding: 'clamp(2.5rem, 4vw, 3.5rem) 0',
                borderBottom: '1px solid var(--border-color)',
                alignItems: 'baseline',
                transition: 'background-color 0.2s ease'
              }}
              className="principle-row"
            >
              {/* Number */}
              <div
                style={{
                  gridColumn: 'span 12',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--agnex-blue)',
                  letterSpacing: '0.08em'
                }}
                className="principle-num"
              >
                [{item.number}]
              </div>

              {/* Statement */}
              <div
                style={{
                  gridColumn: 'span 12'
                }}
                className="principle-statement"
              >
                <h3
                  style={{
                    fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--agnex-navy)',
                    margin: 0,
                    lineHeight: 1.15
                  }}
                >
                  {item.statement}
                </h3>
              </div>

              {/* Description */}
              <div
                style={{
                  gridColumn: 'span 12'
                }}
                className="principle-desc"
              >
                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: '560px'
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .principle-num {
            grid-column: span 2 !important;
          }
          .principle-statement {
            grid-column: span 5 !important;
          }
          .principle-desc {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
