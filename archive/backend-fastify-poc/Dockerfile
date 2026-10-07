# ============================================================
# Free-Tier Optimized Dockerfile
# Low-memory footprint, non-root, minimal attack surface
# Designed for Render Free Web Services / Fly.io 512MB limits
# ============================================================

# --- Stage 1: Dependency Installation ---
FROM node:22-alpine AS deps
WORKDIR /app
# Only copy dependency manifests first (layer cache optimization)
COPY package*.json ./
# Install dependencies. Skip devDependencies for smaller image size.
RUN npm ci --omit=dev --ignore-scripts

# --- Stage 2: Production Runtime (minimal, non-root) ---
FROM node:22-alpine AS runner
LABEL maintainer="platform@agnex.tech"

# Security: run as non-root
RUN addgroup --system --gid 1001 vantrex && \
    adduser  --system --uid 1001 --ingroup vantrex vantrex

WORKDIR /app

# Copy only production artifacts
COPY --from=deps    --chown=vantrex:vantrex /app/node_modules ./node_modules
COPY --from=deps    --chown=vantrex:vantrex /app/package.json ./
# Copy source code (assuming transpilation is not required or happens via a separate build stage)
COPY --chown=vantrex:vantrex ./src ./src
COPY --chown=vantrex:vantrex ./drizzle.config.js ./

# Twelve-Factor: config via environment variables only
ENV NODE_ENV=production
ENV PORT=5000

# OPTIMIZATION: Cap Node.js V8 Heap Size to 256MB to comfortably fit in 512MB RAM limits
ENV NODE_OPTIONS="--max-old-space-size=256"

# Kubernetes/Render health-check support
RUN apk add --no-cache curl

USER vantrex

EXPOSE 5000

# Graceful shutdown: node process receives SIGTERM
CMD ["node", "src/app.js"]

# Container liveness probe
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health/live || exit 1
