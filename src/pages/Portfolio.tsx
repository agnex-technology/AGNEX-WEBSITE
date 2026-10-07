import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollFade from '../components/motion/ScrollFade';
import { projectsData, ProjectCaseStudy } from '../features/work/projectsData';

type CapabilityFilter = 'ALL' | 'DIGITAL' | 'SYSTEMS' | 'INTELLIGENCE' | 'ENGINEERING';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<CapabilityFilter>('ALL');

  const filters: CapabilityFilter[] = ['ALL', 'DIGITAL', 'SYSTEMS', 'INTELLIGENCE', 'ENGINEERING'];

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.relatedCapabilities.includes(activeFilter as any));

  return (
    <>
      <Helmet>
        <title>Selected Engineering Work & Case Studies | AGNEX Technology</title>
        <meta
          name="description"
          content="Explore AGNEX Technology's engineering case studies: multi-node inventory ledgers, intelligent automated dispatch, high-throughput digital platforms, and cloud microservices."
        />
        <link rel="canonical" href="https://agnextechnology.com/work" />
        <meta property="og:title" content="Selected Engineering Work & Case Studies | AGNEX Technology" />
        <meta
          property="og:description"
          content="Engineering rigor applied to real business challenges. Explore how AGNEX designs, builds, and scales digital infrastructure."
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
          padding: 'clamp(4rem, 6vw, 6rem) 0 3rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--agnex-base)'
        }}
        className="agnex-grid-mesh"
      >
        <div className="agnex-container">
          <ScrollFade>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.5rem' }}>
              02 // SELECTED WORK & CASE STUDIES
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--agnex-white)'
              }}
            >
              Engineering in Action
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-muted)',
                maxWidth: '720px',
                lineHeight: 1.6
              }}
            >
              A documented look into our engineering thinking, architectural decisions, and measurable outcomes. Every case study represents an operational problem solved with precision.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Capability Filter Bar */}
      <nav
        aria-label="Work Category Filters"
        style={{
          backgroundColor: 'var(--agnex-base-raised)',
          borderBottom: '1px solid var(--border-color)',
          position: 'sticky',
          top: '76px',
          zIndex: 50,
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
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: activeFilter === filter ? 'var(--agnex-accent)' : 'var(--border-color)',
                  backgroundColor: activeFilter === filter ? 'var(--agnex-accent-subtle)' : 'transparent',
                  color: activeFilter === filter ? 'var(--agnex-white)' : 'var(--agnex-steel)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {filter === 'ALL' ? 'All Case Studies' : `Pillar // ${filter}`}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Projects List */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base)' }}>
        <div className="agnex-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {filteredProjects.map((project: ProjectCaseStudy) => (
              <ScrollFade key={project.id}>
                <article
                  className="agnex-card"
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    padding: 'clamp(2rem, 4vw, 3.5rem)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {/* Top Meta */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-2xs)',
                          color: 'var(--agnex-accent)',
                          padding: '0.2rem 0.6rem',
                          backgroundColor: 'var(--agnex-accent-subtle)',
                          border: '1px solid var(--agnex-accent-border)',
                          borderRadius: 'var(--radius-xs)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {project.type}
                      </span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel)' }}>
                        {project.industry}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {project.relatedCapabilities.map((cap) => (
                        <span
                          key={cap}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.625rem',
                            color: 'var(--agnex-steel-dark)',
                            padding: '0.15rem 0.4rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: '2px'
                          }}
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h2
                    style={{
                      fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                      color: 'var(--agnex-white)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.2
                    }}
                  >
                    {project.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 'var(--text-md)',
                      color: 'var(--agnex-white)',
                      opacity: 0.85,
                      marginBottom: '2rem'
                    }}
                  >
                    {project.tagline}
                  </p>

                  {/* Challenge & Solution Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2rem',
                      padding: '1.75rem 0',
                      borderTop: '1px solid var(--border-color)',
                      borderBottom: '1px solid var(--border-color)',
                      marginBottom: '2rem'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-2xs)',
                          color: 'var(--agnex-steel)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem'
                        }}
                      >
                        The Problem
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        {project.challenge}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-2xs)',
                          color: 'var(--agnex-accent)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginBottom: '0.5rem'
                        }}
                      >
                        The Engineering Solution
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', lineHeight: 1.6 }}>
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results Metric Chips */}
                  <div style={{ marginBottom: '2rem' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        color: 'var(--agnex-steel)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.75rem'
                      }}
                    >
                      Measured Results
                    </div>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                      }}
                    >
                      {project.results.map((res, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '1rem',
                            backgroundColor: 'var(--agnex-base)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontSize: 'var(--text-2xl)',
                              fontWeight: 700,
                              color: 'var(--agnex-white)',
                              marginBottom: '0.25rem'
                            }}
                          >
                            {res.metric}
                          </div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                            {res.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stack & Deep-Dive Link */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
                      <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel-dark)', textTransform: 'uppercase', marginRight: '0.4rem' }}>
                        Stack:
                      </span>
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.6875rem',
                            padding: '0.2rem 0.5rem',
                            backgroundColor: 'var(--agnex-base)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '2px',
                            color: 'var(--agnex-steel-light)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link to={`/work/${project.id}`} className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: 'var(--text-xs)' }}>
                      <span>Read Technical Case Study</span>
                      <span style={{ color: 'var(--agnex-accent)' }}>→</span>
                    </Link>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Project CTA */}
      <section className="agnex-section" style={{ textAlign: 'center', backgroundColor: 'var(--agnex-base-raised)', borderTop: '1px solid var(--border-color)' }}>
        <div className="agnex-container">
          <ScrollFade>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--agnex-white)', marginBottom: '1.25rem' }}>
                Have an architecture that needs solving?
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Every system we build starts with deep problem discovery. Connect with our engineering leads to review your challenge.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ padding: '0.875rem 2.25rem' }}>
                <span>Start a Conversation</span>
                <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
              </Link>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
