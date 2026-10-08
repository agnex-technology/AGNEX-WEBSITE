import { Helmet } from 'react-helmet-async';
import HeroSection from '../features/home/HeroSection';
import CapabilitiesExplorer from '../features/home/CapabilitiesExplorer';
import SolutionsSection from '../features/home/SolutionsSection';
import IndustriesSection from '../features/home/IndustriesSection';
import TechMatrixSection from '../features/home/TechMatrixSection';
import AgnexMethodSection from '../features/home/AgnexMethodSection';
import SelectedWorkSection from '../features/home/SelectedWorkSection';
import WhyAgnexSection from '../features/home/WhyAgnexSection';
import EngineeringPrinciplesSection from '../features/home/EngineeringPrinciplesSection';
import AboutIntroSection from '../features/home/AboutIntroSection';
import FaqSection from '../features/home/FaqSection';
import ContactConvergenceSection from '../features/home/ContactConvergenceSection';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>AGNEX Technology | Custom Software, AI & Digital Engineering</title>
        <meta
          name="description"
          content="AGNEX Technology designs and builds web applications, mobile products, business systems, AI-powered automation and scalable cloud solutions that solve real business problems."
        />
        <link rel="canonical" href="https://agnextechnology.com/" />
        <meta property="og:title" content="AGNEX Technology | Custom Software, AI & Digital Engineering" />
        <meta
          property="og:description"
          content="From web and mobile applications to intelligent automation and scalable cloud systems, AGNEX Technology designs and builds digital products that solve real business problems."
        />
        <meta property="og:url" content="https://agnextechnology.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://agnextechnology.com/brand/agnex-og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AGNEX Technology | Custom Software, AI & Digital Engineering" />
        <meta
          name="twitter:description"
          content="From web and mobile applications to intelligent automation and scalable cloud systems, AGNEX Technology designs and builds digital products that solve real business problems."
        />
        <meta name="twitter:image" content="https://agnextechnology.com/brand/agnex-og.png" />
      </Helmet>

      {/* 01 — HERO (Engineering What's Next / Custom Software, AI & Digital Engineering) */}
      <HeroSection />

      {/* 02 — CAPABILITIES & SERVICES (01 DIGITAL, 02 SYSTEMS, 03 INTELLIGENCE, 04 ENGINEERING) */}
      <CapabilitiesExplorer />

      {/* 03 — BUSINESS SOLUTIONS (ERP, CRM, Automation, Cloud Platforms) */}
      <SolutionsSection />

      {/* 04 — INDUSTRIES (Logistics, Cybersecurity, Legal Tech, Enterprise Operations) */}
      <IndustriesSection />

      {/* 05 — TECHNOLOGY STACK (Frontend, Backend, Databases, Infrastructure, AI/ML) */}
      <TechMatrixSection />

      {/* 06 — DEVELOPMENT PROCESS (Discover, Architect, Engineer, Validate, Deploy, Evolve) */}
      <AgnexMethodSection />

      {/* 07 — SELECTED PROJECTS / CASE STUDIES (RDA, SKYNET v5.0, LawGuide AI) */}
      <SelectedWorkSection />

      {/* 08 — WHY AGNEX (Direct Engineering Ownership, High-Stakes Reliability, 100% IP Ownership) */}
      <WhyAgnexSection />

      {/* 09 — ENGINEERING PRINCIPLES (Technology Should Do Something) */}
      <EngineeringPrinciplesSection />

      {/* 10 — ABOUT AGNEX OVERVIEW */}
      <AboutIntroSection />

      {/* 11 — FAQ */}
      <FaqSection />

      {/* 12 — FINAL CTA */}
      <ContactConvergenceSection />
    </>
  );
}

