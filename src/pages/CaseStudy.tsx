import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScrollFade from '../components/motion/ScrollFade';
import { getProjectById, projectsData } from '../features/work/projectsData';
import RdaArchitectureDiagram from '../features/work/components/RdaArchitectureDiagram';
import SkynetArchitectureDiagram from '../features/work/components/SkynetArchitectureDiagram';
import LawGuideArchitectureDiagram from '../features/work/components/LawGuideArchitectureDiagram';
import SentinelXArchitectureDiagram from '../features/work/components/SentinelXArchitectureDiagram';

export default function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = getProjectById(id || '');

  if (!project) {
    return (
      <div className="agnex-container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: '1rem', color: 'var(--agnex-white)' }}>
          Engineering Case Study Not Found
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
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

      <article style={{ backgroundColor: 'var(--agnex-base)' }}>
        {/* ========================================================= */}
        {/* 01 — OVERVIEW HEADER                                     */}
        {/* ========================================================= */}
        <header
          style={{
            padding: 'clamp(4rem, 6vw, 6.5rem) 0 4rem 0',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--agnex-base-raised)'
          }}
          className="agnex-grid-mesh"
        >
          <div className="agnex-container">
            <ScrollFade>
              {/* Top Navigation Backlink */}
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
                <span>BACK TO ALL SELECTED WORK</span>
              </Link>

              {/* Status & Category Metadata */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
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
                  CASE STUDY {project.number} // {project.domain.toUpperCase()}
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
                      padding: '0.15rem 0.6rem',
                      backgroundColor: 'rgba(234, 179, 8, 0.1)',
                      border: '1px solid rgba(234, 179, 8, 0.35)',
                      borderRadius: 'var(--radius-xs)'
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
                  lineHeight: 1.12,
                  color: 'var(--agnex-white)',
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
                  color: 'var(--text-muted)',
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
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1rem 1.25rem',
                    maxWidth: '820px',
                    marginBottom: '2.5rem',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--agnex-steel-light)',
                    lineHeight: 1.55
                  }}
                >
                  <strong style={{ color: 'var(--agnex-white)' }}>FOUNDATION STATUS: </strong>
                  {project.statusNote}
                </div>
              )}

              {/* Mandatory Legal Disclaimer if Applicable (e.g. LawGuide AI) */}
              {project.disclaimer && (
                <div
                  style={{
                    backgroundColor: 'rgba(234, 179, 8, 0.08)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1rem 1.25rem',
                    maxWidth: '820px',
                    marginBottom: '2.5rem',
                    fontSize: 'var(--text-xs)',
                    color: '#FDE047',
                    lineHeight: 1.55
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
                  backgroundColor: 'var(--agnex-black)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)' }}>
                    ARCHITECTURAL DOMAIN
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', fontWeight: 600, marginTop: '2px' }}>
                    {project.domain}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)' }}>
                    CORE FOCUS
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', fontWeight: 600, marginTop: '2px' }}>
                    {project.coreEngineering}
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)' }}>
                    ENGINEERING METHOD
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-accent)', fontWeight: 600, marginTop: '2px' }}>
                    Understand → Evolve
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)' }}>
                    VERIFICATION
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', fontWeight: 600, marginTop: '2px' }}>
                    Deterministic & Audited
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </header>

        {/* ========================================================= */}
        {/* 02 — THE CHALLENGE                                       */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                02 // THE CHALLENGE
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '1.25rem' }}>
                The Operational Problem
              </h2>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '2rem' }}>
                {project.challenge.summary}
              </p>

              <div
                style={{
                  backgroundColor: 'var(--agnex-base-raised)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.75rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.875rem', textTransform: 'uppercase' }}>
                  OPERATIONAL COORDINATION REQUIREMENTS
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                  {project.challenge.coordinationPoints.map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--agnex-accent)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>↳</span>
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel-light)', lineHeight: 1.5 }}>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ borderLeft: '3px solid var(--agnex-accent)', paddingLeft: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-steel)', marginBottom: '0.25rem' }}>
                  TECHNICAL BOTTLENECK
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                  {project.challenge.technicalBottlenecks}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 03 — THE APPROACH (AGNEX METHODOLOGY)                    */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-black)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                03 // THE APPROACH
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                The AGNEX Engineering Methodology
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
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
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.625rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', fontWeight: 700 }}>
                    {m.phase}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', fontWeight: 600 }}>
                    {m.title}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                    {m.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 04 — WHAT WE BUILT (SYSTEMS & CAPABILITIES)              */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                04 // WHAT WE BUILT
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Engineered Capabilities & Subsystems
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
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
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--agnex-accent)',
                      padding: '0.2rem 0.5rem',
                      backgroundColor: 'var(--agnex-black)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', lineHeight: 1.5, fontWeight: 500 }}>
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 05 — ARCHITECTURE VISUALIZATION                          */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-black)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '2.5rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                05 // ARCHITECTURE
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                System Topology & Structural Flow
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
                {project.architecture.overview}
              </p>
            </div>

            {/* Custom Interactive SVG Diagram for Project */}
            {project.id === 'rda' && <RdaArchitectureDiagram />}
            {project.id === 'skynet' && <SkynetArchitectureDiagram />}
            {project.id === 'lawguide-ai' && <LawGuideArchitectureDiagram />}
            {project.id === 'sentinelx-ai' && <SentinelXArchitectureDiagram />}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 06 — ENGINEERING DECISIONS                               */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                06 // ENGINEERING DECISIONS
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Critical Architectural Trade-Offs
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
                Deliberate technical choices made to eliminate race conditions, optimize query latency, and protect integrity.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {project.engineeringDecisions.map((dec, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: 'clamp(1.5rem, 3vw, 2rem)'
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--agnex-white)' }}>
                      {dec.decision}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--agnex-accent)',
                        padding: '0.2rem 0.5rem',
                        backgroundColor: 'var(--agnex-black)',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      DECISION {(idx + 1).toString().padStart(2, '0')}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-steel)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        THE RATIONALE
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                        {dec.rationale}
                      </p>
                    </div>

                    <div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                        MEASURABLE ARCHITECTURAL IMPACT
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-steel-light)', margin: 0, lineHeight: 1.6 }}>
                        {dec.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 07 — TECHNOLOGY STACK                                    */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-black)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                07 // TECHNOLOGY STACK
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Production Technologies & Tools
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
                No decorative fluff. Every library and infrastructure primitive plays an active operational role.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              {project.techCategories.map((cat) => (
                <div
                  key={cat.category}
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    {cat.category}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {cat.items.map((it) => (
                      <span
                        key={it}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-white)',
                          backgroundColor: 'var(--agnex-black)',
                          border: '1px solid var(--border-color)',
                          padding: '0.3rem 0.65rem',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 08 — SYSTEM FLOW                                         */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                08 // SYSTEM FLOW
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                {project.systemFlow.title}
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
                {project.systemFlow.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {project.systemFlow.steps.map((st) => (
                <div
                  key={st.step}
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-accent)', marginBottom: '0.5rem' }}>
                    STEP {st.step}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--agnex-white)', marginBottom: '0.5rem' }}>
                    {st.title}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.55 }}>
                    {st.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 09 — SECURITY & RELIABILITY                              */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-black)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                09 // SECURITY & RELIABILITY
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Operational Hardening & Guarantees
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
                Strict identity boundaries, encryption at rest and in transit, and immutable audit logs.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {project.securityReliability.map((sr, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    {sr.domain}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-steel-light)', margin: 0, lineHeight: 1.55 }}>
                    {sr.implementation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 10 — EVOLUTION (NEXT ENGINEERING FRONTIER)               */}
        {/* ========================================================= */}
        <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="agnex-container">
            <div style={{ maxWidth: '880px', marginBottom: '3rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                10 // NEXT ENGINEERING FRONTIER
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                {project.evolution.label}
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', margin: 0 }}>
                Documented architectural expansion paths designed to preserve system durability as operational scale increases.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {project.evolution.items.map((ev, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xs)',
                    padding: '1.5rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--agnex-steel)',
                      padding: '0.15rem 0.5rem',
                      backgroundColor: 'var(--agnex-black)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border-color)',
                      display: 'inline-block',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {ev.status.toUpperCase()}
                  </span>
                  <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--agnex-white)', marginBottom: '0.5rem' }}>
                    {ev.title}
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* NEXT CASE STUDY TRANSITION CAROUSEL                      */}
        {/* ========================================================= */}
        <section
          className="agnex-section"
          style={{
            backgroundColor: 'var(--agnex-black)',
            borderBottom: '1px solid var(--border-color)',
            padding: '4rem 0'
          }}
        >
          <div className="agnex-container">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
                backgroundColor: 'var(--agnex-base-raised)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(2rem, 4vw, 3.5rem)'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-steel)', marginBottom: '0.5rem' }}>
                  NEXT ENGINEERING SPECIFICATION
                </div>
                <h3 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-white)', margin: 0 }}>
                  {nextProject.number} // {nextProject.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: '0.5rem 0 0 0', maxWidth: '580px' }}>
                  {nextProject.shortDescription}
                </p>
              </div>

              <Link
                to={`/work/${nextProject.id}`}
                className="btn btn-primary"
                style={{ minHeight: '44px', padding: '0.875rem 1.75rem' }}
              >
                <span>Read Next Case Study ({nextProject.name})</span>
                <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
