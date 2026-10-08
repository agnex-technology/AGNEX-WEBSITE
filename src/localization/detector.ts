import { CountryCode } from './types';
import { COUNTRIES, SUPPORTED_COUNTRY_CODES } from './countries';

const PREF_STORAGE_KEY = 'agnex_country_pref';

/**
 * Resolves country code based on strict non-invasive hierarchy:
 * 1. User's manually saved preference in localStorage
 * 2. Client browser timezone analysis
 * 3. Browser locale / language preference
 * 4. India Default ('IN')
 */
export function detectInitialCountry(): CountryCode {
  if (typeof window === 'undefined') {
    return 'IN';
  }

  // 01 — Check user's explicitly saved country preference
  try {
    const saved = localStorage.getItem(PREF_STORAGE_KEY) as CountryCode | null;
    if (saved && SUPPORTED_COUNTRY_CODES.includes(saved)) {
      return saved;
    }
  } catch {
    // Ignore localStorage access failures in restricted environments
  }

  // 02 — Check browser timezone (zero network overhead, instant synchronous resolution)
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      if (timeZone.includes('Calcutta') || timeZone.includes('Kolkata')) {
        return 'IN';
      }
      if (timeZone.startsWith('America/')) {
        if (timeZone.includes('Toronto') || timeZone.includes('Vancouver') || timeZone.includes('Montreal') || timeZone.includes('Edmonton')) {
          return 'CA';
        }
        return 'US';
      }
      if (timeZone.includes('London')) {
        return 'GB';
      }
      if (timeZone.includes('Dubai')) {
        return 'AE';
      }
      if (timeZone.includes('Singapore')) {
        return 'SG';
      }
      if (timeZone.startsWith('Australia/')) {
        return 'AU';
      }
      if (timeZone.includes('Berlin') || timeZone.includes('Munich') || timeZone.includes('Frankfurt')) {
        return 'DE';
      }
    }
  } catch {
    // Fallthrough to locale check
  }

  // 03 — Check browser navigator language
  try {
    const lang = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    const upper = lang.toUpperCase();
    if (upper.endsWith('-IN') || upper === 'HI') {
      return 'IN';
    }
    if (upper.endsWith('-GB')) {
      return 'GB';
    }
    if (upper.endsWith('-US')) {
      return 'US';
    }
    if (upper.endsWith('-AE') || upper.startsWith('AR-')) {
      return 'AE';
    }
    if (upper.endsWith('-SG')) {
      return 'SG';
    }
    if (upper.endsWith('-AU')) {
      return 'AU';
    }
    if (upper.endsWith('-CA')) {
      return 'CA';
    }
    if (upper.endsWith('-DE') || upper.startsWith('DE')) {
      return 'DE';
    }
  } catch {
    // Fallthrough to default
  }

  // 04 — Default to India
  return 'IN';
}

/**
 * Persists the user's explicit country preference.
 */
export function saveCountryPreference(code: CountryCode): void {
  if (typeof window === 'undefined') return;
  try {
    if (SUPPORTED_COUNTRY_CODES.includes(code)) {
      localStorage.setItem(PREF_STORAGE_KEY, code);
    }
  } catch {
    // Ignore storage errors in private browsing
  }
}

/**
 * Format currency amounts according to country locale rules.
 */
export function formatCurrencyAmount(amount: number, countryCode: CountryCode): string {
  const config = COUNTRIES[countryCode] || COUNTRIES.IN;
  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `${config.currencySymbol}${amount.toLocaleString()}`;
  }
}
