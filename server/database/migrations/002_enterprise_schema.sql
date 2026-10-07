-- ============================================================
-- AGNEX TECHNOLOGY — ENTERPRISE DATA ARCHITECTURE
-- Migration 002: Extended Schema (Phase 131)
-- ============================================================
-- Extends 001_initial_schema.sql with:
--   • pgvector for AI embeddings (Phase 123/137)
--   • pg_stat_statements for query analytics
--   • Notifications, AI memory, feature store tables
--   • Analytics schema (separate read-optimised schema)
--   • Data governance metadata catalog
--   • Event outbox pattern for streaming (Phase 132)
--   • Full data lineage + audit enhancements
-- ============================================================

-- === Extensions =============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";           -- pgvector for AI embeddings
CREATE EXTENSION IF NOT EXISTS "pg_trgm";          -- Fuzzy/trigram text search
CREATE EXTENSION IF NOT EXISTS "btree_gist";       -- GiST index support
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"; -- Query performance monitoring

-- === Schemas ================================================
CREATE SCHEMA IF NOT EXISTS ops;         -- Operational (transactional) data
CREATE SCHEMA IF NOT EXISTS analytics;   -- Analytics / OLAP (read-optimised)
CREATE SCHEMA IF NOT EXISTS lake;        -- Data lake metadata index
CREATE SCHEMA IF NOT EXISTS governance;  -- Data catalog & lineage
CREATE SCHEMA IF NOT EXISTS ai;          -- AI features, embeddings, memory
CREATE SCHEMA IF NOT EXISTS streaming;   -- Event outbox & streaming metadata

-- ============================================================
-- OPS SCHEMA — Operational tables
-- ============================================================

-- Organizations (Master Data) — enhanced
CREATE TABLE IF NOT EXISTS ops.organizations (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    industry        VARCHAR(100),
    website         VARCHAR(255),
    tier            VARCHAR(50)  DEFAULT 'STANDARD',  -- FREE, STANDARD, PRO, ENTERPRISE
    country_code    CHAR(2),
    metadata        JSONB        DEFAULT '{}',
    is_active       BOOLEAN      DEFAULT TRUE,
    created_at      TIMESTAMPTZ  DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ                      -- Soft delete
);

-- Notifications table (replaces placeholder in notification.service.js)
CREATE TABLE IF NOT EXISTS ops.notifications (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(50)  NOT NULL,            -- EMAIL, IN_APP, PUSH, SMS
    channel         VARCHAR(50)  NOT NULL,
    subject         VARCHAR(500),
    body            TEXT,
    status          VARCHAR(50)  DEFAULT 'PENDING',   -- PENDING, SENT, FAILED, READ
    retry_count     SMALLINT     DEFAULT 0,
    sent_at         TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    metadata        JSONB        DEFAULT '{}',
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);

-- ============================================================
-- AI SCHEMA — Embeddings, memory, conversation history
-- ============================================================

-- Embeddings table (pgvector)
CREATE TABLE IF NOT EXISTS ai.embeddings (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type     VARCHAR(100) NOT NULL,     -- 'document', 'job', 'user_query'
    entity_id       VARCHAR(255) NOT NULL,
    model           VARCHAR(100) NOT NULL,     -- 'text-embedding-004'
    vector          VECTOR(768)  NOT NULL,
    metadata        JSONB        DEFAULT '{}',
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_embeddings_vector ON ai.embeddings USING ivfflat (vector vector_cosine_ops) WITH (lists = 100);
CREATE INDEX IF NOT EXISTS idx_embeddings_entity ON ai.embeddings (entity_type, entity_id);

-- AI Memory (persistent conversation history — Phase 124)
CREATE TABLE IF NOT EXISTS ai.memory (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scope           VARCHAR(50)  NOT NULL,     -- conversation, user, workspace, org
    scope_id        VARCHAR(255) NOT NULL,
    role            VARCHAR(20)  NOT NULL,     -- user, assistant, system
    content         TEXT         NOT NULL,
    token_count     INTEGER,
    metadata        JSONB        DEFAULT '{}',
    expires_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ai_memory_scope ON ai.memory (scope, scope_id, created_at DESC);

-- AI Feature Store — offline features (Phase 137)
CREATE TABLE IF NOT EXISTS ai.features (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    feature_name    VARCHAR(255) NOT NULL,
    feature_group   VARCHAR(100) NOT NULL,
    entity_type     VARCHAR(100) NOT NULL,
    entity_id       VARCHAR(255) NOT NULL,
    value           JSONB        NOT NULL,
    version         INTEGER      DEFAULT 1,
    valid_from      TIMESTAMPTZ  DEFAULT NOW(),
    valid_to        TIMESTAMPTZ,
    metadata        JSONB        DEFAULT '{}',
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_features_entity ON ai.features (entity_type, entity_id, feature_name, valid_from DESC);
CREATE UNIQUE INDEX IF NOT EXISTS idx_features_unique ON ai.features (feature_name, entity_type, entity_id, version);

-- ============================================================
-- STREAMING SCHEMA — Event outbox pattern (Phase 132)
-- ============================================================

CREATE TABLE IF NOT EXISTS streaming.outbox (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic           VARCHAR(255) NOT NULL,
    event_type      VARCHAR(255) NOT NULL,
    aggregate_type  VARCHAR(100) NOT NULL,
    aggregate_id    VARCHAR(255) NOT NULL,
    payload         JSONB        NOT NULL,
    schema_version  INTEGER      DEFAULT 1,
    status          VARCHAR(50)  DEFAULT 'PENDING',  -- PENDING, PUBLISHED, FAILED
    retry_count     SMALLINT     DEFAULT 0,
    published_at    TIMESTAMPTZ,
    error_message   TEXT,
    idempotency_key VARCHAR(255) UNIQUE,
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_outbox_pending  ON streaming.outbox (status, created_at) WHERE status = 'PENDING';
CREATE INDEX IF NOT EXISTS idx_outbox_topic    ON streaming.outbox (topic, created_at DESC);

-- Dead letter queue for failed events
CREATE TABLE IF NOT EXISTS streaming.dead_letter_queue (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    original_event_id UUID,
    topic           VARCHAR(255) NOT NULL,
    payload         JSONB        NOT NULL,
    error_message   TEXT,
    failure_count   SMALLINT     DEFAULT 1,
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);

-- ============================================================
-- ANALYTICS SCHEMA — Read-optimised materialized views (Phase 134)
-- ============================================================

-- User activity summary (refreshed by ETL pipeline)
CREATE TABLE IF NOT EXISTS analytics.user_activity_daily (
    date            DATE         NOT NULL,
    user_id         UUID,
    event_type      VARCHAR(100),
    event_count     INTEGER      DEFAULT 0,
    PRIMARY KEY (date, user_id, event_type)
);

-- Job pipeline funnel
CREATE TABLE IF NOT EXISTS analytics.recruitment_funnel_daily (
    date            DATE         NOT NULL,
    job_id          UUID,
    applications    INTEGER      DEFAULT 0,
    reviews         INTEGER      DEFAULT 0,
    interviews      INTEGER      DEFAULT 0,
    offers          INTEGER      DEFAULT 0,
    hires           INTEGER      DEFAULT 0,
    PRIMARY KEY (date, job_id)
);

-- AI usage metrics
CREATE TABLE IF NOT EXISTS analytics.ai_usage_daily (
    date            DATE         NOT NULL,
    provider        VARCHAR(100),
    model           VARCHAR(100),
    request_count   INTEGER      DEFAULT 0,
    total_tokens    BIGINT       DEFAULT 0,
    total_cost_usd  DECIMAL(12,6) DEFAULT 0,
    avg_latency_ms  INTEGER,
    PRIMARY KEY (date, provider, model)
);

-- ============================================================
-- GOVERNANCE SCHEMA — Data catalog & lineage (Phase 135)
-- ============================================================

CREATE TABLE IF NOT EXISTS governance.data_catalog (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name      VARCHAR(255) NOT NULL,
    asset_type      VARCHAR(100) NOT NULL,   -- TABLE, COLUMN, PIPELINE, TOPIC
    schema_name     VARCHAR(100),
    classification  VARCHAR(50)  NOT NULL,   -- PUBLIC, INTERNAL, CONFIDENTIAL, PII, PHI
    owner_team      VARCHAR(100),
    steward_email   VARCHAR(255),
    description     TEXT,
    tags            TEXT[]       DEFAULT '{}',
    retention_days  INTEGER,
    pii_fields      TEXT[]       DEFAULT '{}',
    metadata        JSONB        DEFAULT '{}',
    last_profiled   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  DEFAULT NOW(),
    updated_at      TIMESTAMPTZ  DEFAULT NOW()
);

-- Data quality scores
CREATE TABLE IF NOT EXISTS governance.data_quality_scores (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    asset_name      VARCHAR(255) NOT NULL,
    dimension       VARCHAR(50)  NOT NULL,  -- completeness, accuracy, uniqueness, validity, timeliness, consistency
    score           DECIMAL(5,2) NOT NULL,  -- 0.00 - 100.00
    row_count       BIGINT,
    issue_count     BIGINT,
    details         JSONB        DEFAULT '{}',
    measured_at     TIMESTAMPTZ  DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dq_scores_asset ON governance.data_quality_scores (asset_name, measured_at DESC);

-- ============================================================
-- LAKE SCHEMA — Data lake object metadata index (Phase 133)
-- ============================================================

CREATE TABLE IF NOT EXISTS lake.objects (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    layer           VARCHAR(50)  NOT NULL,    -- RAW, PROCESSED, CURATED
    bucket          VARCHAR(255) NOT NULL,
    object_key      VARCHAR(1024) NOT NULL,
    content_type    VARCHAR(100),
    size_bytes      BIGINT,
    checksum_sha256 VARCHAR(64),
    source          VARCHAR(255),
    tags            JSONB        DEFAULT '{}',
    retention_until TIMESTAMPTZ,
    compressed      BOOLEAN      DEFAULT FALSE,
    encrypted       BOOLEAN      DEFAULT TRUE,
    created_at      TIMESTAMPTZ  DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_lake_layer ON lake.objects (layer, created_at DESC);

-- ============================================================
-- TRIGGERS — auto updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER trg_orgs_updated_at   BEFORE UPDATE ON ops.organizations FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  CREATE TRIGGER trg_catalog_updated   BEFORE UPDATE ON governance.data_catalog FOR EACH ROW EXECUTE FUNCTION update_modified_column();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- SEED: Data catalog entries for all operational tables
-- ============================================================
INSERT INTO governance.data_catalog (asset_name, asset_type, schema_name, classification, owner_team, description, pii_fields, retention_days) VALUES
('users',        'TABLE', 'public',     'PII',          'platform',    'Core user accounts',               ARRAY['email','first_name','last_name','password_hash'], 2555),
('leads',        'TABLE', 'public',     'CONFIDENTIAL', 'crm',         'Sales lead records',                ARRAY['contact_email','contact_phone'], 1825),
('applications', 'TABLE', 'public',     'CONFIDENTIAL', 'hrms',        'Job applications',                 ARRAY['resume_url'], 2555),
('audit_logs',   'TABLE', 'public',     'INTERNAL',     'platform',    'Security audit trail',             ARRAY[]::TEXT[], 2555),
('ai.memory',    'TABLE', 'ai',         'CONFIDENTIAL', 'ai-platform', 'AI conversation memory',           ARRAY['content'], 90),
('ai.embeddings','TABLE', 'ai',         'INTERNAL',     'ai-platform', 'Vector embeddings store',          ARRAY[]::TEXT[], 365),
('streaming.outbox','TABLE','streaming','INTERNAL',     'platform',    'Event outbox for reliable delivery',ARRAY[]::TEXT[], 90)
ON CONFLICT DO NOTHING;
