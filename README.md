# AGNEX Technology — Engineering What's Next.

> Ideas, engineered into impact. High-performance digital products, custom enterprise systems, intelligent automation, and resilient cloud architecture.

This project contains the official digital platform for **AGNEX Technology** ([https://agnextechnology.com](https://agnextechnology.com)), architected for zero-latency presentation, complete accessibility, and real production deployment on **₹0/month free-tier infrastructure**.

---

## Tech Stack

* **Frontend Framework:** React 19 (TypeScript) with Vite 8 bundler
* **Routing & SEO:** React Router 7 + React Helmet Async (Server-Side Injected Pre-rendered Meta Tags)
* **Design System & Styling:** Custom Enterprise Token Architecture, Vanilla CSS (Strict 8pt Grid, Space Grotesk & Inter typography)
* **Motion & Animation Engine:** GSAP (GreenSock) 3.15 + ScrollTrigger (GPU-accelerated transforms, zero layout thrashing, native reduced-motion compliance)
* **PWA & Offline Resilience:** Vite Plugin PWA + Workbox Service Worker caching
* **Serverless Functions:** Native Vercel Serverless Functions (`/api/consultation`)
* **Testing & Quality Assurance:** Vitest 4 (Unit & Design Token contracts) + Playwright 1.62 (End-to-End browser validation)

---

## Free vs. Paid/Optional Classification

To maintain zero-budget operations, every service in this platform is explicitly categorized:

| Category | Component / Service | Tier / Plan | Monthly Cost |
| :--- | :--- | :--- | :--- |
| **FREE** | Vercel Hosting (Static + Serverless) | Hobby Plan | ₹0 |
| **FREE** | Cloudflare (DNS, SSL, Global CDN) | Free Plan | ₹0 |
| **FREE** | Google Analytics 4 | Standard Free | ₹0 |
| **FREE** | Local Asset Compression (WebP, SVG, PNG) | Build-time pipeline | ₹0 |
| **FREE TIER** | Supabase (Optional Lead Storage) | Free Tier (500 MB DB) | ₹0 |
| **FREE TIER** | Resend (Optional Email Dispatch) | Free Tier (3,000 emails/mo) | ₹0 |
| **OPTIONAL** | Cloudinary Media Storage | Free Tier (25 GB credits/mo) | ₹0 |
| **PAID / REQUIRED** | Domain Name (`agnextechnology.com`) | Registrar (Cloudflare/Namecheap) | Annual fee (~₹800–₹1,200/yr) |
| **PAID / OPTIONAL** | Google Workspace / Microsoft 365 Email | Business Email Suite | ~₹250–₹700/user/mo |

---

## Local Development

### Prerequisites
* **Node.js:** v18.0.0 or higher (v20+ LTS recommended)
* **npm:** v9.0.0 or higher

### Installation & Startup
```bash
# 1. Enter project workspace
cd web-agnex

# 2. Install dependencies
npm install

# 3. Create local environment configuration
cp .env.example .env.local

# 4. Start local Vite development server
npm run dev
```
The application will launch at `http://localhost:5173`. In local development, form submissions to `/api/v1/consultation` are automatically handled by the embedded Vite mock middleware.

### Available Scripts
* `npm run dev`: Launch local Vite dev server with hot module replacement.
* `npm run build`: Compile production bundle to `dist/` with PWA service worker generation.
* `npm run preview`: Serve the compiled `dist/` bundle locally for verification.
* `npm run typecheck`: Run TypeScript compiler (`tsc --noEmit`) to verify zero type regressions.
* `npm run lint`: Execute ESLint across all source modules.
* `npm test`: Run the Vitest unit test suite (design tokens, case study stores, lead intake contracts).
* `npm run test:e2e`: Execute Playwright headless browser end-to-end tests.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

```env
# 1. Core Client Runtime [FREE]
VITE_SITE_URL=https://agnextechnology.com
VITE_GA_MEASUREMENT_ID=
VITE_API_URL=

# 2. Optional Free-Tier Serverless Extensions
DATABASE_URL=
RESEND_API_KEY=
INQUIRY_ALERT_EMAIL=contact@agnextechnology.com
```

* **`VITE_SITE_URL`**: Canonical site URL used for dynamic Open Graph tags, canonical links, and sitemaps.
* **`VITE_GA_MEASUREMENT_ID`**: Optional Google Analytics 4 tracking ID (`G-XXXXXXXXXX`). If omitted, no tracking scripts are injected.
* **`VITE_API_URL`**: Optional base URL for external API servers. Defaults to same-origin relative calls.
* **`DATABASE_URL`**: Optional Supabase PostgreSQL connection string for persisting consultation leads.
* **`RESEND_API_KEY`**: Optional API key for instant email notifications on lead submission (Resend free tier).

---

## Security & Secret Isolation

1. **Secret Isolation:**
   * Never store raw API keys, database passwords, or operational secrets in application code or public configuration files.
   * Configure deployment secrets directly inside the hosting provider dashboard.
2. **Client-Side Exposure Verification:**
   * All variables prefixed with `VITE_` are publicly accessible in the compiled JavaScript bundle. Ensure only public configurations (e.g. site URL, public GA measurement ID) use the `VITE_` prefix.

---

## Vercel Free Deployment

The application is engineered specifically for **Vercel Hobby (Free Tier)**.

### Deployment Steps
1. Navigate to [vercel.com](https://vercel.com) and log in to your account.
2. Click **"Add New..."** → **"Project"**.
3. Import the project source directory.
4. **Project Settings:**
   * **Framework Preset:** Vite
   * **Root Directory:** `./`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
   * **Install Command:** `npm install`
5. **Environment Variables:**
   * Add `VITE_SITE_URL` = `https://agnextechnology.com`
   * (Optional) Add `VITE_GA_MEASUREMENT_ID`, `DATABASE_URL`, `RESEND_API_KEY`.
6. Click **Deploy**. Vercel will build and assign a deployment URL.

### Vercel Serverless Configuration (`vercel.json`)
The included `vercel.json` ensures:
* Client-side routing rewrites all non-API paths to `/index.html` (zero 404s on refresh).
* `/api/v1/consultation` rewrites to `/api/consultation` (executed as a lightweight Node.js serverless function).
* Enterprise HTTP security headers (`Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`).
* Immutable 1-year cache headers on static hashed JS/CSS assets in `/assets/`.

---

## Cloudflare Free DNS & SSL

Cloudflare provides enterprise DDoS protection, global CDN caching, and authoritative DNS on their **Free Plan**.

### Configuration Steps
1. Add your domain (`agnextechnology.com`) to Cloudflare under the **Free Plan**.
2. Change your domain's nameservers at your registrar to the Cloudflare nameservers provided.
3. In the Cloudflare DNS dashboard, add the exact records provided by Vercel:

| Type | Name | Content / Value | Proxy Status |
| :--- | :--- | :--- | :--- |
| **A** | `@` (root) | `76.76.21.21` | DNS only (Gray cloud) OR Proxied (Orange cloud)* |
| **CNAME** | `www` | `cname.vercel-dns.com` | DNS only (Gray cloud) OR Proxied (Orange cloud)* |

> **\*Cloudflare SSL Note:** If you enable the Orange Cloud (Proxy), navigate to **SSL/TLS** in Cloudflare and set SSL encryption mode to **Full** or **Full (strict)** to avoid redirect loops between Cloudflare and Vercel.

---

## Domain Configuration

* **Classification:** `PAID / REQUIRED`
* A custom domain is the only required financial commitment. Recommended registrars offering low renewal markup:
  * **Cloudflare Registrar:** Sells domains at wholesale cost (~$9–$10/yr, ₹750–₹850/yr).
  * **Namecheap / Porkbun:** Affordable initial registration (~₹800/yr).

Once registered, point the nameservers to Cloudflare as described above.

---

## Analytics

* **Google Analytics 4 [FREE]:**
  * Create a free property in [analytics.google.com](https://analytics.google.com).
  * Set `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in Vercel project environment variables.
  * The custom utility (`src/utils/analytics.ts`) dynamically injects the Google Tag asynchronously upon initial mount without blocking the critical rendering path or Largest Contentful Paint (LCP).
* **Vercel Analytics [FREE TIER]:**
  * Vercel includes basic web analytics within Hobby free-tier limits. Can be enabled via the Vercel project dashboard.

---

## Optional Media: Cloudinary

* **Classification:** `OPTIONAL FREE TIER`
* All hero visuals and portfolio graphics are currently pre-compressed locally using lossless WebP, SVG, and optimized PNG formats inside `assets/` and `public/`.
* **Current Status:** Cloudinary is **NOT required** for production launch.
* **When to adopt Cloudinary:** Only if dynamic image cropping, automated AVIF transcoding on user uploads, or client video transformations are required in the future. The Cloudinary Free tier provides 25 monthly credits (25 GB managed bandwidth).

---

## Optional Database: Supabase

* **Classification:** `FREE TIER`
* **Current Status:** Not required for static presentation.
* **When to enable:** To automatically persist consultation leads into a relational database.
  1. Create a free organization and project on [supabase.com](https://supabase.com) (₹0/mo, 500 MB database, 50,000 monthly active users).
  2. Execute the table migration:
     ```sql
     CREATE TABLE IF NOT EXISTS leads (
       id BIGSERIAL PRIMARY KEY,
       contact_name VARCHAR(255) NOT NULL,
       contact_email VARCHAR(255) NOT NULL,
       contact_phone VARCHAR(50),
       status VARCHAR(50) DEFAULT 'NEW',
       notes JSONB,
       created_at TIMESTAMPTZ DEFAULT NOW()
     );
     ```
  3. Copy the pooled connection string into Vercel environment variables as `DATABASE_URL`.
  4. The serverless function (`/api/consultation.js`) will detect `DATABASE_URL` and insert rows automatically. If omitted, it continues logging without errors.

---

## Contact Form & Email Delivery

The consultation intake system in [src/pages/Contact.tsx](file:///d:/project%20dev/web-vantrex-main/src/pages/Contact.tsx) works out of the box with zero paid infrastructure:

1. **Frontend Experience:**
   * Progressive disclosure 2-step consultation builder.
   * Client-side validation for business email, company, and project scope.
   * Silent anti-spam honeypot trapping.
2. **Serverless Execution:**
   * Submits to `/api/v1/consultation`, handled by Vercel serverless function `api/consultation.js`.
   * Generates a deterministic inquiry reference code (`AGX-XXXXXX`).
3. **Free Email Notifications (Resend):**
   * Resend offers 3,000 free emails per month on their Hobby plan.
   * Configure `RESEND_API_KEY` in Vercel to receive real-time email alerts.
   * **Paid Business Email Alternative:** Using Google Workspace or Microsoft 365 is purely `PAID / OPTIONAL` and not required for website functionality.

---

## Performance & Core Web Vitals

The application is tuned for top-tier Lighthouse scores:
* **LCP (Largest Contentful Paint):** Preloaded critical typography, zero blocking CSS, responsive SVG branding.
* **INP (Interaction to Next Paint):** Throttled event listeners via `requestAnimationFrame` on scroll events, isolated state dispatches.
* **CLS (Cumulative Layout Shift):** Fixed SVG aspect ratios, reserved bounding boxes, zero layout-triggering CSS properties.
* **Motion Hygiene:** All GSAP timelines operate on GPU compositor properties (`transform`, `opacity`, `translate3d`). Full support for `@media (prefers-reduced-motion: reduce)`.

---

## Troubleshooting

1. **Vercel 404 on Sub-Page Refresh:**
   * Ensure `vercel.json` exists with the SPA rewrite rule: `{"source": "/((?!api/.*).*)", "destination": "/index.html"}`.
2. **Cloudflare `ERR_TOO_MANY_REDIRECTS`:**
   * Change Cloudflare SSL setting from "Flexible" to **"Full"** or **"Full (Strict)"**.
3. **Form Returns Network Error:**
   * Ensure the project is deployed on Vercel with the `/api` directory included, or verify local dev server proxy.
4. **PWA Cache Stale Data:**
   * The Service Worker is set to `autoUpdate`. Hard reload using `Ctrl + Shift + R` / `Cmd + Shift + R` or unregister in DevTools → Application → Service Workers.
