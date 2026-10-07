# Phase 115 — Terraform Outputs
output "cluster_endpoint" {
  description = "GKE cluster API endpoint"
  value       = google_container_cluster.vantrex_cluster.endpoint
  sensitive   = true
}

output "cluster_name" {
  description = "GKE cluster name"
  value       = google_container_cluster.vantrex_cluster.name
}

output "postgres_connection_name" {
  description = "Cloud SQL connection name"
  value       = google_sql_database_instance.vantrex_postgres.connection_name
}

output "redis_host" {
  description = "Redis host address"
  value       = google_redis_instance.vantrex_redis.host
}

output "registry_url" {
  description = "Artifact Registry Docker URL"
  value       = "${var.primary_region}-docker.pkg.dev/${var.project_id}/vantrex-platform"
}
