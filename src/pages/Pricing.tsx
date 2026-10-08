import { Helmet } from 'react-helmet-async';
import PricingSection from '../features/home/PricingSection';

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Engineering Investment Map | AGNEX Technology</title>
        <meta
          name="description"
          content="Engineering doesn't come in one size. Explore AGNEX Technology's transparent investment starting points across Digital Products (From ₹35K+), Business Systems (From ₹50K+), Intelligent Systems (From ₹75K+), and Engineering (From ₹40K+)."
        />
        <link rel="canonical" href="https://agnextechnology.com/pricing" />
        <meta property="og:title" content="Engineering Investment Map | AGNEX Technology" />
        <meta
          property="og:description"
          content="Engineering doesn't come in one size. Transparent starting points across digital products, business systems, intelligent AI, and custom engineering."
        />
        <meta property="og:url" content="https://agnextechnology.com/pricing" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://agnextechnology.com/"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Pricing",
                      "item": "https://agnextechnology.com/pricing"
                    }
                  ]
                },
                {
                  "@type": "WebPage",
                  "name": "Commercial Framework & Investment",
                  "description": "Baseline investment starting points for custom software, web applications, AI automation, and bespoke business systems.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "AGNEX Technology",
                    "url": "https://agnextechnology.com"
                  }
                }
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Primary Pricing Investment Map */}
      <PricingSection />
    </>
  );
}
