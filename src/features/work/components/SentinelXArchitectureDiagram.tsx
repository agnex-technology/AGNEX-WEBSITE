import React from 'react';

export default function SentinelXArchitectureDiagram() {
  return (
    <div
      style={{
        backgroundColor: 'var(--agnex-black)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        overflow: 'hidden'
      }}
    >
      {/* Foundation Status Banner */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                border: '1px solid var(--agnex-accent)',
                color: 'var(--agnex-white)'
              }}
            >
              v0.1.0 Foundation
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-steel)' }}>
              CONTROLLED DEFENSIVE ARCHITECTURE
            </span>
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--agnex-white)' }}>
            SentinelX AI Foundation Topology & Governance Boundary
          </div>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--agnex-steel-light)',
            padding: '0.35rem 0.75rem',
            backgroundColor: 'var(--agnex-base)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xs)'
          }}
        >
          STATUS: <span style={{ color: 'var(--agnex-accent)', fontWeight: 600 }}>Runnable Local Dashboard + API</span>
        </div>
      </div>

      {/* Defensive Boundary Declaration */}
      <div
        style={{
          backgroundColor: 'rgba(37, 99, 235, 0.05)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xs)',
          padding: '1rem 1.25rem',
          marginBottom: '2rem',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-muted)',
          lineHeight: 1.55
        }}
      >
        <strong style={{ color: 'var(--agnex-white)' }}>DEFENSIVE SECURITY BOUNDARY: </strong>
        SentinelX AI supports authorized defensive cybersecurity exclusively. It strictly prohibits and is not designed for unauthorized access, credential theft, malware deployment, destructive disruption, or any other harmful offensive activity.
      </div>

      {/* SVG Diagram: Conceptual Defensive Architecture */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 920 280"
          style={{ width: '100%', minWidth: '760px', height: 'auto', display: 'block' }}
          role="img"
          aria-label="SentinelX AI Conceptual Defensive Architecture Flow"
        >
          <defs>
            <marker id="sx-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
            </marker>
          </defs>

          {/* Node 1: Security Events */}
          <g>
            <rect x="30" y="80" width="180" height="90" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1.5" />
            <text x="45" y="110" fill="#F7F8FA" fontFamily="monospace" fontSize="12" fontWeight="bold">SECURITY EVENTS</text>
            <text x="45" y="132" fill="#7C8490" fontFamily="sans-serif" fontSize="11">Defensive Demonstration</text>
            <text x="45" y="150" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Telemetry Generator</text>
          </g>

          <path d="M 210 125 L 250 125" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#sx-arrow)" />

          {/* Node 2: SentinelX API Gateway */}
          <g>
            <rect x="250" y="70" width="200" height="110" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="265" y="98" fill="#3B82F6" fontFamily="monospace" fontSize="12" fontWeight="bold">SENTINELX API</text>
            <text x="265" y="120" fill="#F7F8FA" fontFamily="sans-serif" fontSize="11">Express REST Foundation</text>
            <text x="265" y="140" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Boundary Middleware</text>
            <text x="265" y="158" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Server-Signed Sessions</text>
          </g>

          <path d="M 450 125 L 490 125" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#sx-arrow)" />

          {/* Node 3: Structured Security Data Store */}
          <g>
            <rect x="490" y="55" width="190" height="140" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1.5" />
            <text x="505" y="82" fill="#F7F8FA" fontFamily="monospace" fontSize="12" fontWeight="bold">SECURITY DATA</text>
            <line x1="505" y1="92" x2="665" y2="92" stroke="#20242B" strokeWidth="1" />
            <text x="505" y="114" fill="#3B82F6" fontFamily="monospace" fontSize="11">├─ Findings Schemas</text>
            <text x="505" y="136" fill="#F7F8FA" fontFamily="monospace" fontSize="11">├─ Audit History</text>
            <text x="505" y="158" fill="#7C8490" fontFamily="monospace" fontSize="11">└─ Defensive Analysis</text>
          </g>

          <path d="M 680 125 L 720 125" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#sx-arrow)" />

          {/* Node 4: Local Dashboard */}
          <g>
            <rect x="720" y="80" width="170" height="90" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="735" y="110" fill="#F7F8FA" fontFamily="monospace" fontSize="12" fontWeight="bold">LOCAL DASHBOARD</text>
            <text x="735" y="132" fill="#7C8490" fontFamily="sans-serif" fontSize="11">Reactive React UI</text>
            <text x="735" y="150" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Operator Console</text>
          </g>

          {/* Governance Label Underlay */}
          <rect x="30" y="220" width="860" height="40" rx="4" fill="#0B0D10" stroke="#20242B" strokeWidth="1" />
          <text x="50" y="245" fill="#7C8490" fontFamily="monospace" fontSize="11">
            GOVERNANCE BASELINE // EXPLICIT DEFENSIVE BOUNDARIES · STRICT AUDIT LOGGING · OPEN-SOURCE COMPLIANCE
          </text>
        </svg>
      </div>

      {/* Scope Disclaimer Callout */}
      <div style={{ backgroundColor: 'var(--agnex-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)', padding: '1.25rem' }}>
        <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: 'var(--agnex-steel-light)', lineHeight: 1.6 }}>
          Implementation started with a runnable local dashboard and API using defensive demonstration data. Governance, requirements, and architecture continue alongside the foundation implementation.
        </p>
      </div>
    </div>
  );
}
