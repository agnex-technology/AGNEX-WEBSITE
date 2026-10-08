import { CountryCode, CountryConfig } from './types';

export const COUNTRIES: Record<CountryCode, CountryConfig> = {
  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    dialCode: '+91',
    phoneFormat: '+91 75983 41607',
    timeZone: 'Asia/Kolkata',
    timeZoneLabel: 'IST (UTC+5:30)',
    dateFormat: 'DD/MM/YYYY',
    locale: 'en-IN',
    marketLabel: 'India · INR ₹',
    heroTagline: 'Custom Software, AI & Digital Engineering for Indian Businesses.',
    supportingMessage: 'We design and build bespoke ERP systems, double-entry inventory ledgers, mobile applications, and AI automation that solve real operational bottlenecks.',
    budgetTiers: [
      { id: 'in_tier_1', label: '₹35,000 – ₹75,000', range: 'Websites & Foundation Presence' },
      { id: 'in_tier_2', label: '₹75,000 – ₹1,50,000', range: 'Creative Websites / AI / Automation' },
      { id: 'in_tier_3', label: '₹1,50,000 – ₹5,00,000', range: 'Web Apps / Mobile Apps / CRM / ERP' },
      { id: 'in_tier_4', label: '₹5,00,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'Bespoke ERP & multi-warehouse inventory systems',
      'Mobile driver & field dispatch applications (React Native)',
      'GST-ready billing engines and accounting reconciliations',
      'Internal operational portals replacing Excel spreadsheets'
    ],
    businessContext: {
      invoicingLabel: 'GST Tax Invoicing (B2B)',
      taxLabel: '18% GST (CGST/SGST/IGST compliant)',
      workflowContext: 'Engineered for Indian operational realities and multi-branch networks.',
      turnaround: '4 to 8 weeks for production MVP releases.'
    },
    contactCta: 'Discuss Your Requirement',
    secondaryCta: 'Talk to us on WhatsApp',
    showWhatsApp: true,
    priorityIndustries: [
      'Manufacturing & Fabrication',
      'Freight, Fleet & Logistics',
      'Wholesale & Multi-Location Distribution',
      'Healthcare & Diagnostic Centers',
      'Indian B2B Software & FinTech'
    ]
  },

  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    dialCode: '+1',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'America/New_York',
    timeZoneLabel: 'EST / PST Compatible',
    dateFormat: 'MM/DD/YYYY',
    locale: 'en-US',
    marketLabel: 'United States · USD $',
    heroTagline: 'India-Based Engineering. Built for Ambitious US Companies.',
    supportingMessage: 'We engineer high-performance web applications, autonomous AI agents, and resilient cloud backbones with senior architectural ownership and zero vendor lock-in.',
    budgetTiers: [
      { id: 'us_tier_1', label: '$500 – $1,500', range: 'Websites & Foundation Presence' },
      { id: 'us_tier_2', label: '$1,500 – $3,500', range: 'Creative Web / Automation / AI' },
      { id: 'us_tier_3', label: '$3,500 – $10,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'us_tier_4', label: '$10,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'Multi-tenant B2B SaaS engineering (Next.js & Node.js/Python)',
      'Grounded RAG and enterprise LLM autonomous agents',
      'High-throughput cloud APIs and database sharding on AWS',
      'Legacy software migration to modern containerized microservices'
    ],
    businessContext: {
      invoicingLabel: 'International Commercial Invoicing (W-8BEN-E Compliant)',
      taxLabel: 'Zero US Sales Tax on International Tech Services',
      workflowContext: 'Dedicated senior engineers with overlapping US working hours.',
      turnaround: '6 to 12 weeks for production releases.'
    },
    contactCta: 'Start a Project',
    secondaryCta: 'Schedule Technical Discovery',
    showWhatsApp: false,
    priorityIndustries: [
      'B2B SaaS & Software Scaleups',
      'Logistics & Supply Chain Platforms',
      'Cybersecurity & Autonomous SOC',
      'Legal Intelligence & Document RAG'
    ]
  },

  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    dialCode: '+44',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'Europe/London',
    timeZoneLabel: 'GMT / BST (UTC+0/+1)',
    dateFormat: 'DD/MM/YYYY',
    locale: 'en-GB',
    marketLabel: 'United Kingdom · GBP £',
    heroTagline: 'India-Based Engineering. Built for UK & European Businesses.',
    supportingMessage: 'We engineer robust digital systems, GDPR-conscious software architectures, and automated cloud workflows that solve genuine operational problems.',
    budgetTiers: [
      { id: 'gb_tier_1', label: '£400 – £1,200', range: 'Websites & Foundation Presence' },
      { id: 'gb_tier_2', label: '£1,200 – £3,000', range: 'Creative Web / Automation / AI' },
      { id: 'gb_tier_3', label: '£3,000 – £8,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'gb_tier_4', label: '£8,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'GDPR-conscious relational platforms and access audit controls',
      'Enterprise workflow automation and API gateways',
      'Cross-platform mobile applications for field operations',
      'Custom ERP systems eliminating legacy recurring fees'
    ],
    businessContext: {
      invoicingLabel: 'UK VAT Reverse Charge Compliant',
      taxLabel: '0% UK VAT on Cross-Border B2B Engineering Services',
      workflowContext: 'UK-overlapping development sprints and bi-weekly staging drops.',
      turnaround: '6 to 12 weeks for production releases.'
    },
    contactCta: 'Start a Project',
    secondaryCta: 'Book Technical Consultation',
    showWhatsApp: false,
    priorityIndustries: [
      'Fintech & Payment Infrastructure',
      'Freight & Maritime Logistics',
      'Enterprise Software & Professional Services',
      'Legal & Compliance Technology'
    ]
  },

  AE: {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'AED ',
    dialCode: '+971',
    phoneFormat: '+91 75983 41607 (Direct / WhatsApp)',
    timeZone: 'Asia/Dubai',
    timeZoneLabel: 'GST (UTC+4)',
    dateFormat: 'DD/MM/YYYY',
    locale: 'en-AE',
    marketLabel: 'UAE · AED',
    heroTagline: 'Engineering Custom Software & AI Systems for Middle East Enterprises.',
    supportingMessage: 'High-performance ERP backbones, logistics dispatch platforms, and intelligent automation built for rapid regional commercial expansion.',
    budgetTiers: [
      { id: 'ae_tier_1', label: 'AED 1,500 – AED 4,000', range: 'Websites & Foundation Presence' },
      { id: 'ae_tier_2', label: 'AED 4,000 – AED 9,000', range: 'Creative Web / Automation / AI' },
      { id: 'ae_tier_3', label: 'AED 9,000 – AED 25,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'ae_tier_4', label: 'AED 25,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'Cross-border freight and radial fleet dispatch applications',
      'Custom trading, procurement, and inventory ledgers',
      'Bilingual Arabic/English multi-tenant web portals',
      'High-velocity CRM and customer interaction tracking'
    ],
    businessContext: {
      invoicingLabel: 'UAE Corporate Invoicing Standard',
      taxLabel: 'Cross-Border B2B Services Protocol',
      workflowContext: 'Aligned with UAE Gulf Standard Time (GST) operational schedules.',
      turnaround: '4 to 10 weeks for production releases.'
    },
    contactCta: 'Discuss Your Requirement',
    secondaryCta: 'Talk to us on WhatsApp',
    showWhatsApp: true,
    priorityIndustries: [
      'Cross-Border Logistics & Freight Trading',
      'Wholesale Distribution & Real Estate Portals',
      'Enterprise Operations & Contracting',
      'Financial Services & Fintech'
    ]
  },

  SG: {
    code: 'SG',
    name: 'Singapore',
    currency: 'SGD',
    currencySymbol: 'S$',
    dialCode: '+65',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'Asia/Singapore',
    timeZoneLabel: 'SGT (UTC+8)',
    dateFormat: 'DD/MM/YYYY',
    locale: 'en-SG',
    marketLabel: 'Singapore · SGD S$',
    heroTagline: 'India-Based Engineering. Built for APAC Technology Teams.',
    supportingMessage: 'We engineer high-availability cloud platforms, secure transactional ledgers, and intelligent automation for Southeast Asian technology companies.',
    budgetTiers: [
      { id: 'sg_tier_1', label: 'S$600 – S$1,800', range: 'Websites & Foundation Presence' },
      { id: 'sg_tier_2', label: 'S$1,800 – S$4,500', range: 'Creative Web / Automation / AI' },
      { id: 'sg_tier_3', label: 'S$4,500 – S$12,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'sg_tier_4', label: 'S$12,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'High-concurrency API microservices and event queues',
      'Financial data ingestion and reconciliation systems',
      'Supply chain radial dispatch and asset monitoring',
      'Autonomous threat detection and SOC intelligence'
    ],
    businessContext: {
      invoicingLabel: 'Singapore GST Zero-Rated Export Service',
      taxLabel: 'Zero GST on Cross-Border Engineering Services',
      workflowContext: 'Same day APAC working hour overlap.',
      turnaround: '6 to 10 weeks for production releases.'
    },
    contactCta: 'Start a Project',
    secondaryCta: 'Schedule Technical Discovery',
    showWhatsApp: false,
    priorityIndustries: [
      'Fintech & Digital Commerce',
      'Port & Supply Chain Logistics',
      'Regional B2B SaaS',
      'Enterprise Operations'
    ]
  },

  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    dialCode: '+61',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'Australia/Sydney',
    timeZoneLabel: 'AEST (UTC+10/+11)',
    dateFormat: 'DD/MM/YYYY',
    locale: 'en-AU',
    marketLabel: 'Australia · AUD A$',
    heroTagline: 'India-Based Engineering. Built for Australian Businesses.',
    supportingMessage: 'Custom software, mobile applications, and cloud systems engineered for reliability, code sovereignty, and clean operational integration.',
    budgetTiers: [
      { id: 'au_tier_1', label: 'A$700 – A$2,000', range: 'Websites & Foundation Presence' },
      { id: 'au_tier_2', label: 'A$2,000 – A$5,000', range: 'Creative Web / Automation / AI' },
      { id: 'au_tier_3', label: 'A$5,000 – A$15,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'au_tier_4', label: 'A$15,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'Field service and mobile inspection applications',
      'Custom ERP systems eliminating recurring SaaS seats',
      'Cloud backend engineering on AWS / Docker',
      'Automated invoice and bookkeeping reconciliation'
    ],
    businessContext: {
      invoicingLabel: 'Australian GST Export-Exempt Invoicing',
      taxLabel: 'Zero GST on Cross-Border Tech Services',
      workflowContext: 'Morning overlap with Australian working hours.',
      turnaround: '6 to 12 weeks for production releases.'
    },
    contactCta: 'Start a Project',
    secondaryCta: 'Request Technical Discovery',
    showWhatsApp: false,
    priorityIndustries: [
      'Mining & Field Service Operations',
      'Transport & Logistics Fleet Management',
      'B2B SaaS & Tech Scaleups',
      'Healthcare Management Systems'
    ]
  },

  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'CA$',
    dialCode: '+1',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'America/Toronto',
    timeZoneLabel: 'EST / PST Compatible',
    dateFormat: 'YYYY-MM-DD',
    locale: 'en-CA',
    marketLabel: 'Canada · CAD CA$',
    heroTagline: 'India-Based Engineering. Built for Canadian Businesses.',
    supportingMessage: 'We engineer custom business software, secure web applications, and autonomous AI pipelines with senior architectural ownership and zero vendor lock-in.',
    budgetTiers: [
      { id: 'ca_tier_1', label: 'CA$700 – CA$2,000', range: 'Websites & Foundation Presence' },
      { id: 'ca_tier_2', label: 'CA$2,000 – CA$5,000', range: 'Creative Web / Automation / AI' },
      { id: 'ca_tier_3', label: 'CA$5,000 – CA$14,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'ca_tier_4', label: 'CA$14,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'B2B SaaS platform development with Next.js & TypeScript',
      'Fleet logistics tracking and radial load matching',
      'Custom CRM and automated customer onboarding',
      'Cloud modernization and Docker CI/CD pipelines'
    ],
    businessContext: {
      invoicingLabel: 'Canada GST/HST Zero-Rated Export Service',
      taxLabel: 'Zero GST/HST on Cross-Border Tech Services',
      workflowContext: 'Full overlap with Canadian EST/CST working hours.',
      turnaround: '6 to 12 weeks for production releases.'
    },
    contactCta: 'Start a Project',
    secondaryCta: 'Request a Consultation',
    showWhatsApp: false,
    priorityIndustries: [
      'Supply Chain & Fleet Logistics',
      'B2B SaaS Platforms',
      'Legal & Compliance Technology',
      'Manufacturing Operations'
    ]
  },

  DE: {
    code: 'DE',
    name: 'Germany',
    currency: 'EUR',
    currencySymbol: '€',
    dialCode: '+49',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'Europe/Berlin',
    timeZoneLabel: 'CET (UTC+1/+2)',
    dateFormat: 'DD.MM.YYYY',
    locale: 'de-DE',
    marketLabel: 'Germany · EUR €',
    heroTagline: 'India-Based Engineering. Built for German & European Enterprises.',
    supportingMessage: 'High-precision software engineering, GDPR-compliant database architectures, and deterministic automation for mid-market and enterprise companies.',
    budgetTiers: [
      { id: 'de_tier_1', label: '€500 – €1.500', range: 'Websites & Digitale Basis' },
      { id: 'de_tier_2', label: '€1.500 – €3.500', range: 'Kreative Websites / KI / Automatisierung' },
      { id: 'de_tier_3', label: '€3.500 – €10.000', range: 'Web-Apps / Mobile Apps / ERP' },
      { id: 'de_tier_4', label: '€10.000+', range: 'Maßgeschneiderte Unternehmensarchitektur' }
    ],
    typicalEngagements: [
      'DSGVO / GDPR-konforme relationale Datenbanken (PostgreSQL)',
      'Automatisierte ERP- und Lagerverwaltungssysteme',
      'Industrielle Prozessautomatisierung und Event-Queues',
      'Sichere API-Gateways und Cloud-Architektur'
    ],
    businessContext: {
      invoicingLabel: 'EU B2B Reverse Charge Invoicing',
      taxLabel: '0% Mehrwertsteuer bei grenzüberschreitenden B2B-Dienstleistungen',
      workflowContext: 'Volle Überlappung mit europäischen CET-Arbeitszeiten.',
      turnaround: '6 bis 12 Wochen für Produktionsversionen.'
    },
    contactCta: 'Projekt besprechen',
    secondaryCta: 'Technische Beratung anfragen',
    showWhatsApp: false,
    priorityIndustries: [
      'Industrie 4.0 & Fertigung',
      'Logistik & Flottensteuerung',
      'B2B SaaS & Unternehmenssoftware',
      'Datenschutzkonforme Systeme'
    ]
  },

  GLOBAL: {
    code: 'GLOBAL',
    name: 'International',
    currency: 'USD',
    currencySymbol: '$',
    dialCode: '+1',
    phoneFormat: '+91 75983 41607 (Global Desk)',
    timeZone: 'UTC',
    timeZoneLabel: 'UTC / Global',
    dateFormat: 'YYYY-MM-DD',
    locale: 'en-US',
    marketLabel: 'Global · USD $',
    heroTagline: 'India-Based Software Engineering for Businesses Worldwide.',
    supportingMessage: 'We engineer custom business software, high-performance web platforms, and intelligent AI automation with direct senior engineering ownership.',
    budgetTiers: [
      { id: 'gl_tier_1', label: '$500 – $1,500', range: 'Websites & Digital Foundation' },
      { id: 'gl_tier_2', label: '$1,500 – $3,500', range: 'Creative Web / Automation / AI' },
      { id: 'gl_tier_3', label: '$3,500 – $10,000', range: 'Custom Web Apps / Mobile / ERP' },
      { id: 'gl_tier_4', label: '$10,000+', range: 'Custom Enterprise Engineering' }
    ],
    typicalEngagements: [
      'Custom business platforms and internal workflow tools',
      'Mobile applications (React Native iOS & Android)',
      'Autonomous AI workflows and RAG retrieval pipelines',
      'Cloud DevOps and automated CI/CD deployments'
    ],
    businessContext: {
      invoicingLabel: 'International Commercial Invoicing',
      taxLabel: 'Direct B2B Software Engineering Services',
      workflowContext: 'Flexible international sprint coordination and weekly video standups.',
      turnaround: '6 to 12 weeks for production releases.'
    },
    contactCta: 'Start a Project',
    secondaryCta: 'Book Technical Discovery',
    showWhatsApp: false,
    priorityIndustries: [
      'B2B Software & Digital Products',
      'Logistics & Fleet Operations',
      'Cybersecurity & Autonomous SOC',
      'Enterprise Workflow Modernization'
    ]
  }
};

export const SUPPORTED_COUNTRY_CODES: CountryCode[] = [
  'IN',
  'US',
  'GB',
  'AE',
  'SG',
  'AU',
  'CA',
  'DE',
  'GLOBAL'
];

export const DEFAULT_COUNTRY = COUNTRIES.IN;
