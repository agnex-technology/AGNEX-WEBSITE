import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ==========================================================================
   01. TEXT REVEAL (ARCHITECTURAL MASKED REVEAL)
   ========================================================================== */
export interface TextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof typeof motion;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  delay = 0,
  duration = 0.65,
  className = '',
  as = 'div'
}) => {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as as 'div'];

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div style={{ overflow: 'hidden', display: 'block' }} className={className}>
      <MotionComponent
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1] // Apple/Linear smooth exponential deceleration
        }}
      >
        {children}
      </MotionComponent>
    </div>
  );
};

/* ==========================================================================
   02. FADE REVEAL (SUBTLE 12PX SHIFT)
   ========================================================================== */
export interface FadeRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  style?: React.CSSProperties;
}

export const FadeReveal: React.FC<FadeRevealProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  className = '',
  style = {}
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const offset = 14;
  const initialOffset = {
    up: { y: offset, x: 0 },
    down: { y: -offset, x: 0 },
    left: { x: offset, y: 0 },
    right: { x: -offset, y: 0 },
    none: { x: 0, y: 0 }
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0, 0, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/* ==========================================================================
   03. LINE REVEAL (HAIRLINE EXPANSION)
   ========================================================================== */
export interface LineRevealProps {
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
  withNode?: boolean;
}

export const LineReveal: React.FC<LineRevealProps> = ({
  color = 'var(--agnex-blue)',
  delay = 0.1,
  duration = 0.8,
  className = '',
  withNode = true
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: color,
          position: 'relative'
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '1px',
        overflow: 'visible'
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color,
          transformOrigin: 'left'
        }}
      />
      {withNode && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + duration * 0.85 }}
          style={{
            position: 'absolute',
            left: '100%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: color
          }}
        />
      )}
    </div>
  );
};

/* ==========================================================================
   04. STAGGER CONTAINER
   ========================================================================== */
export interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  className = '',
  style = {}
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.2, 0, 0, 1] }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
