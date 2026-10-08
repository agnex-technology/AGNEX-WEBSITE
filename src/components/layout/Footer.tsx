import { Link } from 'react-router-dom';
import AgnexLogo from '../brand/AgnexLogo';
import { LinkedInIcon, InstagramIcon, WhatsAppIcon } from '../brand/SocialIcons';
import { siteConfig } from '../../config/site';
import { CountrySwitcher } from '../localization/CountrySwitcher';

export default function Footer() {
  const currentYear = 2026;

  const servicesList = [
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Mobile Applications', href: '/services/mobile-app-development' },
    { label: 'Custom Software', href: '/services/custom-software' },
    { label: 'ERP Development', href: '/services/erp-development' },
    { label: 'CRM Development', href: '/services/crm-development' },
    { label: 'AI & Agents', href: '/services/ai-development' },
    { label: 'Business Automation', href: '/services/business-automation' },
    { label: 'Cloud Engineering', href: '/services/cloud-engineering' }
  ];

  const companyLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Projects', href: '/projects' },
    { label: 'Pricing & Investment', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' }
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
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(2rem, 3.5vw, 3.5rem)',
            marginBottom: '4rem'
          }}
        >
          {/* Col 1: Brand Info */}
          <div
            style={{
              gridColumn: 'span 12',
              maxWidth: '380px'
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
                marginBottom: '1.5rem'
              }}
            >
              AGNEX Technology designs and builds custom software, business systems, AI-powered automation and scalable cloud solutions that solve real business problems.
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AGNEX LinkedIn"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AGNEX Instagram"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={siteConfig.whatsappMessageLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AGNEX WhatsApp"
                style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div
            style={{
              gridColumn: 'span 6',
              maxWidth: '220px'
            }}
            className="footer-col"
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
              Services
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {servicesList.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
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

          {/* Col 3: Solutions & Company */}
          <div
            style={{
              gridColumn: 'span 6',
              maxWidth: '200px'
            }}
            className="footer-col"
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
              Architecture
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
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

          {/* Col 4: Verified Contact & Legal */}
          <div
            style={{
              gridColumn: 'span 12',
              maxWidth: '280px'
            }}
            className="footer-legal-col"
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
              Direct Contact
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>
              <div>Phone: +91 75983 41607</div>
              <div>Email: agnextechnology@gmail.com</div>
              <div>Location: Coimbatore, India</div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                fontWeight: 600,
                color: 'var(--agnex-navy)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '0.85rem'
              }}
            >
              Legal & Trust
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
            gap: '1.25rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                color: 'var(--text-muted)'
              }}
            >
              © {currentYear} AGNEX Technology. All rights reserved.
            </span>
            <CountrySwitcher variant="footer" />
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
            <span>DIGITAL · SYSTEMS · INTELLIGENCE · ENGINEERING</span>
            <span>SYS//PRODUCTION</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-brand-col {
            grid-column: span 4 !important;
          }
          .footer-col {
            grid-column: span 2.5 !important;
          }
          .footer-legal-col {
            grid-column: span 3 !important;
          }
        }
      `}</style>
    </footer>
  );
}
