import React, { useState } from 'react';

export default function SkynetArchitectureDiagram() {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const pipelineStages = [
    { num: '01', title: 'ENDPOINT AGENTS', tech: 'Windows C++ / Android', desc: 'Secure mTLS streaming of process, network, and memory events without user-space latency.' },
    { num: '02', title: 'INGESTION & BUFFER', tech: 'FastAPI + ClickHouse', desc: 'Columnar append-only streaming ingestion absorbing thousands of events/sec.' },
    { num: '03', title: 'DETECTION & MITRE', tech: 'Correlation Rules', desc: 'Real-time rule engine maps telemetry against MITRE ATT&CK enterprise tactics and indicators.' },
    { num: '04', title: 'AI / RAG SYNTHESIS', tech: 'LLM + Evidence RAG', desc: 'Retrieves relevant host telemetry and generates verifiable hypotheses with direct citations.' },
    { num: '05', title: 'HUMAN-IN-THE-LOOP', tech: 'SOC Operator Gate', desc: 'Mandatory human approval gate for destructive actions (host quarantine, process kill).' },
    { num: '06', title: 'SOAR CONTAINMENT', tech: 'n8n & Agent Dispatch', desc: 'Deterministic containment playbooks execute across affected endpoints within seconds.' },
    { num: '07', title: 'SIGNED AUDIT LEDGER', tech: 'HMAC Cryptographic Hash', desc: 'Immutable, tamper-evident audit record generated for legal forensics and compliance.' }
  ];

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
      {/* Principle Banner */}
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
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)', letterSpacing: '0.08em' }}>
            SOC & XDR PIPELINE TOPOLOGY
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--agnex-white)' }}>
            SKYNET v5.0 Telemetry, AI Triage & Signed Response Chain
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
          PRINCIPLE: <span style={{ color: 'var(--agnex-white)', fontWeight: 600 }}>Automation where appropriate. Human control where it matters.</span>
        </div>
      </div>

      {/* Architecture SVG Flow */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 980 260"
          style={{ width: '100%', minWidth: '820px', height: 'auto', display: 'block' }}
          role="img"
          aria-label="SKYNET v5.0 SOC & XDR Telemetry and Response Pipeline"
        >
          <defs>
            <marker id="skynet-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
            </marker>
          </defs>

          {/* Pipeline Nodes */}
          {pipelineStages.map((stage, idx) => {
            const x = 20 + idx * 135;
            const isHighlighted = selectedPhase === null || selectedPhase === idx;

            return (
              <g key={stage.num} onClick={() => setSelectedPhase(idx)} style={{ cursor: 'pointer' }}>
                <rect
                  x={x}
                  y={40}
                  width={120}
                  height={130}
                  rx={4}
                  fill={isHighlighted ? '#13161B' : '#0B0D10'}
                  stroke={idx === 4 ? '#EAB308' : isHighlighted ? '#2563EB' : '#20242B'}
                  strokeWidth={idx === 4 || selectedPhase === idx ? 2 : 1}
                />
                {/* Stage number */}
                <text x={x + 12} y={65} fill="#7C8490" fontFamily="monospace" fontSize="10" fontWeight="bold">
                  {stage.num}
                </text>
                {/* Node Title */}
                <text x={x + 12} y={88} fill="#F7F8FA" fontFamily="monospace" fontSize="10" fontWeight="bold">
                  {stage.title.split(' ')[0]}
                </text>
                <text x={x + 12} y={102} fill="#F7F8FA" fontFamily="monospace" fontSize="10" fontWeight="bold">
                  {stage.title.split(' ').slice(1).join(' ')}
                </text>
                {/* Tech badge */}
                <text x={x + 12} y={135} fill="#3B82F6" fontFamily="sans-serif" fontSize="9">
                  {stage.tech}
                </text>

                {/* Arrow to next node */}
                {idx < pipelineStages.length - 1 && (
                  <path
                    d={`M ${x + 120} 105 L ${x + 135} 105`}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="1.5"
                    markerEnd="url(#skynet-arrow)"
                  />
                )}
              </g>
            );
          })}

          {/* Operator Console and Event Bus Underlay */}
          <rect x={20} y={190} width={925} height={45} rx={4} fill="#111419" stroke="#20242B" strokeWidth="1" />
          <text x={40} y={217} fill="#7C8490" fontFamily="monospace" fontSize="11">
            REAL-TIME EVENT BUS // WEBSOCKET BROADCASTS · MITRE ATT&CK HEATMAP · CLICKHOUSE RETRIEVAL POOL · MUTUAL TLS
          </text>
        </svg>
      </div>

      {/* Interactive Detail Box */}
      <div style={{ backgroundColor: 'var(--agnex-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)', padding: '1.25rem' }}>
        <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-steel)', marginBottom: '0.75rem' }}>
          {selectedPhase !== null ? `STAGE ${pipelineStages[selectedPhase].num} DETAILS` : 'SELECT ANY PIPELINE STAGE FOR DEEP TELEMETRY CONTEXT'}
        </div>

        <div style={{ color: 'var(--agnex-white)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
          {selectedPhase !== null ? (
            <div>
              <strong style={{ color: 'var(--agnex-accent)' }}>{pipelineStages[selectedPhase].title}: </strong>
              {pipelineStages[selectedPhase].desc}
            </div>
          ) : (
            'Click on any stage above to inspect its execution criteria, telemetry grounding, and audit guarantee.'
          )}
        </div>
      </div>
    </div>
  );
}
