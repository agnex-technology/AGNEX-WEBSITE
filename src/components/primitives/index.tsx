import React, { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/* --- 01. CONTAINER --- */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'wide' | 'narrow';
  className?: string;
  children: React.ReactNode;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const classMap = {
      default: 'agnex-container',
      wide: 'agnex-container-wide',
      narrow: 'agnex-container-narrow'
    };
    return (
      <div ref={ref} className={`${classMap[variant]} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);
Container.displayName = 'Container';

/* --- 02. SECTION LABEL --- */
export interface SectionLabelProps {
  number?: string;
  label?: string;
  text?: string;
  className?: string;
  accentColor?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  number,
  label,
  text,
  className = '',
  accentColor
}) => {
  const displayLabel = label || text || '';
  return (
    <div
      className={`tech-label ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '1rem',
        color: accentColor || 'var(--agnex-blue)'
      }}
    >
      {number && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.05em'
          }}
        >
          [{number}]
        </span>
      )}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase'
        }}
      >
        {displayLabel}
      </span>
      <span
        style={{
          display: 'inline-block',
          width: '24px',
          height: '1px',
          backgroundColor: accentColor || 'var(--agnex-blue)'
        }}
      />
    </div>
  );
};

/* --- 03. TECHNICAL LABEL & COORDINATES --- */
export interface TechnicalLabelProps {
  code: string;
  detail?: string;
  status?: string;
  className?: string;
}

export const TechnicalLabel: React.FC<TechnicalLabelProps> = ({
  code,
  detail,
  status,
  className = ''
}) => {
  return (
    <div
      className={`tech-coord ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-muted)'
      }}
    >
      <span style={{ color: 'var(--agnex-blue)' }}>SYS//</span>
      <span>{code}</span>
      {detail && <span style={{ opacity: 0.7 }}>::{detail}</span>}
      {status && <span style={{ color: 'var(--agnex-blue)', fontWeight: 600 }}>[{status}]</span>}
    </div>
  );
};

/* --- 04. TECHNICAL LINE & DIVIDER --- */
export interface TechnicalLineProps {
  className?: string;
  withNode?: boolean;
  active?: boolean;
}

export const TechnicalLine: React.FC<TechnicalLineProps> = ({
  className = '',
  withNode = false,
  active = false
}) => {
  return (
    <div
      className={`technical-line ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '1px',
        backgroundColor: active ? 'var(--agnex-blue)' : 'var(--border-color)',
        transition: 'background-color 0.3s ease'
      }}
    >
      {withNode && (
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: active ? 'var(--agnex-blue)' : 'var(--agnex-navy)',
            transition: 'background-color 0.3s ease'
          }}
        />
      )}
    </div>
  );
};

/* --- 05. BUTTON --- */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  withArrow?: boolean;
  to?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', withArrow = false, to, className = '', children, ...props }, ref) => {
    const variantClass = variant === 'outline' ? 'secondary' : variant;
    const classNames = `btn btn-${variantClass} ${className}`;
    const content = (
      <>
        <span>{children}</span>
        {withArrow && <span className="btn-arrow" aria-hidden="true">→</span>}
      </>
    );

    if (to) {
      if (to.startsWith('http') || to.startsWith('mailto:')) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={to}
            className={classNames}
            target={to.startsWith('http') ? '_blank' : undefined}
            rel={to.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {content}
          </a>
        );
      }
      return (
        <RouterLink ref={ref as React.Ref<HTMLAnchorElement>} to={to} className={classNames}>
          {content}
        </RouterLink>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classNames} {...props}>
        {content}
      </button>
    );
  }
);
Button.displayName = 'Button';

/* --- 06. BADGE --- */
export interface BadgeProps {
  label: string;
  variant?: 'default' | 'accent' | 'outline';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  dot = false,
  className = ''
}) => {
  const isAccent = variant === 'accent';
  return (
    <span
      className={`agnex-badge ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: '0.25rem 0.65rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderRadius: 'var(--radius-xs)',
        border: `1px solid ${isAccent ? 'var(--agnex-blue)' : 'var(--border-strong)'}`,
        backgroundColor: isAccent ? 'var(--agnex-blue-pale)' : 'var(--agnex-canvas-subtle)',
        color: isAccent ? 'var(--agnex-blue)' : 'var(--agnex-navy)'
      }}
    >
      {dot && (
        <span
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: isAccent ? 'var(--agnex-blue)' : 'var(--agnex-navy)'
          }}
        />
      )}
      {label}
    </span>
  );
};

/* --- 07. TECHNICAL MARKER (ARCHITECTURAL CROSSHAIR) --- */
export interface TechnicalMarkerProps {
  label?: string;
  className?: string;
}

export const TechnicalMarker: React.FC<TechnicalMarkerProps> = ({ label, className = '' }) => {
  return (
    <div
      className={`tech-marker ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-3xs)',
        color: 'var(--text-muted)',
        letterSpacing: '0.05em'
      }}
    >
      <span style={{ color: 'var(--agnex-blue)', fontWeight: 600 }}>+</span>
      {label && <span>{label}</span>}
    </div>
  );
};

/* --- 08. SIGNAL NODE --- */
export interface SignalNodeProps {
  active?: boolean;
  size?: number;
  className?: string;
}

export const SignalNode: React.FC<SignalNodeProps> = ({
  active = true,
  size = 6,
  className = ''
}) => {
  return (
    <span
      className={`signal-node ${className}`}
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: active ? 'var(--agnex-blue)' : 'var(--agnex-navy)',
        boxShadow: active ? '0 0 0 2px var(--agnex-blue-pale)' : 'none',
        transition: 'all 0.25s ease'
      }}
    />
  );
};

/* --- 09. IMAGE FRAME (BLUEPRINT CORNER TICKS) --- */
export interface ImageFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const ImageFrame: React.FC<ImageFrameProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`agnex-image-frame ${className}`}
      style={{
        position: 'relative',
        backgroundColor: 'var(--agnex-canvas-subtle)',
        border: '1px solid var(--border-strong)',
        padding: '1px',
        overflow: 'hidden'
      }}
      {...props}
    >
      {/* Corner Ticks */}
      <span style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '6px', borderTop: '2px solid var(--agnex-blue)', borderLeft: '2px solid var(--agnex-blue)', zIndex: 2 }} />
      <span style={{ position: 'absolute', top: 0, right: 0, width: '6px', height: '6px', borderTop: '2px solid var(--agnex-blue)', borderRight: '2px solid var(--agnex-blue)', zIndex: 2 }} />
      <span style={{ position: 'absolute', bottom: 0, left: 0, width: '6px', height: '6px', borderBottom: '2px solid var(--agnex-blue)', borderLeft: '2px solid var(--agnex-blue)', zIndex: 2 }} />
      <span style={{ position: 'absolute', bottom: 0, right: 0, width: '6px', height: '6px', borderBottom: '2px solid var(--agnex-blue)', borderRight: '2px solid var(--agnex-blue)', zIndex: 2 }} />
      {children}
    </div>
  );
};
