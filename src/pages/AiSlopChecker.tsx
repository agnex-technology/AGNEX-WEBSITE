// AGNEX Technology — AI Slop Website Auditor Page
// Route: /ai-slop-checker
// Complete Enterprise Implementation

import React, { useState } from 'react';
import { validateAndSanitizeUrl } from '../features/slopChecker/ssrfValidator';
import { getDemoAuditReport } from '../features/slopChecker/demoData';
import { FullAuditReport } from '../features/slopChecker/types';
import { AuditReportView } from '../features/slopChecker/components/AuditReportView';
import { computeTransparentScores } from '../features/slopChecker/scoringEngine';
import { Helmet } from 'react-helmet-async';

export default function AiSlopChecker() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [report, setReport] = useState<FullAuditReport | null>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    const validation = validateAndSanitizeUrl(urlInput);
    if (!validation.isValid || !validation.sanitizedUrl) {
      setErrorMsg(validation.error || 'Please enter a valid website URL.');
      return;
    }

    setLoading(true);
    setCurrentStep('Executing SSRF validation & protocol verification...');

    try {
      setCurrentStep('Fetching target web pages & extracting text content...');

      // Call API endpoint
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: validation.sanitizedUrl, maxPages: 4 })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || `Crawler returned HTTP status ${response.status}`);
      }

      const result = await response.json();
      if (result.status !== 'success' || !result.data?.pages) {
        throw new Error(result.message || 'Malformed analysis response received');
      }

      setCurrentStep('Evaluating multi-signal AI patterns & lexical diversity...');
      const pages = result.data.pages;

      // Duplicate clustering
      const duplicateClusters = detectDuplicateClusters(
        pages.map((p: any) => ({
          id: p.id,
          url: p.url,
          path: p.path,
          title: p.title,
          text: `${p.title} ${p.metaDescription || ''} ${p.problems.join(' ')}`
        }))
      );

      setCurrentStep('Synthesizing transparent dimension scores & recommendations...');
      const compiledReport = computeTransparentScores(pages, duplicateClusters, validation.sanitizedUrl, false);
      setReport(compiledReport);
    } catch (err: any) {
      console.warn('Real-time crawl encountered error, offering demo fallback:', err);
      setErrorMsg(
        `${err.message || 'Unable to complete crawl.'} If the target domain blocks automated crawlers or runs behind Cloudflare, you can test our complete analysis suite using Try Demo.`
      );
    } finally {
      setLoading(false);
      setCurrentStep('');
    }
  };

  const handleRunDemo = () => {
    setErrorMsg(null);
    setLoading(true);
    setCurrentStep('Loading simulated multi-page enterprise audit...');
    setTimeout(() => {
      const demoData = getDemoAuditReport();
      setReport(demoData);
      setLoading(false);
      setCurrentStep('');
    }, 600);
  };

  const handleReset = () => {
    setReport(null);
    setErrorMsg(null);
    setUrlInput('');
  };

  return (
    <>
      <Helmet>
        <title>Agnex Technology — Website Intelligence | AI Slop Website Auditor</title>
        <meta
          name="description"
          content="Enterprise content quality, originality, and AI-slop risk analyzer by Agnex Technology. Evaluate formulaic phrasing, thin content, duplicate clusters, and technical website health."
        />
        <link rel="canonical" href="https://agnextechnology.com/ai-slop-checker" />
        <meta property="og:title" content="Agnex Technology — Website Intelligence | AI Slop Website Auditor" />
        <meta
          property="og:description"
          content="Analyze websites for formulaic writing, thin content, duplicate page clusters, SEO integrity, and technical health with transparent factor scoring."
        />
        <meta property="og:url" content="https://agnextechnology.com/ai-slop-checker" />
      </Helmet>

      <main style={{ backgroundColor: 'var(--agnex-base, #0B0D10)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '5rem' }}>
        <div className="agnex-container">
          {!report ? (
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
              {/* Header Hero */}
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.8rem',
                    color: 'var(--agnex-accent, #00E5FF)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.8rem',
                    backgroundColor: 'rgba(0, 229, 255, 0.08)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: '999px',
                    marginBottom: '1rem'
                  }}
                >
                  Agnex Technology · Website Intelligence
                </div>

                <h1
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                    fontWeight: 700,
                    color: 'var(--agnex-white, #F7F8FA)',
                    lineHeight: 1.15,
                    margin: '0 0 1rem 0'
                  }}
                >
                  AI Slop Website Auditor
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                    color: 'var(--agnex-steel-light, #CBD5E1)',
                    lineHeight: 1.6,
                    maxWidth: '680px',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  Analyze websites for formulaic AI-generated phrasing, thin content, duplicate page clusters, SEO integrity, and technical website health with transparent factor scoring.
                </p>

                {/* Disclaimer Banner */}
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '6px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.8rem',
                    color: 'var(--agnex-steel, #7C8490)',
                    lineHeight: 1.5,
                    maxWidth: '640px',
                    margin: '0 auto',
                    textAlign: 'left'
                  }}
                >
                  <strong style={{ color: '#CBD5E1' }}>Analysis Methodology Notice:</strong> This auditor evaluates statistical language patterns, vocabulary repetition, and architectural cues to calculate <em>AI-generated content likelihood</em> and <em>AI-slop risk</em>. It does not definitively prove AI authorship.
                </div>
              </div>

              {/* URL Input Form Card */}
              <div
                style={{
                  backgroundColor: 'var(--agnex-base-raised, #12151B)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '2rem',
                  boxShadow: '0 16px 32px rgba(0, 0, 0, 0.4)',
                  marginBottom: '3rem'
                }}
              >
                <form onSubmit={handleAnalyze}>
                  <label
                    htmlFor="website-url-input"
                    style={{
                      display: 'block',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--agnex-white, #F7F8FA)',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    Enter Target Website URL
                  </label>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <input
                      id="website-url-input"
                      type="text"
                      placeholder="https://example.com"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      disabled={loading}
                      style={{
                        flex: '1 1 280px',
                        padding: '0.85rem 1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '6px',
                        color: '#F7F8FA',
                        fontSize: '1rem',
                        fontFamily: 'var(--font-mono, monospace)',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--agnex-accent, #00E5FF)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.15)')}
                    />

                    <button
                      type="submit"
                      disabled={loading || !urlInput.trim()}
                      className="btn btn-primary"
                      style={{
                        padding: '0.85rem 1.75rem',
                        fontSize: '0.95rem',
                        opacity: loading || !urlInput.trim() ? 0.6 : 1,
                        cursor: loading || !urlInput.trim() ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {loading ? 'Analyzing...' : 'Analyze Website →'}
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--agnex-steel, #7C8490)' }}>
                      🔒 SSRF-hardened: Localhost, private IPs & cloud metadata endpoints are strictly blocked.
                    </div>

                    <button
                      type="button"
                      onClick={handleRunDemo}
                      disabled={loading}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--agnex-accent, #00E5FF)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: '0.2rem 0.5rem',
                        textDecoration: 'underline'
                      }}
                    >
                      Try Demo Analysis →
                    </button>
                  </div>
                </form>

                {/* Progress State */}
                {loading && (
                  <div
                    style={{
                      marginTop: '1.5rem',
                      padding: '1.25rem',
                      backgroundColor: 'rgba(0, 229, 255, 0.05)',
                      border: '1px solid rgba(0, 229, 255, 0.2)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        border: '2px solid rgba(0, 229, 255, 0.2)',
                        borderTopColor: '#00E5FF',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                      }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <div style={{ fontSize: '0.85rem', color: 'var(--agnex-white)' }}>
                      <strong>Crawl & Intelligence Engine Active:</strong> {currentStep}
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {errorMsg && (
                  <div
                    role="alert"
                    style={{
                      marginTop: '1.5rem',
                      padding: '1rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: '6px',
                      color: '#F87171',
                      fontSize: '0.85rem',
                      lineHeight: 1.5
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
              </div>

              {/* Educational Matrix: What We Analyze */}
              <div>
                <h3
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--agnex-white, #F7F8FA)',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}
                >
                  Core Intelligence Audit Dimensions
                </h3>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1rem'
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'var(--agnex-base-raised, #12151B)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div style={{ color: 'var(--agnex-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      01 · AI-Slop Signals
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--agnex-steel)', lineHeight: 1.5 }}>
                      Identifies generic openings ("In today's fast-paced..."), boilerplate conclusions, token clustering ("delve", "rich tapestry"), and filler prose.
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--agnex-base-raised, #12151B)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div style={{ color: 'var(--agnex-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      02 · Thin Content
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--agnex-steel)', lineHeight: 1.5 }}>
                      Evaluates informational density, user intent, and empirical depth. Flags low-value placeholder pages that lack practical utility.
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--agnex-base-raised, #12151B)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div style={{ color: 'var(--agnex-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      03 · Duplicate Clusters
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--agnex-steel)', lineHeight: 1.5 }}>
                      Detects programmatic doorway pages and template recycling using text shingling and Jaccard similarity clustering.
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--agnex-base-raised, #12151B)',
                      padding: '1.25rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}
                  >
                    <div style={{ color: 'var(--agnex-accent)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                      04 · SEO & Technical Health
                    </div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--agnex-steel)', lineHeight: 1.5 }}>
                      Audits metadata titles, H1/H2 hierarchy, canonical links, OpenGraph, image alt text, HTTPS, and mobile viewport compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AuditReportView report={report} onReset={handleReset} />
          )}
        </div>
      </main>
    </>
  );
}
