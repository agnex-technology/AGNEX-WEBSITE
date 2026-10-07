// AGNEX Technology — AI Slop Website Auditor
// Master Audit Report View Component

import React, { useState } from 'react';
import { FullAuditReport, TransparentScore, PageAuditItem } from '../types';
import { ScoreCard } from './ScoreCard';
import { ScoreBreakdownModal } from './ScoreBreakdownModal';
import { PageDetailModal } from './PageDetailModal';
import { DuplicateClustersView } from './DuplicateClustersView';
import { RecommendationsView } from './RecommendationsView';

interface AuditReportViewProps {
  report: FullAuditReport;
  onReset: () => void;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({ report, onReset }) => {
  const [activeTab, setActiveTab] = useState<'pages' | 'slop' | 'duplicates' | 'recommendations'>('pages');
  const [activeScoreModal, setActiveScoreModal] = useState<TransparentScore | null>(null);
  const [selectedPageModal, setSelectedPageModal] = useState<PageAuditItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);

  const {
    targetUrl,
    domain,
    crawledAt,
    isDemo,
    totalPagesCrawled,
    overallScore,
    aiSlopRisk,
    contentQuality,
    originality,
    seo,
    readability,
    technicalHealth,
    executiveSummary,
    pages,
    duplicateClusters,
    thinPages,
    highRiskPages,
    recommendations
  } = report;

  const filteredPages = pages.filter(
    (p) =>
      p.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyReport = () => {
    const text = `AGNEX Technology — Website Intelligence Report\nTarget: ${targetUrl}\nOverall Quality: ${overallScore.score}/100\nAI-Slop Risk: ${aiSlopRisk.score}/100\nOriginality: ${originality.score}/100\nSEO: ${seo.score}/100\nTechnical: ${technicalHealth.score}/100\nVerdict: ${executiveSummary.coreVerdict}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Demo Analysis Warning Banner if applicable */}
      {isDemo && (
        <div
          role="alert"
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🧪</span>
            <div>
              <div style={{ fontWeight: 600, color: '#F59E0B', fontSize: '0.9rem' }}>
                DEMO ANALYSIS — Simulated Enterprise Multi-Page Dataset
              </div>
              <div style={{ color: 'var(--agnex-steel-light, #CBD5E1)', fontSize: '0.8rem' }}>
                This is a live demonstration using simulated multi-page data showcasing AI-slop risk detection, thin content analysis, duplicate clustering, and transparent scoring factors.
              </div>
            </div>
          </div>
          <button
            onClick={onReset}
            className="btn btn-secondary"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
          >
            Audit Custom URL
          </button>
        </div>
      )}

      {/* Report Header & Meta Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.5rem'
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              color: 'var(--agnex-accent, #00E5FF)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.4rem'
            }}
          >
            Agnex Technology · Intelligence Audit Report
          </div>
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 700,
              color: 'var(--agnex-white, #F7F8FA)',
              margin: '0 0 0.5rem 0'
            }}
          >
            {domain}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--agnex-steel, #7C8490)' }}>
            <span>Target: <strong style={{ color: '#F7F8FA' }}>{targetUrl}</strong></span>
            <span>•</span>
            <span>Crawled: <strong style={{ color: '#F7F8FA' }}>{totalPagesCrawled} page{totalPagesCrawled > 1 ? 's' : ''}</strong></span>
            <span>•</span>
            <span>Timestamp: <strong style={{ color: '#F7F8FA' }}>{new Date(crawledAt).toLocaleTimeString()}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={handleCopyReport}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.85rem' }}
          >
            {copied ? '✓ Report Copied' : 'Copy Summary'}
          </button>
          <button
            onClick={onReset}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
          >
            Run New Audit
          </button>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div
        style={{
          backgroundColor: 'var(--agnex-base-raised, #12151B)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              color: 'var(--agnex-accent, #00E5FF)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Executive Summary & Verdict
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              backgroundColor:
                executiveSummary.status === 'Exemplary'
                  ? 'rgba(16, 185, 129, 0.15)'
                  : executiveSummary.status === 'Needs Attention'
                  ? 'rgba(245, 158, 11, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
              color:
                executiveSummary.status === 'Exemplary'
                  ? '#10B981'
                  : executiveSummary.status === 'Needs Attention'
                  ? '#F59E0B'
                  : '#EF4444',
              border: '1px solid currentColor'
            }}
          >
            {executiveSummary.status}
          </span>
        </div>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--agnex-white, #F7F8FA)',
            fontWeight: 500,
            lineHeight: 1.5,
            margin: '0 0 1.5rem 0'
          }}
        >
          {executiveSummary.coreVerdict}
        </p>

        {/* 3 Executive Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ✓ Verified Strengths
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.6 }}>
              {executiveSummary.keyStrengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#EF4444', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ⚠ Critical Deficits
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.6 }}>
              {executiveSummary.criticalVulnerabilities.length > 0 ? (
                executiveSummary.criticalVulnerabilities.map((v, i) => <li key={i}>{v}</li>)
              ) : (
                <li>No critical deficits detected</li>
              )}
            </ul>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '6px'
            }}
          >
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--agnex-accent, #00E5FF)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              → Strategic Priorities
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.8rem', color: '#CBD5E1', lineHeight: 1.6 }}>
              {executiveSummary.topPriorities.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 6 Transparent Score Cards Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, color: 'var(--agnex-white)', fontSize: '1.2rem' }}>
            Transparent Dimension Scores (0–100)
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--agnex-steel)' }}>
            Click any score card to view weighted factors and explanations
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem'
          }}
        >
          <ScoreCard scoreData={overallScore} onClick={() => setActiveScoreModal(overallScore)} />
          <ScoreCard scoreData={aiSlopRisk} onClick={() => setActiveScoreModal(aiSlopRisk)} isInverse={true} />
          <ScoreCard scoreData={contentQuality} onClick={() => setActiveScoreModal(contentQuality)} />
          <ScoreCard scoreData={originality} onClick={() => setActiveScoreModal(originality)} />
          <ScoreCard scoreData={seo} onClick={() => setActiveScoreModal(seo)} />
          <ScoreCard scoreData={readability} onClick={() => setActiveScoreModal(readability)} />
          <ScoreCard scoreData={technicalHealth} onClick={() => setActiveScoreModal(technicalHealth)} />
        </div>
      </div>

      {/* Detailed Section Navigation Tabs */}
      <div>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '0.5rem',
            marginBottom: '1.5rem',
            overflowX: 'auto'
          }}
        >
          <button
            onClick={() => setActiveTab('pages')}
            style={{
              padding: '0.6rem 1.1rem',
              backgroundColor: activeTab === 'pages' ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
              color: activeTab === 'pages' ? 'var(--agnex-accent, #00E5FF)' : 'var(--agnex-steel, #7C8490)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Page-by-Page Audit ({pages.length})
          </button>

          <button
            onClick={() => setActiveTab('slop')}
            style={{
              padding: '0.6rem 1.1rem',
              backgroundColor: activeTab === 'slop' ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
              color: activeTab === 'slop' ? 'var(--agnex-accent, #00E5FF)' : 'var(--agnex-steel, #7C8490)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            AI Slop & Thin Content ({highRiskPages.length + thinPages.length})
          </button>

          <button
            onClick={() => setActiveTab('duplicates')}
            style={{
              padding: '0.6rem 1.1rem',
              backgroundColor: activeTab === 'duplicates' ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
              color: activeTab === 'duplicates' ? 'var(--agnex-accent, #00E5FF)' : 'var(--agnex-steel, #7C8490)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Duplicate Clusters ({duplicateClusters.length})
          </button>

          <button
            onClick={() => setActiveTab('recommendations')}
            style={{
              padding: '0.6rem 1.1rem',
              backgroundColor: activeTab === 'recommendations' ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
              color: activeTab === 'recommendations' ? 'var(--agnex-accent, #00E5FF)' : 'var(--agnex-steel, #7C8490)',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Actionable Fixes ({recommendations.length})
          </button>
        </div>

        {/* Tab 1: Page-by-Page Table */}
        {activeTab === 'pages' && (
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap'
              }}
            >
              <input
                type="text"
                placeholder="Filter by page URL or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '0.55rem 0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: '#F7F8FA',
                  fontSize: '0.85rem',
                  maxWidth: '320px',
                  width: '100%'
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--agnex-steel)' }}>
                Showing {filteredPages.length} of {pages.length} crawled pages
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'var(--agnex-base-raised, #12151B)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                overflowX: 'auto'
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--agnex-steel)' }}>
                    <th style={{ padding: '0.85rem 1rem' }}>Page & URL</th>
                    <th style={{ padding: '0.85rem 0.75rem' }}>Words</th>
                    <th style={{ padding: '0.85rem 0.75rem' }}>Slop Risk</th>
                    <th style={{ padding: '0.85rem 0.75rem' }}>AI Likelihood</th>
                    <th style={{ padding: '0.85rem 0.75rem' }}>Quality</th>
                    <th style={{ padding: '0.85rem 0.75rem' }}>SEO</th>
                    <th style={{ padding: '0.85rem 0.75rem' }}>Problems</th>
                    <th style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.map((p) => (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background-color 0.15s'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td style={{ padding: '0.85rem 1rem', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 600, color: 'var(--agnex-white)', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.title || 'Untitled'}
                        </div>
                        <div style={{ color: 'var(--agnex-steel)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.path}
                        </div>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                        {p.wordCount}
                        {p.isThinContent && (
                          <span style={{ color: '#EF4444', marginLeft: '0.3rem', fontSize: '0.7rem' }} title="Thin content">
                            ⚠
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span
                          style={{
                            fontWeight: 600,
                            fontFamily: 'var(--font-mono)',
                            color: p.aiSlopRisk >= 60 ? '#EF4444' : p.aiSlopRisk >= 35 ? '#F59E0B' : '#10B981'
                          }}
                        >
                          {p.aiSlopRisk}%
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--agnex-accent)' }}>
                        {p.aiLikelihood}%
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                        {p.overallQuality}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem', fontFamily: 'var(--font-mono)' }}>
                        {p.seoScore}
                      </td>
                      <td style={{ padding: '0.85rem 0.75rem' }}>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            backgroundColor: p.problems.length > 0 ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                            color: p.problems.length > 0 ? '#EF4444' : '#10B981'
                          }}
                        >
                          {p.problems.length} issue{p.problems.length !== 1 ? 's' : ''}
                        </span>
                      </td>
                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedPageModal(p)}
                          className="btn btn-secondary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                        >
                          Inspect Page →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: AI Slop & Thin Content View */}
        {activeTab === 'slop' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Thin Pages Section */}
            <div>
              <h4 style={{ color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                Thin Content Pages ({thinPages.length})
              </h4>
              {thinPages.length === 0 ? (
                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '6px', color: '#10B981', fontSize: '0.85rem' }}>
                  ✓ All scanned pages exceed minimum information depth thresholds.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {thinPages.map((tp) => (
                    <div
                      key={tp.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'var(--agnex-base-raised)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--agnex-white)', fontSize: '0.9rem' }}>{tp.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--agnex-steel)', fontFamily: 'var(--font-mono)' }}>{tp.path}</div>
                        <div style={{ fontSize: '0.8rem', color: '#F87171', marginTop: '0.25rem' }}>{tp.thinContentReason}</div>
                      </div>
                      <button onClick={() => setSelectedPageModal(tp)} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                        Inspect →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* High Slop Pages Section */}
            <div>
              <h4 style={{ color: 'var(--agnex-white)', marginBottom: '0.75rem' }}>
                High AI-Slop Risk Pages ({highRiskPages.length})
              </h4>
              {highRiskPages.length === 0 ? (
                <div style={{ padding: '1.25rem', backgroundColor: 'rgba(16, 185, 129, 0.05)', borderRadius: '6px', color: '#10B981', fontSize: '0.85rem' }}>
                  ✓ No pages flagged with elevated AI-slop risk.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {highRiskPages.map((hp) => (
                    <div
                      key={hp.id}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'var(--agnex-base-raised)',
                        border: '1px solid rgba(239, 68, 68, 0.25)',
                        borderRadius: '6px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--agnex-white)', fontSize: '0.9rem' }}>{hp.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--agnex-steel)', fontFamily: 'var(--font-mono)' }}>
                          {hp.path} · Slop Risk: <strong style={{ color: '#EF4444' }}>{hp.aiSlopRisk}%</strong> · AI Likelihood: <strong style={{ color: 'var(--agnex-accent)' }}>{hp.aiLikelihood}%</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--agnex-steel-light)', marginTop: '0.25rem' }}>
                          Matched Signals: {hp.detectedSignals.map((s) => s.label).join(', ')}
                        </div>
                      </div>
                      <button onClick={() => setSelectedPageModal(hp)} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}>
                        Inspect →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Duplicate Clusters */}
        {activeTab === 'duplicates' && <DuplicateClustersView clusters={duplicateClusters} />}

        {/* Tab 4: Actionable Recommendations */}
        {activeTab === 'recommendations' && <RecommendationsView recommendations={recommendations} />}
      </div>

      {/* Transparent Score Breakdown Modal */}
      <ScoreBreakdownModal scoreData={activeScoreModal} onClose={() => setActiveScoreModal(null)} />

      {/* Page Inspection Modal */}
      <PageDetailModal page={selectedPageModal} onClose={() => setSelectedPageModal(null)} />
    </div>
  );
};
