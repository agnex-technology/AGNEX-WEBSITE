// AGNEX Technology — AI Slop Website Auditor
// Interactive Transparent Score Card Component

import React from 'react';
import { TransparentScore } from '../types';

interface ScoreCardProps {
  scoreData: TransparentScore;
  onClick: () => void;
  isInverse?: boolean; // For AI Slop Risk where lower is better
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ scoreData, onClick, isInverse = false }) => {
  const { score, label, category, summary } = scoreData;

  // Determine color based on whether lower or higher is better
  let statusColor = '#00E5FF';
  let badgeText = 'Good';

  if (isInverse) {
    // Slop Risk: <30 Low Risk (green/cyan), 30-59 Moderate (amber), >=60 High Risk (red/coral)
    if (score < 30) {
      statusColor = '#10B981';
      badgeText = 'Low Risk';
    } else if (score < 60) {
      statusColor = '#F59E0B';
      badgeText = 'Moderate Risk';
    } else {
      statusColor = '#EF4444';
      badgeText = 'High Slop Risk';
    }
  } else {
    // Standard: >=80 Strong (green/cyan), 60-79 Moderate (amber), <60 Weak (coral)
    if (score >= 80) {
      statusColor = '#00E5FF';
      badgeText = 'Exemplary';
    } else if (score >= 60) {
      statusColor = '#F59E0B';
      badgeText = 'Needs Work';
    } else {
      statusColor = '#EF4444';
      badgeText = 'Critical Deficit';
    }
  }

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View detailed scoring breakdown for ${label}. Current score: ${score} out of 100.`}
      style={{
        backgroundColor: 'var(--agnex-base-raised, #12151B)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '1.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'left'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = statusColor;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.75rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              color: 'var(--agnex-steel, #7C8490)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.2rem 0.55rem',
              borderRadius: '999px',
              backgroundColor: `${statusColor}18`,
              color: statusColor,
              border: `1px solid ${statusColor}40`
            }}
          >
            {badgeText}
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'var(--agnex-white, #F7F8FA)',
            margin: '0 0 0.5rem 0'
          }}
        >
          {label}
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.4rem',
            marginBottom: '0.75rem'
          }}
        >
          <span
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1,
              color: statusColor,
              fontFamily: 'var(--font-mono, monospace)'
            }}
          >
            {score}
          </span>
          <span style={{ color: 'var(--agnex-steel, #7C8490)', fontSize: '0.875rem' }}>/ 100</span>
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--agnex-steel, #7C8490)',
            lineHeight: 1.45,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {summary}
        </p>
      </div>

      <div
        style={{
          marginTop: '1.25rem',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: 'var(--agnex-accent, #00E5FF)',
          fontWeight: 600
        }}
      >
        <span>Inspect score breakdown</span>
        <span>→</span>
      </div>
    </div>
  );
};
