import { Link } from 'react-router-dom';
import ScrollFade from '../../components/motion/ScrollFade';
import { Container, SectionLabel, TechnicalLabel } from '../../components/primitives';

export default function SolutionsSection() {
  const solutions = [
    {
      num: '01',
      title: 'Enterprise Resource Planning (ERP)',
      desc: 'Unified operational backbones tailored to your exact manufacturing, distribution, and financial accounting pipelines.',
      features: ['Real-time inventory ledger', 'Multi-warehouse sync', 'Automated purchase orders', 'Financial auditing'],
      href: '/services/erp-development'
    },
    {
      num: '02',
      title: 'Customer Relationship Systems (CRM)',
      desc: 'High-velocity sales pipelines, client portal communication, and multi-channel relationship telemetry without SaaS bloat.',
      features: ['Pipeline automation', 'Omnichannel history', 'Custom lead scoring', 'Contract lifecycle'],
      href: '/services/crm-development'
    },
    {
      num: '03',
      title: 'Intelligent Workflow Automation',
      desc: 'Eliminate repetitive manual administration across accounting, customer verification, and compliance filings.',
      features: ['Deterministic event queues', 'Document extraction (OCR)', 'Multi-system webhook sync', 'Human approval gates'],
      href: '/services/business-automation'
    },
    {
      num: '04',
      title: 'Scalable Cloud Platforms & APIs',
      desc: 'Resilient cloud-native microservices engineered to handle traffic surges with sub-second response times and zero downtime.',
      features: ['High-throughput gateways', 'Database sharding', 'Kubernetes clusters', 'Zero-Trust security'],
      href: '/services/cloud-engineering'
    }
  ];

  return (
    <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <Container>
        <ScrollFade>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <SectionLabel number="SOLUTIONS" text="BUSINESS SOFTWARE ARCHITECTURE" />
            <TechnicalLabel code="SYS//SOLUTIONS_CORE" status="OPTIMIZED" />
          </div>

          <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
              Software Engineered Around How You Actually Operate.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Off-the-shelf software forces your business into someone else's rigid template. We build unified, custom business systems designed around your operational reality.
            </p>
          </div>
        </ScrollFade>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}
        >
          {solutions.map((item, idx) => (
            <ScrollFade key={item.num} delay={0.08 * idx}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'all 0.2s ease'
                }}
                className="solution-card"
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    SOLUTION // {item.num}
                  </div>
                  <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {item.desc}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {item.features.map((f, i) => (
                      <li key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                        <span style={{ color: 'var(--agnex-blue)', fontWeight: 700 }}>+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
                  <Link
                    to={item.href}
                    className="agnex-link"
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
                  >
                    <span>Inspect Solution Architecture</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </Container>

      <style>{`
        .solution-card:hover {
          border-color: var(--agnex-blue) !important;
          box-shadow: var(--shadow-float) !important;
        }
      `}</style>
    </section>
  );
}
