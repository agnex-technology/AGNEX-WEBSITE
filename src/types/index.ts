/**
 * AGNEX Technology — Core Enterprise Domain Types
 */

export type PillarId = 'DIGITAL' | 'SYSTEMS' | 'INTELLIGENCE' | 'ENGINEERING';

export interface PillarDetail {
  id: PillarId;
  code: string;
  name: string;
  headline: string;
  problem: string;
  approach: string;
  deliverables: string[];
  businessOutcome: string;
}

export interface ProjectCaseStudy {
  id: string;
  title: string;
  tagline: string;
  type: 'Client Engagement' | 'Internal Engineering Platform' | 'Reference Architecture';
  industry: string;
  context: string;
  challenge: string;
  approach: string;
  solution: string;
  architectureDetails: {
    frontend: string;
    backend: string;
    database: string;
    infrastructure: string;
  };
  technologies: string[];
  results: {
    metric: string;
    label: string;
  }[];
  relatedCapabilities: PillarId[];
}

export interface ContactInquiry {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  website?: string;
  capabilityPillar: PillarId;
  projectDescription: string;
  timeline: string;
  budgetRange: string;
  contactMethod: 'email' | 'phone' | 'video_call';
}

export interface NavigationItem {
  path: string;
  label: string;
  isCTA?: boolean;
}

export interface SEOPageMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article';
}
