# Phase 115 — Infrastructure as Code (Terraform)
# Provisions: GKE Cluster, Cloud SQL (PostgreSQL), Redis, Artifact Registry, DNS, CDN
terraform {
  required_version = ">= 1.9"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
  # Remote state in GCS (Production)
  backend "gcs" {
    bucket = "vantrex-terraform-state"
    prefix = "production/platform"
  }
}

provider "google" {
  project = var.project_id
  region  = var.primary_region
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# ─── VPC Network ─────────────────────────────────────────────────────────────
resource "google_compute_network" "vantrex_vpc" {
  name                    = "vantrex-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "vantrex_subnet" {
  name          = "vantrex-subnet-${var.primary_region}"
  ip_cidr_range = "10.0.0.0/20"
  region        = var.primary_region
  network       = google_compute_network.vantrex_vpc.id

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.1.0.0/16"
  }
  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.2.0.0/20"
  }
}

# ─── GKE Cluster ─────────────────────────────────────────────────────────────
resource "google_container_cluster" "vantrex_cluster" {
  name     = "vantrex-platform-cluster"
  location = var.primary_region

  network    = google_compute_network.vantrex_vpc.name
  subnetwork = google_compute_subnetwork.vantrex_subnet.name

  # Phase 112 — Remove default node pool, use managed node pools
  remove_default_node_pool = true
  initial_node_count       = 1

  # Phase 114 — Istio / Workload Identity
  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  addons_config {
    http_load_balancing { disabled = false }
    horizontal_pod_autoscaling { disabled = false }
    gce_persistent_disk_csi_driver_config { enabled = true }
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }
}

resource "google_container_node_pool" "vantrex_nodes" {
  name       = "vantrex-node-pool"
  cluster    = google_container_cluster.vantrex_cluster.name
  location   = var.primary_region
  node_count = var.node_count

  autoscaling {
    min_node_count = 2
    max_node_count = 10
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type = var.node_machine_type
    disk_size_gb = 50
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }
}

# ─── Cloud SQL (PostgreSQL) ───────────────────────────────────────────────────
resource "google_sql_database_instance" "vantrex_postgres" {
  name             = "vantrex-postgres-${var.environment}"
  database_version = "POSTGRES_15"
  region           = var.primary_region
  deletion_protection = true

  settings {
    tier              = var.db_tier
    availability_type = "REGIONAL" # Phase 118 — High availability

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
      retained_backups               = 30
    }

    maintenance_window {
      day  = 7 # Sunday
      hour = 3
    }

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vantrex_vpc.id
    }
  }
}

resource "google_sql_database" "vantrex_db" {
  name     = "vantrex"
  instance = google_sql_database_instance.vantrex_postgres.name
}

# ─── Redis (Memorystore) ─────────────────────────────────────────────────────
resource "google_redis_instance" "vantrex_redis" {
  name           = "vantrex-redis-${var.environment}"
  tier           = "STANDARD_HA"
  memory_size_gb = 2
  region         = var.primary_region

  authorized_network = google_compute_network.vantrex_vpc.id

  redis_configs = {
    maxmemory-policy = "allkeys-lru"
  }
}

# ─── Artifact Registry (Container Images) ────────────────────────────────────
resource "google_artifact_registry_repository" "vantrex_registry" {
  location      = var.primary_region
  repository_id = "vantrex-platform"
  format        = "DOCKER"
}

# ─── Cloudflare DNS + CDN ────────────────────────────────────────────────────
resource "cloudflare_record" "api" {
  zone_id = var.cloudflare_zone_id
  name    = "api"
  type    = "CNAME"
  value   = google_container_cluster.vantrex_cluster.endpoint
  proxied = true # Enable Cloudflare CDN + DDoS protection
}
