import { Link } from 'react-router-dom';
import { PhoneIcon, WhatsAppIcon } from '../../components/brand/SocialIcons';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../utils/analytics';

export default function ClosingCtaSection() {
  return (
    <section
      className="agnex-section closing-cta-section agnex-grid-mesh"
      style={{
        backgroundColor: 'var(--agnex-black)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        <div
          style={{
            backgroundColor: 'var(--agnex-base-raised)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: 'clamp(2.5rem, 5vw, 4.5rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle architectural coordinates */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1rem',
              marginBottom: '2.5rem'
            }}
          >
            <div className="agnex-badge">
              Direct Engagement
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                color: 'var(--agnex-steel)'
              }}
            >
              CHANNEL: OPEN // RESPONSE_TIME: &lt; 24H
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left 8 Columns */}
            <div style={{ gridColumn: 'span 12' }} className="cta-left-col">
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.75vw, 3.5rem)',
                  fontWeight: 700,
                  color: 'var(--agnex-white)',
                  marginBottom: '1rem',
                  lineHeight: 1.1,
                  letterSpacing: 'var(--tracking-tight)'
                }}
              >
                Ready to engineer what's next?
              </h2>

              <p
                style={{
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '640px',
                  marginBottom: '2.5rem'
                }}
              >
                Speak directly with senior software architects and product engineers. No aggressive sales pitches — just clear technical discovery and practical engineering roadmaps.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                <Link to="/contact" className="btn btn-primary" id="cta-start-project" style={{ minHeight: '44px' }}>
                  <span>Start a Project</span>
                  <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
                </Link>

                <a
                  href={siteConfig.links.whatsappWithText}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  id="cta-whatsapp"
                  aria-label="Chat with AGNEX Technology on WhatsApp"
                  onClick={() => trackEvent('whatsapp_click', { location: 'home_closing_cta' })}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minHeight: '44px'
                  }}
                >
                  <WhatsAppIcon size={16} style={{ color: 'var(--agnex-accent)' }} />
                  <span>Chat on WhatsApp</span>
                  <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
                </a>

                <Link to="/expertise" className="btn btn-secondary" id="cta-explore-capabilities" style={{ minHeight: '44px' }}>
                  <span>Explore Capabilities</span>
                </Link>
              </div>
            </div>

            {/* Right 4 Columns: Direct Telemetry Contacts */}
            <div style={{ gridColumn: 'span 12' }} className="cta-right-col">
              <div
                style={{
                  backgroundColor: 'var(--agnex-black)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-steel)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    DIRECT TELEPHONE DESK
                  </div>
                  <a
                    href={siteConfig.links.phone}
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--agnex-white)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      minHeight: '44px'
                    }}
                  >
                    <PhoneIcon size={16} style={{ color: 'var(--agnex-accent)' }} />
                    <span>{siteConfig.phone}</span>
                  </a>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-steel)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                    OFFICIAL WHATSAPP
                  </div>
                  <a
                    href={siteConfig.links.whatsappWithText}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('whatsapp_click', { location: 'home_closing_cta_desk' })}
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--agnex-white)',
                      textDecoration: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      minHeight: '44px'
                    }}
                  >
                    <WhatsAppIcon size={16} style={{ color: 'var(--agnex-accent)' }} />
                    <span>{siteConfig.whatsapp}</span>
                  </a>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <div style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-steel)', marginBottom: '0.25rem' }}>
                    GUARANTEE
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-steel-light)', lineHeight: 1.5 }}>
                    Zero speculation. Direct review by technical leads within 1 business day.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .cta-left-col {
            grid-column: span 8 !important;
          }
          .cta-right-col {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </section>
  );
}
