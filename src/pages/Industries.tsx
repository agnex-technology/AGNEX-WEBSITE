import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Container, SectionLabel, TechnicalLabel, Button } from '../components/primitives';
import ScrollFade from '../components/motion/ScrollFade';

export default function Industries() {
  const industries = [
    {
      code: 'IND//01',
      title: 'Freight, Fleet Logistics & Supply Chain',
      headline: 'Radial Matching, Live Geotracking & Multi-Tier Escrow Ledgers',
      challenge: 'Unreliable spot-market freight pricing, driver dispatch delays, and lack of real-time route accountability leading to lost cargo and delayed deliveries.',
      agnexSolution: 'We engineer end-to-end logistics platforms with sub-second geospatial driver-load radial matching, offline-first mobile driver manifests, and multi-tier cryptographic escrow ledgers.',
      caseStudyRef: {
        name: 'RDA Freight Platform',
        link: '/work/rda'
      },
      capabilities: [
        'Geospatial Haversine radial driver-cargo matching',
        'Offline mobile driver proof-of-delivery with digital signature sync',
        'Immutable milestone-gated freight escrow settlement',
        'Automated fleet compliance, insurance, and toll ledger auditing'
      ]
    },
    {
      code: 'IND//02',
      title: 'Defensive Cybersecurity & Security Operations (SOC)',
      headline: 'Real-Time Event Ingestion, MITRE ATT&CK Mapping & Autonomous Containment',
      challenge: 'Alert fatigue, disjointed firewall logs, and manual incident triage causing hours of dwell time during active lateral adversary movements.',
      agnexSolution: 'We build high-throughput security event collection pipelines (10,000+ EPS), automated adversary tactic correlation against MITRE ATT&CK, and human-confirmed containment orchestration.',
      caseStudyRef: {
        name: 'SKYNET v5.0 Autonomous SOC',
        link: '/work/skynet'
      },
      capabilities: [
        'Real-time Syslog & NetFlow streaming ingestion pipelines',
        'Autonomous MITRE ATT&CK kill-chain correlation engines',
        'Strict human-in-the-loop firewall block & quarantine execution',
        'Immutable cryptographic audit logging for forensic investigations'
      ]
    },
    {
      code: 'IND//03',
      title: 'Legal Tech & Regulatory Intelligence',
      headline: 'Grounded RAG Retrieval, Statutory Cross-Referencing & Audit Trails',
      challenge: 'Attorneys and compliance officers spending days manually combing through thousands of dense case transcripts, contradictory statutes, and regional amendments.',
      agnexSolution: 'We engineer grounded Retrieval-Augmented Generation (RAG) platforms utilizing vector embeddings, hybrid BM25 search, and strict citation proofs that completely eliminate hallucinations.',
      caseStudyRef: {
        name: 'LawGuide AI Platform',
        link: '/work/lawguide-ai'
      },
      capabilities: [
        'Hybrid dense/sparse vector retrieval over statutory legal corpus',
        'Exact paragraph and clause citation attribution proofs',
        'Asynchronous multi-page legal brief OCR and classification',
        'Isolated private cloud deployments ensuring 100% client-attorney confidentiality'
      ]
    },
    {
      code: 'IND//04',
      title: 'Enterprise Operations & Distribution',
      headline: 'Double-Entry Ledgers, Multi-Warehouse Inventory & Automated Billing',
      challenge: 'Siloed departments relying on fragile Excel files, causing stockouts, backorders, and days of manual financial close reconciliations each month.',
      agnexSolution: 'We design custom ERP and CRM platforms with transactional double-entry inventory ledgers, multi-location stock sync, and automated GST/tax invoicing.',
      caseStudyRef: {
        name: 'Bespoke ERP & CRM Architecture',
        link: '/services/erp-development'
      },
      capabilities: [
        'ACID-compliant double-entry inventory and accounting ledger',
        'Multi-warehouse barcode and RFID stock transfer reconciliation',
        'Automated procurement triggers based on historical velocity',
        'Zero per-seat software licensing fees with 100% client code ownership'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Industries & Domains We Engineer For | AGNEX Technology</title>
        <meta
          name="description"
          content="Explore the industries AGNEX Technology builds for: Freight & Logistics, Defensive Cybersecurity, Legal Intelligence, and Enterprise Operations."
        />
        <link rel="canonical" href="https://agnextechnology.com/industries" />
        <meta property="og:title" content="Industries & Domains We Engineer For | AGNEX Technology" />
        <meta
          property="og:description"
          content="High-stakes digital systems engineered for freight, cybersecurity, legal technology, and enterprise operations."
        />
        <meta property="og:url" content="https://agnextechnology.com/industries" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agnextechnology.com/brand/agnex-og.png" />
      </Helmet>

      {/* 01 — HERO */}
      <section
        className="agnex-section"
        style={{
          paddingTop: 'calc(var(--navbar-height) + 3rem)',
          backgroundColor: 'var(--agnex-canvas)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <Container>
          <ScrollFade>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
              <SectionLabel number="DOMAINS" text="SECTOR SPECIALIZATION" />
              <TechnicalLabel code="IND//SECTOR_MATRIX" status="VERIFIED" />
            </div>

            <div style={{ maxWidth: '920px' }}>
              <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', color: 'var(--agnex-navy)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                Engineering for High-Stakes Operational Environments.
              </h1>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', marginBottom: '2.5rem' }}>
                We partner with organizations operating where software failure has tangible real-world consequences — supply chain gridlock, regulatory penalties, or security breach liabilities.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Button to="/contact" variant="primary">
                  Discuss Your Sector Challenge
                </Button>
                <Button to="/work" variant="outline">
                  Inspect Verified Case Studies
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>

      {/* 02 — THE 4 INDUSTRY DOMAINS */}
      <section className="agnex-section agnex-section-subtle" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {industries.map((ind, idx) => (
              <ScrollFade key={ind.code} delay={0.08 * idx}>
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'clamp(2rem, 4vw, 3rem)',
                    boxShadow: 'var(--shadow-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700 }}>
                      {ind.code} // DOMAIN ARCHITECTURE
                    </div>
                    <Link
                      to={ind.caseStudyRef.link}
                      style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-blue)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Case Reference: {ind.caseStudyRef.name} →
                    </Link>
                  </div>

                  <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--agnex-navy)', marginBottom: '0.5rem' }}>
                    {ind.title}
                  </h2>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2rem' }}>
                    {ind.headline}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1.5rem', backgroundColor: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#C53030', fontWeight: 700, marginBottom: '0.5rem' }}>
                        THE OPERATIONAL BOTTLENECK:
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: '#742A2A', lineHeight: 1.6, margin: 0 }}>
                        {ind.challenge}
                      </p>
                    </div>

                    <div style={{ padding: '1.5rem', backgroundColor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.5rem' }}>
                        THE AGNEX ENGINEERING RESOLUTION:
                      </div>
                      <p style={{ fontSize: 'var(--text-xs)', color: '#0369A1', lineHeight: 1.6, margin: 0 }}>
                        {ind.agnexSolution}
                      </p>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                      ENGINEERED CAPABILITIES:
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                      {ind.capabilities.map((cap, i) => (
                        <div key={i} style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--agnex-blue)', fontWeight: 700 }}>+</span>
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollFade>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 — CTA */}
      <section className="agnex-section">
        <Container>
          <ScrollFade>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                textAlign: 'center',
                boxShadow: 'var(--shadow-subtle)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700, marginBottom: '0.75rem' }}>
                DOMAIN CONSULTATION // DIRECT ENGAGEMENT
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
                Does Your Sector Demand Zero-Failure Systems?
              </h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                Connect directly with our engineering team to assess your architecture and review applicable system blueprints.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Button to="/contact" variant="primary">
                  Initiate Sector Discussion
                </Button>
                <Button to="/solutions" variant="outline">
                  View Business Solutions
                </Button>
              </div>
            </div>
          </ScrollFade>
        </Container>
      </section>
    </>
  );
}
