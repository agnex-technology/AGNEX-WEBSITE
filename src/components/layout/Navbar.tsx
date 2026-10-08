import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AgnexLogo from '../brand/AgnexLogo';
import { CountrySwitcher } from '../localization/CountrySwitcher';

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
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
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
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(12, 28, 41, 0.12)' : 'rgba(12, 28, 41, 0.06)'}`,
        transition: 'all 0.25s ease'
      }}
    >
      <div
        className="agnex-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '68px' : '76px',
          transition: 'height 0.25s ease'
        }}
      >
        {/* Authoritative AGNEX Brand Logo */}
        <AgnexLogo asLink={true} size="lg" priority={true} variant="dark" />

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
              gap: '2.25rem',
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
                      fontWeight: active ? 600 : 500,
                      color: active ? 'var(--agnex-navy)' : 'var(--agnex-navy-muted)',
                      textDecoration: 'none',
                      transition: 'color var(--duration-fast) var(--ease-technical)',
                      position: 'relative',
                      padding: '0.5rem 0'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--agnex-blue)')}
                    onMouseLeave={(e) => {
                      if (!active) e.currentTarget.style.color = 'var(--agnex-navy-muted)';
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
                          backgroundColor: 'var(--agnex-blue)',
                          borderRadius: '1px'
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Regional Country & Currency Switcher */}
          <CountrySwitcher variant="navbar" />

          {/* Primary Action Button */}
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            <span>Start a Project</span>
            <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
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
            width: '42px',
            height: '42px',
            background: 'transparent',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-xs)',
            cursor: 'pointer',
            padding: '9px',
            gap: '5px'
          }}
          className="mobile-toggle"
        >
          <span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--agnex-navy)',
              transition: 'transform 0.2s ease, opacity 0.2s ease',
              transform: mobileMenuOpen ? 'translateY(7px) rotate(45deg)' : 'none'
            }}
          />
          <span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--agnex-navy)',
              transition: 'opacity 0.2s ease',
              opacity: mobileMenuOpen ? 0 : 1
            }}
          />
          <span
            style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--agnex-navy)',
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
            top: '68px',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'calc(100vh - 68px)',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '2.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 200,
            overflowY: 'auto'
          }}
        >
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              margin: 0,
              padding: 0
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 600,
                    color: 'var(--agnex-navy)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: 'var(--agnex-blue)', fontSize: 'var(--text-lg)' }}>→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>REGION:</span>
              <CountrySwitcher variant="navbar" />
            </div>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>Start a Project</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
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
