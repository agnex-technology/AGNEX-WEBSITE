# ============================================================
# Phase 111 — Cloud Native Dockerfile
# Twelve-Factor, multi-stage, non-root, minimal attack surface
# ============================================================

# --- Stage 1: Dependency Installation ---
FROM node:22-alpine AS deps
WORKDIR /app
# Only copy dependency manifests first (layer cache optimisation)
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# --- Stage 2: Frontend Build ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
RUN npm run build

# --- Stage 3: Production Runtime (minimal, non-root) ---
FROM node:22-alpine AS runner
LABEL maintainer="engineering@agnex.tech"
LABEL org.opencontainers.image.title="AGNEX Technology Platform"
LABEL org.opencontainers.image.version="1.0.0"

# Security: run as non-root
RUN addgroup --system --gid 1001 agnex && \
    adduser  --system --uid 1001 --ingroup agnex agnex

WORKDIR /app

# Copy only production artefacts
COPY --from=deps    --chown=agnex:agnex /app/node_modules ./node_modules
COPY --from=builder --chown=agnex:agnex /app/dist        ./dist
COPY --from=builder --chown=agnex:agnex /app/server      ./server
COPY --from=builder --chown=agnex:agnex /app/package.json ./

# Twelve-Factor: config via environment variables only
ENV NODE_ENV=production
ENV PORT=5000

# Kubernetes health-check support (curl available for liveness probe)
RUN apk add --no-cache curl

USER agnex

EXPOSE 5000

# Graceful shutdown: node process receives SIGTERM from k8s
CMD ["node", "server/server.js"]

# Kubernetes liveness probe command
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:5000/health/live || exit 1
