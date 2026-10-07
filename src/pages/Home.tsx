import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/home/HeroSection';
import CapabilitiesExplorer from '../features/home/CapabilitiesExplorer';
import AgnexMethodSection from '../features/home/AgnexMethodSection';
import EngineeringPrinciplesSection from '../features/home/EngineeringPrinciplesSection';
import SelectedWorkSection from '../features/home/SelectedWorkSection';
import TechMatrixSection from '../features/home/TechMatrixSection';
import AboutIntroSection from '../features/home/AboutIntroSection';
import ContactConvergenceSection from '../features/home/ContactConvergenceSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AGNEX Technology — Engineering What's Next.</title>
        <meta
          name="description"
          content="AGNEX Technology designs and engineers digital products, business systems and intelligent technology for real-world problems that don't fit inside a template."
        />
        <link rel="canonical" href="https://agnextechnology.com/" />
        <meta property="og:title" content="AGNEX Technology — Engineering What's Next." />
        <meta
          property="og:description"
          content="AGNEX designs and engineers digital products, business systems and intelligent technology for real-world problems."
        />
        <meta property="og:url" content="https://agnextechnology.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agnextechnology.com/brand/agnex-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AGNEX Technology — Engineering What's Next." />
        <meta
          name="twitter:description"
          content="AGNEX designs and engineers digital products, business systems and intelligent technology for real-world problems."
        />
        <meta name="twitter:image" content="https://agnextechnology.com/brand/agnex-og.png" />
      </Helmet>

      {/* 01 — HERO SIGNATURE EXPERIENCE (Architectural Statement, SVG Coordinates, Blue Signal) */}
      <HeroSection />

      {/* 02 — STORY & CAPABILITIES (Interactive Editorial Explorer, 4 Disciplines) */}
      <CapabilitiesExplorer />

      {/* 03 — APPROACH (THINK. ENGINEER. SHIP. Progressive System Flow) */}
      <AgnexMethodSection />

      {/* 04 — EDITORIAL MANIFESTO (TECHNOLOGY SHOULD DO SOMETHING) */}
      <EngineeringPrinciplesSection />

      {/* 05 — SELECTED WORK (Editorial Compositions of Verified System Architectures) */}
      <SelectedWorkSection />

      {/* 06 — TECHNOLOGY STACK (The Stack as an Evolving Engineering System) */}
      <TechMatrixSection />

      {/* 07 — ABOUT AGNEX (Built for the Next Problem) */}
      <AboutIntroSection />

      {/* 08 — CONTACT CLIMAX & CONVERGENCE (Blue Signal Convergence & Signature Resolve) */}
      <ContactConvergenceSection />
    </>
  );
}
