# AGNEX Technology — Free-Tier Production Deployment Checklist

Use this actionable checklist to deploy the AGNEX digital platform to production with **₹0/month recurring infrastructure cost**.

---

## 1. Source & Security Hygiene

- [ ] Project repository verified and organized with clean architecture.
- [ ] No hardcoded passwords, tokens, API secrets, or certificates stored in codebase.
- [ ] `.env.example` verified with documented variable specs.
- [ ] Production-grade `README.md` verified and complete.

---

## 2. Vercel (Hobby Free Plan)

- [ ] Project imported into Vercel Hobby account.
- [ ] Framework preset detected as **Vite** (Build: `npm run build`, Output: `dist`, Install: `npm install`).
- [ ] Root `vercel.json` verified with SPA rewrite rules (`/((?!api/.*).*) -> /index.html`) and security headers.
- [ ] Serverless function `/api/consultation.js` present for handling `/api/v1/consultation`.
- [ ] Production build succeeds cleanly on Vercel preview deployment.
- [ ] Environment variables configured in Vercel Dashboard:
  - `VITE_SITE_URL` = `https://agnextechnology.com`
  - `VITE_GA_MEASUREMENT_ID` (Optional, Google Analytics 4)
  - `DATABASE_URL` (Optional, Supabase Free Tier)
  - `RESEND_API_KEY` (Optional, Resend Free Tier)
- [ ] Zero paid-only Vercel features or Pro add-ons enabled.

---

## 3. Cloudflare (Free DNS & Global CDN)

- [ ] Custom domain (`agnextechnology.com`) added to Cloudflare Free Plan.
- [ ] Nameservers changed at registrar to Cloudflare's designated free nameservers.
- [ ] DNS A Record configured:
  - **Type:** `A` | **Name:** `@` | **Value:** `76.76.21.21` (Vercel IP)
- [ ] DNS CNAME Record configured:
  - **Type:** `CNAME` | **Name:** `www` | **Value:** `cname.vercel-dns.com`
- [ ] SSL/TLS encryption mode set to **"Full"** or **"Full (strict)"** in Cloudflare to prevent infinite redirect loops.
- [ ] Always Use HTTPS toggle enabled in Cloudflare SSL Edge Certificates.
- [ ] Automatic HTTPS Rewrites enabled.

---

## 4. Website Functionality & UI Integrity

- [ ] **Desktop Validation:** Tested across standard resolutions (1440px, 1920px). Layout grid adheres to 12-column system.
- [ ] **Mobile Validation:** Tested on iOS Safari, Android Chrome, and responsive viewports (375px, 390px, 430px). Sticky navigation and touch targets verified.
- [ ] **Navigation & Routing:** All client-side routes transition cleanly (`/`, `/expertise`, `/work`, `/work/:id`, `/company`, `/insights`, `/contact`).
- [ ] **Error Handling:** 404 route verified on unknown URLs (`/unknown-path`). 500 error boundary verified.
- [ ] **Contact Form Submission:** Multi-step wizard submits to `/api/v1/consultation`, receives `AGX-XXXXXX` reference code, and displays confirmation.
- [ ] **Anti-Spam Verification:** Honeypot field traps automated bots without raising server disruptions.
- [ ] **Motion & GPU Performance:** GSAP timelines and pinned scroll steps run at 60 FPS without layout thrash.
- [ ] **Reduced Motion:** Verified with `@media (prefers-reduced-motion: reduce)` enabled — all transitions snap instantly without animations.

---

## 5. SEO & Generative Search Readiness

- [ ] **Page Titles & Meta Descriptions:** Pre-rendered and injected into `<head>` via `components/partials/head.html` and `react-helmet-async`.
- [ ] **Canonical URLs:** All routes point to canonical `https://agnextechnology.com/*`.
- [ ] **Robots.txt:** Verified at `/robots.txt` with Sitemap declaration.
- [ ] **XML Sitemap:** Verified at `/sitemap.xml` with active URLs and priority weights.
- [ ] **Open Graph & Twitter Cards:** Correct tags, 1200x630 preview image (`/brand/agnex-og.png`), and metadata verified.
- [ ] **Schema.org Structured Data:** Valid `Organization`, `WebSite`, `BreadcrumbList`, `Service`, and `ContactPage` JSON-LD schemas.
- [ ] **LLM Retrieval File:** Structured `public/llms.txt` present for Perplexity, ChatGPT Search, and AI crawlers.

---

## 6. Performance & Core Web Vitals

- [ ] **Bundle Partitioning:** Rollup chunks cleanly separated into `vendor-react`, `vendor-gsap`, and route-based dynamic chunks.
- [ ] **Image Optimization:** All visual assets pre-compressed locally with SVG and optimized PNG formats (zero uncompressed assets).
- [ ] **Zero Video Bandwidth:** Pure CSS and mathematical SVG engineering diagrams used in place of massive video transfers.
- [ ] **Font Delivery:** Google Fonts preconnected with `display=swap` to prevent Flash of Invisible Text (FOIT).
- [ ] **Caching Headers:** Vercel configured to serve immutable 1-year cache headers on static hashed assets in `/assets/*`.

---

## 7. Analytics & Cost Auditing

- [ ] Google Analytics 4 tracking verified with `VITE_GA_MEASUREMENT_ID` (non-blocking dynamic injection).
- [ ] Free-tier limits documented and verified in `COST_AUDIT.md`.
- [ ] Total recurring monthly infrastructure cost confirmed at **₹0/month**.
