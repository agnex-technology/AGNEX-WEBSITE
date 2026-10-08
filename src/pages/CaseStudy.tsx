import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollFade from '../components/motion/ScrollFade';
import { getProjectById, projectsData } from '../features/work/projectsData';
import RdaArchitectureDiagram from '../features/work/components/RdaArchitectureDiagram';
import SkynetArchitectureDiagram from '../features/work/components/SkynetArchitectureDiagram';
import LawGuideArchitectureDiagram from '../features/work/components/LawGuideArchitectureDiagram';
import SentinelXArchitectureDiagram from '../features/work/components/SentinelXArchitectureDiagram';
import { Container, SectionLabel, TechnicalLabel } from '../components/primitives';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="agnex-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '1rem', color: 'var(--agnex-navy)' }}>
          Engineering Case Study Not Found
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          The requested system specification could not be located in the engineering archive.
        </p>
        <Link to="/work" className="btn btn-primary">
          ← Return to Selected Work
        </Link>
      </div>
    );
  }

  // Find next project in the 4-project sequence
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <>
      <Helmet>
        <title>{project.seo.metaTitle}</title>
        <meta name="description" content={project.seo.metaDescription} />
        <link rel="canonical" href={`https://agnextechnology.com/work/${project.id}`} />
        <meta property="og:title" content={project.seo.metaTitle} />
        <meta property="og:description" content={project.seo.metaDescription} />
        <meta property="og:url" content={`https://agnextechnology.com/work/${project.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
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
                    "name": project.name,
                    "item": `https://agnextechnology.com/work/${project.id}`
                  }
                ]
              },
              {
                "@type": "SoftwareApplication",
                "name": project.title,
                "applicationCategory": project.domain,
                "operatingSystem": "Web, Cloud, Cross-Platform",
                "description": project.shortDescription,
                "author": {
                  "@type": "Organization",
                  "name": "AGNEX Technology",
                  "url": "https://agnextechnology.com"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <article style={{ backgroundColor: '#FFFFFF' }}>
        {/* ========================================================= */}
        {/* 01 — OVERVIEW HEADER                                     */}
        {/* ========================================================= */}
        <header
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
              {/* Top Navigation Backlink */}
              <Link
                to="/work"
                className="agnex-link"
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600
                }}
              >
                <span>←</span>
                <span>BACK TO ALL SELECTED WORK</span>
              </Link>

              {/* Status & Category Metadata */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
                  CASE STUDY {project.number} // {project.domain.toUpperCase()}
                </span>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
                  {project.category}
                </span>

                <TechnicalLabel code={`SPEC_${project.number}`} status="PRODUCTION" />

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

              {/* Title & Tagline */}
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                  lineHeight: 1.1,
                  color: 'var(--agnex-navy)',
                  marginBottom: '1.25rem',
                  maxWidth: '980px',
                  letterSpacing: 'var(--tracking-tight)'
                }}
              >
                {project.title}
              </h1>

              <p
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  maxWidth: '820px',
                  marginBottom: '2.5rem'
                }}
              >
                {project.shortDescription}
              </p>

              {/* Project Status Note if Applicable (e.g. SentinelX AI) */}
              {project.statusNote && (
                <div
                  style={{
                    backgroundColor: 'var(--agnex-blue-pale)',
                    border: '1px solid rgba(1, 122, 239, 0.3)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1rem 1.25rem',
                    maxWidth: '820px',
                    marginBottom: '2.5rem',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--agnex-navy)',
                    lineHeight: 1.55
                  }}
                >
                  <strong style={{ color: 'var(--agnex-blue)' }}>FOUNDATION STATUS: </strong>
                  {project.statusNote}
                </div>
              )}

              {/* Mandatory Legal Disclaimer if Applicable (e.g. LawGuide AI) */}
              {project.disclaimer && (
                <div
                  style={{
                    backgroundColor: '#FEF3C7',
                    border: '1px solid #F59E0B',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1rem 1.25rem',
                    maxWidth: '820px',
                    marginBottom: '2.5rem',
                    fontSize: 'var(--text-xs)',
                    color: '#92400E',
                    lineHeight: 1.55,
                    fontWeight: 500
                  }}
                >
                  ⚖️ {project.disclaimer}
                </div>
              )}

              {/* Core Telemetry Specs Bar */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  padding: '1.5rem',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>
                    ARCHITECTURAL DOMAIN
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', fontWeight: 600, marginTop: '2px' }}>
                    {project.domain}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>
                    CORE FOCUS
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', fontWeight: 600, marginTop: '2px' }}>
                    {project.coreEngineering}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>
                    ENGINEERING METHOD
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-blue)', fontWeight: 600, marginTop: '2px' }}>
                    Understand → Evolve
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>
                    VERIFICATION
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', fontWeight: 600, marginTop: '2px' }}>
                    Deterministic & Audited
                  </div>
                </div>
              </div>
            </ScrollFade>
          </Container>
        </header>

        {/* ========================================================= */}
        {/* 02 — THE CHALLENGE                                       */}
        {/* ========================================================= */}
        <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px' }}>
              <SectionLabel number="02" text="THE CHALLENGE" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '1.25rem' }}>
                The Operational Problem
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
                {project.challenge.summary}
              </p>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.75rem',
                  marginBottom: '2rem',
                  boxShadow: 'var(--shadow-subtle)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', marginBottom: '0.875rem', textTransform: 'uppercase', fontWeight: 700 }}>
                  OPERATIONAL COORDINATION REQUIREMENTS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {project.challenge.coordinationPoints.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--agnex-blue)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>↳</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderLeft: '3px solid var(--agnex-blue)', paddingLeft: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.25rem', fontWeight: 600 }}>
                  TECHNICAL BOTTLENECK
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {project.challenge.technicalBottlenecks}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 03 — THE APPROACH (AGNEX METHODOLOGY)                    */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ marginBottom: '3rem' }}>
              <SectionLabel number="03" text="THE APPROACH" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                The AGNEX Engineering Methodology
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                Understand → Architect → Engineer → Integrate → Evolve
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
              {[
                { phase: '01 / UNDERSTAND', title: 'Domain Ingestion', body: project.approach.understand },
                { phase: '02 / ARCHITECT', title: 'System Blueprint', body: project.approach.architect },
                { phase: '03 / ENGINEER', title: 'Deterministic Build', body: project.approach.engineer },
                { phase: '04 / INTEGRATE', title: 'Telemetry & AI', body: project.approach.integrate },
                { phase: '05 / EVOLVE', title: 'Resilient Frontier', body: project.approach.evolve }
              ].map((m) => (
                <div
                  key={m.phase}
                  style={{
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', fontWeight: 700 }}>
                    {m.phase}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', fontWeight: 600 }}>
                    {m.title}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 04 — WHAT WE BUILT (SYSTEMS & CAPABILITIES)              */}
        {/* ========================================================= */}
        <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <SectionLabel number="04" text="WHAT WE BUILT" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Engineered Capabilities & Subsystems
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                Every module was engineered around deterministic boundaries, operational auditing, and production safety.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {project.whatWeBuilt.map((capability, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    padding: '1.25rem',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--agnex-blue)',
                      padding: '0.2rem 0.5rem',
                      backgroundColor: 'var(--agnex-blue-pale)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid rgba(1, 122, 239, 0.25)',
                      fontWeight: 700
                    }}
                  >
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', lineHeight: 1.5, fontWeight: 500 }}>
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 05 — ARCHITECTURE VISUALIZATION                          */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '2.5rem' }}>
              <SectionLabel number="05" text="ARCHITECTURE" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                System Topology & Structural Flow
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                {project.architecture.overview}
              </p>
            </div>

            {/* Custom Interactive SVG Diagram for Project */}
            {project.id === 'rda' && <RdaArchitectureDiagram />}
            {project.id === 'skynet' && <SkynetArchitectureDiagram />}
            {project.id === 'lawguide-ai' && <LawGuideArchitectureDiagram />}
            {project.id === 'sentinelx-ai' && <SentinelXArchitectureDiagram />}
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 06 — ENGINEERING DECISIONS                               */}
        {/* ========================================================= */}
        <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <SectionLabel number="06" text="ENGINEERING DECISIONS" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Critical Architectural Trade-Offs
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                Deliberate technical choices made to eliminate race conditions, optimize query latency, and protect integrity.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {project.engineeringDecisions.map((dec, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    padding: 'clamp(1.5rem, 3vw, 2rem)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--agnex-navy)' }}>
                      {dec.decision}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--agnex-blue)',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: 'var(--agnex-blue-pale)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid rgba(1, 122, 239, 0.25)',
                        fontWeight: 700
                      }}
                    >
                      DECISION {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '0.35rem', textTransform: 'uppercase', fontWeight: 600 }}>
                        THE RATIONALE
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                        {dec.rationale}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', marginBottom: '0.35rem', textTransform: 'uppercase', fontWeight: 600 }}>
                        MEASURABLE ARCHITECTURAL IMPACT
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-navy)', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
                        {dec.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 07 — TECHNOLOGY STACK                                    */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <SectionLabel number="07" text="TECHNOLOGY STACK" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Production Technologies & Tools
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                No decorative fluff. Every library and infrastructure primitive plays an active operational role.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {project.techCategories.map((cat) => (
                <div
                  key={cat.category}
                  style={{
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 700 }}>
                    {cat.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {cat.items.map((it) => (
                      <span
                        key={it}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-navy)',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid var(--border-strong)',
                          padding: '0.3rem 0.65rem',
                          borderRadius: 'var(--radius-xs)',
                          fontWeight: 500
                        }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 08 — SYSTEM FLOW                                         */}
        {/* ========================================================= */}
        <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <SectionLabel number="08" text="SYSTEM FLOW" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                {project.systemFlow.title}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                {project.systemFlow.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {project.systemFlow.steps.map((st) => (
                <div
                  key={st.step}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem',
                    position: 'relative',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-blue)', marginBottom: '0.5rem' }}>
                    STEP {st.step}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                    {st.title}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {st.detail}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 09 — SECURITY & RELIABILITY                              */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <SectionLabel number="09" text="SECURITY & RELIABILITY" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Operational Hardening & Guarantees
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                Strict identity boundaries, encryption at rest and in transit, and immutable audit logs.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {project.securityReliability.map((sr, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', marginBottom: '0.35rem', textTransform: 'uppercase', fontWeight: 700 }}>
                    {sr.domain}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.55 }}>
                    {sr.implementation}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* 10 — EVOLUTION (NEXT ENGINEERING FRONTIER)               */}
        {/* ========================================================= */}
        <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <Container>
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <SectionLabel number="10" text="NEXT ENGINEERING FRONTIER" />
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                {project.evolution.label}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0 }}>
                Documented architectural expansion paths designed to preserve system durability as operational scale increases.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {project.evolution.items.map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--text-muted)',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: 'var(--agnex-canvas-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-color)',
                      display: 'inline-block',
                      marginBottom: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    {ev.status.toUpperCase()}
                  </span>
                  <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                    {ev.title}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* NEXT CASE STUDY TRANSITION CAROUSEL                      */}
        {/* ========================================================= */}
        <section
          className="agnex-section"
          style={{
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid var(--border-color)',
            padding: '4rem 0'
          }}
        >
          <Container>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
                backgroundColor: 'var(--agnex-canvas-subtle)',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', marginBottom: '0.5rem', fontWeight: 700 }}>
                  NEXT ENGINEERING SPECIFICATION
                </div>
                <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', margin: 0 }}>
                  {nextProject.number} // {nextProject.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: '0.5rem 0 0 0', maxWidth: '580px' }}>
                  {nextProject.shortDescription}
                </p>
              </div>

              <Link
                to={`/work/${nextProject.id}`}
                className="btn btn-primary"
                style={{ minHeight: '44px', padding: '0.875rem 1.75rem' }}
              >
                <span>Read Next Case Study ({nextProject.name})</span>
                <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
              </Link>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}
