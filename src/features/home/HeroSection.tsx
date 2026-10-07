import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import AgnexLogo from '../../components/brand/AgnexLogo';
import HeroEngineeringSystem from '../../components/visuals/HeroEngineeringSystem';

export default function HeroSection() {
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

      // 01 — Brand mark settles
      tl.fromTo(
        brandRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      // 02 — Headline reveals with precision
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      );

      // 03 — Supporting statement appears
      tl.fromTo(
        statementRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

      // 04 — CTA becomes interactive
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      // 05 — Telemetry indicator appears
      tl.fromTo(
        telemetryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.1'
      );

      // After sequence completes: STOP. Ambient motion remains strictly restrained.
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-section agnex-grid-mesh"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 78px)',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(3rem, 5vw, 5.5rem) 0',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}
    >
      <div className="agnex-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            alignItems: 'center'
          }}
        >
          {/* Left Column: 7 columns on desktop */}
          <div
            style={{
              gridColumn: 'span 12',
              maxWidth: '680px'
            }}
            className="hero-content-col"
          >
            {/* 01. Brand Mark */}
            <div ref={brandRef} style={{ marginBottom: '1.75rem' }}>
              <AgnexLogo size="lg" priority={true} />
            </div>

            {/* 02. Master Headline */}
            <h1
              ref={headlineRef}
              style={{
                fontSize: 'var(--text-hero)',
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: 'var(--tracking-tight)',
                color: 'var(--agnex-white)',
                marginBottom: '1.5rem',
                textTransform: 'none'
              }}
            >
              Engineering <br />
              <span style={{ color: 'var(--agnex-white)' }}>What's Next.</span>
            </h1>

            {/* 03. Supporting Statement & Brand Promise */}
            <div ref={statementRef} style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--agnex-accent)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  marginBottom: '0.875rem'
                }}
              >
                Ideas, engineered into impact.
              </div>
              <p
                style={{
                  fontSize: 'var(--text-md)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  maxWidth: '560px',
                  margin: 0
                }}
              >
                We architect digital products, custom operational platforms, and intelligent systems that eliminate operational bottlenecks and drive scalable growth.
              </p>
            </div>

            {/* 04. Call to Action with traveling micro-interaction */}
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
              <Link to="/contact" className="btn btn-primary" id="hero-start-project">
                <span>Start a Project</span>
                <span className="btn-arrow" style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
              </Link>
              <Link to="/expertise" className="btn btn-secondary" id="hero-explore-expertise">
                <span>Explore Expertise</span>
              </Link>
            </div>

            {/* 05. 4 Pillars Engineering Coordinates */}
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
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)' }}>01</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--agnex-white)', marginTop: '2px' }}>DIGITAL</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>Apps & Web</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)' }}>02</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--agnex-white)', marginTop: '2px' }}>SYSTEMS</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>ERP & Core Ops</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)' }}>03</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--agnex-white)', marginTop: '2px' }}>INTELLIGENCE</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>AI Workflows</div>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)' }}>04</span>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--agnex-white)', marginTop: '2px' }}>ENGINEERING</div>
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>Cloud & Scale</div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Structured Engineering SVG System */}
          <div
            style={{
              gridColumn: 'span 12',
              position: 'relative'
            }}
            className="hero-visual-col"
          >
            <div
              style={{
                backgroundColor: 'var(--agnex-base-raised)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(1rem, 2.5vw, 2rem)',
                position: 'relative'
              }}
            >
              <HeroEngineeringSystem />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .hero-content-col {
            grid-column: span 6 !important;
          }
          .hero-visual-col {
            grid-column: span 6 !important;
          }
        }
        @media (max-width: 600px) {
          .hero-telemetry-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
