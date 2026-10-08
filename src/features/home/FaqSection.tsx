import { useState } from 'react';
import ScrollFade from '../../components/motion/ScrollFade';
import { Container, SectionLabel, TechnicalLabel } from '../../components/primitives';

export default function FaqSection() {
  const faqs = [
    {
      q: 'How does AGNEX approach project scoping and engagement models?',
      a: 'We operate primarily through milestone-driven fixed-scope engagements for defined products, or dedicated engineering sprints for evolving platforms. Every engagement begins with an Architectural Technical Discovery where we define system architecture, data models, edge cases, and verifiable milestones before writing production code.'
    },
    {
      q: 'Who owns the intellectual property and source code?',
      a: 'Your organization retains 100% full intellectual property ownership. Upon milestone acceptance, all source repositories, CI/CD pipelines, database schemas, Docker images, and documentation are directly transferred to your organizational accounts. We never hold client code hostage or charge proprietary runtime license fees.'
    },
    {
      q: 'Can AGNEX integrate with our legacy databases and external third-party software?',
      a: 'Yes. A core discipline of our Systems engineering practice is building robust data adapters, REST/gRPC interfaces, webhook brokers, and asynchronous queues that interface with legacy SQL databases, legacy ERPs, payment gateways, and third-party enterprise APIs without destabilizing existing operations.'
    },
    {
      q: 'What is the typical timeline to design, engineer, and ship a custom platform?',
      a: 'A focused production MVP or workflow automation system typically ships within 4 to 8 weeks. Comprehensive enterprise platforms, custom ERPs, and multi-tenant SaaS architectures typically span 8 to 16 weeks, delivered through transparent bi-weekly functional releases on dedicated staging environments.'
    },
    {
      q: 'How does AGNEX approach system security, data privacy, and compliance?',
      a: 'Security is engineered into the foundation, not bolted on at the end. We enforce OWASP Top 10 defenses, parameterized data access, TLS 1.3 encryption in transit, AES-256 at rest, strict Role-Based Access Control (RBAC), and automated static code analysis (SAST) in all deployment pipelines.'
    },
    {
      q: 'What happens after deployment? How is maintenance and scaling supported?',
      a: 'We provide structured Post-Deployment SLAs covering serverless and Kubernetes monitoring, database indexing, telemetry anomaly detection, security patch management, and continuous feature iteration so your software scales effortlessly as transaction volume multiplies.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="agnex-section" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--border-color)' }}>
      <Container>
        <ScrollFade>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <SectionLabel number="INQUIRIES" text="FREQUENTLY ASKED QUESTIONS" />
            <TechnicalLabel code="FAQ//SPEC_ANSWERS" status="ACTIVE" />
          </div>

          <div style={{ maxWidth: '820px', marginBottom: '3.5rem' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', color: 'var(--agnex-navy)', marginBottom: '1rem' }}>
              Clear Answers on How We Build, Partner, and Deliver.
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              Have specific architectural or commercial requirements? Here is how we manage expectations, intellectual property, timelines, and technical integrity.
            </p>
          </div>
        </ScrollFade>

        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <ScrollFade key={idx} delay={0.05 * idx}>
                <div
                  style={{
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isOpen ? 'var(--agnex-canvas-subtle)' : '#FFFFFF',
                    transition: 'all 0.2s ease',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: '100%',
                      padding: '1.5rem 1.75rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--agnex-navy)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 'var(--text-base)',
                      lineHeight: 1.4
                    }}
                  >
                    <span>{faq.q}</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-lg)',
                        color: isOpen ? 'var(--agnex-blue)' : 'var(--text-muted)',
                        marginLeft: '1rem',
                        transition: 'transform 0.2s ease',
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        lineHeight: 1
                      }}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 1.75rem 1.5rem 1.75rem',
                        color: 'var(--text-secondary)',
                        fontSize: 'var(--text-sm)',
                        lineHeight: 1.7
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollFade>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
