import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';

// Lazy-loaded page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services')); // Will be AGNEX Expertise
const Portfolio = lazy(() => import('./pages/Portfolio')); // Will be AGNEX Work
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const About = lazy(() => import('./pages/About')); // Will be AGNEX Company
const Contact = lazy(() => import('./pages/Contact'));
const Insights = lazy(() => import('./pages/Insights'));
const AiSlopChecker = lazy(() => import('./pages/AiSlopChecker'));
const NotFound404 = lazy(() => import('./pages/NotFound404'));

// Minimal, on-brand fallback loader for route splitting
const RouteLoader = () => (
  <div
    role="status"
    aria-live="polite"
    aria-label="Loading page content"
    style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      backgroundColor: 'var(--agnex-base)'
    }}
  >
    <img
      src="/brand/agnex-mark.svg"
      alt="AGNEX Loading"
      width="64"
      height="38"
      style={{
        width: '56px',
        height: 'auto',
        animation: 'agnex-pulse 1.4s ease-in-out infinite'
      }}
    />
    <style>{`@keyframes agnex-pulse { 0%, 100% { opacity: 0.55; transform: scale(0.96); } 50% { opacity: 1; transform: scale(1); } }`}</style>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Home />
          </Suspense>
        ),
      },
      // Target AGNEX Information Architecture: /expertise
      {
        path: 'expertise',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Services />
          </Suspense>
        ),
      },
      // Backwards-compatible alias: /services -> /expertise
      {
        path: 'services',
        element: <Navigate to="/expertise" replace />,
      },

      // Target AGNEX Information Architecture: /work
      {
        path: 'work',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: 'work/:id',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CaseStudy />
          </Suspense>
        ),
      },
      // Backwards-compatible alias: /portfolio -> /work
      {
        path: 'portfolio',
        element: <Navigate to="/work" replace />,
      },
      {
        path: 'portfolio/:id',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CaseStudy />
          </Suspense>
        ),
      },

      // Target AGNEX Information Architecture: /company
      {
        path: 'company',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <About />
          </Suspense>
        ),
      },
      // Backwards-compatible alias: /about -> /company
      {
        path: 'about',
        element: <Navigate to="/company" replace />,
      },

      // Target AGNEX Information Architecture: /contact
      {
        path: 'contact',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Contact />
          </Suspense>
        ),
      },

      // Scalable editorial research: /insights
      {
        path: 'insights',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Insights />
          </Suspense>
        ),
      },

      // Agnex Technology — Website Intelligence Tool: /ai-slop-checker
      {
        path: 'ai-slop-checker',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <AiSlopChecker />
          </Suspense>
        ),
      },

      // 404 Fallback
      {
        path: '*',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <NotFound404 />
          </Suspense>
        ),
      }
    ]
  }
]);

export default router;
