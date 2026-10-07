import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AgnexLogo from '../brand/AgnexLogo';
import { WhatsAppIcon } from '../brand/SocialIcons';
import { siteConfig } from '../../config/site';
import { trackEvent } from '../../utils/analytics';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Expertise', href: '/expertise' },
    { label: 'Work', href: '/work' },
    { label: 'Company', href: '/company' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav, 100)',
        backgroundColor: scrolled ? 'rgba(11, 13, 16, 0.92)' : 'rgba(11, 13, 16, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'var(--agnex-graphite)' : 'rgba(255, 255, 255, 0.06)'}`,
        transition: 'all 0.25s ease'
      }}
    >
      <div
        className="agnex-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px'
        }}
      >
        {/* Official Authoritative Brand Logo */}
        <AgnexLogo asLink={true} size="lg" priority={true} />

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '2.5rem'
          }}
          className="desktop-nav"
        >
          <ul
            style={{
              display: 'flex',
              listStyle: 'none',
              gap: '2rem',
              margin: 0,
              padding: 0
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: active ? 600 : 400,
                      color: active ? 'var(--agnex-white)' : 'var(--agnex-steel)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-out)',
                      position: 'relative',
                      padding: '0.5rem 0'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-white)')}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = 'var(--agnex-steel)';
                    }}
                  >
                    {link.label}
                    {active && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '2px',
                          backgroundColor: 'var(--agnex-accent)',
                          borderRadius: '1px'
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Primary CTA */}
          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
            <span>Start a Project</span>
            <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '44px',
            height: '44px',
            background: 'transparent',
            border: '1px solid var(--agnex-graphite)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            padding: '10px',
            gap: '5px'
          }}
          className="mobile-toggle"
        >
          <span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--agnex-white)',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none'
            }}
          />
          <span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--agnex-white)',
              transition: 'opacity 0.2s ease',
              opacity: mobileMenuOpen ? 0 : 1
            }}
          />
          <span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--agnex-white)',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: mobileMenuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'
            }}
          />
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          style={{
            position: 'fixed',
            top: '76px',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'calc(100vh - 76px)',
            backgroundColor: 'rgba(11, 13, 16, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 'var(--z-drawer, 200)',
            overflowY: 'auto'
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 600,
                      color: active ? 'var(--agnex-accent)' : 'var(--agnex-white)',
                      textDecoration: 'none',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid var(--border-color)'
                    }}
                  >
                    <span>{link.label}</span>
                    <span style={{ fontSize: '1rem', color: 'var(--agnex-steel)' }}>→</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              <span>Start a Project</span>
              <span style={{ color: 'var(--agnex-accent)', fontWeight: 700 }}>→</span>
            </Link>

            {/* Compact Official WhatsApp Mobile Action */}
            <a
              href={siteConfig.links.whatsappWithText}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', { location: 'mobile_nav' });
                setMobileMenuOpen(false);
              }}
              aria-label="Chat with AGNEX Technology on WhatsApp"
              className="btn btn-secondary mobile-whatsapp-cta"
              style={{
                width: '100%',
                minHeight: '44px',
                padding: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                color: 'var(--agnex-white)',
                borderColor: 'var(--border-color)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)'
              }}
            >
              <WhatsAppIcon size={16} style={{ color: 'var(--agnex-accent)' }} />
              <span>Chat on WhatsApp</span>
              <span style={{ color: 'var(--agnex-steel)' }}>→</span>
            </a>

            <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--agnex-steel)', marginTop: '0.25rem' }}>
              Ideas, engineered into impact.
            </div>
          </div>
        </div>
      )}

      {/* Responsive media query styling */}
      <style>{`
        @media (min-width: 840px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
