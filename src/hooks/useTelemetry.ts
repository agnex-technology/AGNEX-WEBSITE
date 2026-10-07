import { useCallback } from 'react';

type TelemetryEvent = 
  | 'FALLBACK_ROUTE_LOAD'
  | 'FALLBACK_ERROR_BOUNDARY'
  | 'FORM_VALIDATION_FAILURE';

interface TelemetryData {
  component: string;
  reason?: string;
  path?: string;
  [key: string]: any;
}

export function useTelemetry() {
  const trackEvent = useCallback((event: TelemetryEvent, data: TelemetryData) => {
    // In a production environment, this would post to a Datadog/Sentry endpoint.
    // For now, we simulate the hook with console output and timestamp.
    const payload = {
      timestamp: new Date().toISOString(),
      event,
      ...data,
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    };

    console.info('[AGNEX_TELEMETRY]', JSON.stringify(payload));
  }, []);

  return { trackEvent };
}
