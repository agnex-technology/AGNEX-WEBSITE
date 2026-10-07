import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollFade from '../components/motion/ScrollFade';
import { getProjectById } from '../features/work/projectsData';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="agnex-container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '1rem', color: 'var(--agnex-white)' }}>
          Case Study Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          The requested engineering architecture document could not be located.
        </p>
        <Link to="/work" className="btn btn-primary">
          ← Return to Selected Work
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Case Study | AGNEX Technology</title>
        <meta name="description" content={project.tagline} />
        <link rel="canonical" href={`https://agnextechnology.com/work/${project.id}`} />
        <meta property="og:title" content={`${project.title} | AGNEX Technology`} />
        <meta property="og:description" content={project.tagline} />
        <meta property="og:url" content={`https://agnextechnology.com/work/${project.id}`} />
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
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": project.title,
                "item": `https://agnextechnology.com/work/${project.id}`
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Case Study Header */}
      <article style={{ backgroundColor: 'var(--agnex-base)' }}>
        <header
          style={{
            padding: 'clamp(4rem, 6vw, 6rem) 0 4rem 0',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--agnex-base-raised)'
          }}
          className="agnex-grid-mesh"
        >
          <div className="agnex-container">
            <ScrollFade>
              <Link
                to="/work"
                className="agnex-link"
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--agnex-steel)',
                  marginBottom: '2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>←</span>
                <span>BACK TO ALL CASE STUDIES</span>
              </Link>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
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
                  Industry: {project.industry}
                </span>
              </div>

              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: 1.15,
                  color: 'var(--agnex-white)',
                  marginBottom: '1.25rem',
                  maxWidth: '960px'
                }}
              >
                {project.title}
              </h1>

              <p
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  maxWidth: '820px',
                  marginBottom: '3rem'
                }}
              >
                {project.tagline}
              </p>

              {/* Quick Results Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.5rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid var(--border-color)'
                }}
              >
                {project.results.map((res, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--agnex-base)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 700,
                        color: 'var(--agnex-white)',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {res.metric}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel-light)' }}>
                      {res.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </header>

        {/* Deep-Dive Architectural Breakdown */}
        <section className="agnex-section">
          <div className="agnex-container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem'
              }}
            >
              {/* Main Content Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
                <ScrollFade>
                  <div>
                    <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-white)', marginBottom: '1rem' }}>
                      Context & Commercial Background
                    </h2>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                      {project.context}
                    </p>
                  </div>
                </ScrollFade>

                <ScrollFade>
                  <div>
                    <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-white)', marginBottom: '1rem' }}>
                      The Engineering Challenge
                    </h2>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                      {project.challenge}
                    </p>
                  </div>
                </ScrollFade>

                <ScrollFade>
                  <div>
                    <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-white)', marginBottom: '1rem' }}>
                      Architectural Approach & Trade-Offs
                    </h2>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                      {project.approach}
                    </p>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                      {project.solution}
                    </p>
                  </div>
                </ScrollFade>

                {/* Architecture Specifications Card */}
                <ScrollFade>
                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--agnex-base-raised)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-white)', marginBottom: '1.5rem' }}>
                      Architecture & Subsystem Specifications
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Frontend Client Layer
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)' }}>
                          {project.architectureDetails.frontend}
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Backend Services & API Mesh
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)' }}>
                          {project.architectureDetails.backend}
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Data Persistence & Distributed State
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)' }}>
                          {project.architectureDetails.database}
                        </div>
                      </div>

                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Deployment & Orchestration
                        </div>
                        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)' }}>
                          {project.architectureDetails.infrastructure}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollFade>
              </div>

              {/* Sidebar Info Column */}
              <aside>
                <div
                  style={{
                    position: 'sticky',
                    top: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                  }}
                >
                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--agnex-base-raised)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--agnex-white)', marginBottom: '1.25rem' }}>
                      Technology Stack
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            padding: '0.3rem 0.6rem',
                            backgroundColor: 'var(--agnex-base)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--agnex-steel-light)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel)', marginBottom: '0.5rem' }}>
                        Related Capability Pillars
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {project.relatedCapabilities.map((cap) => (
                          <span
                            key={cap}
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 'var(--text-2xs)',
                              color: 'var(--agnex-accent)',
                              padding: '0.2rem 0.5rem',
                              border: '1px solid var(--agnex-accent-border)',
                              borderRadius: 'var(--radius-xs)'
                            }}
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: '2rem',
                      backgroundColor: 'var(--agnex-base)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center'
                    }}
                  >
                    <h4 style={{ fontSize: 'var(--text-base)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                      Have a similar challenge?
                    </h4>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                      We can discuss your operational parameters and architecture options.
                    </p>
                    <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                      <span>Start a Conversation</span>
                      <span style={{ color: 'var(--agnex-accent)' }}>→</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
