import { Component, ErrorInfo, ReactNode } from 'react';
import { useTelemetry } from '../../hooks/useTelemetry';

interface Props {
  children: ReactNode;
  trackEvent?: (event: any, data: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('AGNEX Application Exception:', error, errorInfo);
    if (this.props.trackEvent) {
      this.props.trackEvent('FALLBACK_ERROR_BOUNDARY', {
        component: 'ErrorBoundary',
        reason: error.message,
        stack: errorInfo.componentStack
      });
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--agnex-base)',
            color: 'var(--text-main)',
            padding: '2rem'
          }}
        >
          <div
            style={{
              maxWidth: '560px',
              width: '100%',
              backgroundColor: 'var(--agnex-base-raised)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--agnex-error)',
                marginBottom: '1rem'
              }}
            >
              Application Exception
            </div>
            <h1
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 600,
                color: 'var(--agnex-white)',
                marginBottom: '1rem'
              }}
            >
              Render Disruption
            </h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.6, fontSize: 'var(--text-sm)' }}>
              An unexpected exception occurred while rendering this interface. The engineering telemetry log has captured the stack trace.
            </p>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--agnex-base)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                overflowX: 'auto',
                marginBottom: '2rem'
              }}
            >
              <code style={{ fontSize: 'var(--text-xs)', color: 'var(--agnex-error)', fontFamily: 'var(--font-mono)' }}>
                {this.state.error?.message || 'Unknown Runtime Error'}
              </code>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Reload Application
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = '/')}
                className="btn btn-secondary"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundaryWrapper(props: { children: ReactNode }) {
  const { trackEvent } = useTelemetry();
  return <ErrorBoundary trackEvent={trackEvent} {...props} />;
}
