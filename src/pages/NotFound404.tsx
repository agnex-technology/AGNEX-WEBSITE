import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AgnexLogo from '../components/brand/AgnexLogo';

export default function NotFound404() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | AGNEX Technology</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          backgroundColor: 'var(--agnex-black)'
        }}
        className="agnex-grid-mesh"
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <AgnexLogo asLink={true} size="md" />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--agnex-accent)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            404 // ROUTE NOT RESOLVED
          </div>

          <h1
            style={{
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 700,
              color: 'var(--agnex-white)',
              lineHeight: 1,
              marginBottom: '1.5rem',
              letterSpacing: 'var(--tracking-tight)'
            }}
          >
            404
          </h1>

          <h2
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 500,
              color: 'var(--agnex-white)',
              marginBottom: '1rem'
            }}
          >
            This route could not be located.
          </h2>

          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-muted)',
              marginBottom: '2.5rem',
              lineHeight: 1.6
            }}
          >
            The link you followed may be outdated, or the system route has been modernized. Use the navigation links below to return to the active platform.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              <span>Return to Home</span>
              <span className="btn-arrow" style={{ color: 'var(--agnex-accent)' }}>→</span>
            </Link>
            <Link to="/expertise" className="btn btn-secondary">
              <span>Explore Capabilities</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <span>Contact Engineering</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
