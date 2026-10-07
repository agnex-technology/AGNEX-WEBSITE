import { Link } from 'react-router-dom';
import { projectsData } from '../work/projectsData';
import { SectionLabel, Badge } from '../../components/primitives';

export default function SelectedWorkSection() {
  return (
    <section
      id="work"
      className="agnex-section"
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
        <div style={{ marginBottom: '4.5rem' }}>
          <SectionLabel number="04" label="Selected Work" />
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '2rem'
            }}
          >
            <div>
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
                ENGINEERED<br />
                SYSTEMS.
              </h2>
              <p
                style={{
                  fontSize: 'var(--text-md)',
                  color: 'var(--text-secondary)',
                  maxWidth: '680px',
                  marginTop: '1.5rem',
                  lineHeight: 1.6
                }}
              >
                Verified reference architectures and platforms engineered for complex logistical, security, and computational problems.
              </p>
            </div>

            <Link to="/work" className="btn btn-secondary">
              <span>View All Systems Archive</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Large Editorial Compositions (No standard cards) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
          {projectsData.map((project) => (
            <div
              key={project.id}
              style={{
                borderTop: '1px solid var(--border-strong)',
                paddingTop: '3rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 'clamp(2rem, 4vw, 4rem)',
                alignItems: 'flex-start'
              }}
              className="editorial-project-row"
            >
              {/* Left Column: Context, Metadata & Description (5 cols) */}
              <div
                style={{
                  gridColumn: 'span 12',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
                className="project-meta-col"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-blue)'
                    }}
                  >
                    PROJECT [{project.number}]
                  </span>
                  <Badge label={project.domain.toUpperCase()} variant="outline" />
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--agnex-navy)',
                    margin: 0,
                    lineHeight: 1.15
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: 0
                  }}
                >
                  {project.shortDescription}
                </p>

                {/* Tech Tags */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-3xs)',
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '0.5rem'
                    }}
                  >
                    Technologies Used:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-2xs)',
                          padding: '0.2rem 0.5rem',
                          backgroundColor: 'var(--agnex-canvas-subtle)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-xs)',
                          color: 'var(--agnex-navy)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <Link
                    to={`/work/${project.id}`}
                    className="btn btn-primary"
                    style={{ padding: '0.65rem 1.4rem' }}
                    data-cursor="view"
                  >
                    <span>Read Architecture Case Study</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Architectural Schematic Frame (7 cols) */}
              <div
                style={{
                  gridColumn: 'span 12',
                  backgroundColor: 'var(--agnex-canvas-subtle)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.75rem',
                  position: 'relative'
                }}
                className="project-schematic-col"
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '0.75rem',
                    marginBottom: '1.25rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xs)',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>SYS//SCHEMATIC::{project.name}</span>
                  <span style={{ color: 'var(--agnex-blue)' }}>CORE ENGINEERING: {project.coreEngineering}</span>
                </div>

                {/* System Flow Steps preview */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-color)',
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      color: 'var(--agnex-navy)',
                      marginBottom: '1rem'
                    }}
                  >
                    {project.systemFlow.title}
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                      gap: '1rem'
                    }}
                  >
                    {project.systemFlow.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          borderLeft: '2px solid var(--agnex-blue)',
                          paddingLeft: '0.75rem'
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-2xs)',
                            color: 'var(--agnex-blue)',
                            fontWeight: 600
                          }}
                        >
                          STEP {st.step}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 600,
                            color: 'var(--agnex-navy)',
                            marginTop: '2px'
                          }}
                        >
                          {st.title}
                        </div>
                        <div
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)',
                            marginTop: '4px',
                            lineHeight: 1.4
                          }}
                        >
                          {st.detail}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .project-meta-col {
            grid-column: span 5 !important;
          }
          .project-schematic-col {
            grid-column: span 7 !important;
          }
        }
      `}</style>
    </section>
  );
}
