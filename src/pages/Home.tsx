import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/home/HeroSection';
import BrandPhilosophySection from '../features/home/BrandPhilosophySection';
import AgnexMethodSection from '../features/home/AgnexMethodSection';
import FourPillarsSystem from '../features/home/FourPillarsSystem';
import OperationalDiagnosticsSection from '../features/home/OperationalDiagnosticsSection';
import SelectedWorkSection from '../features/home/SelectedWorkSection';
import TechMatrixSection from '../features/home/TechMatrixSection';
import ClosingCtaSection from '../features/home/ClosingCtaSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AGNEX Technology | Engineering What's Next.</title>
        <meta
          name="description"
          content="AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions. Ideas, engineered into impact."
        />
        <link rel="canonical" href="https://agnextechnology.com/" />
        <meta property="og:title" content="AGNEX Technology | Engineering What's Next." />
        <meta
          property="og:description"
          content="We engineer digital products, custom operational platforms, intelligent systems, and scalable cloud infrastructure."
        />
        <meta property="og:url" content="https://agnextechnology.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agnextechnology.com/brand/agnex-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AGNEX Technology | Engineering What's Next." />
        <meta
          property="twitter:description"
          content="We engineer digital products, custom operational platforms, intelligent systems, and scalable cloud infrastructure."
        />
        <meta name="twitter:image" content="https://agnextechnology.com/brand/agnex-og.png" />
      </Helmet>

      {/* 01 — HERO ENGINEERING COMPOSITION (Custom SVG Geometry & Authored GSAP Sequence) */}
      <HeroSection />

      {/* 02 — EDITORIAL BRAND PHILOSOPHY (Full-Width High-Signal Statement) */}
      <BrandPhilosophySection />

      {/* 03 — SIGNATURE METHODOLOGY (Pinned GSAP ScrollTrigger & Evolving Diagrams) */}
      <AgnexMethodSection />

      {/* 04 — FOUR PILLARS INTERACTIVE SYSTEM (Single State-Driven Console) */}
      <FourPillarsSystem />

      {/* 05 — OPERATIONAL DIAGNOSTICS (Asymmetric Problem-Solving Ledger) */}
      <OperationalDiagnosticsSection />

      {/* 06 — VERIFIED REFERENCE ARCHITECTURES (Case Studies with Real Metrics) */}
      <SelectedWorkSection />

      {/* 07 — ARCHITECTURAL CAPABILITY MATRIX (Disciplined Technology Stack) */}
      <TechMatrixSection />

      {/* 08 — DIRECT ENGAGEMENT (Restrained Closing Action) */}
      <ClosingCtaSection />
    </>
  );
}
