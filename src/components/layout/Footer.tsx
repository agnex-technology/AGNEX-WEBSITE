import { Link } from 'react-router-dom';
import AgnexLogo from '../brand/AgnexLogo';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from '../brand/SocialIcons';
import { siteConfig } from '../../config/site';

export default function Footer() {
  const currentYear = 2026;

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Capabilities', href: '/expertise' },
    { label: 'Approach', href: '/#approach' },
    { label: 'About', href: '/company' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--agnex-canvas)',
        borderTop: '1px solid var(--border-color)',
        paddingTop: 'clamp(4rem, 6vw, 6rem)',
        paddingBottom: '3rem',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        {/* Main Footer Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginBottom: '4rem'
          }}
        >
          {/* Brand Info */}
          <div
            style={{
              gridColumn: 'span 12',
              maxWidth: '460px'
            }}
            className="footer-brand-col"
          >
            <AgnexLogo asLink={true} size="md" variant="dark" style={{ marginBottom: '1.25rem' }} />
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--agnex-blue)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '0.75rem'
              }}
            >
              Engineering What's Next.
            </div>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0
              }}
            >
              AGNEX is a technology and engineering company that transforms complex business challenges and opportunities into practical digital systems.
            </p>
          </div>

          {/* Navigation Links */}
          <div
            style={{
              gridColumn: 'span 6',
              maxWidth: '240px'
            }}
            className="footer-nav-col"
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                fontWeight: 600,
                color: 'var(--agnex-navy)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.25rem'
              }}
            >
              Navigation
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div
            style={{
              gridColumn: 'span 6',
              maxWidth: '240px'
            }}
            className="footer-connect-col"
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                fontWeight: 600,
                color: 'var(--agnex-navy)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '1.25rem'
              }}
            >
              Connect
            </div>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
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
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <InstagramIcon size={16} />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/agnex-technology"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.whatsappMessageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <WhatsAppIcon size={16} />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Technical Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              color: 'var(--text-muted)'
            }}
          >
            © {currentYear} AGNEX Technology. All rights reserved.
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-3xs)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            <span>SYS//PRODUCTION</span>
            <span>ENGINEERING WHAT'S NEXT</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-brand-col {
            grid-column: span 6 !important;
          }
          .footer-nav-col {
            grid-column: span 3 !important;
          }
          .footer-connect-col {
            grid-column: span 3 !important;
          }
        }
      `}</style>
    </footer>
  );
}
