import { Link } from 'react-router-dom';
import ScrollFade from '../../components/motion/ScrollFade';
import { Container, SectionLabel, TechnicalLabel } from '../../components/primitives';

export default function IndustriesSection() {
  const industries = [
    {
      code: 'IND//01',
      name: 'Freight & Fleet Logistics',
      context: 'Orchestrating heavy vehicle dispatch, escrow ledgers, and geospatial radial matching.',
      example: 'RDA Freight Platform',
      link: '/work/rda'
    },
    {
      code: 'IND//02',
      name: 'Defensive Cybersecurity & SOC',
      context: 'Real-time telemetry ingestion, MITRE ATT&CK correlation, and human-in-the-loop containment.',
      example: 'SKYNET v5.0 XDR',
      link: '/work/skynet'
    },
    {
      code: 'IND//03',
      name: 'Legal Intelligence & Research',
      context: 'Asynchronous judicial brief parsing, grounded statutory citation RAG, and audit trails.',
      example: 'LawGuide AI Platform',
      link: '/work/lawguide-ai'
    },
    {
      code: 'IND//04',
      name: 'Enterprise Operations & SaaS',
      context: 'Replacing brittle spreadsheet systems with real-time relational ledgers, RBAC, and automated billing.',
      example: 'Bespoke ERP & CRM Systems',
      link: '/services/erp-development'
    }
  ];

  return (
    <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
      <Container>
        <ScrollFade>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <SectionLabel number="DOMAINS" text="SECTORS WE ENGINEER FOR" />
            <TechnicalLabel code="SYS//DOMAINS_ACTIVE" status="PRODUCTION" />
          </div>

          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
              Built for High-Stakes Operational Environments.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              We partner with organizations operating where software failure has real-world consequences — freight breakdowns, regulatory liability, or security breaches.
            </p>
          </div>
        </ScrollFade>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {industries.map((ind, idx) => (
            <ScrollFade key={ind.code} delay={0.08 * idx}>
              <div
                style={{
                  backgroundColor: 'var(--agnex-canvas-subtle)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.75rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'all 0.2s ease'
                }}
                className="industry-card"
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.65rem' }}>
                    {ind.code}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                    {ind.name}
                  </h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {ind.context}
                  </p>
                </div>

                <div style={{ paddingTop: '1.25rem', marginTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {ind.example}
                  </span>
                  <Link
                    to={ind.link}
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Spec →
                  </Link>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </Container>

      <style>{`
        .industry-card:hover {
          border-color: var(--agnex-blue) !important;
          background-color: #FFFFFF !important;
        }
      `}</style>
    </section>
  );
}
