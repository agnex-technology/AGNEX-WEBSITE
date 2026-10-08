import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { servicesData } from '../data/servicesData';
import { Container, SectionLabel, TechnicalLabel, Button } from '../components/primitives';
import ScrollFade from '../components/motion/ScrollFade';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!slug || !servicesData[slug]) {
    return <Navigate to="/services" replace />;
  }

  const service = servicesData[slug];
  const pageTitle = `${service.title} | AGNEX Technology`;
  const canonicalUrl = `https://agnextechnology.com/services/${service.slug}`;

  // Structured Data Schema for Service & FAQ
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        provider: {
          '@type': 'Organization',
          name: 'AGNEX Technology',
          url: 'https://agnextechnology.com'
        },
        description: service.description,
        areaServed: 'Global'
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={service.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={service.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agnextechnology.com/brand/agnex-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={service.description} />
        <meta name="twitter:image" content="https://agnextechnology.com/brand/agnex-og.png" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* 01 — HERO */}
      <section
        className="agnex-section"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 3rem)',
          backgroundColor: 'var(--agnex-canvas)',
          borderBottom: '1px solid var(--border-color)',
          position: 'relative'
        }}
      >
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to="/services" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none' }}>
                  ← All Services
                </Link>
                <span style={{ color: 'var(--border-strong)' }}>/</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 600 }}>
                  {service.discipline} // {service.number}
                </span>
              </div>
              <TechnicalLabel code={`SPEC//${service.slug.toUpperCase()}`} status="PRODUCTION READY" />
            </div>

            <div style={{ maxWidth: '900px' }}>
              <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: 'var(--agnex-navy)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                {service.headline}
              </h1>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '2.5rem' }}>
                {service.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Button to="/contact" variant="primary">
                  Start a Project
                </Button>
                <Button to="#problems" variant="outline" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('problems')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Explore Architecture
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* 02 — WHAT THE SERVICE IS */}
      <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="01" text="SYSTEM DEFINITION" />
              <TechnicalLabel code="CORE//ARCHITECTURE" />
            </div>

            <div style={{ maxWidth: '820px' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '1.25rem' }}>
                What We Engineer: {service.title}
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                {service.overview}
              </p>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* 03 — BUSINESS PROBLEMS IT SOLVES */}
      <section id="problems" className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="02" text="BOTTLENECK RESOLUTION" />
              <TechnicalLabel code="DEVIATION//MITIGATION" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Critical Business Problems We Solve
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Why off-the-shelf and fragmented implementations fail — and how our architecture prevents failure.
              </p>
            </div>
          </ScrollFade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {service.problemsSolved.map((item, idx) => (
              <ScrollFade key={idx} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2rem',
                    height: '100%',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--status-amber)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    BOTTLENECK // 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 04 — FEATURES */}
      <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="03" text="CORE CAPABILITIES" />
              <TechnicalLabel code="SYS//FEATURES" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Engineering Features & System Capabilities
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                High-performance building blocks engineered into every deployment.
              </p>
            </div>
          </ScrollFade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {service.features.map((feature, idx) => (
              <ScrollFade key={idx} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2rem',
                    height: '100%',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    SPEC // 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {feature.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 05 — BENEFITS */}
      <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="04" text="COMMERCIAL LEVERAGE" />
              <TechnicalLabel code="METRICS//ROI" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Verifiable Business & Operational Advantages
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                How this technical investment creates structural economic advantage.
              </p>
            </div>
          </ScrollFade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {service.benefits.map((benefit, idx) => (
              <ScrollFade key={idx} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2rem',
                    height: '100%',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--status-green)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    ADVANTAGE // 0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {benefit.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 — TYPICAL USE CASES */}
      <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="05" text="APPLICATIONS IN PRODUCTION" />
              <TechnicalLabel code="CASES//DEPLOYED" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Typical Enterprise Use Cases
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Real production scenarios where this architecture drives execution.
              </p>
            </div>
          </ScrollFade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {service.useCases.map((useCase, idx) => (
              <ScrollFade key={idx} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                      {useCase.title}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {useCase.description}
                    </p>
                  </div>
                  <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-blue)', fontWeight: 600 }}>
                    ↳ {useCase.impact}
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 07 — TECHNOLOGIES */}
      <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="06" text="TECHNOLOGY STACK" />
              <TechnicalLabel code="STACK//VERIFIED" status="TESTED" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Technologies AGNEX Uses for {service.title}
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Grounded tools with proven enterprise stability. No speculative frameworks.
              </p>
            </div>
          </ScrollFade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {service.technologies.map((group, idx) => (
              <ScrollFade key={idx} delay={0.06 * idx}>
                <div
                  style={{
                    backgroundColor: 'var(--agnex-canvas-subtle)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.75rem'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-navy)', fontWeight: 700, marginBottom: '1rem' }}>
                    {group.category}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {group.items.map((tech, i) => (
                      <li key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--agnex-blue)', fontWeight: 700 }}>•</span>
                        <span>{tech}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 08 — DEVELOPMENT PROCESS */}
      <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="07" text="EXECUTION PROTOCOL" />
              <TechnicalLabel code="FLOW//5_PHASES" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Our Progressive Engineering Process
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                Transparent, milestone-governed development from specification to release.
              </p>
            </div>
          </ScrollFade>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {service.process.map((step, idx) => (
              <ScrollFade key={step.step} delay={0.06 * idx}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '1.5rem',
                    height: '100%'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    STEP // {step.step}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {step.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 09 — FAQ */}
      <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <SectionLabel number="08" text="SERVICE INQUIRIES" />
              <TechnicalLabel code="FAQ//SPECIFIC" />
            </div>

            <div style={{ maxWidth: '780px', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                Frequently Asked Questions: {service.title}
              </h2>
            </div>
          </ScrollFade>

          <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollFade key={idx} delay={0.05 * idx}>
                  <div
                    style={{
                      border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isOpen ? 'var(--agnex-canvas-subtle)' : '#FFFFFF',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        padding: '1.25rem 1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--agnex-navy)',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 600,
                        fontSize: 'var(--text-base)'
                      }}
                    >
                      <span>{faq.question}</span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-lg)',
                          color: isOpen ? 'var(--agnex-blue)' : 'var(--text-muted)',
                          marginLeft: '1rem'
                        }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.65 }}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </ScrollFade>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 10 — CTA */}
      <section className="agnex-section agnex-section-subtle">
        <Container>
          <ScrollFade>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                PROJECT KICKOFF // {service.title.toUpperCase()}
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
                Ready to Engineer Your System?
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Speak directly with an AGNEX systems engineer. We evaluate your operational requirements and deliver a structured architectural proposal within 48 hours.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/contact" variant="primary">
                  Start Technical Discovery
                </Button>
                <Button to="/work" variant="outline">
                  Review Case Studies
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>
    </>
  );
}
