// AGNEX Technology — Privacy-Preserving Analytics Integration
// Only activates when VITE_GA_MEASUREMENT_ID is configured in the environment.
// Free Tier: Google Analytics 4 (Zero cost, no external paid libraries)

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const GA_MEASUREMENT_ID = typeof import.meta !== 'undefined' && import.meta.env?.VITE_GA_MEASUREMENT_ID
  ? String(import.meta.env.VITE_GA_MEASUREMENT_ID).trim()
  : '';

/**
 * Initialize Google Analytics 4 asynchronously.
 * If VITE_GA_MEASUREMENT_ID is not provided, this function no-ops with zero runtime cost.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // Prevent duplicate script tags
  if (document.getElementById('ga4-script')) {
    return;
  }

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: any[]) {
    window.dataLayer?.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });
}

/**
 * Track virtual page views upon client-side router navigation.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title
  });
}

/**
 * Track custom user actions (e.g. consultation form submission).
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}
