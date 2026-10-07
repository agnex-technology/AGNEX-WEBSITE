// AGNEX Technology — Canonical Site Configuration
// Centralized enterprise metadata, canonical URLs, and branding parameters

const rawUrl = typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
  ? import.meta.env.VITE_SITE_URL
  : 'https://agnextechnology.com';

// Ensure no trailing slash for consistent concatenation
export const SITE_URL = rawUrl.replace(/\/+$/, '');

export const siteConfig = {
  name: 'AGNEX Technology',
  shortName: 'AGNEX',
  tagline: "Engineering What's Next.",
  brandPromise: 'Ideas, engineered into impact.',
  description:
    'AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions. Ideas, engineered into impact.',
  url: SITE_URL,
  ogImage: `${SITE_URL}/brand/agnex-og.png`,
  contactEmail: 'contact@agnextechnology.com',
  links: {
    linkedin: 'https://linkedin.com/company/agnex-technology',
    consultation: `${SITE_URL}/contact`,
    capabilities: `${SITE_URL}/expertise`,
    work: `${SITE_URL}/work`
  },
  pillars: [
    { code: '01', name: 'DIGITAL', description: 'Websites, web applications, mobile apps, digital products' },
    { code: '02', name: 'SYSTEMS', description: 'ERP, CRM, inventory, automated billing, business software' },
    { code: '03', name: 'INTELLIGENCE', description: 'AI, deterministic automation, predictive analytics' },
    { code: '04', name: 'ENGINEERING', description: 'Architecture, high-throughput APIs, cloud modernization' }
  ]
};
