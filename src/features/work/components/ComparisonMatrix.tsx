import { Link } from 'react-router-dom';
import { SectionLabel } from '../../../components/primitives';

export default function ComparisonMatrix() {
  const matrixData = [
    {
      num: '01',
      project: 'RDA',
      title: 'Request Driver Application',
      domain: 'Logistics',
      core: 'Marketplace + Mobility Infrastructure',
      slug: '/work/rda',
      highlight: 'Deterministic booking state machine, double-entry wallet ledger & PostGIS radial search'
    },
    {
      num: '02',
      project: 'SKYNET v5.0',
      title: 'Autonomous SOC & XDR Platform',
      domain: 'Cybersecurity',
      core: 'SOC + XDR + AI Investigation',
      slug: '/work/skynet',
      highlight: 'ClickHouse columnar telemetry, human-in-the-loop containment gate & signed audit trails'
    },
    {
      num: '03',
      project: 'LawGuide AI',
      title: 'AI-Assisted Legal Research Platform',
      domain: 'Legal AI',
      core: 'RAG + Document Intelligence',
      slug: '/work/lawguide-ai',
      highlight: 'BullMQ async document workers, Pinecone vector search & grounded statutory citations'
    },
    {
      num: '04',
      project: 'SentinelX AI',
      title: 'Enterprise AI Cybersecurity Platform',
      domain: 'Cybersecurity',
      core: 'Defensive AI Security',
      slug: '/work/sentinelx-ai',
      highlight: 'v0.1.0 local operational dashboard, defensive boundary enforcement & session signing'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-sm)',
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-subtle)'
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <SectionLabel number="LEDGER" text="CROSS-DOMAIN ENGINEERING MATRIX" />
        <h3
          style={{
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--agnex-navy)',
            marginBottom: '0.75rem',
            lineHeight: 1.2
          }}
        >
          Different problems. One engineering philosophy.
        </h3>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '680px', margin: 0, lineHeight: 1.6 }}>
          Whether orchestrating heavy-vehicle freight, mitigating cyber threats, or indexing statutory precedents, AGNEX engineers deterministic, auditable software systems designed around the problem.
        </p>
      </div>

      {/* Editorial Matrix Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            minWidth: '680px',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontFamily: 'var(--font-sans)'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--agnex-navy)', backgroundColor: 'var(--agnex-canvas-subtle)' }}>
              <th style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                #
              </th>
              <th style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Project
              </th>
              <th style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Domain
              </th>
              <th style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Core Engineering
              </th>
              <th style={{ padding: '0.875rem 1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Architectural Pillar
              </th>
              <th style={{ padding: '0.875rem 1rem', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-navy)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {matrixData.map((row) => (
              <tr
                key={row.project}
                className="matrix-row"
                style={{
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'background-color 150ms ease'
                }}
              >
                <td style={{ padding: '1.25rem 1rem', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--agnex-blue)', fontWeight: 700 }}>
                  {row.num}
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <div style={{ color: 'var(--agnex-navy)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                    {row.project}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                    {row.title}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--agnex-canvas-subtle)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--agnex-navy)',
                      fontWeight: 500
                    }}
                  >
                    {row.domain}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1rem', color: 'var(--agnex-navy)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>
                  {row.core}
                </td>
                <td style={{ padding: '1.25rem 1rem', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', maxWidth: '300px', lineHeight: 1.45 }}>
                  {row.highlight}
                </td>
                <td style={{ padding: '1.25rem 1rem', textAlign: 'right' }}>
                  <Link
                    to={row.slug}
                    className="agnex-link"
                    style={{ fontSize: 'var(--text-xs)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--agnex-blue)', fontWeight: 600 }}
                  >
                    <span>View Spec</span>
                    <span>→</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .matrix-row:hover {
          background-color: var(--agnex-canvas-subtle) !important;
        }
      `}</style>
    </div>
  );
}
