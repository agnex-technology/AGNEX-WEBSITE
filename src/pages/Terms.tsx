import { Helmet } from 'react-helmet-async';
import { Container, SectionLabel, TechnicalLabel } from '../components/primitives';
import ScrollFade from '../components/motion/ScrollFade';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | AGNEX Technology</title>
        <meta
          name="description"
          content="Terms of Service for AGNEX Technology. Understand our engineering engagement frameworks, intellectual property transfer, and commercial terms."
        />
        <link rel="canonical" href="https://agnextechnology.com/terms" />
        <meta property="og:title" content="Terms of Service | AGNEX Technology" />
        <meta property="og:description" content="Commercial terms of service and engineering engagement frameworks for AGNEX Technology." />
        <meta property="og:url" content="https://agnextechnology.com/terms" />
        <meta property="og:type" content="website" />
      </Helmet>

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
              <SectionLabel number="LEGAL" text="COMMERCIAL TERMS OF SERVICE" />
              <TechnicalLabel code="COMPLIANCE//TERMS" status="ACTIVE" />
            </div>

            <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--agnex-navy)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
                Terms of Service
              </h1>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                EFFECTIVE DATE: OCTOBER 2026 // REVISION: 2.1
              </p>
            </div>
          </ScrollFade>
        </Container>
      </section>

      <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
        <Container>
          <div style={{ maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.75 }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                1. Acceptance & Engagement Framework
              </h2>
              <p>
                These Terms of Service ("Terms") govern all commercial relationships, technical consulting, software engineering, and platform architectures delivered by AGNEX Technology ("AGNEX", "we", "us"). By engaging AGNEX for technical discovery, signing a Statement of Work (SOW), or utilizing this website, you agree to these Terms.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                2. Scope of Engineering Services
              </h2>
              <p>
                AGNEX provides custom digital systems, including web applications, mobile platforms, enterprise resource planning (ERP), customer relationship systems (CRM), artificial intelligence applications, workflow automation, and cloud DevOps engineering. Specific deliverables, sprint schedules, milestones, and acceptance criteria are formally detailed in individual project Statements of Work.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                3. Intellectual Property Sovereignty
              </h2>
              <p>
                We believe in total client code sovereignty. Upon completion of agreed milestones and full settlement of corresponding invoices:
              </p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>100% Client IP Ownership:</strong> The client receives complete, unencumbered ownership of all custom software code, database schemas, UI designs, and documentation created under the specific SOW.</li>
                <li><strong>No Proprietary Lock-In:</strong> AGNEX does not charge recurring platform fees or withhold source repositories.</li>
                <li><strong>Open-Source Components:</strong> Open-source libraries and frameworks (e.g., React, PostgreSQL, Docker) incorporated into deliverables remain governed by their respective licenses (MIT, Apache 2.0, BSD).</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                4. Milestones, Review & Acceptance
              </h2>
              <p>
                Engineering engagements proceed through structured milestones. Deliverables are deployed to staging environments for client verification. The client has an agreed review window (typically 7-10 business days) to submit functional deviations against the technical specification before milestone acceptance.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                5. Warranty & Post-Launch Guarantee
              </h2>
              <p>
                AGNEX warrants that delivered code will conform substantially to agreed technical specifications. Each production milestone includes a 30-day post-launch warranty window during which critical functional bugs or security regressions attributable to AGNEX code are remediated at zero additional cost.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                6. Confidentiality & Non-Disclosure
              </h2>
              <p>
                Both parties agree to protect proprietary technical architectures, financial information, client databases, and trade secrets with reasonable standard of care. Information disclosed during technical discovery is kept strictly confidential.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                7. Limitation of Liability & Governing Law
              </h2>
              <p>
                To the maximum extent permitted by law, AGNEX's aggregate liability arising out of any engagement shall not exceed the total fees paid by the client under the applicable Statement of Work. These Terms are governed by the laws of India, with jurisdiction in Coimbatore, Tamil Nadu, subject to mutually agreed commercial arbitration for international clients.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                8. Contact Information
              </h2>
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--agnex-canvas-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
                AGNEX Technology<br />
                Legal & Commercial Operations<br />
                Direct: +91 75983 41607<br />
                Email: agnextechnology@gmail.com<br />
                URL: https://agnextechnology.com
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
