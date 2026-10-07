import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HeroEngineeringSystemProps {
  onSequenceComplete?: () => void;
}

export default function HeroEngineeringSystem({ onSequenceComplete }: HeroEngineeringSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          if (onSequenceComplete) onSequenceComplete();
        }
      });

      // 1. Blueprint coordinate grid establishes
      tl.fromTo(
        '.eng-grid-line',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.05 }
      );

      // 2. Structural bus paths draw from left toward convergence
      tl.fromTo(
        '.eng-bus-path',
        { strokeDashoffset: 600, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.1, stagger: 0.15 },
        '-=0.3'
      );

      // 3. Technical anchors & coordinate labels appear
      tl.fromTo(
        '.eng-node-dot, .eng-label',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06 },
        '-=0.5'
      );

      // 4. The intersection hub resolves & blue forward vector fires
      tl.fromTo(
        '.eng-forward-vector',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(
        '.eng-status-pulse',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
    }, containerRef);

    // Subtle cursor instrumentation tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseOffset({ x: relX * 6, y: relY * 6 });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onSequenceComplete]);

  return (
    <div
      ref={containerRef}
      className="hero-engineering-system"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '640px',
        margin: '0 auto',
        aspectRatio: '680 / 440'
      }}
      aria-label="AGNEX Structured Engineering System Visualization"
      role="img"
    >
      <svg
        viewBox="0 0 680 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          overflow: 'visible'
        }}
      >
        {/* Subtle Architectural Coordinate Grid */}
        <g className="eng-grid-line" opacity="0.85">
          <line x1="40" y1="40" x2="640" y2="40" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />
          <line x1="40" y1="220" x2="640" y2="220" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="400" x2="640" y2="400" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />

          <line x1="40" y1="40" x2="40" y2="400" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />
          <line x1="280" y1="40" x2="280" y2="400" stroke="rgba(12, 28, 41, 0.06)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="440" y1="40" x2="440" y2="400" stroke="rgba(12, 28, 41, 0.06)" strokeWidth="1" strokeDasharray="2 4" />
          <line x1="640" y1="40" x2="640" y2="400" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />

          {/* Precision Annotations */}
          <text x="44" y="30" fill="#627D98" fontSize="10" fontFamily="'JetBrains Mono', monospace">SYS.ORIGIN [0,0]</text>
          <text x="444" y="30" fill="#627D98" fontSize="10" fontFamily="'JetBrains Mono', monospace">INTERSECTION_NODE</text>
          <text x="560" y="30" fill="#017AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">VECTOR → NEXT</text>
        </g>

        {/* Dynamic Micro-Parallax Layer based on cursor */}
        <g transform={`translate(${mouseOffset.x}, ${mouseOffset.y})`}>
          {/* ─── BUS 01: TECHNOLOGY (Top line converging down) ─── */}
          <g>
            <text x="44" y="112" fill="#0C1C29" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600" className="eng-label">
              01 / TECHNOLOGY
            </text>
            <path
              d="M 40 120 L 360 120 L 440 220"
              stroke="rgba(12, 28, 41, 0.12)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 40 120 L 360 120 L 440 220"
              stroke="#0C1C29"
              strokeWidth="2"
              strokeDasharray="600"
              strokeDashoffset="600"
              className="eng-bus-path"
              fill="none"
            />
            <circle cx="40" cy="120" r="3.5" fill="#017AEF" className="eng-node-dot" />
            <circle cx="360" cy="120" r="3" fill="#0C1C29" className="eng-node-dot" />
          </g>

          {/* ─── BUS 02: PEOPLE (Center line direct to intersection) ─── */}
          <g>
            <text x="44" y="212" fill="#0C1C29" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600" className="eng-label">
              02 / PEOPLE
            </text>
            <path
              d="M 40 220 L 440 220"
              stroke="rgba(12, 28, 41, 0.12)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 40 220 L 440 220"
              stroke="#0C1C29"
              strokeWidth="2"
              strokeDasharray="600"
              strokeDashoffset="600"
              className="eng-bus-path"
              fill="none"
            />
            <circle cx="40" cy="220" r="3.5" fill="#017AEF" className="eng-node-dot" />
          </g>

          {/* ─── BUS 03: IDEAS (Bottom line converging up) ─── */}
          <g>
            <text x="44" y="312" fill="#0C1C29" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="600" className="eng-label">
              03 / IDEAS
            </text>
            <path
              d="M 40 320 L 360 320 L 440 220"
              stroke="rgba(12, 28, 41, 0.12)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 40 320 L 360 320 L 440 220"
              stroke="#0C1C29"
              strokeWidth="2"
              strokeDasharray="600"
              strokeDashoffset="600"
              className="eng-bus-path"
              fill="none"
            />
            <circle cx="40" cy="320" r="3.5" fill="#017AEF" className="eng-node-dot" />
            <circle cx="360" cy="320" r="3" fill="#0C1C29" className="eng-node-dot" />
          </g>

          {/* ─── INTERSECTION HUB (THE 'X' CONVERGENCE) ─── */}
          <g transform="translate(440, 220)">
            <rect
              x="-28"
              y="-28"
              width="56"
              height="56"
              fill="#FFFFFF"
              stroke="#0C1C29"
              strokeWidth="1.5"
              className="eng-grid-line"
            />
            
            {/* Precision corner markers */}
            <line x1="-28" y1="-28" x2="-22" y2="-28" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="-28" y1="-28" x2="-28" y2="-22" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="28" y1="-28" x2="22" y2="-28" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="28" y1="-28" x2="28" y2="-22" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="-28" y1="28" x2="-22" y2="28" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="-28" y1="28" x2="-28" y2="22" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="28" y1="28" x2="22" y2="28" stroke="#017AEF" strokeWidth="1.5" />
            <line x1="28" y1="28" x2="28" y2="22" stroke="#017AEF" strokeWidth="1.5" />

            {/* Central Intersection X Geometry */}
            <line x1="-12" y1="-12" x2="12" y2="12" stroke="#0C1C29" strokeWidth="2.5" strokeLinecap="square" />
            <line x1="12" y1="-12" x2="-12" y2="12" stroke="#0C1C29" strokeWidth="2.5" strokeLinecap="square" />

            {/* Core Reticle */}
            <circle cx="0" cy="0" r="4" fill="#017AEF" />
          </g>

          {/* ─── FORWARD OUTPUT VECTOR (PROGRESS / NEXT) ─── */}
          <g className="eng-forward-vector">
            {/* Horizontal trajectory out of intersection */}
            <line x1="468" y1="220" x2="590" y2="220" stroke="#017AEF" strokeWidth="3" />
            
            {/* Forward Arrow Geometry */}
            <polygon
              points="590,210 614,220 590,230"
              fill="#017AEF"
            />

            {/* Telemetry Output Box */}
            <g transform="translate(480, 240)">
              <rect x="0" y="0" width="134" height="24" fill="#FFFFFF" stroke="#017AEF" strokeWidth="1" />
              <text x="8" y="16" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600" letterSpacing="0.05em">
                EXECUTION → IMPACT
              </text>
            </g>
          </g>
        </g>

        {/* Status Coordinate Ledger at Bottom */}
        <g className="eng-status-pulse" opacity="0.9">
          <text x="44" y="388" fill="#627D98" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            ENGINEERING_STATUS:
          </text>
          <text x="175" y="388" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            DETERMINISTIC
          </text>
          <text x="300" y="388" fill="#627D98" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            INTERSECTION:
          </text>
          <text x="395" y="388" fill="#0C1C29" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            TECH × PEOPLE × IDEAS
          </text>
          <text x="560" y="388" fill="#017AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            VECTOR: FORWARD
          </text>
        </g>
      </svg>
    </div>
  );
}
