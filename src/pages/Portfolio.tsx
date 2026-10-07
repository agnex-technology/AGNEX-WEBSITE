import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/motion/ScrollFade';
import { projectsData } from '../features/work/projectsData';
import ComparisonMatrix from '../features/work/components/ComparisonMatrix';

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
          padding: 'clamp(4rem, 6vw, 6rem) 0 3.5rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--agnex-base)'
        }}
        className="agnex-grid-mesh"
      >
        <div className="agnex-container">
          <ScrollFade>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.5rem' }}>
              02 // SELECTED WORK & ENGINEERING ARCHIVE
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                color: 'var(--agnex-white)'
              }}
            >
              Systems we've engineered.
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-muted)',
                maxWidth: '740px',
                lineHeight: 1.6
              }}
            >
              We engineer technology around complex real-world problems — from logistics infrastructure and cybersecurity platforms to AI-powered research systems.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Domain Filter Bar */}
      <nav
        aria-label="Engineering Domain Filters"
        style={{
          backgroundColor: 'var(--agnex-base-raised)',
          borderBottom: '1px solid var(--border-color)',
          position: 'sticky',
          top: '76px',
          zIndex: 40,
          backdropFilter: 'blur(12px)'
        }}
      >
        <div className="agnex-container">
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
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: activeFilter === filter ? 'var(--agnex-accent)' : 'var(--agnex-base)',
                  color: activeFilter === filter ? '#FFFFFF' : 'var(--text-muted)',
                  border: activeFilter === filter ? '1px solid var(--agnex-accent)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  minHeight: '44px',
                  transition: 'all 0.2s ease'
                }}
              >
                {filter === 'ALL' ? 'ALL SYSTEMS (04)' : filter}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Case Studies Section */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-black)' }}>
        <div className="agnex-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '5rem' }}>
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="case-study-card"
                style={{
                  backgroundColor: 'var(--agnex-base-raised)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'clamp(2rem, 4vw, 3.5rem)',
                  transition: 'border-color 0.2s ease',
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
                          color: 'var(--agnex-accent)',
                          padding: '0.2rem 0.6rem',
                          backgroundColor: 'var(--agnex-black)',
                          border: '1px solid var(--agnex-accent-border)',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        {project.number} / {project.domain.toUpperCase()}
                      </span>

                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-steel)' }}>
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

                    <h2
                      style={{
                        fontSize: 'clamp(1.875rem, 3vw, 2.75rem)',
                        fontWeight: 700,
                        color: 'var(--agnex-white)',
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
                        color: 'var(--agnex-steel-light)',
                        marginBottom: '1.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em'
                      }}
                    >
                      {project.title.replace(`${project.name} — `, '')}
                    </div>

                    <p
                      style={{
                        fontSize: 'var(--text-md)',
                        color: 'var(--text-muted)',
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
                        backgroundColor: 'var(--agnex-black)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-xs)',
                        padding: '1.25rem',
                        marginBottom: '1.75rem'
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        THE ENGINEERING PROBLEM
                      </div>
                      <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--agnex-steel-light)', lineHeight: 1.6 }}>
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
                            color: 'var(--agnex-steel-light)',
                            backgroundColor: 'var(--agnex-black)',
                            border: '1px solid var(--border-color)',
                            padding: '0.25rem 0.6rem',
                            borderRadius: 'var(--radius-xs)'
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
                        <span>WHAT WE ENGINEERED</span>
                        <span style={{ color: 'var(--agnex-accent)' }}>SPEC-{project.number}</span>
                      </div>

                      <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
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
                          <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
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
        </div>
      </section>

      <style>{`
        .case-study-card:hover {
          border-color: var(--agnex-accent) !important;
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
