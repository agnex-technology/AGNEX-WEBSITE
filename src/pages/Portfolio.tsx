import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/motion/ScrollFade';
import { projectsData } from '../features/work/projectsData';
import ComparisonMatrix from '../features/work/components/ComparisonMatrix';
import { Container, SectionLabel, TechnicalLabel } from '../components/primitives';

type DomainFilter = 'ALL' | 'LOGISTICS' | 'CYBERSECURITY' | 'LEGAL AI';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<DomainFilter>('ALL');

  const filters: DomainFilter[] = ['ALL', 'LOGISTICS', 'CYBERSECURITY', 'LEGAL AI'];

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.domain.toUpperCase() === activeFilter);

  return (
    <>
      <Helmet>
        <title>Selected Engineering Work & Case Studies | AGNEX Technology</title>
        <meta
          name="description"
          content="Explore AGNEX Technology's engineering case studies: RDA logistics infrastructure, SKYNET v5.0 autonomous SOC & XDR, LawGuide AI legal research, and SentinelX AI defensive platform."
        />
        <link rel="canonical" href="https://agnextechnology.com/work" />
        <meta property="og:title" content="Selected Engineering Work & Case Studies | AGNEX Technology" />
        <meta
          property="og:description"
          content="Engineering systems around complex real-world problems — logistics, cybersecurity, AI document intelligence, and defensive platforms."
        />
        <meta property="og:url" content="https://agnextechnology.com/work" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://agnextechnology.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Selected Work",
                "item": "https://agnextechnology.com/work"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(5rem, 8vw, 7.5rem) 0 4rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
        className="agnex-blueprint-grid"
      >
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="02" text="SELECTED WORK & ARCHIVE" />
              <TechnicalLabel code="SYS//ARCHIVE_02" status="ACTIVE" />
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.08,
                marginBottom: '1.25rem',
                color: 'var(--agnex-navy)',
                maxWidth: '900px',
                letterSpacing: 'var(--tracking-tight)'
              }}
            >
              Systems we've engineered.
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                maxWidth: '740px',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              We engineer technology around complex real-world problems — from logistics mobility infrastructure and cybersecurity platforms to AI-powered research systems.
            </p>
          </ScrollFade>
        </Container>
      </section>

      {/* Domain Filter Bar */}
      <nav
        aria-label="Engineering Domain Filters"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderBottom: '1px solid var(--border-color)',
          position: 'sticky',
          top: '68px',
          zIndex: 40,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
      >
        <Container>
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              padding: '0.875rem 0',
              scrollbarWidth: 'none'
            }}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  padding: '0.5rem 1.15rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: activeFilter === filter ? 'var(--agnex-navy)' : '#FFFFFF',
                  color: activeFilter === filter ? '#FFFFFF' : 'var(--agnex-navy)',
                  border: activeFilter === filter ? '1px solid var(--agnex-navy)' : '1px solid var(--border-strong)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  minHeight: '40px',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === filter ? '0 2px 8px rgba(12, 28, 41, 0.15)' : 'none'
                }}
              >
                {filter === 'ALL' ? 'ALL SYSTEMS (04)' : filter}
              </button>
            ))}
          </div>
        </Container>
      </nav>

      {/* Main Case Studies Section */}
      <section className="agnex-section agnex-section-subtle">
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '5rem' }}>
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="case-study-card"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  transition: 'all 0.25s ease',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-subtle)'
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
                  {/* Left 7 Columns: Context & Specifications */}
                  <div style={{ gridColumn: 'span 12' }} className="portfolio-card-left">
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
                          color: 'var(--agnex-blue)',
                          padding: '0.25rem 0.65rem',
                          backgroundColor: 'var(--agnex-blue-pale)',
                          border: '1px solid rgba(1, 122, 239, 0.25)',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        {project.number} // {project.domain.toUpperCase()}
                      </span>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                        {project.category}
                      </span>

                      {project.statusBadge && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: '#B45309',
                            padding: '0.2rem 0.55rem',
                            backgroundColor: '#FEF3C7',
                            border: '1px solid #FCD34D',
                            borderRadius: 'var(--radius-xs)',
                            fontWeight: 600
                          }}
                        >
                          {project.statusBadge}
                        </span>
                      )}
                    </div>

                    <h2
                      style={{
                        fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                        fontWeight: 700,
                        color: 'var(--agnex-navy)',
                        marginBottom: '0.5rem',
                        lineHeight: 1.15
                      }}
                    >
                      {project.name}
                    </h2>

                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--agnex-blue)',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        fontWeight: 600
                      }}
                    >
                      {project.title.replace(`${project.name} — `, '')}
                    </div>

                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.65,
                        marginBottom: '1.75rem',
                        maxWidth: '680px'
                      }}
                    >
                      {project.shortDescription}
                    </p>

                    {/* Challenge Summary Box */}
                    <div
                      style={{
                        backgroundColor: 'var(--agnex-canvas-subtle)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '1.25rem',
                        marginBottom: '1.75rem'
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-navy)',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          letterSpacing: '0.05em'
                        }}
                      >
                        THE ENGINEERING PROBLEM
                      </div>
                      <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {project.challenge.summary}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--agnex-navy)',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid var(--border-strong)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-xs)',
                            fontWeight: 500
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right 5 Columns: Capabilities & CTA */}
                  <div style={{ gridColumn: 'span 12' }} className="portfolio-card-right">
                    <div
                      style={{
                        backgroundColor: 'var(--agnex-canvas-subtle)',
                        border: '1px solid var(--border-strong)',
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
                          color: 'var(--agnex-navy)',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          borderBottom: '1px solid var(--border-color)',
                          paddingBottom: '0.625rem',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>WHAT WE ENGINEERED</span>
                        <span style={{ color: 'var(--agnex-blue)' }}>SPEC-{project.number}</span>
                      </div>

                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {project.whatWeBuilt.slice(0, 5).map((w, idx) => (
                          <li key={idx} style={{ marginBottom: '0.35rem' }}>
                            {w}
                          </li>
                        ))}
                      </ul>

                      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                        <Link
                          to={`/work/${project.id}`}
                          className="btn btn-primary"
                          style={{ width: '100%', minHeight: '44px', padding: '0.75rem 1rem' }}
                        >
                          <span>View Case Study</span>
                          <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Cross-Domain Comparison Matrix */}
          <ComparisonMatrix />
        </Container>
      </section>

      <style>{`
        .case-study-card:hover {
          border-color: var(--agnex-blue) !important;
          box-shadow: var(--shadow-float) !important;
        }
        @media (min-width: 1024px) {
          .portfolio-card-left {
            grid-column: span 7 !important;
          }
          .portfolio-card-right {
            grid-column: span 5 !important;
          }
        }
      `}</style>
    </>
  );
}
