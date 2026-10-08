import ScrollFade from '../../components/motion/ScrollFade';
import { Container, SectionLabel, TechnicalLabel } from '../../components/primitives';

export default function WhyAgnexSection() {
  const pillars = [
    {
      num: '01',
      title: 'Direct Engineering Ownership',
      desc: 'No non-technical intermediaries or outsourced layers. You interface directly with senior software architects who design, write, test, and ship your software.',
      metric: 'SENIOR-LED ARCHITECTURE'
    },
    {
      num: '02',
      title: 'Built for High-Stakes Reliability',
      desc: 'We engineer deterministic systems: transactional database integrity, comprehensive schema migrations, error budgets, and full telemetry observability.',
      metric: 'ZERO-COMPROMISE STABILITY'
    },
    {
      num: '03',
      title: 'Complete IP & Code Sovereignty',
      desc: 'Every repository, Dockerfile, database schema, and deployment script is 100% owned by your company. No proprietary lock-in or recurring platform licensing fees.',
      metric: '100% CODE OWNERSHIP'
    },
    {
      num: '04',
      title: 'Transparent, Milestone-Driven Velocity',
      desc: 'We ship verified working software in structured weekly sprints with live staging environments, clear Git diffs, and zero speculative corporate hand-waving.',
      metric: 'CONTINUOUS STAGING BUILDS'
    }
  ];

  return (
    <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
      <Container>
        <ScrollFade>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <SectionLabel number="DIFFERENTIATION" text="WHY PARTNER WITH AGNEX" />
            <TechnicalLabel code="PRIN//ENGINEERING_FIRST" status="VERIFIED" />
          </div>

          <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
              We Build Software as an Engineering Discipline, Not an Agency Commodity.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Most digital agencies treat software as marketing brochures. We treat software as mission-critical enterprise infrastructure that must run reliably, scale predictably, and generate tangible business leverage.
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
          {pillars.map((item, idx) => (
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
                className="why-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700 }}>
                      PRINCIPLE // {item.num}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      {item.metric}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.85rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </Container>

      <style>{`
        .why-card:hover {
          border-color: var(--agnex-blue) !important;
          box-shadow: var(--shadow-float) !important;
        }
      `}</style>
    </section>
  );
}
