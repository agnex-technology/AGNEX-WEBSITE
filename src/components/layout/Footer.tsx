import { Link } from 'react-router-dom';
import AgnexLogo from '../brand/AgnexLogo';
import { LinkedInIcon, InstagramIcon, PhoneIcon, WhatsAppIcon } from '../brand/SocialIcons';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../utils/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: 'Expertise', href: '/expertise' },
    { label: 'Work', href: '/work' },
    { label: 'Company', href: '/company' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--agnex-base-raised)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: 'clamp(3.5rem, 5vw, 5.5rem)',
        paddingBottom: '2.5rem',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Top Direct Action Banner */}
        <div
          style={{
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1.5rem'
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
                marginBottom: '0.5rem'
              }}
            >
              Ready to build?
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                lineHeight: 1.2,
                margin: 0
              }}
            >
              Have something that needs engineering?
            </h2>
          </div>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem' }}>
            <span>Start a Project</span>
            <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
          </Link>
        </div>

        {/* Main 4-Column Footer Hierarchy */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            marginBottom: '3.5rem'
          }}
        >
          {/* Column 1: Official Brand Identity */}
          <div style={{ maxWidth: '340px' }}>
            <AgnexLogo asLink={true} size="md" style={{ marginBottom: '1.25rem' }} />
            <div
              style={{
                color: 'var(--agnex-white)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                marginBottom: '0.25rem'
              }}
            >
              AGNEX Technology
            </div>
            <div
              style={{
                color: 'var(--agnex-steel)',
                fontSize: 'var(--text-sm)',
                marginBottom: '0.35rem'
              }}
            >
              Engineering What's Next.
            </div>
            <p
              style={{
                color: 'var(--agnex-accent)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                marginBottom: '1rem'
              }}
            >
              Ideas, engineered into impact.
            </p>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              Transforming complex engineering and operational friction into resilient digital systems.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.25rem'
              }}
            >
              Navigation
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="footer-nav-link"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: '36px',
                      transition: 'color 200ms ease, transform 200ms ease'
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect (Official Social Profiles) */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.25rem'
              }}
            >
              Connect
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Official AGNEX Technology LinkedIn Page"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    minHeight: '44px',
                    transition: 'color 200ms ease, transform 200ms ease'
                  }}
                >
                  <LinkedInIcon size={16} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label="Official AGNEX Technology Instagram Profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    minHeight: '44px',
                    transition: 'color 200ms ease, transform 200ms ease'
                  }}
                >
                  <InstagramIcon size={16} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.whatsappWithText}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer_connect' })}
                  className="footer-social-link"
                  aria-label="Chat with AGNEX Technology on WhatsApp"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    minHeight: '44px',
                    transition: 'color 200ms ease, transform 200ms ease'
                  }}
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (Official Direct Line) */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.25rem'
              }}
            >
              Contact
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={siteConfig.links.phone}
                className="footer-phone-link"
                aria-label={`Call AGNEX Technology at ${siteConfig.phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--agnex-white)',
                  textDecoration: 'none',
                  minHeight: '44px',
                  padding: '0.4rem 0.75rem',
                  backgroundColor: 'var(--agnex-base)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  width: 'fit-content',
                  transition: 'border-color 200ms ease, color 200ms ease, background-color 200ms ease'
                }}
              >
                <PhoneIcon size={15} style={{ color: 'var(--agnex-accent)' }} />
                <span>{siteConfig.phone}</span>
              </a>

              <a
                href={siteConfig.links.whatsappWithText}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('whatsapp_click', { location: 'footer_contact' })}
                className="footer-phone-link footer-whatsapp-cta"
                aria-label="Chat with AGNEX Technology on WhatsApp"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  color: 'var(--agnex-white)',
                  textDecoration: 'none',
                  minHeight: '44px',
                  padding: '0.4rem 0.75rem',
                  backgroundColor: 'var(--agnex-base)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  width: 'fit-content',
                  transition: 'border-color 200ms ease, color 200ms ease, background-color 200ms ease'
                }}
              >
                <WhatsAppIcon size={16} style={{ color: 'var(--agnex-accent)' }} />
                <span>Chat on WhatsApp →</span>
              </a>

              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  margin: 0
                }}
              >
                Direct engineering desk & WhatsApp messaging.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.75rem',
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
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span>Enterprise SLA</span>
            <span>Zero-Telemetry Leakage</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-nav-link:hover,
        .footer-social-link:hover {
          color: var(--agnex-white) !important;
          transform: translateX(3px);
        }
        .footer-phone-link:hover {
          border-color: var(--agnex-accent) !important;
          background-color: var(--agnex-black) !important;
          color: var(--agnex-white) !important;
        }
      `}</style>
    </footer>
  );
}
