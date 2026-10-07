// AGNEX Technology — AI Slop Website Auditor
// Duplicate & Programmatic Template Clusters View Component

import React from 'react';
import { DuplicateCluster } from '../types';

interface DuplicateClustersViewProps {
  clusters: DuplicateCluster[];
}

export const DuplicateClustersView: React.FC<DuplicateClustersViewProps> = ({ clusters }) => {
  if (clusters.length === 0) {
    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--agnex-base-raised, #12151B)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '8px'
        }}
      >
        <div style={{ color: '#10B981', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
          ✓ No Duplicate Page Clusters Detected
        </div>
        <p style={{ color: 'var(--agnex-steel, #7C8490)', fontSize: '0.9rem', margin: 0 }}>
          All crawled URLs present unique text structures and differentiated value propositions. No programmatic doorway pages or duplicated templates detected.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {clusters.map((cluster) => (
        <div
          key={cluster.id}
          style={{
            backgroundColor: 'var(--agnex-base-raised, #12151B)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '8px',
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  color: '#EF4444',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  letterSpacing: '0.08em'
                }}
              >
                Duplicate Cluster · {cluster.similarityPercentage}% Similarity
              </span>
              <h3 style={{ margin: '0.25rem 0 0 0', color: 'var(--agnex-white, #F7F8FA)', fontSize: '1.1rem' }}>
                {cluster.representativeTheme}
              </h3>
            </div>

            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(239, 68, 68, 0.15)',
                color: '#EF4444',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}
            >
              {cluster.pages.length} Overlapping Pages
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--agnex-steel-light, #CBD5E1)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
            {cluster.explanation}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {cluster.pages.map((p, idx) => (
              <div
                key={idx}
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--agnex-accent, #00E5FF)',
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono, monospace)',
                      textDecoration: 'none'
                    }}
                  >
                    {p.path} ↗
                  </a>
                  <span style={{ fontSize: '0.75rem', color: 'var(--agnex-steel)' }}>{p.title}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--agnex-steel)', fontStyle: 'italic' }}>
                  "{p.snippet}"
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
