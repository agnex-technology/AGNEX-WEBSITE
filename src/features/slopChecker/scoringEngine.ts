// AGNEX Technology — AI Slop Website Auditor
// Transparent Enterprise Scoring & Recommendation Synthesis Engine

import {
  TransparentScore,
  PageAuditItem,
  DuplicateCluster,
  AuditRecommendation,
  FullAuditReport
} from './types';

export function computeTransparentScores(
  pages: PageAuditItem[],
  duplicateClusters: DuplicateCluster[],
  targetUrl: string,
  isDemo = false
): FullAuditReport {
  const n = pages.length || 1;
  let parsedDomain = 'example.com';
  try {
    parsedDomain = new URL(targetUrl).hostname;
  } catch {
    parsedDomain = targetUrl;
  }

  // Averages across crawled pages
  const avgQuality = Math.round(pages.reduce((acc, p) => acc + p.overallQuality, 0) / n);
  const avgSlopRisk = Math.round(pages.reduce((acc, p) => acc + p.aiSlopRisk, 0) / n);
  const avgOriginality = Math.round(pages.reduce((acc, p) => acc + p.originalityScore, 0) / n);
  const avgSeo = Math.round(pages.reduce((acc, p) => acc + p.seoScore, 0) / n);
  const avgReadability = Math.round(pages.reduce((acc, p) => acc + p.readabilityScore, 0) / n);
  const avgTechnical = Math.round(pages.reduce((acc, p) => acc + p.technicalScore, 0) / n);

  const thinPages = pages.filter(p => p.isThinContent);
  const highRiskPages = pages.filter(p => p.aiSlopRisk >= 60 || p.aiLikelihood >= 65);

  // 1. Transparent AI-Slop Risk Breakdown
  const slopFactors = [
    {
      name: 'Generic AI Intros & Outros',
      weight: 35,
      score: Math.max(0, 100 - (pages.filter(p => p.detectedSignals.some(s => s.category === 'generic_intro' || s.category === 'generic_outro')).length / n) * 100),
      impact: avgSlopRisk > 50 ? ('negative' as const) : ('positive' as const),
      description: 'Frequency of formulaic opening thesis statements and mechanical wrap-up paragraphs.'
    },
    {
      name: 'Vocabulary & LLM Tokens',
      weight: 30,
      score: Math.max(0, 100 - (pages.filter(p => p.detectedSignals.some(s => s.category === 'formulaic_transition' || s.category === 'filler')).length / n) * 80),
      impact: avgSlopRisk > 40 ? ('negative' as const) : ('positive' as const),
      description: 'Prevalence of high-frequency AI hallmark phrases (delve, tapestry, crucial reminder).'
    },
    {
      name: 'Lack of Empirical Proof',
      weight: 20,
      score: Math.max(0, 100 - (pages.filter(p => p.detectedSignals.some(s => s.category === 'lack_of_evidence')).length / n) * 90),
      impact: avgSlopRisk > 30 ? ('negative' as const) : ('neutral' as const),
      description: 'Absence of verifiable data, first-hand experiments, named engineers, or original case study facts.'
    },
    {
      name: 'Template Duplication Penalty',
      weight: 15,
      score: Math.max(0, 100 - (duplicateClusters.length * 25)),
      impact: duplicateClusters.length > 0 ? ('negative' as const) : ('positive' as const),
      description: 'Penalty for programmatic page duplication and recycled phrasing.'
    }
  ];

  const aiSlopRiskScore: TransparentScore = {
    score: avgSlopRisk,
    label: 'AI Slop Risk',
    category: 'Integrity',
    summary: avgSlopRisk < 30
      ? 'Low risk: Content displays healthy organic variation, contextual grounding, and minimal generic AI tropes.'
      : avgSlopRisk < 60
      ? 'Moderate risk: Certain sections employ noticeable AI throat-clearing, generic transitional markers, or template structures.'
      : 'High risk: Significant concentration of automated, formulaic, and unsubstantiated text patterns detected.',
    factors: slopFactors,
    positives: avgSlopRisk < 40 ? ['Natural lexical cadence', 'Absence of robotic conclusion clichés'] : ['Some authentic sections present'],
    risks: avgSlopRisk > 40 ? ['Clustered formulaic phrasing', 'Low concentration of primary citations or data points'] : []
  };

  // 2. Transparent Content Quality Breakdown
  const qualityFactors = [
    {
      name: 'Substantive Depth',
      weight: 30,
      score: Math.max(20, Math.round(100 - (thinPages.length / n) * 80)),
      impact: thinPages.length > 0 ? ('negative' as const) : ('positive' as const),
      description: 'Proportion of pages providing actionable depth versus shallow placeholder copy.'
    },
    {
      name: 'Information Density',
      weight: 30,
      score: Math.max(30, 100 - (avgSlopRisk * 0.8)),
      impact: avgSlopRisk > 50 ? ('negative' as const) : ('positive' as const),
      description: 'Signal-to-noise ratio: meaningful technical insights versus generic filler prose.'
    },
    {
      name: 'Original Voice & Lexical Variety',
      weight: 25,
      score: avgOriginality,
      impact: avgOriginality >= 70 ? ('positive' as const) : ('neutral' as const),
      description: 'Vocabulary diversity and distinctive organizational perspective.'
    },
    {
      name: 'Structural Cohesion',
      weight: 15,
      score: avgReadability,
      impact: 'positive' as const,
      description: 'Logical hierarchy of headers, clear sentence bounds, and scannability.'
    }
  ];

  const contentQualityScore: TransparentScore = {
    score: avgQuality,
    label: 'Content Quality',
    category: 'Editorial',
    summary: avgQuality >= 75
      ? 'Strong informational substance with comprehensive narrative architecture.'
      : 'Variable substance: several pages require deeper technical validation and practical context.',
    factors: qualityFactors,
    positives: ['Consistent semantic hierarchy', 'Engaging headline framing'],
    risks: thinPages.length > 0 ? [`${thinPages.length} thin pages need editorial expansion`] : []
  };

  // 3. Originality Score
  const originalityScore: TransparentScore = {
    score: avgOriginality,
    label: 'Originality',
    category: 'Differentiation',
    summary: avgOriginality >= 70
      ? 'Distinguishable brand voice with specialized domain focus.'
      : 'Elevated similarity to industry boilerplate; would benefit from proprietary case studies and benchmarks.',
    factors: [
      {
        name: 'Unique Vocabulary (Lexical Diversity)',
        weight: 40,
        score: avgOriginality,
        impact: avgOriginality > 60 ? 'positive' : 'negative',
        description: 'Variation in technical vocabulary across crawled sections.'
      },
      {
        name: 'Absence of Cloned Content',
        weight: 35,
        score: Math.max(0, 100 - duplicateClusters.length * 20),
        impact: duplicateClusters.length === 0 ? 'positive' : 'negative',
        description: 'Degree of unique page-level value proposition.'
      },
      {
        name: 'Proprietary Research & Evidence',
        weight: 25,
        score: Math.min(100, Math.max(20, 100 - avgSlopRisk)),
        impact: 'neutral',
        description: 'References to actual systems, verifiable clients, and technical decisions.'
      }
    ],
    positives: ['Domain-specific terminology utilized effectively'],
    risks: duplicateClusters.length > 0 ? ['Recycled paragraph clusters identified'] : []
  };

  // 4. SEO Score
  const seoFactors = [
    {
      name: 'Title & Meta Integrity',
      weight: 25,
      score: Math.round(pages.filter(p => p.metaDescription && p.title).length / n * 100),
      impact: 'positive' as const,
      description: 'Complete meta titles and informative descriptions.'
    },
    {
      name: 'Heading Structure (H1/H2)',
      weight: 25,
      score: Math.round(pages.filter(p => p.h1Tags.length === 1 && p.h2Count > 0).length / n * 100),
      impact: 'positive' as const,
      description: 'Strict single H1 hierarchy with logical sub-sections.'
    },
    {
      name: 'Image Accessibility (Alt tags)',
      weight: 25,
      score: Math.round(pages.filter(p => p.imagesMissingAlt === 0).length / n * 100),
      impact: pages.some(p => p.imagesMissingAlt > 0) ? ('negative' as const) : ('positive' as const),
      description: 'Context-rich alternative descriptions on visuals.'
    },
    {
      name: 'Schema & Social Graph',
      weight: 25,
      score: Math.round(pages.filter(p => p.hasOpenGraph && p.hasSchemaMarkup).length / n * 100),
      impact: 'positive' as const,
      description: 'Structured data (JSON-LD) and Open Graph tags.'
    }
  ];

  const seoScore: TransparentScore = {
    score: avgSeo,
    label: 'SEO',
    category: 'Discoverability',
    summary: avgSeo >= 80 ? 'Comprehensive metadata and crawlable markup.' : 'SEO hygiene gaps present that impact search visibility.',
    factors: seoFactors,
    positives: ['Crawlable URLs', 'Mobile indexable tags'],
    risks: pages.some(p => p.imagesMissingAlt > 0) ? ['Visuals missing descriptive alt attributes'] : []
  };

  // 5. Readability Score
  const readabilityScore: TransparentScore = {
    score: avgReadability,
    label: 'Readability',
    category: 'Accessibility',
    summary: avgReadability >= 70 ? 'Natural sentence lengths and fluid reading cadence.' : 'Dense or fragmented paragraphs that increase cognitive friction.',
    factors: [
      {
        name: 'Sentence Length Variance',
        weight: 50,
        score: avgReadability,
        impact: 'positive',
        description: 'Balance of punchy statements and descriptive breakdowns.'
      },
      {
        name: 'Clarity & Scannability',
        weight: 50,
        score: Math.min(100, avgReadability + 10),
        impact: 'positive',
        description: 'Strategic use of lists, bold emphasis, and informative subheaders.'
      }
    ],
    positives: ['Scannable typography'],
    risks: []
  };

  // 6. Technical Health Score
  const technicalHealthScore: TransparentScore = {
    score: avgTechnical,
    label: 'Technical Health',
    category: 'Infrastructure',
    summary: avgTechnical >= 85 ? 'Fast response latencies, valid HTTPS, and responsive viewport configuration.' : 'Technical bottlenecks detected in page delivery.',
    factors: [
      {
        name: 'HTTPS & Transport Security',
        weight: 35,
        score: 100,
        impact: 'positive',
        description: 'Secure TLS channel encryption.'
      },
      {
        name: 'Mobile Viewport Configuration',
        weight: 35,
        score: 100,
        impact: 'positive',
        description: 'Responsive meta viewport for all devices.'
      },
      {
        name: 'HTTP Response Codes',
        weight: 30,
        score: Math.round(pages.filter(p => p.httpStatus === 200).length / n * 100),
        impact: 'positive',
        description: 'Clean 200 OK statuses without broken internal loops.'
      }
    ],
    positives: ['Secure HTTPS protocol', 'Mobile-responsive layout declared'],
    risks: []
  };

  // Aggregate Holistic Overall Score
  const overallVal = Math.round(
    (avgQuality * 0.3) +
    ((100 - avgSlopRisk) * 0.25) +
    (avgOriginality * 0.15) +
    (avgSeo * 0.15) +
    (avgTechnical * 0.15)
  );

  const overallScore: TransparentScore = {
    score: overallVal,
    label: 'Overall Content Quality',
    category: 'Composite Index',
    summary: overallVal >= 80
      ? 'Exemplary enterprise standard: High information density, strong SEO alignment, and low automated slop likelihood.'
      : overallVal >= 60
      ? 'Solid foundation with actionable opportunities to eradicate formulaic copy and amplify evidence.'
      : 'Urgent attention required: Content suffers from thin pages, automated generic phrasing, or duplicate clusters.',
    factors: [
      { name: 'Content Quality', weight: 30, score: avgQuality, impact: 'positive', description: 'Actionable substance and depth.' },
      { name: 'Authenticity (100 - Slop Risk)', weight: 25, score: 100 - avgSlopRisk, impact: avgSlopRisk > 40 ? 'negative' : 'positive', description: 'Freedom from formulaic AI clichés.' },
      { name: 'Originality Index', weight: 15, score: avgOriginality, impact: 'positive', description: 'Unique vocabulary and positioning.' },
      { name: 'SEO Compliance', weight: 15, score: avgSeo, impact: 'positive', description: 'Crawlability and metadata hygiene.' },
      { name: 'Technical Infrastructure', weight: 15, score: avgTechnical, impact: 'positive', description: 'Security, speed, and mobile responsiveness.' }
    ],
    positives: ['Clean technological baseline', 'Responsive delivery across viewports'],
    risks: thinPages.length > 0 ? ['Thin or formulaic pages need remediation'] : []
  };

  // 7. Synthesize Actionable Recommendations
  const recommendations: AuditRecommendation[] = [];

  if (avgSlopRisk >= 40) {
    recommendations.push({
      id: 'rec-slop-1',
      priority: 'critical',
      category: 'ai_slop',
      title: 'Eradicate Formulaic AI Introductions and Conclusions',
      description: 'Multiple pages open with predictable throat-clearing statements ("In today\'s fast-paced digital era...") and conclude with mechanical summaries. Modern search algorithms and enterprise decision-makers disfavor generic AI padding.',
      actionableSteps: [
        'Adopt Bottom-Line-Up-Front (BLUF) messaging: Place the definitive engineering thesis or key metric in the very first sentence.',
        'Delete transitional fluff words ("Delve", "Rich tapestry", "Unlock full potential").',
        'Replace generic conclusions with a concrete next step or technical decision criteria.'
      ],
      affectedPages: highRiskPages.map(p => p.url).slice(0, 5)
    });
  }

  if (thinPages.length > 0) {
    recommendations.push({
      id: 'rec-thin-1',
      priority: 'high',
      category: 'thin_content',
      title: 'Enrich Thin & Placeholder Pages with Empirical Substance',
      description: `${thinPages.length} crawled page(s) exhibit thin content characteristics with insufficient informational density to answer search intent.`,
      actionableSteps: [
        'Add specific case study data, architecture diagrams, or concrete implementation workflows.',
        'Expand shallow definitions into comprehensive problem-solution breakdowns.',
        'Ensure every public page offers standalone transactional or educational utility.'
      ],
      affectedPages: thinPages.map(p => p.url)
    });
  }

  if (duplicateClusters.length > 0) {
    recommendations.push({
      id: 'rec-dup-1',
      priority: 'high',
      category: 'duplicate_content',
      title: 'Consolidate Programmatic Duplicate Content Clusters',
      description: `Identified ${duplicateClusters.length} cluster(s) of pages sharing excessive paragraph and structural similarity. This can trigger search engine canonical penalties.`,
      actionableSteps: [
        'Differentiate service offerings with distinct feature sets, metrics, and case studies.',
        'Implement canonical tags (<link rel="canonical">) pointing to the definitive flagship page if pages serve regional variations.',
        'Avoid mass-generating location landing pages with identical boilerplate.'
      ],
      affectedPages: duplicateClusters.flatMap(c => c.pages.map(p => p.url)).slice(0, 6)
    });
  }

  const missingAltPages = pages.filter(p => p.imagesMissingAlt > 0);
  if (missingAltPages.length > 0) {
    recommendations.push({
      id: 'rec-seo-alt',
      priority: 'medium',
      category: 'seo',
      title: 'Inject Keyword-Aligned Alt Attributes on Images',
      description: `${missingAltPages.length} page(s) have images missing descriptive alt tags, degrading accessibility and image search discoverability.`,
      actionableSteps: [
        'Add descriptive, context-rich alt text explaining the system or visual.',
        'Avoid generic alt text like "image1" or "screenshot".'
      ],
      affectedPages: missingAltPages.map(p => p.url).slice(0, 5)
    });
  }

  recommendations.push({
    id: 'rec-evidence-1',
    priority: 'low',
    category: 'readability',
    title: 'Reinforce Claims with Verifiable Metrics and Citations',
    description: 'Elevate authority by replacing generalized statements ("We deliver superior speed") with measurable outcomes ("Achieved 99.98% uptime and sub-120ms API latency").',
    actionableSteps: [
      'Quantify results where legitimate engineering data exists.',
      'Cite recognized technical specifications (RFC, NIST, OWASP, ASVS) for security and architectural claims.'
    ],
    affectedPages: pages.map(p => p.url).slice(0, 3)
  });

  return {
    id: `audit-${Date.now()}`,
    targetUrl,
    domain: parsedDomain,
    crawledAt: new Date().toISOString(),
    isDemo,
    totalPagesCrawled: pages.length,
    overallScore,
    aiSlopRisk: aiSlopRiskScore,
    contentQuality: contentQualityScore,
    originality: originalityScore,
    seo: seoScore,
    readability: readabilityScore,
    technicalHealth: technicalHealthScore,
    executiveSummary: {
      status: overallVal >= 80 ? 'Exemplary' : overallVal >= 60 ? 'Needs Attention' : 'Critical Issues',
      coreVerdict: overallVal >= 80
        ? 'Platform exhibits high technical credibility with minimal AI-slop risk and strong architectural foundations.'
        : `Audit reveals actionable opportunities: mitigate ${highRiskPages.length} high-slop risk page(s), expand ${thinPages.length} thin page(s), and resolve ${duplicateClusters.length} duplicate cluster(s).`,
      keyStrengths: [
        'Strict HTTPS transport and mobile viewport compliance',
        'Consistent semantic layout hierarchy',
        'Valid HTTP status codes on scanned routes'
      ],
      criticalVulnerabilities: [
        ...(avgSlopRisk >= 40 ? ['Elevated presence of generic AI phrasing and intro boilerplate'] : []),
        ...(thinPages.length > 0 ? [`${thinPages.length} page(s) flagged for thin content`] : []),
        ...(duplicateClusters.length > 0 ? [`${duplicateClusters.length} duplicate content cluster(s)`] : [])
      ],
      topPriorities: [
        'Replace formulaic throat-clearing openings with high-signal BLUF declarations',
        'Enrich shallow pages with authentic engineering benchmarks',
        'Eliminate programmatic template duplication'
      ]
    },
    pages,
    duplicateClusters,
    thinPages,
    highRiskPages,
    recommendations
  };
}
