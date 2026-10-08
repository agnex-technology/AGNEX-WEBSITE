import { Helmet } from 'react-helmet-async';
import { Container, SectionLabel, TechnicalLabel } from '../components/primitives';
import ScrollFade from '../components/motion/ScrollFade';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | AGNEX Technology</title>
        <meta
          name="description"
          content="Privacy Policy for AGNEX Technology. Understand how we handle technical data, lead information, and enterprise intellectual property."
        />
        <link rel="canonical" href="https://agnextechnology.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | AGNEX Technology" />
        <meta property="og:description" content="Privacy Policy and data protection standards for AGNEX Technology." />
        <meta property="og:url" content="https://agnextechnology.com/privacy-policy" />
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
              <SectionLabel number="LEGAL" text="DATA GOVERNANCE & PRIVACY" />
              <TechnicalLabel code="COMPLIANCE//PRIVACY" status="ACTIVE" />
            </div>

            <div style={{ maxWidth: '820px', marginBottom: '3rem' }}>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--agnex-navy)', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
                Privacy Policy
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
                1. Overview & Commitment to Data Sovereignty
              </h2>
              <p>
                AGNEX Technology ("AGNEX", "we", "us", or "our") designs and builds custom digital systems, intelligent automation, and cloud software. We prioritize data minimization, technical transparency, and strict client data sovereignty. This Privacy Policy details our practices concerning information collected through our website (<a href="https://agnextechnology.com" style={{ color: 'var(--agnex-blue)' }}>agnextechnology.com</a>) and our commercial engagements.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                2. Information We Collect
              </h2>
              <p>We collect information strictly necessary to provide engineering services and evaluate project inquiries:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Lead Generation Information:</strong> Full name, professional email address, company name, phone number, project requirements, and estimated budget ranges provided voluntarily through our contact forms.</li>
                <li><strong>Technical Diagnostics & Telemetry:</strong> Aggregated anonymous network metrics (IP address, browser user-agent, operating system, and visit timestamps) collected automatically to defend against malicious traffic, bot attacks, and DDoS events.</li>
                <li><strong>Client Architectural Assets:</strong> Source code repositories, infrastructure keys, and database schemas shared during active engineering contracts are governed by strict non-disclosure agreements (NDAs) and stored exclusively in dedicated client-approved perimeters.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                3. Purpose of Processing
              </h2>
              <p>We process data solely for the following legitimate business purposes:</p>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Evaluating project feasibility and preparing technical architectural proposals.</li>
                <li>Executing contractual milestones and delivering software deliverables.</li>
                <li>Ensuring network security, preventing spam form submissions, and defending cloud infrastructure.</li>
                <li>Complying with statutory accounting and tax regulations under Indian law and international commercial frameworks.</li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}>
                We <strong>never sell, lease, or rent</strong> client data, project inquiries, or contact records to data brokers or third-party advertisers.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                4. Infrastructure & Security Safeguards
              </h2>
              <p>
                We enforce enterprise-grade security standards across all systems: TLS 1.3 encryption in transit, AES-256 disk encryption at rest, strict least-privilege IAM policies, multi-factor authentication (MFA) on all developer environments, and automated continuous vulnerability scanning.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                5. Data Retention & Erasure Rights
              </h2>
              <p>
                Inquiry records are retained for a maximum of 24 months for commercial follow-up, or until you request deletion. You retain the right to request access, correction, or permanent erasure of your personal data at any time by contacting our engineering compliance desk at <a href="mailto:agnextechnology@gmail.com" style={{ color: 'var(--agnex-blue)' }}>agnextechnology@gmail.com</a>.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', color: 'var(--agnex-navy)', marginBottom: '0.75rem' }}>
                6. Contact Information
              </h2>
              <p>
                For questions regarding this policy or our data handling practices:
              </p>
              <div style={{ padding: '1.25rem', backgroundColor: 'var(--agnex-canvas-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
                AGNEX Technology<br />
                Engineering Compliance & Privacy Desk<br />
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
