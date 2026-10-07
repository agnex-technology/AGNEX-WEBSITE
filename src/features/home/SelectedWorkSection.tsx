import { Link } from 'react-router-dom';
import { projectsData } from '../work/projectsData';

export default function SelectedWorkSection() {
  const selected = projectsData.slice(0, 3);

  return (
    <section
      className="agnex-section selected-work-section"
      style={{
        backgroundColor: 'var(--agnex-black)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Editorial Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
            Reference Architectures & Systems
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
                Featured Engineering Work
              </h2>
              <p style={{ maxWidth: '640px', margin: 0 }}>
                Real production architectures, domain models, and technical blueprints engineered for operational durability.
              </p>
            </div>

            <Link to="/work" className="btn btn-secondary">
              <span>View All Systems Archive</span>
              <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
            </Link>
          </div>
        </div>

        {/* Editorial List of Selected Architectures */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {selected.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundColor: 'var(--agnex-base-raised)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(1.75rem, 3.5vw, 3rem)',
                transition: 'border-color 0.2s ease'
              }}
              className="case-study-row"
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(1.5rem, 3vw, 3.5rem)',
                  alignItems: 'flex-start'
                }}
              >
                {/* Left 7 Columns: Context, Challenge & Architecture */}
                <div style={{ gridColumn: 'span 12' }} className="case-study-left">
                  {/* Meta pill & domain tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: 'var(--agnex-black)',
                        border: '1px solid var(--agnex-accent-border)',
                        color: 'var(--agnex-accent)',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      {project.type.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        color: 'var(--agnex-steel)'
                      }}
                    >
                      INDUSTRY: {project.industry.toUpperCase()}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.5rem, 2.25vw, 2.125rem)',
                      fontWeight: 600,
                      color: 'var(--agnex-white)',
                      marginBottom: '0.75rem',
                      lineHeight: 1.2
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: 'var(--text-md)',
                      color: 'var(--agnex-steel-light)',
                      marginBottom: '1.5rem',
                      lineHeight: 1.6
                    }}
                  >
                    {project.tagline}
                  </p>

                  {/* Challenge & Solution Breakdown */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '1.25rem',
                      marginBottom: '1.75rem'
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: 'var(--agnex-black)',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'var(--text-2xs)',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--agnex-steel)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        THE CHALLENGE
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                        {project.challenge}
                      </p>
                    </div>

                    <div
                      style={{
                        backgroundColor: 'var(--agnex-black)',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      <div
                        style={{
                          fontSize: 'var(--text-2xs)',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--agnex-accent)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        ENGINEERING SOLUTION
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-steel-light)',
                          backgroundColor: 'var(--agnex-black)',
                          border: '1px solid var(--border-color)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right 5 Columns: Verifiable Telemetry Metrics & Action */}
                <div style={{ gridColumn: 'span 12' }} className="case-study-right">
                  <div
                    style={{
                      backgroundColor: 'var(--agnex-black)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.25rem'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        color: 'var(--agnex-steel)',
                        letterSpacing: '0.08em',
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '0.5rem'
                      }}
                    >
                      VERIFIABLE BENCHMARKS
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {project.results.map((res, i) => (
                        <div key={i}>
                          <div
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(1.5rem, 2vw, 1.875rem)',
                              fontWeight: 700,
                              color: 'var(--agnex-white)',
                              lineHeight: 1.1
                            }}
                          >
                            {res.metric}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                      <Link
                        to={`/work/${project.id}`}
                        className="agnex-link-accent"
                        style={{ fontSize: 'var(--text-sm)' }}
                      >
                        <span>Deep Dive Architecture Spec</span>
                        <span className="link-arrow">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .case-study-left {
            grid-column: span 7 !important;
          }
          .case-study-right {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
