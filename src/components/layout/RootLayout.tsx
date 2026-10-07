import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { CustomCursor } from '../motion/CustomCursor';

export default function RootLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'var(--agnex-canvas)',
        color: 'var(--text-primary)',
        position: 'relative'
      }}
    >
      {/* Subtle Desktop-Only Custom Cursor */}
      <CustomCursor />

      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Global Persistent Header */}
      <Navbar />

      {/* Main Page Landmark */}
      <main
        id="main-content"
        tabIndex={-1}
        style={{
          flex: '1 0 auto',
          paddingTop: '76px', // Header offset
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          backgroundColor: 'var(--agnex-canvas)'
        }}
      >
        <Outlet />
      </main>

      {/* Global Persistent Footer */}
      <Footer />
    </div>
  );
}
