import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface BlueSignalProps {
  variant?: 'horizontal' | 'vertical' | 'connector' | 'branching';
  width?: number | string;
  height?: number | string;
  color?: string;
  animated?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const BlueSignal: React.FC<BlueSignalProps> = ({
  variant = 'horizontal',
  width = '100%',
  height = 40,
  color = 'var(--agnex-blue)',
  animated = true,
  className = '',
  style = {}
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (variant === 'horizontal') {
    return (
      <div
        className={`blue-signal-horizontal ${className}`}
        style={{
          width,
          height: '24px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          ...style
        }}
      >
        <svg
          width="100%"
          height="24"
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle background track */}
          <line x1="0" y1="12" x2="400" y2="12" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />
          
          {/* Active Blue Signal Line */}
          {shouldReduceMotion || !animated ? (
            <line x1="0" y1="12" x2="400" y2="12" stroke={color} strokeWidth="1.5" />
          ) : (
            <motion.line
              x1="0"
              y1="12"
              x2="400"
              y2="12"
              stroke={color}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Forward Soaring Signal Pulse / Node */}
          <circle cx="396" cy="12" r="3" fill={color} />
        </svg>
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div
        className={`blue-signal-vertical ${className}`}
        style={{
          width: '24px',
          height,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          ...style
        }}
      >
        <svg
          width="24"
          height="100%"
          viewBox="0 0 24 300"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" y1="0" x2="12" y2="300" stroke="rgba(12, 28, 41, 0.08)" strokeWidth="1" />
          {shouldReduceMotion || !animated ? (
            <line x1="12" y1="0" x2="12" y2="300" stroke={color} strokeWidth="1.5" />
          ) : (
            <motion.line
              x1="12"
              y1="0"
              x2="12"
              y2="300"
              stroke={color}
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
          <circle cx="12" cy="296" r="3" fill={color} />
        </svg>
      </div>
    );
  }

  // Branching / Connector Signal: travels from left, turns down, continues forward
  return (
    <div
      className={`blue-signal-branching ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        ...style
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 120"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Architectural grid marker */}
        <circle cx="20" cy="20" r="3" fill="var(--agnex-navy)" />
        <circle cx="200" cy="20" r="3" fill="var(--agnex-blue)" />
        <circle cx="400" cy="90" r="3" fill="var(--agnex-blue)" />
        <circle cx="580" cy="90" r="4" fill="var(--agnex-blue)" />

        {/* Gray blueprint backdrop */}
        <path
          d="M 20 20 L 200 20 L 240 60 L 400 90 L 580 90"
          stroke="rgba(12, 28, 41, 0.08)"
          strokeWidth="1"
        />

        {/* Animated Blue Signal */}
        {shouldReduceMotion || !animated ? (
          <path
            d="M 20 20 L 200 20 L 240 60 L 400 90 L 580 90"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <motion.path
            d="M 20 20 L 200 20 L 240 60 L 400 90 L 580 90"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
      </svg>
    </div>
  );
};
