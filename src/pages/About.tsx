import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AgnexLogo from '../components/brand/AgnexLogo';
import ScrollFade from '../components/motion/ScrollFade';
import AgnexXSymbol from '../components/visuals/AgnexXSymbol';

export default function About() {
  const values = [
    {
      word: 'Engineer',
      tagline: 'Precision over guesswork.',
      description: 'We approach every challenge with first-principles discipline. We evaluate systems based on architectural integrity, maintainability, and measurable business outcomes.'
    },
    {
      word: 'Think',
      tagline: 'Understanding before code.',
      description: 'We don’t start by recommending frameworks. We first unpack your operational workflows, user bottlenecks, and commercial objectives to ensure the right problem is being solved.'
    },
    {
      word: 'Build',
      tagline: 'Production-ready craftsmanship.',
      description: 'We write clean, typed, modular code built to survive continuous production load. We adhere to semantic standards, strict security guidelines, and zero-bloat dependencies.'
    },
    {
      word: 'Connect',
      tagline: 'Unifying fragmented operations.',
      description: 'Software is meaningless if it lives in an ivory tower. We connect disconnected databases, external APIs, and cross-functional teams into coherent digital ecosystems.'
    },
    {
      word: 'Evolve',
      tagline: 'Designed for the next decade.',
      description: 'Business requirements evolve constantly. We build flexible, decoupled architectures that can scale 10x without requiring a ground-up rewrite.'
    }
  ];

  const audienceGroups = [
    {
      group: 'Founders & Growth-Stage Startups',
      need: 'Need to ship a bulletproof MVP or scale an existing digital product without accumulating crippling technical debt.'
    },
    {
      group: 'SMEs & Operations Teams',
      need: 'Struggling with disconnected spreadsheets, manual data entry, and outdated off-the-shelf business software.'
    },
    {
      group: 'Enterprise Leaders & CTOs',
      need: 'Seeking to decouple monolithic legacy systems, automate high-friction workflows, or embed senior architectural talent.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About AGNEX Technology | Company & Philosophy</title>
        <meta
          name="description"
          content="Learn about AGNEX Technology: our engineering philosophy, mission, values, and how we transform ideas and operational challenges into practical software solutions."
        />
        <link rel="canonical" href="https://agnextechnology.com/company" />
        <meta property="og:title" content="About AGNEX Technology | Company & Philosophy" />
        <meta
          property="og:description"
          content="AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions."
        />
        <meta property="og:url" content="https://agnextechnology.com/company" />
        <script type="application/ld+json">
          {`
            {
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
                      "name": "Company",
                      "item": "https://agnextechnology.com/company"
                    }
                  ]
                },
                {
                  "@type": "AboutPage",
                  "mainEntity": {
                    "@type": "Organization",
                    "name": "AGNEX Technology",
                    "url": "https://agnextechnology.com",
                    "slogan": "Engineering What's Next.",
                    "description": "AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions."
                  }
                }
              ]
            }
          `}
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
            <div style={{ marginBottom: '1.75rem' }}>
              <AgnexLogo size="md" />
            </div>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.5rem' }}>
              04 // COMPANY PHILOSOPHY & DNA
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--agnex-white)'
              }}
            >
              Ideas, engineered into impact.
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-muted)',
                maxWidth: '720px',
                lineHeight: 1.6
              }}
            >
              AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions. We exist to build software that moves companies forward.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* The Brand Architecture Section */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base-raised)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="agnex-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            <ScrollFade>
              <div>
                <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                  The Anatomy of AGNEX
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', marginBottom: '1.5rem', color: 'var(--agnex-white)' }}>
                  Engineering Foundation Meets Forward Progress.
                </h2>
                <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Our name is not random. It is an intentional synthesis of the values that guide every system we design:
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--agnex-base)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      AG // ENGINEERING & FOUNDATION
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      The bedrock of precision, computational discipline, structural security, and mathematical reliability.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--agnex-base)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-white)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      NEX // WHAT'S NEXT
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      Continuous forward movement, modern technological evolution, and building the digital capabilities our clients need tomorrow.
                    </p>
                  </div>

                  <div
                    style={{
                      padding: '1.25rem',
                      backgroundColor: 'var(--agnex-base)',
                      border: '1px solid var(--agnex-accent-border)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', fontWeight: 700, marginBottom: '0.25rem' }}>
                      X // THE ACTIVE INTERSECTION
                    </div>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--agnex-white)', margin: 0, lineHeight: 1.5 }}>
                      The dynamic point where <strong>Technology × People × Ideas</strong> converge to create tangible commercial value.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.2}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3rem 2rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--agnex-base)'
                }}
              >
                <AgnexXSymbol size={300} />
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="agnex-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem'
            }}
          >
            <ScrollFade>
              <div
                className="agnex-card"
                style={{
                  backgroundColor: 'var(--agnex-base-raised)',
                  height: '100%',
                  padding: 'clamp(2rem, 4vw, 3rem)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', marginBottom: '1rem' }}>
                  OUR MISSION
                </div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--agnex-white)', marginBottom: '1rem' }}>
                  Engineer technology that moves businesses forward.
                </h2>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  We exist to eliminate the friction between business ambition and technological execution. We build digital tools, custom systems, and automated workflows that transform complex challenges into effortless operations.
                </p>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.15}>
              <div
                className="agnex-card"
                style={{
                  backgroundColor: 'var(--agnex-base-raised)',
                  height: '100%',
                  padding: 'clamp(2rem, 4vw, 3rem)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-accent)', marginBottom: '1rem' }}>
                  OUR VISION
                </div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: 'var(--agnex-white)', marginBottom: '1rem' }}>
                  The trusted engineering partner for building the future.
                </h2>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  To be recognized as the premier engineering firm where founders, executives, and operations leaders turn when they need software designed right the first time — devoid of hype, built to endure, and engineered for impact.
                </p>
              </div>
            </ScrollFade>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base-raised)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="agnex-container">
          <ScrollFade>
            <div style={{ maxWidth: '640px', marginBottom: '4rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                Operational DNA
              </div>
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: '1rem' }}>
                Our Core Values
              </h2>
              <p>
                Five words that govern our engineering standards, our client relationships, and every line of code we ship.
              </p>
            </div>
          </ScrollFade>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {values.map((val, idx) => (
              <ScrollFade key={val.word} delay={0.08 * idx}>
                <div
                  className="agnex-card"
                  style={{
                    backgroundColor: 'var(--agnex-base)',
                    padding: '2rem',
                    height: '100%'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--agnex-accent)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-white)', marginBottom: '0.25rem' }}>
                    {val.word}
                  </h3>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel)', marginBottom: '1rem', fontStyle: 'italic' }}>
                    {val.tagline}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {val.description}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Partner With */}
      <section className="agnex-section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="agnex-container">
          <ScrollFade>
            <div style={{ maxWidth: '640px', marginBottom: '4rem' }}>
              <div className="agnex-badge" style={{ marginBottom: '1rem' }}>
                Client Partnerships
              </div>
              <h2 style={{ fontSize: 'var(--text-4xl)', marginBottom: '1rem' }}>
                Who We Build For
              </h2>
              <p>
                We collaborate with organizations across growth stages who recognize that technology is their primary competitive differentiator.
              </p>
            </div>
          </ScrollFade>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {audienceGroups.map((group, idx) => (
              <ScrollFade key={idx} delay={0.1 * idx}>
                <div
                  className="agnex-card"
                  style={{
                    backgroundColor: 'var(--agnex-base-raised)',
                    padding: '2rem',
                    height: '100%'
                  }}
                >
                  <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                    {group.group}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {group.need}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion CTA */}
      <section className="agnex-section" style={{ textAlign: 'center', backgroundColor: 'var(--agnex-base-raised)' }}>
        <div className="agnex-container">
          <ScrollFade>
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--agnex-white)', marginBottom: '1.25rem' }}>
                Ready to partner with AGNEX?
              </h2>
              <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Explore how our engineering team can help your business solve its most pressing technical bottlenecks.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '0.875rem 2.25rem' }}>
                  <span>Start a Conversation</span>
                  <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
                </Link>
                <Link to="/work" className="btn btn-secondary" style={{ padding: '0.875rem 2rem' }}>
                  <span>Review Our Work</span>
                </Link>
              </div>
            </div>
          </ScrollFade>
        </div>
      </section>
    </>
  );
}
