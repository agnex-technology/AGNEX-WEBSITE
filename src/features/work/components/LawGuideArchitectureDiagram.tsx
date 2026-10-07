
export default function LawGuideArchitectureDiagram() {
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
      {/* Mandatory Regulatory & Legal Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          backgroundColor: 'rgba(234, 179, 8, 0.08)',
          border: '1px solid rgba(234, 179, 8, 0.35)',
          borderRadius: 'var(--radius-xs)',
          padding: '1rem 1.25rem',
          marginBottom: '2rem'
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>⚖️</span>
        <div style={{ fontSize: 'var(--text-xs)', color: '#FDE047', lineHeight: 1.55 }}>
          <strong>MANDATORY LEGAL DISCLAIMER:</strong> LawGuide AI provides informational assistance, not legal advice. Users should consult a qualified lawyer before relying on any output or taking legal action.
        </div>
      </div>

      {/* Visual System Header */}
      <div
        style={{
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--agnex-accent)', letterSpacing: '0.08em' }}>
          DOCUMENT INTELLIGENCE & RAG PIPELINE
        </div>
        <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--agnex-white)' }}>
          Two-Stage Ingestion Worker & Grounded Semantic Retrieval
        </div>
      </div>

      {/* SVG Diagram: Document Processing Pipeline & RAG Research Flow */}
      <div style={{ width: '100%', overflowX: 'auto', marginBottom: '2rem' }}>
        <svg
          viewBox="0 0 940 360"
          style={{ width: '100%', minWidth: '780px', height: 'auto', display: 'block' }}
          role="img"
          aria-label="LawGuide AI Two-Stage Document Processing and RAG Architecture"
        >
          <defs>
            <marker id="lg-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#3B82F6" />
            </marker>
          </defs>

          {/* Pipeline A: Asynchronous Document Processing */}
          <g>
            <text x="30" y="30" fill="#7C8490" fontFamily="monospace" fontSize="11" fontWeight="bold">
              STAGE 1: ASYNCHRONOUS DOCUMENT INGESTION & VECTORIZATION
            </text>

            <rect x="30" y="50" width="130" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="45" y="75" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">PDF / BRIEF</text>
            <text x="45" y="95" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Judgments & Acts</text>

            <path d="M 160 80 L 190 80" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="190" y="50" width="140" height="60" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="205" y="75" fill="#3B82F6" fontFamily="monospace" fontSize="11" fontWeight="bold">BULLMQ QUEUE</text>
            <text x="205" y="95" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Redis 7 Task Broker</text>

            <path d="M 330 80 L 360 80" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="360" y="50" width="160" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="375" y="75" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">DOCUMENT WORKER</text>
            <text x="375" y="95" fill="#7C8490" fontFamily="sans-serif" fontSize="10">OCR & Section Chunker</text>

            <path d="M 520 80 L 550 80" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="550" y="50" width="160" height="60" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="565" y="75" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">GEMINI EMBEDDING</text>
            <text x="565" y="95" fill="#7C8490" fontFamily="sans-serif" fontSize="10">768-Dim Dense Vectors</text>

            <path d="M 710 80 L 740 80" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="740" y="50" width="160" height="60" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="755" y="75" fill="#3B82F6" fontFamily="monospace" fontSize="11" fontWeight="bold">PINECONE INDEX</text>
            <text x="755" y="95" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Indian Law Vector Store</text>
          </g>

          {/* Divider */}
          <line x1="30" y1="145" x2="900" y2="145" stroke="#20242B" strokeWidth="1" strokeDasharray="6 3" />

          {/* Pipeline B: Real-time RAG Query Flow */}
          <g>
            <text x="30" y="175" fill="#7C8490" fontFamily="monospace" fontSize="11" fontWeight="bold">
              STAGE 2: INTERACTIVE RESEARCH, VECTOR SEARCH & CITATION SYNTHESIS
            </text>

            <rect x="30" y="195" width="140" height="65" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="45" y="222" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">RESEARCH QUERY</text>
            <text x="45" y="242" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Practitioner / Student</text>

            <path d="M 170 227 L 200 227" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="200" y="195" width="160" height="65" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="215" y="222" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">NEXT.JS + NEXTAUTH</text>
            <text x="215" y="242" fill="#7C8490" fontFamily="sans-serif" fontSize="10">RBAC & History Session</text>

            <path d="M 360 227 L 390 227" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="390" y="195" width="180" height="65" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="405" y="222" fill="#3B82F6" fontFamily="monospace" fontSize="11" fontWeight="bold">RAG ORCHESTRATOR</text>
            <text x="405" y="242" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Cosine Similarity Matching</text>

            <path d="M 570 227 L 600 227" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="600" y="195" width="160" height="65" rx="4" fill="#13161B" stroke="#20242B" strokeWidth="1" />
            <text x="615" y="222" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">GOOGLE GEMINI</text>
            <text x="615" y="242" fill="#7C8490" fontFamily="sans-serif" fontSize="10">Contextual Reasoning</text>

            <path d="M 760 227 L 790 227" fill="none" stroke="#3B82F6" strokeWidth="1.5" markerEnd="url(#lg-arrow)" />

            <rect x="790" y="195" width="130" height="65" rx="4" fill="#13161B" stroke="#2563EB" strokeWidth="1.5" />
            <text x="805" y="222" fill="#F7F8FA" fontFamily="monospace" fontSize="11" fontWeight="bold">LEGAL BRIEF</text>
            <text x="805" y="242" fill="#7C8490" fontFamily="sans-serif" fontSize="10">With Cited Sources</text>
          </g>

          {/* Bottom Metastore Node */}
          <rect x="200" y="295" width="560" height="45" rx="4" fill="#0B0D10" stroke="#20242B" strokeWidth="1" />
          <text x="220" y="322" fill="#7C8490" fontFamily="monospace" fontSize="11">
            POSTGRESQL + PRISMA METASTORE // USER PROFILES · RESEARCH FOLDERS · AUDIT LOG OF PROMPTS
          </text>
        </svg>
      </div>

      {/* Structural Capabilities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div style={{ backgroundColor: 'var(--agnex-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)', padding: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
            01 / DOCUMENT CHUNKING
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Legal briefs are parsed into statutory sections rather than arbitrary token boundaries, preserving judicial context.
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--agnex-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)', padding: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
            02 / GROUNDED CITATIONS
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Every legal assertion generated by the LLM is anchored by direct paragraph links to indexed court decisions.
          </div>
        </div>

        <div style={{ backgroundColor: 'var(--agnex-base)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xs)', padding: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--agnex-accent)', marginBottom: '0.25rem' }}>
            03 / QUEUE RESILIENCE
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Heavy PDF parsing and embedding jobs run out-of-band via BullMQ workers, preventing UI thread freezes.
          </div>
        </div>
      </div>
    </div>
  );
}
