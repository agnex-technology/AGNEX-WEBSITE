/**
 * AGNEX Technology — Responsive Breakpoints & Grid Rules
 * First-class compositions across all screen tiers.
 */

export const breakpoints = {
  xs: '320px',    // Compact mobile
  sm: '375px',    // Standard mobile (iPhone SE, etc.)
  mobile: '430px',// Pro Max mobile
  tablet: '768px',// iPad / tablet portrait (8-column grid)
  laptop: '1024px',// Tablet landscape / small laptop (12-column grid)
  desktop: '1280px',// Desktop standard
  wide: '1440px',   // Enterprise widescreen displays
} as const;

export const gridColumns = {
  mobile: 4,
  tablet: 8,
  desktop: 12,
} as const;

export const mediaQueries = {
  mobileOnly: '(max-width: 767px)',
  tabletUp: '(min-width: 768px)',
  tabletOnly: '(min-width: 768px) and (max-width: 1023px)',
  laptopUp: '(min-width: 1024px)',
  desktopUp: '(min-width: 1280px)',
  wideUp: '(min-width: 1440px)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;
