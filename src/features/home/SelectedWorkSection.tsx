import React from 'react';
import { Link } from 'react-router-dom';
import { projectsData } from '../work/projectsData';
import ComparisonMatrix from '../work/components/ComparisonMatrix';
import ScrollFade from '../../components/motion/ScrollFade';

export default function SelectedWorkSection() {
  return (
    <section
      className="agnex-section selected-work-section agnex-grid-mesh"
      id="selected-work"
      style={{
        backgroundColor: 'var(--agnex-black)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Editorial Section Header */}
        <ScrollFade>
          <div style={{ marginBottom: '4rem' }}>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.25rem' }}>
              Selected Work
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
                <h2
                  style={{
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)',
                    fontWeight: 700,
                    letterSpacing: 'var(--tracking-tight)',
                    color: 'var(--agnex-white)',
                    marginBottom: '1rem',
                    lineHeight: 1.15
                  }}
                >
                  Systems we've engineered.
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-muted)',
                    maxWidth: '720px',
                    margin: 0,
                    lineHeight: 1.6
                  }}
                >
                  We engineer technology around complex real-world problems — from logistics infrastructure and cybersecurity platforms to AI-powered research systems.
                </p>
              </div>

              <Link to="/work" className="btn btn-secondary" style={{ minHeight: '44px' }}>
                <span>Explore Full Engineering Archive</span>
                <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
              </Link>
            </div>
          </div>
        </ScrollFade>

        {/* 4 Distinct Editorial Engineering Artifacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4.5rem' }}>
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="case-study-card"
              style={{
                backgroundColor: 'var(--agnex-base-raised)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(2rem, 4vw, 3.25rem)',
                transition: 'border-color 200ms ease, box-shadow 200ms ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: 'clamp(1.75rem, 3.5vw, 3.5rem)',
                  alignItems: 'flex-start'
                }}
              >
                {/* Left 7 Columns: Context, Identity & Engineering Scope */}
                <div style={{ gridColumn: 'span 12' }} className="case-left-col">
                  {/* Meta Strip */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 700,
                        color: 'var(--agnex-accent)',
                        padding: '0.2rem 0.6rem',
                        backgroundColor: 'var(--agnex-black)',
                        border: '1px solid var(--agnex-accent-border)',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      {project.number} / {project.domain.toUpperCase()}
                    </span>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--agnex-steel)',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {project.category}
                    </span>

                    {project.statusBadge && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: '#EAB308',
                          padding: '0.15rem 0.5rem',
                          backgroundColor: 'rgba(234, 179, 8, 0.1)',
                          border: '1px solid rgba(234, 179, 8, 0.3)',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        {project.statusBadge}
                      </span>
                    )}
                  </div>

                  <h3
                    style={{
                      fontSize: 'clamp(1.75rem, 2.75vw, 2.5rem)',
                      fontWeight: 700,
                      color: 'var(--agnex-white)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.2
                    }}
                  >
                    {project.name}
                  </h3>

                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--agnex-steel-light)',
                      marginBottom: '1.25rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em'
                    }}
                  >
                    {project.title.replace(`${project.name} — `, '')}
                  </div>

                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.65,
                      marginBottom: '1.75rem',
                      maxWidth: '680px'
                    }}
                  >
                    {project.shortDescription}
                  </p>

                  {/* Core Challenge & What AGNEX Engineered Highlight */}
                  <div
                    style={{
                      backgroundColor: 'var(--agnex-black)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1.25rem',
                      marginBottom: '1.75rem'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      ENGINEERING FOCUS // {project.coreEngineering}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel-light)', lineHeight: 1.55 }}>
                      {project.challenge.summary}
                    </div>
                  </div>

                  {/* Technology Pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {project.technologies.slice(0, 8).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-steel-light)',
                          backgroundColor: 'var(--agnex-black)',
                          border: '1px solid var(--border-color)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 8 && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-steel)',
                          padding: '0.25rem 0.5rem'
                        }}
                      >
                        +{project.technologies.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Right 5 Columns: Architecture Preview Artifact & CTA */}
                <div style={{ gridColumn: 'span 12' }} className="case-right-col">
                  <div
                    style={{
                      backgroundColor: 'var(--agnex-black)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '1.75rem',
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
                        paddingBottom: '0.625rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span>SYSTEM ARCHITECTURE PREVIEW</span>
                      <span style={{ color: 'var(--agnex-accent)' }}>SPEC-{project.number}</span>
                    </div>

                    {/* Compact Project-Specific Diagram Thumbnail */}
                    <div
                      style={{
                        backgroundColor: 'var(--agnex-base)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '1rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        lineHeight: 1.55,
                        color: 'var(--agnex-steel-light)'
                      }}
                    >
                      {project.id === 'rda' && (
                        <div>
                          <div style={{ color: 'var(--agnex-white)', fontWeight: 600, marginBottom: '0.35rem' }}>
                            DRIVER APP ⇄ OWNER APP ⇄ ADMIN PORTAL
                          </div>
                          <div style={{ color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
                            ▼ API Gateway (JWT + RBAC)
                          </div>
                          <div>State Machine: PENDING → CONFIRMED → IN_PROGRESS → COMPLETED</div>
                          <div style={{ color: 'var(--agnex-steel)', marginTop: '0.35rem' }}>
                            PostgreSQL + PostGIS · Double-Entry Wallet Ledger
                          </div>
                        </div>
                      )}

                      {project.id === 'skynet' && (
                        <div>
                          <div style={{ color: 'var(--agnex-white)', fontWeight: 600, marginBottom: '0.35rem' }}>
                            AGENTS → TELEMETRY → FASTAPI
                          </div>
                          <div style={{ color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
                            ▼ Detection & MITRE ATT&CK Mapping
                          </div>
                          <div>AI RAG Synthesis → Human Approval Gate → SOAR</div>
                          <div style={{ color: 'var(--agnex-steel)', marginTop: '0.35rem' }}>
                            ClickHouse Columnar Storage · HMAC-Signed Audit Records
                          </div>
                        </div>
                      )}

                      {project.id === 'lawguide-ai' && (
                        <div>
                          <div style={{ color: 'var(--agnex-white)', fontWeight: 600, marginBottom: '0.35rem' }}>
                            LEGAL DOCS → BULLMQ → WORKERS
                          </div>
                          <div style={{ color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
                            ▼ Gemini Embeddings → Pinecone Vector DB
                          </div>
                          <div>RAG Search → Grounded Statutory Citations</div>
                          <div style={{ color: '#EAB308', marginTop: '0.35rem' }}>
                            Strict Informational Disclaimer Attached
                          </div>
                        </div>
                      )}

                      {project.id === 'sentinelx-ai' && (
                        <div>
                          <div style={{ color: 'var(--agnex-white)', fontWeight: 600, marginBottom: '0.35rem' }}>
                            DEFENSIVE TELEMETRY → SENTINELX API
                          </div>
                          <div style={{ color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
                            ▼ Boundary Guard Middleware
                          </div>
                          <div>Structured Findings Schemas → Local Audit Log</div>
                          <div style={{ color: 'var(--agnex-steel)', marginTop: '0.35rem' }}>
                            Server-Signed Sessions · Local Reactive Dashboard
                          </div>
                        </div>
                      )}
                    </div>

                    {/* What AGNEX Engineered List summary */}
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-steel)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        ENGINEERED CAPABILITIES
                      </div>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        {project.whatWeBuilt.slice(0, 3).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ paddingTop: '0.875rem', borderTop: '1px solid var(--border-color)' }}>
                      <Link
                        to={`/work/${project.id}`}
                        className="btn btn-primary"
                        style={{ width: '100%', minHeight: '44px', padding: '0.75rem 1rem' }}
                      >
                        <span>View Case Study</span>
                        <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 07: Cross-Domain Comparison Matrix */}
        <ScrollFade>
          <ComparisonMatrix />
        </ScrollFade>
      </div>

      <style>{`
        .case-study-card:hover {
          border-color: var(--agnex-accent) !important;
        }
        @media (min-width: 1024px) {
          .case-left-col {
            grid-column: span 7 !important;
          }
          .case-right-col {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </section>
  );
}
