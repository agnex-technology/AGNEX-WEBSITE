import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, SectionLabel, TechnicalLabel } from '../../components/primitives';
import { MagneticButton } from '../../components/motion/MagneticButton';
import { useLocalization } from '../../localization/LocalizationContext';

interface ServiceItem {
  number: string;
  name: string;
  startingPrice: string;
  typicalRange: string;
  description: string;
  contactServiceParam: string;
}

interface EngineeringDomain {
  id: string;
  number: string;
  title: string;
  serviceCountLabel: string;
  overviewStartingPrice: string;
  tagline: string;
  services: ServiceItem[];
}

export default function PricingSection() {
  const { isIndia } = useLocalization();

  // The 4 major engineering domains with 10 approved services
  const domains: EngineeringDomain[] = [
    {
      id: 'digital',
      number: '01',
      title: 'DIGITAL PRODUCTS',
      serviceCountLabel: '05 SERVICES',
      overviewStartingPrice: 'FROM ₹35K+',
      tagline: 'Websites, web applications, mobile applications & digital experiences.',
      services: [
        {
          number: '01',
          name: 'Websites',
          startingPrice: '₹35,000+',
          typicalRange: '₹35k–₹1.5L+',
          description: 'Custom responsive websites engineered for speed, mobile ergonomics, and direct lead capture.',
          contactServiceParam: 'websites'
        },
        {
          number: '02',
          name: 'Premium / Creative Websites',
          startingPrice: '₹75,000+',
          typicalRange: '₹75k–₹2.5L+',
          description: 'Bespoke digital flagships featuring editorial typography, custom micro-interactions, and conversion UX.',
          contactServiceParam: 'creative-websites'
        },
        {
          number: '03',
          name: 'E-commerce',
          startingPrice: '₹65,000+',
          typicalRange: '₹65k–₹2.5L+',
          description: 'High-conversion storefronts, streamlined checkout architecture, automated inventory, and payment gateways.',
          contactServiceParam: 'ecommerce'
        },
        {
          number: '04',
          name: 'Web Applications',
          startingPrice: '₹1,25,000+',
          typicalRange: '₹1.25L–₹8L+',
          description: 'Interactive client portals, multi-tenant dashboards, high-throughput APIs, and stateful application suites.',
          contactServiceParam: 'web-apps'
        },
        {
          number: '05',
          name: 'Mobile Applications',
          startingPrice: '₹1,50,000+',
          typicalRange: '₹1.5L–₹8L+',
          description: 'Native and cross-platform iOS & Android mobile apps engineered for offline resilience and field dispatch.',
          contactServiceParam: 'mobile-apps'
        }
      ]
    },
    {
      id: 'systems',
      number: '02',
      title: 'BUSINESS SYSTEMS',
      serviceCountLabel: '02 SERVICES',
      overviewStartingPrice: 'FROM ₹50K+',
      tagline: 'ERP, CRM, inventory, billing, workflow & custom business software.',
      services: [
        {
          number: '06',
          name: 'Business Automation',
          startingPrice: '₹50,000+',
          typicalRange: '₹50k–₹3L+',
          description: 'Deterministic worker pipelines connecting operational databases, spreadsheets, document ingestion, and notifications.',
          contactServiceParam: 'business-automation'
        },
        {
          number: '07',
          name: 'CRM / ERP / Business Software',
          startingPrice: '₹1,50,000+',
          typicalRange: '₹1.5L–₹10L+',
          description: 'Bespoke enterprise ERP and CRM platforms eliminating recurring per-seat SaaS costs with zero double-entry friction.',
          contactServiceParam: 'crm-erp'
        }
      ]
    },
    {
      id: 'intelligence',
      number: '03',
      title: 'INTELLIGENT SYSTEMS',
      serviceCountLabel: '01 SERVICE',
      overviewStartingPrice: 'FROM ₹75K+',
      tagline: 'Targeted AI, private document retrieval & automated operational intelligence.',
      services: [
        {
          number: '08',
          name: 'AI / Intelligent Systems',
          startingPrice: '₹75,000+',
          typicalRange: '₹75k–₹5L+',
          description: 'Governed enterprise AI models, deterministic document parsers, and private retrieval-augmented generation (RAG).',
          contactServiceParam: 'ai-systems'
        }
      ]
    },
    {
      id: 'engineering',
      number: '04',
      title: 'ENGINEERING',
      serviceCountLabel: '02 SERVICES',
      overviewStartingPrice: 'FROM ₹40K+',
      tagline: 'API gateways, system integrations, cloud infrastructure & custom architecture.',
      services: [
        {
          number: '09',
          name: 'API / System Integration',
          startingPrice: '₹40,000+',
          typicalRange: '₹40k–₹3L+',
          description: 'High-throughput REST & GraphQL API gateways, webhook reconciliations, third-party connectors, and data migration.',
          contactServiceParam: 'api-integration'
        },
        {
          number: '10',
          name: 'Custom Engineering',
          startingPrice: '₹75,000+',
          typicalRange: 'Scope-based',
          description: 'Bespoke technical architecture, high-concurrency systems, legacy modernization, and deep engineering engagements.',
          contactServiceParam: 'custom-engineering'
        }
      ]
    }
  ];

  // Accordion expansion state: Domain 01 open by default for immediate context
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({
    digital: true,
    systems: false,
    intelligence: false,
    engineering: false
  });

  // Track currently active / focused domain for the Blue Signal indicator
  const [activeDomainId, setActiveDomainId] = useState<string>('digital');

  const toggleDomain = (id: string) => {
    setExpandedDomains((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
    setActiveDomainId(id);
  };

  const expandAll = () => {
    setExpandedDomains({
      digital: true,
      systems: true,
      intelligence: true,
      engineering: true
    });
  };

  const collapseAll = () => {
    setExpandedDomains({
      digital: false,
      systems: false,
      intelligence: false,
      engineering: false
    });
  };

  const activeIndex = domains.findIndex((d) => d.id === activeDomainId);

  return (
    <section
      id="investment"
      className="agnex-section agnex-blueprint-grid"
      style={{
        backgroundColor: 'var(--agnex-canvas)',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: 'clamp(5rem, 8vw, 8.5rem)',
        paddingBottom: 'clamp(5rem, 8vw, 8.5rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Retain #pricing anchor compatibility */}
      <span id="pricing" style={{ position: 'absolute', top: 0, left: 0, visibility: 'hidden' }} />

      <Container>
        {/* ========================================================= */}
        {/* SECTION HEADER & POSITIONING                              */}
        {/* ========================================================= */}
        <div style={{ maxWidth: '980px', marginBottom: 'clamp(3rem, 5vw, 4.5rem)' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.25rem'
            }}
          >
            <SectionLabel number="10" label="INVESTMENT" />
            <TechnicalLabel code="SYS//COMMERCIAL_MAP_2026" status="ACTIVE" />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--agnex-navy)',
              margin: '0 0 1.25rem 0',
              textTransform: 'uppercase'
            }}
          >
            ENGINEERING DOESN'T COME IN ONE SIZE.
          </h2>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.6vw, 1.35rem)',
              color: 'var(--text-secondary)',
              maxWidth: '780px',
              lineHeight: 1.6,
              margin: 0
            }}
          >
            Our projects start from the following investment points. Final scope is defined around the problem, complexity and outcome.
          </p>

          {/* Quick controls: View Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--agnex-blue)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              {isIndia ? 'DOMESTIC GST INVOICING (₹ INR)' : 'INTERNATIONAL B2B COMMERCIAL INVOICING'}
            </span>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={expandAll}
                className="technical-btn"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--agnex-navy)',
                  padding: '0.35rem 0.75rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                EXPAND ALL
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="technical-btn"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-muted)',
                  padding: '0.35rem 0.75rem',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                COLLAPSE ALL
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* BLUE SIGNAL TRAVERSAL & DOMAINS CONTAINER                 */}
        {/* ========================================================= */}
        <div className="investment-map-layout" style={{ position: 'relative' }}>
          {/* Desktop Blue Signal Vector Spine */}
          <div
            className="blue-signal-spine-desktop"
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-28px',
              top: '12px',
              bottom: '12px',
              width: '24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* The continuous vertical vector line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: 'rgba(1, 122, 239, 0.2)',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />

            {/* Active Moving Signal Line Segment */}
            <div
              style={{
                position: 'absolute',
                width: '2px',
                backgroundColor: 'var(--agnex-blue)',
                left: '50%',
                transform: 'translateX(-50%)',
                top: `${(Math.max(0, activeIndex) / (domains.length - 1)) * 80}%`,
                height: '20%',
                transition: 'top 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 0 10px rgba(1, 122, 239, 0.6)'
              }}
            />

            {/* 4 Technical Domain Nodes */}
            {domains.map((dom, idx) => {
              const isActive = activeDomainId === dom.id;
              const isDomainExpanded = !!expandedDomains[dom.id];
              return (
                <div
                  key={dom.id}
                  style={{
                    position: 'absolute',
                    top: `${(idx / (domains.length - 1)) * 96}%`,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: isActive || isDomainExpanded ? '12px' : '8px',
                    height: isActive || isDomainExpanded ? '12px' : '8px',
                    borderRadius: '50%',
                    backgroundColor: isActive || isDomainExpanded ? 'var(--agnex-blue)' : '#FFFFFF',
                    border: `2px solid ${isActive || isDomainExpanded ? '#FFFFFF' : 'var(--agnex-navy)'}`,
                    boxShadow: isActive || isDomainExpanded ? '0 0 0 2px var(--agnex-blue)' : 'none',
                    transition: 'all 250ms ease',
                    zIndex: 2
                  }}
                  title={`Signal Marker ${dom.number} — ${dom.title}`}
                />
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* THE 4 EXPANDABLE EDITORIAL DOMAINS                        */}
          {/* ========================================================= */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {domains.map((domain) => {
              const isExpanded = !!expandedDomains[domain.id];
              const isFocused = activeDomainId === domain.id;

              return (
                <div
                  key={domain.id}
                  id={`domain-${domain.id}`}
                  className={`investment-domain-card ${isExpanded ? 'is-expanded' : ''} ${isFocused ? 'is-active-signal' : ''}`}
                  onMouseEnter={() => setActiveDomainId(domain.id)}
                  style={{
                    backgroundColor: isExpanded ? '#FAFBFD' : '#FFFFFF',
                    border: isExpanded ? '1px solid var(--agnex-blue)' : '1px solid var(--border-color)',
                    borderLeft: isExpanded ? '4px solid var(--agnex-blue)' : '4px solid transparent',
                    boxShadow: isExpanded ? '0 8px 30px rgba(1, 122, 239, 0.08)' : 'var(--shadow-subtle)',
                    transition: 'border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Domain Header Accordion Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleDomain(domain.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`domain-panel-${domain.id}`}
                    className="domain-header-btn"
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      gap: '1.25rem'
                    }}
                  >
                    {/* Left: Number, Title, Count & Tagline */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 2vw, 2rem)', flex: 1, minWidth: 0 }}>
                      {/* Monospace Level Identifier */}
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                          fontWeight: 700,
                          color: isExpanded ? 'var(--agnex-blue)' : 'var(--text-muted)',
                          lineHeight: 1
                        }}
                      >
                        {domain.number}
                      </span>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                          <h3
                            style={{
                              margin: 0,
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)',
                              fontWeight: 700,
                              color: 'var(--agnex-navy)',
                              letterSpacing: 'var(--tracking-tight)',
                              textTransform: 'uppercase'
                            }}
                          >
                            {domain.title}
                          </h3>

                          {/* Service Count Badge */}
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              padding: '0.2rem 0.6rem',
                              backgroundColor: isExpanded ? 'var(--agnex-blue-pale)' : 'rgba(12, 28, 41, 0.05)',
                              color: isExpanded ? 'var(--agnex-blue)' : 'var(--text-muted)',
                              borderRadius: 'var(--radius-xs)',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {domain.serviceCountLabel}
                          </span>
                        </div>

                        {/* Domain Tagline */}
                        <p
                          style={{
                            margin: '0.35rem 0 0 0',
                            fontSize: 'var(--text-xs)',
                            color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-sans)',
                            lineHeight: 1.4
                          }}
                          className="domain-tagline-text"
                        >
                          {domain.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Right: Abbreviated Starting Price & Action Indicator */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(1rem, 2vw, 2.5rem)',
                        flexShrink: 0
                      }}
                    >
                      <div style={{ textAlign: 'right' }}>
                        <span
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            marginBottom: '2px'
                          }}
                        >
                          STARTING POINT
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'clamp(1.2rem, 2vw, 1.65rem)',
                            fontWeight: 800,
                            color: isExpanded ? 'var(--agnex-blue)' : 'var(--agnex-navy)',
                            letterSpacing: '-0.02em',
                            lineHeight: 1
                          }}
                        >
                          {domain.overviewStartingPrice}
                        </span>
                      </div>

                      {/* Explore Arrow Indicator */}
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-xs)',
                          backgroundColor: isExpanded ? 'var(--agnex-navy)' : 'rgba(12, 28, 41, 0.04)',
                          color: isExpanded ? '#FFFFFF' : 'var(--agnex-navy)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          fontWeight: 700,
                          transition: 'all 200ms ease',
                          transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
                        }}
                        aria-hidden="true"
                      >
                        →
                      </div>
                    </div>
                  </button>

                  {/* Expanded Editorial Content Drawer */}
                  <div
                    id={`domain-panel-${domain.id}`}
                    role="region"
                    aria-label={`${domain.title} Services`}
                    style={{
                      display: isExpanded ? 'block' : 'none',
                      borderTop: '1px solid var(--border-color)',
                      padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        paddingBottom: '0.75rem',
                        borderBottom: '1px dashed var(--border-color)'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--agnex-blue)',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase'
                        }}
                      >
                        APPROVED ARCHITECTURAL STARTING POINTS // {domain.services.length} CORE CAPABILITIES
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--text-muted)'
                        }}
                      >
                        INDIVIDUAL SCOPING APPLIES
                      </span>
                    </div>

                    {/* Sub-services Grid */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.25rem'
                      }}
                    >
                      {domain.services.map((svc) => (
                        <div
                          key={svc.number}
                          style={{
                            border: '1px solid var(--border-color)',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: '#FAFBFD',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '1.25rem',
                            transition: 'border-color 150ms ease, box-shadow 150ms ease'
                          }}
                          className="service-breakdown-card"
                        >
                          <div>
                            {/* Service Number & Name */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'baseline',
                                gap: '0.5rem',
                                marginBottom: '0.75rem'
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: 'var(--text-xs)',
                                  color: 'var(--agnex-blue)',
                                  fontWeight: 700
                                }}
                              >
                                {svc.number} —
                              </span>
                              <h4
                                style={{
                                  margin: 0,
                                  fontFamily: 'var(--font-sans)',
                                  fontSize: 'var(--text-base)',
                                  fontWeight: 700,
                                  color: 'var(--agnex-navy)'
                                }}
                              >
                                {svc.name}
                              </h4>
                            </div>

                            {/* Prominent Starting Price */}
                            <div style={{ marginBottom: '0.5rem' }}>
                              <span
                                style={{
                                  display: 'block',
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '10px',
                                  color: 'var(--text-muted)',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  marginBottom: '2px'
                                }}
                              >
                                STARTING PRICE
                              </span>
                              <div
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: 'var(--text-2xl)',
                                  fontWeight: 800,
                                  color: 'var(--agnex-navy)',
                                  letterSpacing: '-0.02em',
                                  lineHeight: 1
                                }}
                              >
                                {svc.startingPrice}
                              </div>
                            </div>

                            {/* Secondary Typical Project Range */}
                            <div
                              style={{
                                padding: '0.4rem 0.6rem',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-xs)',
                                width: 'fit-content',
                                marginBottom: '1rem'
                              }}
                            >
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono)',
                                  fontSize: '11px',
                                  color: 'var(--text-secondary)'
                                }}
                              >
                                Typical project range: <strong style={{ color: 'var(--agnex-navy)' }}>{svc.typicalRange}</strong>
                              </span>
                            </div>

                            {/* Technical Description */}
                            <p
                              style={{
                                margin: 0,
                                fontSize: 'var(--text-xs)',
                                color: 'var(--text-secondary)',
                                lineHeight: 1.55
                              }}
                            >
                              {svc.description}
                            </p>
                          </div>

                          {/* Direct Service Scope CTA Link */}
                          <div style={{ paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)' }}>
                            <Link
                              to={`/contact?service=${svc.contactServiceParam}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                fontWeight: 700,
                                color: 'var(--agnex-blue)',
                                textDecoration: 'none',
                                letterSpacing: '0.04em',
                                textTransform: 'uppercase'
                              }}
                              className="service-scope-link"
                            >
                              <span>DISCUSS SCOPE</span>
                              <span style={{ transition: 'transform 150ms ease' }}>→</span>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* CUSTOM ENGINEERING (FULL-WIDTH SEPARATE SECTION)          */}
        {/* ========================================================= */}
        <div
          style={{
            marginTop: 'clamp(3.5rem, 6vw, 5.5rem)',
            backgroundColor: 'var(--agnex-navy)',
            color: '#FFFFFF',
            border: '1px solid rgba(1, 122, 239, 0.4)',
            borderRadius: 'var(--radius-xs)',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
          className="custom-engineering-banner"
        >
          {/* Subtle architectural grid lines inside banner */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '320px',
              height: '100%',
              opacity: 0.1,
              backgroundImage: 'linear-gradient(to right, #017AEF 1px, transparent 1px), linear-gradient(to bottom, #017AEF 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none'
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(2rem, 4vw, 3.5rem)',
              alignItems: 'center'
            }}
          >
            <div style={{ gridColumn: 'span 12' }} className="custom-eng-text-col">
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--agnex-blue)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  backgroundColor: 'rgba(1, 122, 239, 0.12)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-xs)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--agnex-blue)' }} />
                <span>UNCONSTRAINED ARCHITECTURE</span>
              </div>

              <h3
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  fontWeight: 800,
                  letterSpacing: 'var(--tracking-tight)',
                  color: '#FFFFFF',
                  margin: '0 0 1rem 0',
                  textTransform: 'uppercase'
                }}
              >
                CUSTOM ENGINEERING
              </h3>

              <p
                style={{
                  fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  margin: '0 0 0.85rem 0',
                  maxWidth: '780px'
                }}
              >
                Complex systems don't fit inside a package.
              </p>

              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'rgba(255, 255, 255, 0.75)',
                  lineHeight: 1.6,
                  margin: '0 0 2rem 0',
                  maxWidth: '720px'
                }}
              >
                Tell us what you're trying to build. We'll scope the architecture, timeline and investment around the actual problem.
              </p>

              <div>
                <MagneticButton>
                  <Link
                    to="/contact?tier=custom"
                    className="btn btn-primary"
                    style={{
                      padding: '1rem 2.5rem',
                      fontSize: 'var(--text-sm)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      backgroundColor: 'var(--agnex-blue)',
                      color: '#FFFFFF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}
                  >
                    <span>START A PROJECT</span>
                    <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRICING DISCLAIMER & COMMERCIAL NOTES                     */}
        {/* ========================================================= */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-color)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              <strong style={{ color: 'var(--agnex-navy)' }}>Commercial Framework Note:</strong> All prices are starting points. Final pricing depends on scope, complexity, integrations, content and delivery requirements.
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              <strong style={{ color: 'var(--agnex-navy)' }}>Third-Party Infrastructure:</strong> Domain, hosting, paid third-party services and applicable taxes are billed separately unless included in the proposal.
            </p>
          </div>
        </div>
      </Container>

      {/* Scoped CSS for responsive styling & micro-interactions */}
      <style>{`
        .investment-domain-card:hover {
          border-color: var(--agnex-blue) !important;
        }

        .investment-domain-card:hover .domain-header-btn .domain-tagline-text {
          color: var(--agnex-navy);
        }

        .service-breakdown-card:hover {
          border-color: var(--agnex-blue) !important;
          box-shadow: 0 4px 16px rgba(1, 122, 239, 0.08);
        }

        .service-breakdown-card:hover .service-scope-link span:last-child {
          transform: translateX(4px);
        }

        @media (max-width: 991px) {
          .blue-signal-spine-desktop {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .domain-header-btn {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .domain-header-btn > div:last-child {
            width: 100%;
            justify-content: space-between;
            margin-top: 0.75rem;
            padding-top: 0.75rem;
            border-top: 1px dashed var(--border-color);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .blue-signal-spine-desktop div,
          .investment-domain-card,
          .service-breakdown-card,
          .service-scope-link span {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
