import { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';

// Lazy-loaded page components for optimal bundle splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Industries = lazy(() => import('./pages/Industries'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const About = lazy(() => import('./pages/About'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
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
      backgroundColor: 'var(--agnex-canvas)'
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

      // 01 — SERVICES ARCHITECTURE (/services & 8 dedicated deep dives)
      {
        path: 'services',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Services />
          </Suspense>
        ),
      },
      {
        path: 'services/:slug',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ServiceDetail />
          </Suspense>
        ),
      },
      // Backward-compatibility alias: /expertise -> /services
      {
        path: 'expertise',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Services />
          </Suspense>
        ),
      },

      // 02 — BUSINESS SOLUTIONS (/solutions)
      {
        path: 'solutions',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Solutions />
          </Suspense>
        ),
      },

      // 03 — INDUSTRIES (/industries)
      {
        path: 'industries',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Industries />
          </Suspense>
        ),
      },

      // 04 — PROJECTS & CASE STUDIES (/projects & /work)
      {
        path: 'projects',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: 'projects/:id',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CaseStudy />
          </Suspense>
        ),
      },
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
      {
        path: 'portfolio',
        element: <Navigate to="/projects" replace />,
      },
      {
        path: 'portfolio/:id',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <CaseStudy />
          </Suspense>
        ),
      },

      // 05 — ABOUT COMPANY (/about & /company)
      {
        path: 'about',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'company',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <About />
          </Suspense>
        ),
      },

      // 06 — PRICING & INVESTMENT (/pricing)
      {
        path: 'pricing',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Pricing />
          </Suspense>
        ),
      },

      // 07 — CONTACT (/contact)
      {
        path: 'contact',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Contact />
          </Suspense>
        ),
      },

      // 07 — LEGAL POLICIES (/privacy-policy & /terms)
      {
        path: 'privacy-policy',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <PrivacyPolicy />
          </Suspense>
        ),
      },
      {
        path: 'terms',
        element: (
          <Suspense fallback={<RouteLoader />}>
            <Terms />
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

      // Website Intelligence Tool: /ai-slop-checker
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

