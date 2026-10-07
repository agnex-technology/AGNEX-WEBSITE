// AGNEX Technology — AI Slop Website Auditor & Content Quality Intelligence
// Enterprise Types & Data Contracts

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type IssuePriority = 'critical' | 'high' | 'medium' | 'low';

export interface ScoreBreakdownFactor {
  name: string;
  weight: number; // Percentage or weight
  score: number; // 0-100
  impact: 'positive' | 'neutral' | 'negative';
  description: string;
}

export interface TransparentScore {
  score: number;
  label: string;
  category: string;
  summary: string;
  factors: ScoreBreakdownFactor[];
  positives: string[];
  risks: string[];
}

export interface SlopSignalMatch {
  patternId: string;
  label: string;
  category: 'generic_intro' | 'generic_outro' | 'formulaic_transition' | 'vague_claim' | 'filler' | 'keyword_stuffing' | 'lack_of_evidence';
  snippets: string[];
  severity: IssuePriority;
  explanation: string;
}

export interface PageAuditItem {
  id: string;
  url: string;
  path: string;
  title: string;
  wordCount: number;
  characterCount: number;
  
  // Core Page Scores (0-100)
  overallQuality: number;
  aiLikelihood: number; // 0-100% likelihood
  aiSlopRisk: number; // 0-100% risk score
  originalityScore: number;
  seoScore: number;
  readabilityScore: number;
  technicalScore: number;
  
  // Specific Flags
  isThinContent: boolean;
  thinContentReason?: string;
  lexicalDiversity: number; // Unique words / total words
  
  // Slop & Quality Signals
  detectedSignals: SlopSignalMatch[];
  
  // SEO Details
  h1Tags: string[];
  h2Count: number;
  metaDescription: string | null;
  hasCanonical: boolean;
  hasSchemaMarkup: boolean;
  hasOpenGraph: boolean;
  hasTwitterCard: boolean;
  imagesMissingAlt: number;
  totalImages: number;
  
  // Technical Details
  httpStatus: number;
  isHttps: boolean;
  hasMobileViewport: boolean;
  loadLatencyMs: number;
  contentLengthBytes: number;
  
  // Problems List
  problems: string[];
}

export interface DuplicateCluster {
  id: string;
  similarityPercentage: number;
  representativeTheme: string;
  explanation: string;
  pages: {
    url: string;
    path: string;
    title: string;
    snippet: string;
  }[];
}

export interface AuditRecommendation {
  id: string;
  priority: IssuePriority;
  category: 'ai_slop' | 'thin_content' | 'duplicate_content' | 'seo' | 'technical' | 'readability';
  title: string;
  description: string;
  actionableSteps: string[];
  affectedPages: string[];
}

export interface FullAuditReport {
  id: string;
  targetUrl: string;
  domain: string;
  crawledAt: string;
  isDemo: boolean;
  totalPagesCrawled: number;
  
  // Aggregate Scores (0-100)
  overallScore: TransparentScore;
  aiSlopRisk: TransparentScore;
  contentQuality: TransparentScore;
  originality: TransparentScore;
  seo: TransparentScore;
  readability: TransparentScore;
  technicalHealth: TransparentScore;
  
  // Executive Summary
  executiveSummary: {
    status: 'Exemplary' | 'Good' | 'Needs Attention' | 'High Slop Risk' | 'Critical Issues';
    coreVerdict: string;
    keyStrengths: string[];
    criticalVulnerabilities: string[];
    topPriorities: string[];
  };
  
  // Detailed Findings
  pages: PageAuditItem[];
  duplicateClusters: DuplicateCluster[];
  thinPages: PageAuditItem[];
  highRiskPages: PageAuditItem[];
  recommendations: AuditRecommendation[];
}

export interface AuditRequestPayload {
  url: string;
  maxPages?: number;
}
