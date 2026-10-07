/**
 * Phase 128 — Enterprise AI Governance
 * PII Guard — detects and redacts Personally Identifiable Information
 * before content is sent to external AI providers.
 * 
 * Patterns: Email, Phone, SSN, Credit Card, IP Address, Passport, DoB
 */

const PII_PATTERNS = [
  { name: 'email',       pattern: /\b[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}\b/g,    replace: '[EMAIL_REDACTED]' },
  { name: 'phone_us',    pattern: /\b(\+1[\s\-]?)?(\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4})\b/g,  replace: '[PHONE_REDACTED]' },
  { name: 'ssn',         pattern: /\b\d{3}-\d{2}-\d{4}\b/g,                                    replace: '[SSN_REDACTED]' },
  { name: 'credit_card', pattern: /\b(?:\d{4}[\s\-]?){3}\d{4}\b/g,                             replace: '[CC_REDACTED]' },
  { name: 'ip_address',  pattern: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,                              replace: '[IP_REDACTED]' },
  { name: 'passport',    pattern: /\b[A-Z]{1,2}\d{6,9}\b/g,                                    replace: '[PASSPORT_REDACTED]' },
];

// Terms that, if found, indicate PII-heavy content and block the request
const BLOCK_KEYWORDS = ['social security', 'my ssn is', 'my credit card number', 'my passport number'];

class PIIGuard {
  /**
   * Scan text for PII — returns redacted version and scan result
   * @param {string} text
   * @param {object} options
   * @param {boolean} options.block  - Block request entirely if high-risk PII detected
   * @param {boolean} options.redact - Redact PII before sending (default: true)
   * @returns {{ clean: string, detected: string[], blocked: boolean, message?: string }}
   */
  scan(text, { block = false, redact = true } = {}) {
    const detected = [];
    let clean = text;

    // Check block keywords
    const lowerText = text.toLowerCase();
    const hasBlockKeyword = BLOCK_KEYWORDS.some(kw => lowerText.includes(kw));
    if (hasBlockKeyword && block) {
      return { clean: text, detected: ['high_risk_pii'], blocked: true, message: 'Request blocked: sensitive personal information detected. Please remove personal data before asking.' };
    }

    // Detect and optionally redact
    for (const { name, pattern, replace } of PII_PATTERNS) {
      if (pattern.test(text)) {
        detected.push(name);
        if (redact) clean = clean.replace(pattern, replace);
        pattern.lastIndex = 0; // Reset regex state
      }
    }

    return { clean, detected, blocked: false };
  }

  /** Redact PII from text */
  redact(text) {
    return this.scan(text, { redact: true }).clean;
  }
}

const piiGuard = new PIIGuard();
module.exports = { piiGuard, PIIGuard };
