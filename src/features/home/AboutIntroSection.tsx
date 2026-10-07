import { Link } from 'react-router-dom';
import { SectionLabel } from '../../components/primitives';

export default function AboutIntroSection() {
  return (
    <section
      id="about"
      className="agnex-section"
      style={{
        backgroundColor: 'var(--agnex-canvas)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(5.5rem, 9vw, 9.5rem)',
        paddingBottom: 'clamp(5.5rem, 9vw, 9.5rem)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <SectionLabel number="06" label="About AGNEX" />

          {/* Master Headline */}
          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.75rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: 'var(--tracking-tighter)',
              color: 'var(--agnex-navy)',
              marginBottom: '2.5rem',
              textTransform: 'uppercase'
            }}
          >
            BUILT FOR THE<br />
            NEXT PROBLEM.
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(2rem, 4vw, 4rem)',
              borderTop: '1px solid var(--border-strong)',
              paddingTop: '2.5rem'
            }}
          >
            <div style={{ gridColumn: 'span 12' }} className="about-lead-col">
              <p
                style={{
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                  color: 'var(--agnex-navy)',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  margin: 0
                }}
              >
                AGNEX is an engineering-focused technology company. We design and build practical digital systems for businesses that have outgrown templates and generic software.
              </p>
            </div>

            <div style={{ gridColumn: 'span 12' }} className="about-body-col">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '2.5rem'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-blue)',
                      letterSpacing: '0.08em',
                      marginBottom: '0.75rem'
                    }}
                  >
                    FOUNDATIONS // AG + NEX
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                      margin: 0
                    }}
                  >
                    The name AGNEX originates from two foundational pillars: <strong>AG</strong> (engineering foundation, mathematical rigor, architectural structure) and <strong>NEX</strong> (forward trajectory, next-generation capability, progress). The <strong>X</strong> marks the intersection of technology, people, and real business problems.
                  </p>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-blue)',
                      letterSpacing: '0.08em',
                      marginBottom: '0.75rem'
                    }}
                  >
                    PRACTICAL UTILITY // ZERO HYPE
                  </h3>
                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.65,
                      margin: 0
                    }}
                  >
                    We do not sell abstract digital transformation buzzwords. We work directly with founders, operators, and technical leadership to engineer reliable software that solves real bottlenecks and drives measurable operational impact.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/company" className="btn btn-secondary">
                  <span>Learn More About Our Company</span>
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
