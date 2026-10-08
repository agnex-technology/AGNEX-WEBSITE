import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AgnexLogo from '../components/brand/AgnexLogo';
import { Container, SectionLabel } from '../components/primitives';

export default function NotFound404() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | AGNEX Technology</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
        className="agnex-blueprint-grid"
      >
        <Container style={{ maxWidth: '680px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <AgnexLogo asLink={true} size="md" variant="dark" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <SectionLabel number="404" text="ROUTE NOT RESOLVED" />
          </div>

          <h1
            style={{
              fontSize: 'clamp(4rem, 8vw, 7rem)',
              fontWeight: 700,
              color: 'var(--agnex-navy)',
              lineHeight: 1,
              marginBottom: '1.25rem',
              letterSpacing: 'var(--tracking-tight)'
            }}
          >
            404
          </h1>

          <h2
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 600,
              color: 'var(--agnex-navy)',
              marginBottom: '1rem'
            }}
          >
            This route could not be located.
          </h2>

          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              lineHeight: 1.6
            }}
          >
            The link you followed may be outdated, or the system route has been modernized. Use the navigation links below to return to the active platform.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary">
              <span>Return to Home</span>
              <span className="btn-arrow" style={{ fontWeight: 700 }}>→</span>
            </Link>
            <Link to="/work" className="btn btn-secondary">
              <span>Selected Work</span>
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <span>Contact Engineering</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
