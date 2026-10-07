# Phase 118 — Multi-Region Infrastructure (Terraform)
# Active-passive failover: us-central1 (primary) + europe-west1 (secondary)

# ─── Secondary Region VPC ────────────────────────────────────────────────────
resource "google_compute_network" "vantrex_vpc_eu" {
  provider                = google
  name                    = "vantrex-vpc-eu"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "vantrex_subnet_eu" {
  provider      = google
  name          = "vantrex-subnet-europe-west1"
  ip_cidr_range = "10.10.0.0/20"
  region        = "europe-west1"
  network       = google_compute_network.vantrex_vpc_eu.id

  secondary_ip_range {
    range_name    = "pods-eu"
    ip_cidr_range = "10.11.0.0/16"
  }
}

# ─── Secondary GKE Cluster ───────────────────────────────────────────────────
resource "google_container_cluster" "vantrex_cluster_eu" {
  provider = google
  name     = "vantrex-platform-cluster-eu"
  location = "europe-west1"

  network    = google_compute_network.vantrex_vpc_eu.name
  subnetwork = google_compute_subnetwork.vantrex_subnet_eu.name

  remove_default_node_pool = true
  initial_node_count       = 1

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods-eu"
    services_secondary_range_name = "services-eu"
  }
}

# ─── Cloud SQL Read Replica (EU) ─────────────────────────────────────────────
resource "google_sql_database_instance" "vantrex_postgres_eu" {
  name             = "vantrex-postgres-replica-eu"
  database_version = "POSTGRES_15"
  region           = "europe-west1"

  master_instance_name = google_sql_database_instance.vantrex_postgres.name

  replica_configuration {
    failover_target = false
  }

  settings {
    tier              = var.db_tier
    availability_type = "ZONAL"
  }
}

# ─── Cloudflare Load Balancing (Geo Routing) ─────────────────────────────────
resource "cloudflare_load_balancer" "vantrex_lb" {
  zone_id          = var.cloudflare_zone_id
  name             = "api.agnex.tech"
  fallback_pool_id = cloudflare_load_balancer_pool.us_pool.id
  default_pool_ids = [
    cloudflare_load_balancer_pool.us_pool.id,
    cloudflare_load_balancer_pool.eu_pool.id,
  ]
  proxied = true

  rules {
    name      = "eu-geo-routing"
    condition = "ip.geoip.continent eq \"EU\""
    actions {
      pool_ids = [cloudflare_load_balancer_pool.eu_pool.id]
    }
  }
}

resource "cloudflare_load_balancer_pool" "us_pool" {
  account_id = var.cloudflare_account_id
  name       = "vantrex-us-pool"
  origins {
    name    = "us-central1"
    address = google_container_cluster.vantrex_cluster.endpoint
    enabled = true
  }
  health_check {
    path    = "/health/live"
    method  = "GET"
    interval = 60
  }
}

resource "cloudflare_load_balancer_pool" "eu_pool" {
  account_id = var.cloudflare_account_id
  name       = "vantrex-eu-pool"
  origins {
    name    = "europe-west1"
    address = google_container_cluster.vantrex_cluster_eu.endpoint
    enabled = true
  }
  health_check {
    path    = "/health/live"
    method  = "GET"
    interval = 60
  }
}
