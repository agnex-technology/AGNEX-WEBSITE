import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AgnexXSymbolProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export default function AgnexXSymbol({ size = 280, className = '' }: AgnexXSymbolProps) {
  const beam1Ref = useRef<SVGPathElement>(null);
  const beam2Ref = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (beam1Ref.current) {
        gsap.fromTo(
          beam1Ref.current,
          { strokeDashoffset: 181 * 0.8, opacity: 0.8 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.1, ease: 'power2.out' }
        );
      }

      if (beam2Ref.current) {
        gsap.fromTo(
          beam2Ref.current,
          { strokeDashoffset: 181 * 0.8, opacity: 0.8 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.1, delay: 0.1, ease: 'power2.out' }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`agnex-x-symbol ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Subtle coordinate guide circles */}
        <circle cx="100" cy="100" r="90" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="48" stroke="rgba(5, 122, 239, 0.15)" strokeWidth="1" />

        {/* Diagonal 1: Engineering Beam (Top-Left to Bottom-Right) */}
        <path
          ref={beam1Ref}
          d="M 36 36 L 164 164"
          stroke="#F7F8FA"
          strokeWidth="8"
          strokeLinecap="square"
          strokeDasharray="181"
        />

        {/* Diagonal 2: Next Beam (Top-Right to Bottom-Left) */}
        <path
          ref={beam2Ref}
          d="M 164 36 L 36 164"
          stroke="#7C8490"
          strokeWidth="8"
          strokeLinecap="square"
          strokeDasharray="181"
        />

        {/* Core Intersection Hub */}
        <circle cx="100" cy="100" r="14" fill="#0B0D10" stroke="#057AEF" strokeWidth="2.5" />
        <circle cx="100" cy="100" r="4" fill="#F7F8FA" />

        {/* Forward Arrow Indicator inside the X axis */}
        <path d="M 100 100 L 140 100" stroke="#057AEF" strokeWidth="2" strokeDasharray="2 2" />
        <polygon points="140,96 148,100 140,104" fill="#057AEF" />

        {/* Architectural Calibration Reticles */}
        <line x1="100" y1="18" x2="100" y2="28" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <line x1="100" y1="172" x2="100" y2="182" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <line x1="18" y1="100" x2="28" y2="100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <line x1="172" y1="100" x2="182" y2="100" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
      </svg>
    </div>
  );
}
