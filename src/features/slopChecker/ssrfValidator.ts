// AGNEX Technology — AI Slop Website Auditor
// Security Subsystem: SSRF Protection & URL Sanitizer

export interface ValidationResult {
  isValid: boolean;
  sanitizedUrl?: string;
  error?: string;
}

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  'metadata.google.internal',
  'instance-data',
  '169.254.169.254'
]);

/**
 * Validates a target URL against SSRF vulnerabilities, internal IP ranges,
 * cloud metadata endpoints, and dangerous protocols.
 */
export function validateAndSanitizeUrl(rawInput: string): ValidationResult {
  if (!rawInput || typeof rawInput !== 'string') {
    return { isValid: false, error: 'URL is required.' };
  }

  let trimmed = rawInput.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return { isValid: false, error: 'Malformed URL format. Please provide a valid domain (e.g., example.com).' };
  }

  // 1. Protocol Restriction
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return { isValid: false, error: 'Only HTTP and HTTPS protocols are permitted.' };
  }

  const hostname = parsed.hostname.toLowerCase();

  // 2. Direct Hostname Denylist
  if (hostname === '169.254.169.254' || hostname === 'metadata.google.internal' || hostname === 'instance-data') {
    return { isValid: false, error: 'Cloud metadata endpoints (169.254.x.x) are prohibited.' };
  }
  if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return { isValid: false, error: 'Crawling localhost or internal loopback endpoints is forbidden.' };
  }

  // 3. IPv4 Private Range Filter
  const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const ipMatch = hostname.match(ipv4Regex);
  if (ipMatch) {
    const [, o1, o2, o3, o4] = ipMatch.map(Number);
    if (o1 > 255 || o2 > 255 || o3 > 255 || o4 > 255) {
      return { isValid: false, error: 'Invalid IPv4 address.' };
    }

    // 127.0.0.0/8 (Loopback)
    if (o1 === 127) {
      return { isValid: false, error: 'Loopback IPv4 addresses are prohibited.' };
    }
    // 10.0.0.0/8 (Private)
    if (o1 === 10) {
      return { isValid: false, error: 'Private RFC1918 addresses are prohibited.' };
    }
    // 172.16.0.0/12 (Private)
    if (o1 === 172 && o2 >= 16 && o2 <= 31) {
      return { isValid: false, error: 'Private RFC1918 addresses are prohibited.' };
    }
    // 192.168.0.0/16 (Private)
    if (o1 === 192 && o2 === 168) {
      return { isValid: false, error: 'Private RFC1918 addresses are prohibited.' };
    }
    // 169.254.0.0/16 (Link Local / Cloud Metadata)
    if (o1 === 169 && o2 === 254) {
      return { isValid: false, error: 'Cloud metadata endpoints (169.254.x.x) are prohibited.' };
    }
    // 0.0.0.0/8
    if (o1 === 0) {
      return { isValid: false, error: 'Invalid broadcast address.' };
    }
  }

  // 4. IPv6 Private / Link-Local Filter
  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    const cleanIpv6 = hostname.slice(1, -1).toLowerCase();
    if (
      cleanIpv6 === '::1' ||
      cleanIpv6.startsWith('fe80:') ||
      cleanIpv6.startsWith('fc00:') ||
      cleanIpv6.startsWith('fd00:')
    ) {
      return { isValid: false, error: 'Private IPv6 addresses are prohibited.' };
    }
  }

  // 5. Must have a valid dot-separated TLD if not a valid public IP
  if (!ipMatch && !hostname.includes('.')) {
    return { isValid: false, error: 'Hostname must include a valid top-level domain.' };
  }

  return {
    isValid: true,
    sanitizedUrl: parsed.origin + parsed.pathname
  };
}
