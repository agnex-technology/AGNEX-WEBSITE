// AGNEX Technology — AI Slop Website Auditor
// Transparent Score Breakdown Modal Component

import React, { useEffect } from 'react';
import { TransparentScore } from '../types';

interface ScoreBreakdownModalProps {
  scoreData: TransparentScore | null;
  onClose: () => void;
}

export const ScoreBreakdownModal: React.FC<ScoreBreakdownModalProps> = ({ scoreData, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!scoreData) return null;

  const { score, label, category, summary, factors, positives, risks } = scoreData;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="score-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(11, 13, 16, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--agnex-base-raised, #12151B)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '12px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '1.25rem'
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                color: 'var(--agnex-accent, #00E5FF)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '0.35rem'
              }}
            >
              {category} · Scoring Methodology
            </div>
            <h2
              id="score-modal-title"
              style={{
                margin: 0,
                fontSize: '1.5rem',
                color: 'var(--agnex-white, #F7F8FA)',
                fontWeight: 600
              }}
            >
              {label} Breakdown
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                fontSize: '1.85rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--agnex-accent, #00E5FF)'
              }}
            >
              {score}
              <span style={{ fontSize: '0.9rem', color: 'var(--agnex-steel, #7C8490)' }}>/100</span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: 'var(--agnex-steel, #7C8490)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--agnex-steel, #7C8490)')}
            >
              ✕
            </button>
          </div>
        </div>

        {/* High-level Summary */}
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '6px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            color: 'var(--agnex-steel-light, #CBD5E1)',
            borderLeft: '3px solid var(--agnex-accent, #00E5FF)'
          }}
        >
          {summary}
        </div>

        {/* Weighted Factor Matrix */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--agnex-steel, #7C8490)',
              marginBottom: '0.75rem',
              fontFamily: 'var(--font-mono, monospace)'
            }}
          >
            Evaluated Sub-Factors & Weighting
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {factors.map((factor, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '6px'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.35rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--agnex-white, #F7F8FA)', fontSize: '0.9rem' }}>
                    {factor.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono, monospace)',
                        color: 'var(--agnex-steel, #7C8490)'
                      }}
                    >
                      Weight: {factor.weight}%
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '4px',
                        backgroundColor:
                          factor.impact === 'positive'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : factor.impact === 'negative'
                            ? 'rgba(239, 68, 68, 0.15)'
                            : 'rgba(255, 255, 255, 0.08)',
                        color:
                          factor.impact === 'positive'
                            ? '#10B981'
                            : factor.impact === 'negative'
                            ? '#EF4444'
                            : '#CBD5E1'
                      }}
                    >
                      {factor.impact.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--agnex-steel, #7C8490)', lineHeight: 1.4 }}>
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Positives & Detected Deficits */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {positives.length > 0 && (
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '6px'
              }}
            >
              <div
                style={{
                  color: '#10B981',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}
              >
                ✓ Detected Positive Signals
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                {positives.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {risks.length > 0 && (
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '6px'
              }}
            >
              <div
                style={{
                  color: '#EF4444',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}
              >
                ⚠ Detected Negative Risks
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.5 }}>
                {risks.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '1.75rem', textAlign: 'right' }}>
          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{
              padding: '0.5rem 1.25rem',
              fontSize: '0.85rem'
            }}
          >
            Close Breakdown
          </button>
        </div>
      </div>
    </div>
  );
};
