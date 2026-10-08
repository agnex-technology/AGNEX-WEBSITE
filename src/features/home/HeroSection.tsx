import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import AgnexLogo from '../../components/brand/AgnexLogo';
import HeroEngineeringSystem from '../../components/visuals/HeroEngineeringSystem';
import { MagneticButton } from '../../components/motion/MagneticButton';
import { useLocalization } from '../../localization/LocalizationContext';
import { siteConfig } from '../../config/site';

export default function HeroSection() {
  const { country } = useLocalization();
  const heroRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const telemetryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' }
      });

      // 01. Brand Mark settles
      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      // 02. Architectural Headline reveals
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75 },
        '-=0.3'
      );

      // 03. Supporting Statement emerges
      tl.fromTo(
        statementRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.35'
      );

      // 04. Call to Action activates
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.25'
      );

      // 05. Coordinates grid appears
      tl.fromTo(
        telemetryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section agnex-blueprint-grid"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 76px)',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(3rem, 6vw, 6.5rem) 0',
        backgroundColor: 'var(--agnex-canvas)',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}
    >
      <div className="agnex-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Asymmetric Editorial Composition (7 columns on desktop) */}
          <div
            style={{
              gridColumn: 'span 12',
              maxWidth: '680px'
            }}
            className="hero-content-col"
          >
            {/* 01. Official Authoritative Brand Mark */}
            <div ref={brandRef} style={{ marginBottom: '1.75rem' }}>
              <AgnexLogo size="lg" priority={true} variant="dark" />
            </div>

            {/* 02. Master Architectural Statement */}
            <div style={{ marginBottom: '1rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--agnex-blue)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                CUSTOM SOFTWARE, AI & DIGITAL ENGINEERING
              </span>
            </div>

            <h1
              ref={headlineRef}
              style={{
                fontSize: 'var(--text-hero)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: 'var(--tracking-tighter)',
                color: 'var(--agnex-navy)',
                marginBottom: '1.25rem',
                textTransform: 'uppercase'
              }}
            >
              ENGINEERING<br />
              <span style={{ color: 'var(--agnex-navy)' }}>WHAT'S NEXT.</span>
            </h1>

            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 600, color: 'var(--agnex-navy)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
              {country.heroTagline}
            </div>

            {/* 03. Supporting Statement */}
            <div ref={statementRef} style={{ marginBottom: '2.5rem' }}>
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  maxWidth: '580px',
                  margin: 0,
                  fontWeight: 400
                }}
              >
                {country.supportingMessage}
              </p>
            </div>

            {/* 04. Call to Action with Magnetic Button */}
            <div
              ref={ctaRef}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3rem',
                alignItems: 'center'
              }}
            >
              <MagneticButton>
                <Link to="/contact" className="btn btn-primary" id="hero-start-project" data-cursor="cta">
                  <span>{country.contactCta}</span>
                  <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
                </Link>
              </MagneticButton>
              <Link to="/services" className="btn btn-secondary" id="hero-explore-services" data-cursor="hover">
                <span>Explore Services</span>
              </Link>
              {country.showWhatsApp && (
                <a
                  href={siteConfig.whatsappMessageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#0F766E',
                    borderColor: '#99F6E4',
                    backgroundColor: '#F0FDFA'
                  }}
                >
                  <span style={{ color: '#0D9488' }}>💬</span>
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {/* 05. 4 Pillars System Coordinates */}
            <div
              ref={telemetryRef}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border-color)',
                maxWidth: '600px'
              }}
              className="hero-telemetry-grid"
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-blue)', fontWeight: 600 }}>01</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginTop: '2px', letterSpacing: '0.04em' }}>DIGITAL</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>Products & Web</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-blue)', fontWeight: 600 }}>02</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginTop: '2px', letterSpacing: '0.04em' }}>SYSTEMS</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>ERP & Core Ops</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-blue)', fontWeight: 600 }}>03</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginTop: '2px', letterSpacing: '0.04em' }}>INTELLIGENCE</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>AI Workflows</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-blue)', fontWeight: 600 }}>04</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--agnex-navy)', marginTop: '2px', letterSpacing: '0.04em' }}>ENGINEERING</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>Cloud & Scale</div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom SVG Engineering Environment (5 columns on desktop) */}
          <div
            style={{
              gridColumn: 'span 12',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            className="hero-visual-col"
          >
            <HeroEngineeringSystem />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-content-col {
            grid-column: span 7 !important;
          }
          .hero-visual-col {
            grid-column: span 5 !important;
          }
        }
        @media (max-width: 640px) {
          .hero-telemetry-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
