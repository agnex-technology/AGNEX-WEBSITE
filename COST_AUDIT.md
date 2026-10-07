# AGNEX Technology — Infrastructure Cost Audit & Free-Tier Limits

**Audit Objective:** Achieve a real production deployment of the AGNEX digital platform with **₹0/month recurring infrastructure cost**, detailing every external dependency, its pricing classification, and operational capacity limits.

---

## 1. Comprehensive Service Matrix

| Service | Classification | Plan / Tier | Current Usage / Need | Free Tier Limits (Subject to Provider Terms) | Monthly Cost |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Vercel** | **FREE** | Hobby Plan | Static site hosting, edge CDN, Serverless API | 100 GB bandwidth/mo, 100,000 serverless execution units/day, non-commercial personal/startup scope | **₹0** |
| **Cloudflare** | **FREE** | Free Plan | Authoritative DNS, SSL/TLS, DDoS mitigation | Unlimited DNS queries, global CDN caching, free Universal SSL | **₹0** |
| **Google Analytics** | **FREE** | GA4 Standard | Anonymous telemetry, traffic intelligence | 10 million events/mo, standard data export | **₹0** |
| **Vercel Analytics** | **FREE** | Free Tier | Web Vitals telemetry | Available within Hobby dashboard limits | **₹0** |
| **Local Compression** | **FREE** | Build Pipeline | Image compression (WebP, SVG, optimized PNG) | Native Node.js / Vite build step; zero recurring infrastructure | **₹0** |
| **Supabase** | **FREE TIER** | Free Tier *(Optional)* | Consultation leads PostgreSQL database | 500 MB database, 50,000 monthly active users, 5 GB bandwidth/mo *(pauses after 1 week inactivity if unattended)* | **₹0** |
| **Resend** | **FREE TIER** | Hobby Plan *(Optional)* | Consultation inquiry email alerts | 3,000 emails/month, 100 emails/day | **₹0** |
| **Cloudinary** | **OPTIONAL FREE TIER** | Free Tier *(Optional)* | Dynamic cloud media storage & transformations | 25 monthly credits (~25 GB bandwidth or 25,000 transformations/mo) | **₹0** |
| **Custom Domain** | **PAID / REQUIRED** | Registrar | `agnextechnology.com` | Unavoidable base cost: Wholesale registrar registration (~$9–$10/year) | **~₹800–₹1,200/year** (one-time annual) |
| **Google Workspace** | **PAID / OPTIONAL** | Business Starter | Business email (`contact@agnextechnology.com`) | 30 GB storage/user, custom email domain | **~₹250/user/month** *(Optional)* |
| **Microsoft 365** | **PAID / OPTIONAL** | Business Basic | Alternative corporate email suite | 50 GB mailbox, Teams, web Office | **~₹175/user/month** *(Optional)* |

---

## 2. Free Tier Strategy & Cost Protection Mechanisms

### A. Vercel Hobby Bandwidth & Execution Protection
* **Static First:** 99% of page loads are static HTML/JS/CSS served directly from Vercel's global Edge CDN, bypassing serverless computation entirely.
* **No Continuous Polling:** The client application does not run polling intervals, background WebSockets, or unbounded fetch loops.
* **Serverless Execution Budget:** Serverless functions are restricted to a single endpoint (`/api/consultation`). At an estimated 100–500 inquiries per month, usage utilizes `< 0.5%` of Vercel's free serverless allowance.

### B. Image & Video Bandwidth Protection
* **Zero Video Streaming Overhead:** Rather than streaming heavy MP4/WebM video files that could exhaust Vercel's 100 GB free monthly bandwidth, AGNEX uses lightweight mathematical SVG diagrams powered by GSAP.
* **Aggressive Local Compression:** All portfolio mockups and brand marks are compressed down to minimal payloads (e.g. SVG marks `< 60 KB`, WebP/PNG `< 600 KB`).

### C. Database & Lead Storage Contingency (Supabase)
* If Supabase Free Tier is connected via `DATABASE_URL`:
  * A standard consultation lead record consumes `< 1 KB` of storage.
  * A 500 MB database accommodates over **500,000 leads** without exceeding free limits.
* If Supabase is omitted:
  * Inquiries continue functioning seamlessly via serverless runtime logs and free Resend email dispatch.

### D. Provider Free Tier Notice
> **Important Advisory:** Cloud providers reserve the right to modify free tier limits over time. This configuration uses standard zero-lock-in primitives (static HTML/Vite output and standard Node.js serverless handlers) that can be migrated to alternative free static hosts (e.g. Cloudflare Pages or Netlify) at zero re-engineering cost if any single vendor alters their pricing terms.

---

## 3. Net Financial Verdict

* **Monthly Recurring Infrastructure Cost:** **₹0 / month**
* **Annual Infrastructure Cost:** **₹0 / year**
* **Total Initial Capital Outlay:** **~₹800–₹1,200** (for domain registration only)
