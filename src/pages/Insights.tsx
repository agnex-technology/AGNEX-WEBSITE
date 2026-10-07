import { Helmet } from 'react-helmet-async';
import ScrollFade from '../components/motion/ScrollFade';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
}

export default function Insights() {
  const articles: Article[] = [
    {
      id: 1,
      category: 'Intelligence & Architecture',
      title: 'Architecting Private, Air-Gapped Intelligence in Production',
      excerpt: 'Why standard public LLM wrappers pose severe data governance risks for enterprise operations, and how to deploy quantized, private models for deterministic workflow automation.',
      readTime: '8 min read',
      date: 'September 2026'
    },
    {
      id: 2,
      category: 'Systems & Engineering',
      title: 'The Strangler Fig Pattern: Decoupling Monoliths Without Downtime',
      excerpt: 'An architectural breakdown of replacing legacy monolithic business cores with event-driven microservices incrementally while maintaining 99.99% operational continuity.',
      readTime: '11 min read',
      date: 'August 2026'
    },
    {
      id: 3,
      category: 'Digital Performance',
      title: 'Eliminating Layout Shift (CLS) and Main-Thread Starvation in Modern Web Applications',
      excerpt: 'Practical engineering patterns for achieving sub-second Largest Contentful Paint and flawless WCAG 2.2 AA compliance across enterprise digital flagships.',
      readTime: '7 min read',
      date: 'July 2026'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Engineering Insights & Research | AGNEX Technology</title>
        <meta
          name="description"
          content="Technical essays, architectural research, and lessons learned from building high-performance digital systems at AGNEX Technology."
        />
        <link rel="canonical" href="https://agnextechnology.com/insights" />
        <meta property="og:title" content="Engineering Insights & Research | AGNEX Technology" />
        <meta
          property="og:description"
          content="Technical essays, architectural research, and lessons learned from building high-performance digital systems."
        />
        <meta property="og:url" content="https://agnextechnology.com/insights" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
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
                "name": "Insights",
                "item": "https://agnextechnology.com/insights"
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(4rem, 6vw, 6rem) 0 3rem 0',
          borderBottom: '1px solid var(--border-color)',
          backgroundColor: 'var(--agnex-base)'
        }}
        className="agnex-grid-mesh"
      >
        <div className="agnex-container">
          <ScrollFade>
            <div className="agnex-badge agnex-badge-accent" style={{ marginBottom: '1.5rem' }}>
              05 // RESEARCH & ESSAYS
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.75rem, 5vw, 4.5rem)',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: 'var(--agnex-white)'
              }}
            >
              Engineering Insights
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-muted)',
                maxWidth: '720px',
                lineHeight: 1.6
              }}
            >
              Architectural research, engineering methodologies, and operational lessons learned from building high-reliability digital platforms.
            </p>
          </ScrollFade>
        </div>
      </section>

      {/* Articles Feed */}
      <section className="agnex-section" style={{ backgroundColor: 'var(--agnex-base-raised)' }}>
        <div className="agnex-container" style={{ maxWidth: '880px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {articles.map((article) => (
              <ScrollFade key={article.id}>
                <article
                  className="agnex-card"
                  style={{
                    backgroundColor: 'var(--agnex-base)',
                    padding: 'clamp(2rem, 3.5vw, 3rem)',
                    border: '1px solid var(--border-color)',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontSize: 'var(--text-xs)' }}>
                    <span style={{ color: 'var(--agnex-accent)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {article.category}
                    </span>
                    <span style={{ color: 'var(--agnex-steel-dark)' }}>•</span>
                    <span style={{ color: 'var(--agnex-steel)' }}>{article.readTime}</span>
                    <span style={{ color: 'var(--agnex-steel-dark)' }}>•</span>
                    <span style={{ color: 'var(--agnex-steel)' }}>{article.date}</span>
                  </div>

                  <h2
                    style={{
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.125rem)',
                      color: 'var(--agnex-white)',
                      marginBottom: '1rem',
                      lineHeight: 1.25
                    }}
                  >
                    {article.title}
                  </h2>

                  <p
                    style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {article.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--agnex-white)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>
                    <span>Technical Essay</span>
                    <span style={{ color: 'var(--agnex-accent)' }}>→</span>
                  </div>
                </article>
              </ScrollFade>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
