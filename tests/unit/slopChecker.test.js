// AGNEX Technology — AI Slop Website Auditor Unit Tests
// Vitest Test Suite

import { describe, it, expect } from 'vitest';
import { validateAndSanitizeUrl } from '../../src/features/slopChecker/ssrfValidator';
import { analyzePageText } from '../../src/features/slopChecker/slopDetector';
import { detectDuplicateClusters } from '../../src/features/slopChecker/duplicateDetector';
import { computeTransparentScores } from '../../src/features/slopChecker/scoringEngine';
import { getDemoAuditReport } from '../../src/features/slopChecker/demoData';

describe('SSRF Protection & URL Validation', () => {
  it('should accept valid public HTTPS and HTTP domains', () => {
    const res1 = validateAndSanitizeUrl('https://example.com');
    expect(res1.isValid).toBe(true);
    expect(res1.sanitizedUrl).toBe('https://example.com/');

    const res2 = validateAndSanitizeUrl('github.com/agnex-technology');
    expect(res2.isValid).toBe(true);
    expect(res2.sanitizedUrl).toBe('https://github.com/agnex-technology');
  });

  it('should reject loopback addresses and localhost', () => {
    expect(validateAndSanitizeUrl('http://localhost:3000').isValid).toBe(false);
    expect(validateAndSanitizeUrl('http://127.0.0.1:8080').isValid).toBe(false);
    expect(validateAndSanitizeUrl('http://[::1]').isValid).toBe(false);
  });

  it('should reject private RFC1918 and link-local IP addresses', () => {
    expect(validateAndSanitizeUrl('http://192.168.1.1').isValid).toBe(false);
    expect(validateAndSanitizeUrl('http://10.0.0.1/admin').isValid).toBe(false);
    expect(validateAndSanitizeUrl('http://172.16.0.10').isValid).toBe(false);
  });

  it('should strictly block cloud metadata endpoints (169.254.169.254)', () => {
    const res = validateAndSanitizeUrl('http://169.254.169.254/latest/meta-data/');
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('metadata');
  });

  it('should reject non-HTTP protocols (file, ftp, gopher)', () => {
    expect(validateAndSanitizeUrl('file:///etc/passwd').isValid).toBe(false);
    expect(validateAndSanitizeUrl('ftp://ftp.server.com').isValid).toBe(false);
  });
});

describe('AI Slop & Content Quality Detection Engine', () => {
  it('should flag formulaic AI intros, conclusions, and hallmark tokens', () => {
    const slopText = `
      In today's fast-paced digital landscape, enterprises must innovate rapidly.
      In this comprehensive guide, we will delve into the rich tapestry of modern software architecture.
      Furthermore, it is important to remember that cloud solutions act as an indispensable catalyst.
      In conclusion, unlocking the full potential of technology will pave the way for a brighter future.
    `;

    const analysis = analyzePageText(slopText, 'Sample Blog');
    expect(analysis.aiSlopRisk).toBeGreaterThan(45);
    expect(analysis.aiLikelihood).toBeGreaterThan(45);
    expect(analysis.detectedSignals.length).toBeGreaterThanOrEqual(3);

    const categories = analysis.detectedSignals.map(s => s.category);
    expect(categories).toContain('generic_intro');
    expect(categories).toContain('generic_outro');
    expect(categories).toContain('formulaic_transition');
  });

  it('should NOT penalize authentic engineering prose with empirical data and first-hand experience', () => {
    const engineeringText = `
      We engineered a high-throughput event processing pipeline using Kafka consumer groups partitioned by customer tenant ID.
      In our benchmarks, our team measured a 42ms p99 latency reduction under 15,000 writes/sec.
      We tested failover recovery across two Availability Zones, validating that idempotency keys prevented duplicate ledger mutations.
      Refer to Table 1 and RFC-7519 for signature verification specifications.
    `;

    const analysis = analyzePageText(engineeringText, 'Architecture Deep Dive');
    expect(analysis.aiSlopRisk).toBeLessThan(30);
    expect(analysis.originalityScore).toBeGreaterThan(70);
    expect(analysis.isThinContent).toBe(false);
  });

  it('should detect thin content with low word count or circular fluff', () => {
    const shortText = 'Our company provides cutting-edge digital solutions for all modern business operations.';
    const analysis = analyzePageText(shortText, 'Short Page');
    expect(analysis.isThinContent).toBe(true);
    expect(analysis.thinContentReason).toBeDefined();
  });
});

describe('Duplicate Content & Clustering Engine', () => {
  it('should group pages sharing heavy structural text overlap into duplicate clusters', () => {
    const pages = [
      {
        id: 'p1',
        url: 'https://example.com/services/seo-austin',
        path: '/services/seo-austin',
        title: 'SEO Services in Austin',
        text: 'Looking for top-rated SEO services in Austin? Our proven search optimization team delivers exceptional organic traffic and keyword rankings for local Austin businesses.'
      },
      {
        id: 'p2',
        url: 'https://example.com/services/seo-dallas',
        path: '/services/seo-dallas',
        title: 'SEO Services in Dallas',
        text: 'Looking for top-rated SEO services in Dallas? Our proven search optimization team delivers exceptional organic traffic and keyword rankings for local Dallas businesses.'
      },
      {
        id: 'p3',
        url: 'https://example.com/engineering-whitepaper',
        path: '/engineering-whitepaper',
        title: 'Engineering Whitepaper',
        text: 'A formal analysis of distributed consensus algorithms comparing Raft, Paxos, and Zab under network partitions.'
      }
    ];

    const clusters = detectDuplicateClusters(pages, 0.6);
    expect(clusters.length).toBe(1);
    expect(clusters[0].pages.length).toBe(2);
    expect(clusters[0].similarityPercentage).toBeGreaterThanOrEqual(60);
  });
});

describe('Transparent Scoring & Demo Mode', () => {
  it('should generate transparent factors with weights and explanations', () => {
    const demo = getDemoAuditReport();
    expect(demo.isDemo).toBe(true);
    expect(demo.overallScore.factors.length).toBeGreaterThan(0);
    expect(demo.aiSlopRisk.factors.length).toBeGreaterThan(0);

    demo.overallScore.factors.forEach(f => {
      expect(f.name).toBeDefined();
      expect(f.weight).toBeGreaterThan(0);
      expect(f.description).toBeDefined();
    });

    expect(demo.recommendations.length).toBeGreaterThan(0);
    const priorities = demo.recommendations.map(r => r.priority);
    expect(priorities).toContain('critical');
  });
});
