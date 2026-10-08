export default function BrandPhilosophySection() {
  return (
    <section
      className="agnex-section brand-philosophy-section"
      style={{
        backgroundColor: 'var(--agnex-base-raised)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative'
      }}
    >
      <div className="agnex-container">
        <div
          style={{
            maxWidth: '1040px',
            margin: '0 auto'
          }}
        >
          {/* Coordinates Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.5rem',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '1rem'
            }}
          >
            <div className="agnex-badge">
              Core Creative Directive
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                color: 'var(--agnex-steel)'
              }}
            >
              LOC: [TECH × PEOPLE × IDEAS] // VECTOR: FORWARD
            </div>
          </div>

          {/* Master Statement */}
          <h2
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: 'var(--tracking-tight)',
              color: 'var(--agnex-white)',
              marginBottom: '2rem'
            }}
          >
            "Technology is only useful when it moves you forward."
          </h2>

          {/* High-Signal Technical Editorial Copy (BLUF) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'start'
            }}
          >
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--agnex-white)',
                lineHeight: 1.6,
                margin: 0,
                fontWeight: 500
              }}
            >
              We reject vanity aesthetics, buzzword-heavy roadmaps, and software engineered to look complex instead of functioning reliably. At AGNEX, our commitment is simple: ideas, engineered into impact.
            </p>

            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                margin: 0
              }}
            >
              We blueprint, build, and evolve digital foundations that solve concrete operational bottlenecks. When systems connect reliably without synchronization failures, teams reclaim cognitive focus, latency collapses, and businesses scale without fragility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
