module.exports = {
  apps: [{
    name: "agnex-api",
    script: "./server/server.js",
    instances: "max", // Run as many instances as there are CPU cores for High Availability
    exec_mode: "cluster",
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
      PORT: 5000,
    }
  }]
}
