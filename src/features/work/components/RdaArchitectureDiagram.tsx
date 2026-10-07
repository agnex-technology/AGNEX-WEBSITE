import { useState } from 'react';

export default function RdaArchitectureDiagram() {
  const [activeState, setActiveState] = useState<'ALL' | 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>('ALL');

  const states = [
    { id: 'PENDING', label: '01 / PENDING', desc: 'Lorry owner creates booking with route, cargo weight & vehicle specs. Broadcast to verified drivers.' },
    { id: 'CONFIRMED', label: '02 / CONFIRMED', desc: 'Driver accepts; automated license check passes; security deposit locked in escrow ledger.' },
    { id: 'IN_PROGRESS', label: '03 / IN_PROGRESS', desc: 'Driver check-in at pickup; trip milestone events logged with timestamped status.' },
    { id: 'COMPLETED', label: '04 / COMPLETED', desc: 'Consignment delivered; automated wallet settlement; mutual ratings unlocked.' },
    { id: 'CANCELLED', label: 'ALT / CANCELLED', desc: 'Pre-trip cancellation branch with automated penalty/refund rules executed atomically.' }
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
      {/* Visual System Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)', letterSpacing: '0.08em' }}>
            SYSTEM TOPOLOGY & STATE MACHINE
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--agnex-white)' }}>
            RDA Multi-Tier Architecture & Booking Lifecycle
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(['ALL', 'PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setActiveState(s)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                padding: '0.25rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                border: activeState === s ? '1px solid var(--agnex-accent)' : '1px solid var(--border-color)',
                backgroundColor: activeState === s ? 'var(--agnex-accent-subtle)' : 'var(--agnex-base)',
                color: activeState === s ? 'var(--agnex-white)' : 'var(--agnex-steel)',
                cursor: 'pointer',
                transition: 'all 150ms ease'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Architecture Diagram */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 920 380"
          style={{ width: '100%', minWidth: '760px', height: 'auto', display: 'block' }}
          role="img"
          aria-label="RDA 3-Tier Distributed Architecture Diagram"
        >
          <defs>
            <linearGradient id="rda-blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
            </marker>
          </defs>

          {/* Tier 1: Clients */}
          <g>
            <rect x="30" y="30" width="240" height="70" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="50" y="58" fill="#F7F8FA" fontFamily="monospace" fontSize="13" fontWeight="bold">DRIVER MOBILE APP</text>
            <text x="50" y="78" fill="#7C8490" fontFamily="sans-serif" fontSize="11">Flutter (iOS/Android) · GPS Node</text>

            <rect x="340" y="30" width="240" height="70" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="360" y="58" fill="#F7F8FA" fontFamily="monospace" fontSize="13" fontWeight="bold">OWNER MOBILE APP</text>
            <text x="360" y="78" fill="#7C8490" fontFamily="sans-serif" fontSize="11">Fleet Dispatcher · Wallet Access</text>

            <rect x="650" y="30" width="240" height="70" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1.5" />
            <text x="670" y="58" fill="#F7F8FA" fontFamily="monospace" fontSize="13" fontWeight="bold">ADMIN WEB PORTAL</text>
            <text x="670" y="78" fill="#7C8490" fontFamily="sans-serif" fontSize="11">React + Vite · Audit & Verifications</text>
          </g>

          {/* Connectors Down to API Edge */}
          <path d="M 150 100 L 150 140 L 460 140" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M 460 100 L 460 150" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <path d="M 770 100 L 770 140 L 460 140" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2" />

          {/* Tier 2: Edge Layer & Auth */}
          <g>
            <rect x="220" y="150" width="480" height="50" rx="4" fill="#1A1F26" stroke="#3B82F6" strokeWidth="1" />
            <text x="240" y="180" fill="#F7F8FA" fontFamily="monospace" fontSize="12" fontWeight="bold">
              API GATEWAY & EDGE SECURITY // JWT VALIDATION · RBAC GUARDS · RATE LIMITS
            </text>
          </g>

          <path d="M 460 200 L 460 230" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Tier 3: Core Application Services */}
          <g>
            <rect x="30" y="230" width="160" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="45" y="255" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">Auth & Identity</text>
            <text x="45" y="275" fill="#7C8490" fontFamily="sans-serif" fontSize="10">JWT + Phone OTP</text>

            <rect x="210" y="230" width="160" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="225" y="255" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">Fleet Registry</text>
            <text x="225" y="275" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Licenses & Vehicles</text>

            <rect x="390" y="230" width="170" height="60" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="405" y="255" fill="#3B82F6" fontFamily="monospace" fontSize="11" fontWeight="bold">Booking Orchestrator</text>
            <text x="405" y="275" fill="#7C8490" fontFamily="sans-serif" fontSize="10">State Machine Mutex</text>

            <rect x="580" y="230" width="150" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="595" y="255" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">Wallet & Ledger</text>
            <text x="595" y="275" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Atomic Balances</text>

            <rect x="750" y="230" width="140" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="765" y="255" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">AI Support</text>
            <text x="765" y="275" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Gemini Triage</text>
          </g>

          {/* Tier 4: Storage */}
          <path d="M 460 290 L 460 320" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
          <g>
            <rect x="180" y="320" width="260" height="45" rx="4" fill="#0B0D10" stroke="#20242B" strokeWidth="1" />
            <text x="200" y="347" fill="#F7F8FA" fontFamily="monospace" fontSize="11">PostgreSQL + PostGIS (Spatial)</text>

            <rect x="470" y="320" width="180" height="45" rx="4" fill="#0B0D10" stroke="#20242B" strokeWidth="1" />
            <text x="490" y="347" fill="#F7F8FA" fontFamily="monospace" fontSize="11">Redis (Locks & Queues)</text>

            <rect x="680" y="320" width="180" height="45" rx="4" fill="#0B0D10" stroke="#20242B" strokeWidth="1" />
            <text x="700" y="347" fill="#F7F8FA" fontFamily="monospace" fontSize="11">Cloudinary (Docs)</text>
          </g>
        </svg>
      </div>

      {/* Booking State Machine Interactive Walkthrough */}
      <div style={{ backgroundColor: 'var(--agnex-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)', padding: '1.25rem' }}>
        <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--agnex-steel)', marginBottom: '1rem', textTransform: 'uppercase' }}>
          DETERMINISTIC BOOKING LIFECYCLE STATES
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {states.map((st) => {
            const isSelected = activeState === 'ALL' || activeState === st.id;
            return (
              <div
                key={st.id}
                onClick={() => setActiveState(st.id as any)}
                style={{
                  padding: '0.875rem',
                  borderRadius: 'var(--radius-xs)',
                  border: isSelected ? '1px solid var(--agnex-accent)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'rgba(37, 99, 235, 0.08)' : 'var(--agnex-base-raised)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, color: isSelected ? 'var(--agnex-accent)' : 'var(--agnex-white)', marginBottom: '0.35rem' }}>
                  {st.label}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.45 }}>
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
