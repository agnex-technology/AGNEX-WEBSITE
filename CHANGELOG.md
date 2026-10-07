# Changelog

All notable changes to the AGNEX Technology platform are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-06

### Added
- **Production Commercial Intake**: Full `POST /api/v1/consultation` backend route and controller in [server/controllers/consultation.controller.js](file:///d:/project%20dev/web-vantrex-main/server/controllers/consultation.controller.js) with validation, anti-bot honeypot, and PostgreSQL persistence to `leads`.
- **Database Migration Runner**: [server/database/migrate.js](file:///d:/project%20dev/web-vantrex-main/server/database/migrate.js) applying versioned SQL schemas with transactional tracking.
- **End-to-End Tracing**: Unique `X-Request-Id` UUID correlation middleware across all API requests and database queries.
- **Enterprise Testing Suites**:
  - Vitest unit tests for design system tokens, case studies, and consultation contract ([tests/unit/](file:///d:/project%20dev/web-vantrex-main/tests/unit/)).
  - Playwright E2E browser automation verifying home branding and interactive route transitions ([tests/e2e/home.spec.js](file:///d:/project%20dev/web-vantrex-main/tests/e2e/home.spec.js)).
- **Generative Engine Optimization (GEO)**: Machine-parseable LLM discovery index in [public/llms.txt](file:///d:/project%20dev/web-vantrex-main/public/llms.txt) and Schema.org JSON-LD structured data.

### Changed
- **Contact Form**: [src/pages/Contact.tsx](file:///d:/project%20dev/web-vantrex-main/src/pages/Contact.tsx) wired to real backend API with error retry resilience and deterministic `AGX-######` inquiry tracking.
- **Kubernetes Hardening**: Container image pinned to immutable `ghcr.io/agnextechnology/agnex-api:v1.0.0` with `imagePullPolicy: IfNotPresent` (CIS Kubernetes Benchmark 5.7.1).
- **Session Security**: Tightened default JWT token expiration from 90 days to 15 minutes (`expiresIn: '15m'`) with 7-day refresh window support.
- **Service Worker Caching**: Reduced PWA precache footprint by 68% (from 5,427 KiB to 1,742 KiB) by archiving unreferenced legacy assets.
- **CI/CD Quality Gates**: [.github/workflows/ci.yml](file:///d:/project%20dev/web-vantrex-main/.github/workflows/ci.yml) updated with TypeScript typecheck and Playwright browser testing.

### Security
- **Supply-Chain CVE Patching**: Remediated critical `proxy-addr` vulnerability (GHSA-jqcg-44mw-7w3h) and 14 high/moderate CVEs across `multer`, `fast-uri`, `postcss`, `source-map-js`, `ip-address`, `brace-expansion`, and `browserslist`. 0 Critical CVEs remaining.
- **API Key Hardening**: Restricted demo API keys to non-production environments; production requires configured keys via environment variable or database.
- **Perimeter Exclusion**: Blocked `/api/` and `/health/` routes in [public/robots.txt](file:///d:/project%20dev/web-vantrex-main/public/robots.txt).

---

## [1.0.0-cleanup] - 2026-10-06

### Removed
- **AI Agent & Local Machine Artifacts**: Removed local test dumps and hardcoded session paths.
- **Legacy Static MPA Pages**: Cleaned up legacy unreferenced static HTML directories from before the React migration.
- **Dead React Components & Hooks**: Removed 11 unreferenced components and scroll-hijacking Lenis ticker leaks.
- **Legacy Build Scripts**: Removed one-off historical color migration and temporary shell scripts.
