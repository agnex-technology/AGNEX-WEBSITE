import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroEngineeringSystemProps {
  onSequenceComplete?: () => void;
}

export default function HeroEngineeringSystem({ onSequenceComplete }: HeroEngineeringSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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

      // 1. Grid coordinates & structural frames establish
      tl.fromTo(
        '.eng-grid-line',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, stagger: 0.05 }
      );

      // 2. Bus lines draw from left towards convergence
      tl.fromTo(
        '.eng-bus-path',
        { strokeDashoffset: 600, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 1.1, stagger: 0.15 },
        '-=0.3'
      );

      // 3. Technical node anchors & labels appear
      tl.fromTo(
        '.eng-node-dot, .eng-label',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06 },
        '-=0.5'
      );

      // 4. The intersection & forward arrow vector activates
      tl.fromTo(
        '.eng-forward-vector',
        { x: -16, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.2'
      );

      tl.fromTo(
        '.eng-status-pulse',
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Rest state: subtle ambient resting state, not aggressive motion
    }, containerRef);

    return () => ctx.revert();
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
        ref={svgRef}
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
        {/* Architectural Background Grid & Coordinates */}
        <g className="eng-grid-line" opacity="0.3">
          <line x1="40" y1="40" x2="640" y2="40" stroke="#20242B" strokeWidth="1" />
          <line x1="40" y1="220" x2="640" y2="220" stroke="#20242B" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="40" y1="400" x2="640" y2="400" stroke="#20242B" strokeWidth="1" />

          <line x1="40" y1="40" x2="40" y2="400" stroke="#20242B" strokeWidth="1" />
          <line x1="280" y1="40" x2="280" y2="400" stroke="#20242B" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
          <line x1="440" y1="40" x2="440" y2="400" stroke="#20242B" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
          <line x1="640" y1="40" x2="640" y2="400" stroke="#20242B" strokeWidth="1" />

          {/* Coordinate Marks */}
          <text x="44" y="32" fill="#4A515D" fontSize="10" fontFamily="'JetBrains Mono', monospace">SYS.ORIGIN [0,0]</text>
          <text x="444" y="32" fill="#4A515D" fontSize="10" fontFamily="'JetBrains Mono', monospace">INTERSECTION_NODE</text>
          <text x="560" y="32" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace">VECTOR → NEXT</text>
        </g>

        {/* ─── BUS 01: TECHNOLOGY (Top line converging down) ─── */}
        <g>
          {/* Label */}
          <text x="44" y="112" fill="#7C8490" fontSize="11" fontFamily="'JetBrains Mono', monospace" className="eng-label">
            01 / TECHNOLOGY
          </text>
          {/* Path: Horizontal then 45° angle down to intersection */}
          <path
            d="M 40 120 L 360 120 L 440 220"
            stroke="#2E343E"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 40 120 L 360 120 L 440 220"
            stroke="#F7F8FA"
            strokeWidth="2"
            strokeDasharray="600"
            strokeDashoffset="600"
            className="eng-bus-path"
            fill="none"
          />
          <circle cx="40" cy="120" r="3.5" fill="#7C8490" className="eng-node-dot" />
          <circle cx="360" cy="120" r="3" fill="#2E343E" className="eng-node-dot" />
        </g>

        {/* ─── BUS 02: PEOPLE (Center line direct to intersection) ─── */}
        <g>
          {/* Label */}
          <text x="44" y="212" fill="#7C8490" fontSize="11" fontFamily="'JetBrains Mono', monospace" className="eng-label">
            02 / PEOPLE
          </text>
          {/* Path: Direct horizontal axis */}
          <path
            d="M 40 220 L 440 220"
            stroke="#2E343E"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 40 220 L 440 220"
            stroke="#F7F8FA"
            strokeWidth="2"
            strokeDasharray="600"
            strokeDashoffset="600"
            className="eng-bus-path"
            fill="none"
          />
          <circle cx="40" cy="220" r="3.5" fill="#7C8490" className="eng-node-dot" />
        </g>

        {/* ─── BUS 03: IDEAS (Bottom line converging up) ─── */}
        <g>
          {/* Label */}
          <text x="44" y="312" fill="#7C8490" fontSize="11" fontFamily="'JetBrains Mono', monospace" className="eng-label">
            03 / IDEAS
          </text>
          {/* Path: Horizontal then 45° angle up to intersection */}
          <path
            d="M 40 320 L 360 320 L 440 220"
            stroke="#2E343E"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 40 320 L 360 320 L 440 220"
            stroke="#F7F8FA"
            strokeWidth="2"
            strokeDasharray="600"
            strokeDashoffset="600"
            className="eng-bus-path"
            fill="none"
          />
          <circle cx="40" cy="320" r="3.5" fill="#7C8490" className="eng-node-dot" />
          <circle cx="360" cy="320" r="3" fill="#2E343E" className="eng-node-dot" />
        </g>

        {/* ─── INTERSECTION HUB (THE 'X' CONVERGENCE) ─── */}
        <g transform="translate(440, 220)">
          {/* Hub geometric frame */}
          <rect
            x="-28"
            y="-28"
            width="56"
            height="56"
            fill="#12151B"
            stroke="#20242B"
            strokeWidth="1.5"
            className="eng-grid-line"
          />
          
          {/* Corner tick marks */}
          <line x1="-28" y1="-28" x2="-22" y2="-28" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="-28" y1="-28" x2="-28" y2="-22" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="28" y1="-28" x2="22" y2="-28" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="28" y1="-28" x2="28" y2="-22" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="-28" y1="28" x2="-22" y2="28" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="-28" y1="28" x2="-28" y2="22" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="28" y1="28" x2="22" y2="28" stroke="#7C8490" strokeWidth="1.5" />
          <line x1="28" y1="28" x2="28" y2="22" stroke="#7C8490" strokeWidth="1.5" />

          {/* Central Intersection X Geometry */}
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#F7F8FA" strokeWidth="2.5" strokeLinecap="square" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#F7F8FA" strokeWidth="2.5" strokeLinecap="square" />

          {/* Core Reticle */}
          <circle cx="0" cy="0" r="4" fill="#0B0D10" stroke="#057AEF" strokeWidth="2" />
        </g>

        {/* ─── FORWARD OUTPUT VECTOR (PROGRESS / NEXT) ─── */}
        <g className="eng-forward-vector">
          {/* Horizontal trajectory out of intersection */}
          <line x1="468" y1="220" x2="590" y2="220" stroke="#057AEF" strokeWidth="3" />
          
          {/* Official Forward Arrow Geometry */}
          <polygon
            points="590,210 610,220 590,230"
            fill="#057AEF"
          />

          {/* Telemetry Output Box */}
          <g transform="translate(480, 240)">
            <rect x="0" y="0" width="130" height="24" fill="#12151B" stroke="#20242B" strokeWidth="1" />
            <text x="8" y="16" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.05em">
              EXECUTION → IMPACT
            </text>
          </g>
        </g>

        {/* Status Coordinate Ledger at Bottom */}
        <g className="eng-status-pulse" opacity="0.8">
          <text x="44" y="388" fill="#4A515D" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            ENGINEERING_STATUS:
          </text>
          <text x="175" y="388" fill="#10B981" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            DETERMINISTIC
          </text>
          <text x="320" y="388" fill="#4A515D" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            INTERSECTION:
          </text>
          <text x="415" y="388" fill="#F7F8FA" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            TECH × PEOPLE × IDEAS
          </text>
          <text x="560" y="388" fill="#057AEF" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            VECTOR: FORWARD
          </text>
        </g>
      </svg>
    </div>
  );
}
