// AGNEX Technology — AI Slop Website Auditor
// Categorized Engineering Recommendations Component

import React from 'react';
import { AuditRecommendation, IssuePriority } from '../types';

interface RecommendationsViewProps {
  recommendations: AuditRecommendation[];
}

export const RecommendationsView: React.FC<RecommendationsViewProps> = ({ recommendations }) => {
  const priorityOrder: IssuePriority[] = ['critical', 'high', 'medium', 'low'];

  const getPriorityStyle = (priority: IssuePriority) => {
    switch (priority) {
      case 'critical':
        return { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' };
      case 'high':
        return { color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' };
      case 'medium':
        return { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' };
      case 'low':
      default:
        return { color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' };
    }
  };

  const sorted = [...recommendations].sort(
    (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {sorted.map((rec) => {
        const pStyle = getPriorityStyle(rec.priority);

        return (
          <div
            key={rec.id}
            style={{
              backgroundColor: 'var(--agnex-base-raised, #12151B)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '1.5rem',
              borderLeft: `4px solid ${pStyle.color}`
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--agnex-white, #F7F8FA)'
                }}
              >
                {rec.title}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    backgroundColor: pStyle.bg,
                    color: pStyle.color,
                    border: `1px solid ${pStyle.border}`
                  }}
                >
                  {rec.priority.toUpperCase()} PRIORITY
                </span>

                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: 'var(--agnex-steel, #7C8490)',
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  {rec.category.replace('_', ' ')}
                </span>
              </div>
            </div>

            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--agnex-steel-light, #CBD5E1)',
                lineHeight: 1.5,
                margin: '0 0 1rem 0'
              }}
            >
              {rec.description}
            </p>

            {/* Actionable Steps */}
            <div style={{ marginBottom: '1rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--agnex-steel, #7C8490)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.4rem',
                  fontFamily: 'var(--font-mono, monospace)'
                }}
              >
                Recommended Engineering Fixes
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#E2E8F0', lineHeight: 1.6 }}>
                {rec.actionableSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {/* Affected Pages */}
            {rec.affectedPages.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--agnex-steel, #7C8490)', marginRight: '0.25rem' }}>
                  Affected:
                </span>
                {rec.affectedPages.map((url, uIdx) => {
                  let path = url;
                  try {
                    path = new URL(url).pathname || url;
                  } catch {}

                  return (
                    <span
                      key={uIdx}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono, monospace)',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '3px',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--agnex-accent, #00E5FF)'
                      }}
                    >
                      {path}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
