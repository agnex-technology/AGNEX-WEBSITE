import { Link } from 'react-router-dom';
import AgnexLogo from '../brand/AgnexLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const capabilities = [
    { label: '01 — Digital', href: '/expertise#digital', desc: 'Websites, web apps, mobile apps, digital products' },
    { label: '02 — Systems', href: '/expertise#systems', desc: 'ERP, CRM, inventory, billing & workflow software' },
    { label: '03 — Intelligence', href: '/expertise#intelligence', desc: 'AI solutions, automation, analytics & workflows' },
    { label: '04 — Engineering', href: '/expertise#engineering', desc: 'Architecture, APIs, cloud & technology consulting' }
  ];

  const companyLinks = [
    { label: 'About AGNEX', href: '/company' },
    { label: 'Selected Work', href: '/work' },
    { label: 'Capabilities', href: '/expertise' },
    { label: 'Insights & Research', href: '/insights' },
    { label: 'Start a Project', href: '/contact' }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--agnex-base-raised)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: 'clamp(4rem, 6vw, 6rem)',
        paddingBottom: '3rem',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Top Consultation Callout */}
        <div
          style={{
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--agnex-accent)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}
            >
              Ready to build?
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                lineHeight: 1.15
              }}
            >
              Have something that needs engineering?
            </h2>
          </div>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
            <span>Start a Project</span>
            <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '360px' }}>
            <AgnexLogo asLink={true} size="md" style={{ marginBottom: '1.25rem' }} />
            <div style={{ color: 'var(--agnex-white)', fontWeight: 600, fontSize: 'var(--text-base)', marginBottom: '0.25rem' }}>
              AGNEX Technology
            </div>
            <div style={{ color: 'var(--agnex-steel)', fontSize: 'var(--text-sm)', marginBottom: '0.5rem' }}>
              Engineering What's Next.
            </div>
            <p style={{ color: 'var(--agnex-accent)', fontSize: 'var(--text-sm)', fontWeight: 500, marginBottom: '1rem' }}>
              Ideas, engineered into impact.
            </p>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}
            >
              AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions.
            </p>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--agnex-steel-dark)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Engineer · Think · Build · Connect · Evolve
            </div>
          </div>

          {/* Capabilities Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem'
              }}
            >
              Capabilities
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {capabilities.map((cap) => (
                <li key={cap.label}>
                  <Link
                    to={cap.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-out)',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {cap.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem'
              }}
            >
              Company
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-out)',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-white)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Positioning / Value Column */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.5rem'
              }}
            >
              The Brand
            </h3>
            <div
              style={{
                backgroundColor: 'var(--agnex-base)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                fontSize: 'var(--text-xs)',
                color: 'var(--agnex-steel)',
                lineHeight: 1.6
              }}
            >
              <div style={{ color: 'var(--agnex-white)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Engineering What's Next.
              </div>
              <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                <strong>AG</strong> = Foundation & Precision<br />
                <strong>NEX</strong> = Next & Forward Progress<br />
                <strong>X</strong> = Technology × People × Ideas
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: 'var(--text-xs)',
            color: 'var(--agnex-steel-dark)'
          }}
        >
          <div>
            &copy; {currentYear} AGNEX Technology. All rights reserved. Ideas, engineered into impact.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>WCAG 2.2 AA Compliant</span>
            <span>Zero-Telemetry Leakage</span>
            <span>Enterprise SLA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
