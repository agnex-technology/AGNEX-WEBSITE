import { Helmet } from 'react-helmet-async';
import PricingSection from '../features/home/PricingSection';

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing & Commercial Investment Framework | AGNEX Technology</title>
        <meta
          name="description"
          content="Explore AGNEX Technology's transparent commercial investment framework. Entry starting points for digital products (From ₹35K), intelligent systems (From ₹75K), and custom business engineering (From ₹1.5L)."
        />
        <link rel="canonical" href="https://agnextechnology.com/pricing" />
        <meta property="og:title" content="Pricing & Commercial Investment Framework | AGNEX Technology" />
        <meta
          property="og:description"
          content="Transparent engineering starting points. Custom digital products, business systems, and scalable software architectures engineered for measurable ROI."
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
