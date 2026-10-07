/**
 * AGNEX Technology — Enterprise Design Tokens (TypeScript)
 * Engineering What's Next.
 */

export const tokens = {
  colors: {
    // Foundations
    black: '#0B0D10',
    base: '#0B0D10',
    baseRaised: '#12151B',
    baseCard: '#151820',
    white: '#F7F8FA',
    graphite: '#20242B',
    graphiteLight: '#2E343E',
    steel: '#7C8490',
    steelDark: '#4A515D',
    steelLight: '#A4ACB9',

    // Primary Brand Accent (Official AGNEX Logo Arrow Blue)
    blue: '#057AEF',
    accent: '#057AEF',
    accentHover: '#0468CE',
    accentActive: '#0357AC',
    accentSubtle: 'rgba(5, 122, 239, 0.08)',
    accentBorder: 'rgba(5, 122, 239, 0.32)',

    // Status
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#057AEF',

    // Semantic CSS variable bindings
    bgMain: 'var(--bg-main)',
    bgSurface: 'var(--bg-surface)',
    bgCard: 'var(--bg-card)',
    textMain: 'var(--text-main)',
    textMuted: 'var(--text-muted)',
    borderColor: 'var(--border-color)',
  },

  typography: {
    display: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  radius: {
    none: '0px',
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '9999px',
  },

  breakpoints: {
    mobile: '430px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
    wide: '1440px',
  }
} as const;
