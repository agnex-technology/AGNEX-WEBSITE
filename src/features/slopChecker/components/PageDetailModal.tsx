// AGNEX Technology — AI Slop Website Auditor
// Individual Page Forensic Analysis Modal Component

import React, { useEffect } from 'react';
import { PageAuditItem } from '../types';

interface PageDetailModalProps {
  page: PageAuditItem | null;
  onClose: () => void;
}

export const PageDetailModal: React.FC<PageDetailModalProps> = ({ page, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!page) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="page-modal-title"
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
          maxWidth: '840px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)'
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
                letterSpacing: '0.08em',
                marginBottom: '0.35rem'
              }}
            >
              Page Audit · Forensic Inspection
            </div>
            <h2
              id="page-modal-title"
              style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.35rem',
                color: 'var(--agnex-white, #F7F8FA)',
                fontWeight: 600,
                lineHeight: 1.3
              }}
            >
              {page.title || 'Untitled Page'}
            </h2>
            <a
              href={page.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.85rem',
                color: 'var(--agnex-steel, #7C8490)',
                textDecoration: 'none',
                fontFamily: 'var(--font-mono, monospace)',
                wordBreak: 'break-all'
              }}
            >
              {page.url} ↗
            </a>
          </div>

          <button
            onClick={onClose}
            aria-label="Close page inspection modal"
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
          >
            ✕
          </button>
        </div>

        {/* 6 Metric Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--agnex-steel)', textTransform: 'uppercase' }}>Overall</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--agnex-white)', fontFamily: 'var(--font-mono)' }}>
              {page.overallQuality}
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: '#EF4444', textTransform: 'uppercase' }}>Slop Risk</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: page.aiSlopRisk >= 60 ? '#EF4444' : page.aiSlopRisk >= 35 ? '#F59E0B' : '#10B981', fontFamily: 'var(--font-mono)' }}>
              {page.aiSlopRisk}%
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--agnex-steel)', textTransform: 'uppercase' }}>AI Likelihood</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--agnex-accent)', fontFamily: 'var(--font-mono)' }}>
              {page.aiLikelihood}%
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--agnex-steel)', textTransform: 'uppercase' }}>Originality</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--agnex-white)', fontFamily: 'var(--font-mono)' }}>
              {page.originalityScore}
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--agnex-steel)', textTransform: 'uppercase' }}>SEO</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--agnex-white)', fontFamily: 'var(--font-mono)' }}>
              {page.seoScore}
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--agnex-steel)', textTransform: 'uppercase' }}>Word Count</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--agnex-white)', fontFamily: 'var(--font-mono)' }}>
              {page.wordCount}
            </div>
          </div>
        </div>

        {/* Thin Content Warning if applicable */}
        {page.isThinContent && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              color: '#FCA5A5',
              fontSize: '0.85rem',
              lineHeight: 1.5
            }}
          >
            <strong>⚠ Flagged as Thin Content:</strong> {page.thinContentReason}
          </div>
        )}

        {/* AI-Slop Signals Detected */}
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
            Detected AI-Slop & Formulaic Signals ({page.detectedSignals.length})
          </h4>

          {page.detectedSignals.length === 0 ? (
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                borderRadius: '6px',
                color: '#10B981',
                fontSize: '0.85rem'
              }}
            >
              ✓ No formulaic prompt templates, generic intros/outros, or low-information filler markers detected on this page.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {page.detectedSignals.map((sig, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0.9rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '6px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, color: '#F7F8FA', fontSize: '0.85rem' }}>{sig.label}</span>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        backgroundColor: sig.severity === 'high' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: sig.severity === 'high' ? '#EF4444' : '#F59E0B'
                      }}
                    >
                      {sig.severity.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--agnex-steel)' }}>
                    {sig.explanation}
                  </p>
                  <div style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                    {sig.snippets.map((snip, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          padding: '0.35rem 0.6rem',
                          borderRadius: '4px',
                          marginTop: '0.25rem',
                          borderLeft: '2px solid #EF4444'
                        }}
                      >
                        "{snip}"
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEO & Technical Specs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* SEO Details */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '6px'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--agnex-white)', marginBottom: '0.5rem' }}>
              On-Page SEO Diagnostics
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--agnex-steel-light)', lineHeight: 1.6 }}>
              <li>
                <strong>H1 Tags:</strong> {page.h1Tags.length === 1 ? `✓ Valid 1 H1 ("${page.h1Tags[0]}")` : page.h1Tags.length === 0 ? '❌ Missing H1 tag' : `⚠ ${page.h1Tags.length} multiple H1 tags`}
              </li>
              <li><strong>H2 Subheadings:</strong> {page.h2Count} sections</li>
              <li><strong>Meta Description:</strong> {page.metaDescription ? `✓ ${page.metaDescription.slice(0, 70)}...` : '❌ Missing'}</li>
              <li><strong>Canonical Link:</strong> {page.hasCanonical ? '✓ Declared' : '❌ Missing'}</li>
              <li><strong>JSON-LD Schema:</strong> {page.hasSchemaMarkup ? '✓ Structured Data Present' : '❌ Not Found'}</li>
              <li><strong>Images:</strong> {page.totalImages} total ({page.imagesMissingAlt} missing alt text)</li>
            </ul>
          </div>

          {/* Technical Details */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '6px'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--agnex-white)', marginBottom: '0.5rem' }}>
              Technical Infrastructure
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--agnex-steel-light)', lineHeight: 1.6 }}>
              <li><strong>HTTP Status:</strong> {page.httpStatus} OK</li>
              <li><strong>Transport Security:</strong> {page.isHttps ? '✓ TLS / HTTPS Enforced' : '❌ Insecure HTTP'}</li>
              <li><strong>Mobile Viewport:</strong> {page.hasMobileViewport ? '✓ Responsive Viewport Tag' : '❌ Missing'}</li>
              <li><strong>Latency:</strong> {page.loadLatencyMs} ms</li>
              <li><strong>HTML Payload Size:</strong> {Math.round(page.contentLengthBytes / 1024)} KB</li>
              <li><strong>Lexical Diversity (TTR):</strong> {Math.round(page.lexicalDiversity * 100)}%</li>
            </ul>
          </div>
        </div>

        {/* Problems Detected */}
        {page.problems.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--agnex-steel, #7C8490)',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-mono, monospace)'
              }}
            >
              Action Items for this URL
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {page.problems.map((prob, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: '#F87171',
                    border: '1px solid rgba(239, 68, 68, 0.2)'
                  }}
                >
                  • {prob}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} className="btn btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
            Close Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
