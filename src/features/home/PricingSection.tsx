import { Link } from 'react-router-dom';
import ScrollFade from '../../components/motion/ScrollFade';
import { Container, SectionLabel, TechnicalLabel } from '../../components/primitives';
import { MagneticButton } from '../../components/motion/MagneticButton';
import { useLocalization } from '../../localization/LocalizationContext';

interface PricingTier {
  id: 'start' | 'build' | 'engineer';
  number: string;
  name: string;
  startingPriceInr: string;
  startingPriceDisplay: string;
  internationalEstimate?: string;
  recommended?: boolean;
  tagline: string;
  targetAudience: string;
  typicalScope: string[];
  ctaLabel: string;
  ctaParam: string;
  isPrimaryCta?: boolean;
  relatedServiceLabel: string;
  relatedServiceUrl: string;
  complexityLabel: string;
}

export default function PricingSection() {
  const { isIndia, country } = useLocalization();

  // Primary commercial levels adhering strictly to approved pricing framework
  const pricingTiers: PricingTier[] = [
    {
      id: 'start',
      number: '01',
      name: 'START',
      startingPriceInr: '₹35,000',
      startingPriceDisplay: 'FROM ₹35,000',
      internationalEstimate: isIndia ? undefined : '(~ $450 USD)',
      recommended: false,
      tagline: 'Professional digital presence for businesses that need a strong foundation.',
      targetAudience: 'For businesses that need a professional digital presence.',
      typicalScope: [
        'Custom responsive website',
        'Up to approximately 5 core pages',
        'Mobile optimization (320px – 4K)',
        'Contact / enquiry lead system',
        'Basic technical SEO & semantic HTML',
        'Performance optimization (< 1s load)',
        'Production cloud deployment',
        'Basic analytics & event tracking'
      ],
      ctaLabel: 'START A PROJECT',
      ctaParam: 'start',
      isPrimaryCta: false,
      relatedServiceLabel: 'Digital Products (Web)',
      relatedServiceUrl: '/services/web-development',
      complexityLabel: 'LEVEL 01 // FOUNDATION'
    },
    {
      id: 'build',
      number: '02',
      name: 'BUILD',
      startingPriceInr: '₹75,000',
      startingPriceDisplay: 'FROM ₹75,000',
      internationalEstimate: isIndia ? undefined : '(~ $950 USD)',
      recommended: true,
      tagline: 'Custom digital products and experiences for businesses ready to build beyond a standard website.',
      targetAudience: 'For businesses that need a stronger digital product.',
      typicalScope: [
        'Custom UI/UX & design system',
        '6–12+ pages or application screens',
        'Advanced micro-interactions & motion',
        'CMS / content management where required',
        'Lead capture & email notifications',
        'Third-party API & CRM integrations',
        'Comprehensive technical SEO & schemas',
        'Performance optimization & PWA caching',
        'Product analytics & conversion funnel',
        'Zero-downtime production deployment'
      ],
      ctaLabel: 'DISCUSS YOUR PROJECT',
      ctaParam: 'build',
      isPrimaryCta: true,
      relatedServiceLabel: 'Digital Platforms & Intelligence',
      relatedServiceUrl: '/services/custom-software',
      complexityLabel: 'LEVEL 02 // RECOMMENDED'
    },
    {
      id: 'engineer',
      number: '03',
      name: 'ENGINEER',
      startingPriceInr: '₹1,50,000',
      startingPriceDisplay: 'FROM ₹1,50,000',
      internationalEstimate: isIndia ? undefined : '(~ $1,900 USD)',
      recommended: false,
      tagline: 'Custom applications, business systems and intelligent workflows where complexity demands engineering.',
      targetAudience: 'For custom systems and applications.',
      typicalScope: [
        'Custom web applications & portals',
        'Operational dashboards & telemetry',
        'Custom CRM & pipeline tracking',
        'Bespoke ERP & inventory modules',
        'Deterministic business automation',
        'High-throughput API integrations',
        'Role-Based Access Control (RBAC)',
        'ACID relational databases (PostgreSQL)',
        'Asynchronous workflow systems & queues',
        'Proprietary business logic & rules'
      ],
      ctaLabel: 'ENGINEER A SYSTEM',
      ctaParam: 'engineer',
      isPrimaryCta: false,
      relatedServiceLabel: 'Business Systems & ERP',
      relatedServiceUrl: '/services/erp-development',
      complexityLabel: 'LEVEL 03 // HIGH COMPLEXITY'
    }
  ];

  // Compact service overview signals
  const serviceSignals = [
    {
      category: 'DIGITAL PRODUCTS',
      description: 'Websites / Web Apps / Mobile Apps',
      starting: 'FROM ₹35K',
      url: '/services/web-development'
    },
    {
      category: 'BUSINESS SYSTEMS',
      description: 'CRM / ERP / Workflow / Operations',
      starting: 'FROM ₹1.5L',
      url: '/services/erp-development'
    },
    {
      category: 'INTELLIGENT SYSTEMS',
      description: 'AI / Automation / Analytics',
      starting: 'FROM ₹75K',
      url: '/services/ai-development'
    },
    {
      category: 'ENGINEERING',
      description: 'APIs / Cloud / Integrations / Architecture',
      starting: 'FROM ₹75K',
      url: '/services/cloud-engineering'
    }
  ];

  return (
    <section
      id="pricing"
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(5rem, 8vw, 8rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="agnex-blueprint-grid"
    >
      <Container>
        {/* ========================================================= */}
        {/* 01. SECTION HEADER (Architectural Investment Map)         */}
        {/* ========================================================= */}
        <ScrollFade>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.75rem'
            }}
          >
            <SectionLabel number="06" text="COMMERCIAL FRAMEWORK // INVESTMENT" />
            <TechnicalLabel code="SYS//INVESTMENT_MAP" status="ACTIVE" />
          </div>

          <div style={{ maxWidth: '840px', marginBottom: '3.5rem' }}>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4.25rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: 'var(--tracking-tighter)',
                color: 'var(--agnex-navy)',
                margin: '0 0 1.25rem 0',
                textTransform: 'uppercase'
              }}
            >
              PRICING / INVESTMENT
            </h2>

            <p
              style={{
                fontSize: 'var(--text-xl)',
                color: 'var(--agnex-navy)',
                fontWeight: 600,
                lineHeight: 1.4,
                margin: '0 0 1rem 0',
                fontFamily: 'var(--font-sans)'
              }}
            >
              "Every project starts with a problem worth solving."
            </p>

            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                margin: 0,
                maxWidth: '720px'
              }}
            >
              We do not compete on being the cheapest agency or sell rigid one-size-fits-all packages. 
              These investments are transparent baseline starting points engineered around technical scope, architectural depth, and measurable commercial value.
            </p>
          </div>
        </ScrollFade>

        {/* ========================================================= */}
        {/* 02. COMPACT SERVICE PRICE SIGNALS (Overview Strip)        */}
        {/* ========================================================= */}
        <ScrollFade delay={0.1}>
          <div
            style={{
              backgroundColor: 'var(--agnex-canvas-subtle)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-xs)',
              marginBottom: '3.5rem',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: 'rgba(12, 28, 41, 0.03)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  fontWeight: 700,
                  color: 'var(--agnex-navy)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}
              >
                CORE DISCIPLINE STARTING SIGNALS // ENTRY VALUATION
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)'
                }}
              >
                {isIndia ? 'DOMESTIC GST INVOICING (₹ INR)' : `${country.name} · BASELINE CONVERTIBLE`}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'
              }}
              className="price-signals-grid"
            >
              {serviceSignals.map((signal, idx) => (
                <Link
                  key={signal.category}
                  to={signal.url}
                  className="signal-cell-link"
                  style={{
                    padding: '1.25rem',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    transition: 'background-color 150ms ease',
                    borderRight: idx < serviceSignals.length - 1 ? '1px solid var(--border-color)' : 'none',
                    borderBottom: '1px solid var(--border-color)'
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        fontWeight: 700,
                        color: 'var(--agnex-blue)',
                        letterSpacing: '0.06em',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {signal.category}
                    </div>
                    <div
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4
                      }}
                    >
                      {signal.description}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      marginTop: '0.5rem',
                      paddingTop: '0.5rem',
                      borderTop: '1px dashed var(--border-color)'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 700,
                        color: 'var(--agnex-navy)'
                      }}
                    >
                      {signal.starting}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--agnex-blue)',
                        fontWeight: 600
                      }}
                    >
                      Spec →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </ScrollFade>

        {/* ========================================================= */}
        {/* 03. CONTINUOUS BLUE SIGNAL ARCHITECTURAL LINE             */}
        {/* ========================================================= */}
        <div
          aria-hidden="true"
          style={{
            position: 'relative',
            height: '24px',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center'
          }}
          className="blue-signal-track-wrapper"
        >
          {/* Subtle horizontal track */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '1px',
              backgroundColor: 'rgba(1, 122, 239, 0.2)'
            }}
          />
          {/* Active Signal Vector Line */}
          <div
            style={{
              position: 'absolute',
              left: '5%',
              width: '90%',
              height: '2px',
              background: 'linear-gradient(90deg, rgba(1, 122, 239, 0.1) 0%, rgba(1, 122, 239, 0.9) 50%, rgba(1, 122, 239, 0.3) 100%)'
            }}
            className="blue-signal-line"
          />
          {/* Milestone Node 01 (START) */}
          <div
            style={{
              position: 'absolute',
              left: '16%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--agnex-navy)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 0 1px var(--agnex-blue)'
            }}
          />
          {/* Milestone Node 02 (BUILD - RECOMMENDED PULSE) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: 'var(--agnex-blue)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 0 3px rgba(1, 122, 239, 0.35)',
              transform: 'translateX(-50%)'
            }}
            className="blue-signal-pulse-node"
          />
          {/* Milestone Node 03 (ENGINEER) */}
          <div
            style={{
              position: 'absolute',
              right: '16%',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--agnex-navy)',
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 0 1px var(--agnex-blue)'
            }}
          />
        </div>

        {/* ========================================================= */}
        {/* 04. PRIMARY PACKAGE STRUCTURE (01 START, 02 BUILD, 03 ENGINEER) */}
        {/* ========================================================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.75rem',
            alignItems: 'stretch',
            marginBottom: '4rem'
          }}
          className="pricing-tiers-grid"
        >
          {pricingTiers.map((tier, idx) => {
            const isRec = tier.recommended;
            return (
              <ScrollFade key={tier.id} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: isRec ? '#FFFFFF' : 'var(--agnex-canvas-subtle)',
                    border: isRec ? '2px solid var(--agnex-blue)' : '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    boxShadow: isRec
                      ? '0 12px 32px -8px rgba(1, 122, 239, 0.16), 0 4px 12px rgba(12, 28, 41, 0.04)'
                      : 'var(--shadow-subtle)',
                    transition: 'border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease'
                  }}
                  className={`pricing-card ${isRec ? 'pricing-card-recommended' : ''}`}
                >
                  {/* Top Signal Indicator for Recommended BUILD Level */}
                  {isRec && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-13px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--agnex-navy)',
                        color: '#FFFFFF',
                        border: '1px solid var(--agnex-blue)',
                        padding: '0.25rem 0.875rem',
                        borderRadius: 'var(--radius-xs)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        boxShadow: '0 2px 8px rgba(1, 122, 239, 0.25)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--agnex-blue)'
                        }}
                      />
                      RECOMMENDED
                    </div>
                  )}

                  <div>
                    {/* Level Coordinates & Hierarchy Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          color: isRec ? 'var(--agnex-blue)' : 'var(--text-muted)',
                          letterSpacing: '0.06em'
                        }}
                      >
                        {tier.complexityLabel}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'var(--text-xs)',
                          fontWeight: 700,
                          color: 'var(--agnex-navy)'
                        }}
                      >
                        LEVEL // {tier.number}
                      </span>
                    </div>

                    {/* Level Title */}
                    <h3
                      style={{
                        fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                        fontWeight: 700,
                        color: 'var(--agnex-navy)',
                        marginBottom: '0.5rem',
                        letterSpacing: 'var(--tracking-tight)',
                        textTransform: 'uppercase'
                      }}
                    >
                      {tier.name}
                    </h3>

                    {/* Starting Investment Display */}
                    <div
                      style={{
                        marginBottom: '1.25rem',
                        display: 'flex',
                        alignItems: 'baseline',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}
                    >
                      <span
                        style={{
                          fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                          fontWeight: 700,
                          fontFamily: 'var(--font-sans)',
                          color: isRec ? 'var(--agnex-blue)' : 'var(--agnex-navy)',
                          letterSpacing: '-0.02em',
                          lineHeight: 1
                        }}
                      >
                        {tier.startingPriceDisplay}
                      </span>
                      {tier.internationalEstimate && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-muted)',
                            fontWeight: 500
                          }}
                        >
                          {tier.internationalEstimate}
                        </span>
                      )}
                    </div>

                    {/* Headline / Subtitle Summary */}
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--agnex-navy)',
                        fontWeight: 600,
                        lineHeight: 1.5,
                        marginBottom: '0.75rem'
                      }}
                    >
                      {tier.tagline}
                    </p>

                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        marginBottom: '1.75rem'
                      }}
                    >
                      {tier.targetAudience}
                    </p>

                    {/* Typical Scope Header */}
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginBottom: '0.875rem'
                      }}
                    >
                      TYPICAL SCOPE MAY INCLUDE:
                    </div>

                    {/* Scope Items List */}
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '0 0 2rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem'
                      }}
                    >
                      {tier.typicalScope.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            fontSize: 'var(--text-xs)',
                            color: 'var(--agnex-navy)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.6rem',
                            lineHeight: 1.45
                          }}
                        >
                          <span
                            style={{
                              color: isRec ? 'var(--agnex-blue)' : 'rgba(12, 28, 41, 0.45)',
                              fontWeight: 700,
                              lineHeight: 1.3
                            }}
                          >
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom: Call to Action + Routing Connection */}
                  <div
                    style={{
                      paddingTop: '1.5rem',
                      borderTop: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.875rem'
                    }}
                  >
                    {isRec ? (
                      <MagneticButton>
                        <Link
                          to={`/contact?tier=${tier.ctaParam}`}
                          className="btn btn-primary"
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: '0.875rem 1.5rem',
                            minHeight: '48px',
                            fontWeight: 700
                          }}
                          data-cursor="cta"
                        >
                          <span>{tier.ctaLabel}</span>
                          <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                        </Link>
                      </MagneticButton>
                    ) : (
                      <Link
                        to={`/contact?tier=${tier.ctaParam}`}
                        className="btn btn-secondary"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          padding: '0.875rem 1.5rem',
                          minHeight: '48px',
                          fontWeight: 600,
                          backgroundColor: '#FFFFFF'
                        }}
                      >
                        <span>{tier.ctaLabel}</span>
                        <span className="btn-arrow">→</span>
                      </Link>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      <span>Capability:</span>
                      <Link
                        to={tier.relatedServiceUrl}
                        style={{
                          color: 'var(--agnex-blue)',
                          textDecoration: 'none',
                          fontWeight: 600
                        }}
                        className="pricing-sublink"
                      >
                        {tier.relatedServiceLabel} →
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollFade>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* 05. SEPARATE FULL-WIDTH SECTION: CUSTOM ENGINEERING       */}
        {/* ========================================================= */}
        <ScrollFade delay={0.2}>
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-sm)',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '3.5rem',
              position: 'relative',
              boxShadow: 'var(--shadow-subtle)'
            }}
            className="custom-engineering-banner"
          >
            {/* Top Signal Entry Accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--agnex-blue) 0%, rgba(1, 122, 239, 0.4) 60%, transparent 100%)'
              }}
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: 'clamp(2rem, 4vw, 3.5rem)',
                alignItems: 'center'
              }}
              className="custom-eng-grid"
            >
              {/* Left Column: Core Architecture Proposition */}
              <div
                style={{
                  gridColumn: 'span 7'
                }}
                className="custom-eng-col-left"
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--agnex-navy)',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      letterSpacing: '0.08em'
                    }}
                  >
                    CUSTOM ARCHITECTURE
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--agnex-blue)',
                      fontWeight: 600
                    }}
                  >
                    ZERO PACKAGE CONSTRAINTS
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    fontWeight: 700,
                    color: 'var(--agnex-navy)',
                    lineHeight: 1.1,
                    letterSpacing: 'var(--tracking-tight)',
                    margin: '0 0 1rem 0',
                    textTransform: 'uppercase'
                  }}
                >
                  CUSTOM ENGINEERING
                </h3>

                <p
                  style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--agnex-navy)',
                    fontWeight: 600,
                    lineHeight: 1.45,
                    marginBottom: '1rem'
                  }}
                >
                  Complex systems don't fit inside a package.
                </p>

                <p
                  style={{
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: '0 0 2rem 0',
                    maxWidth: '560px'
                  }}
                >
                  Tell us what you're trying to build. We'll scope the architecture, timeline and investment around the actual problem.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <MagneticButton>
                    <Link
                      to="/contact?tier=custom"
                      className="btn btn-primary"
                      style={{ padding: '0.875rem 2.25rem', minHeight: '48px', fontWeight: 700 }}
                      data-cursor="cta"
                    >
                      <span>START A PROJECT</span>
                      <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                    </Link>
                  </MagneticButton>

                  <Link
                    to="/work"
                    className="btn btn-secondary"
                    style={{ padding: '0.875rem 1.75rem', minHeight: '48px', fontWeight: 600 }}
                  >
                    <span>View Engineering Proof</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Architectural Guarantees & Non-Package Signals */}
              <div
                style={{
                  gridColumn: 'span 5'
                }}
                className="custom-eng-col-right"
              >
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
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      color: 'var(--agnex-navy)',
                      letterSpacing: '0.06em',
                      paddingBottom: '0.75rem',
                      borderBottom: '1px solid var(--border-color)',
                      textTransform: 'uppercase'
                    }}
                  >
                    CUSTOM SYSTEM OPERATIONAL SIGNALS
                  </div>

                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginBottom: '0.2rem' }}>
                      01 // BESPOKE TECHNICAL DISCOVERY
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Architectural assessment of data schemas, concurrency thresholds, and third-party API dependencies before any contract commitment.
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginBottom: '0.2rem' }}>
                      02 // 100% CODE & IP OWNERSHIP
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Full intellectual property assignment upon delivery. Zero recurring seat taxes, proprietary runtime locks, or closed ecosystem lock-in.
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginBottom: '0.2rem' }}>
                      03 // DETERMINISTIC SPRINT ROADMAPS
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      Milestone-gated staging drops with bi-weekly demonstrations. No speculative scope estimates or fabricated deadlines.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollFade>

        {/* ========================================================= */}
        {/* 06. IMPORTANT PRICING DISCLAIMER (Concise, Subtle)        */}
        {/* ========================================================= */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            backgroundColor: 'var(--agnex-canvas-subtle)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xs)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '960px',
            margin: '0 auto'
          }}
          className="pricing-disclaimer"
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <span style={{ color: 'var(--agnex-blue)', fontWeight: 700, fontSize: '14px', lineHeight: 1 }}>ℹ</span>
            <div>
              <strong style={{ color: 'var(--agnex-navy)' }}>Commercial Framework Note:</strong> All prices are starting points. 
              Final pricing depends on scope, complexity, integrations, content and delivery requirements. 
              Domain, hosting, paid third-party services and applicable taxes are billed separately unless included in the proposal.
            </div>
          </div>
        </div>
      </Container>

      {/* Responsive & Subtle Interaction CSS */}
      <style>{`
        .pricing-card:hover {
          transform: translateY(-2px);
          border-color: var(--agnex-navy) !important;
        }
        .pricing-card-recommended:hover {
          border-color: var(--agnex-blue) !important;
          box-shadow: 0 16px 40px -8px rgba(1, 122, 239, 0.22) !important;
        }
        .signal-cell-link:hover {
          background-color: #FFFFFF !important;
        }
        .pricing-sublink:hover {
          text-decoration: underline !important;
        }

        @keyframes signalPulse {
          0%, 100% {
            box-shadow: 0 0 0 3px rgba(1, 122, 239, 0.25);
          }
          50% {
            box-shadow: 0 0 0 7px rgba(1, 122, 239, 0.1);
          }
        }
        .blue-signal-pulse-node {
          animation: signalPulse 2.8s ease-in-out infinite;
        }

        /* Mobile Layout & Stacking */
        @media (max-width: 992px) {
          .pricing-tiers-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .custom-eng-col-left,
          .custom-eng-col-right {
            grid-column: span 12 !important;
          }
          .blue-signal-track-wrapper {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .price-signals-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
