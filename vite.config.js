import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

import { VitePWA } from 'vite-plugin-pwa';
import { createHtmlPlugin } from 'vite-plugin-html';

let headContent = fs.readFileSync(resolve(__dirname, 'components/partials/head.html'), 'utf-8');
headContent = headContent
  .replace(/{{title}}/g, "AGNEX Technology | Engineering What's Next.")
  .replace(/{{description}}/g, 'AGNEX is a technology and engineering company that transforms ideas and business challenges into practical digital solutions.')
  .replace(/{{path}}/g, '/');

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          head: headContent
        }
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'AGNEX Technology',
        short_name: 'AGNEX',
        description: "AGNEX Technology — Engineering What's Next.",
        theme_color: '#0B0D10',
        icons: [
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    }),
    {
      name: 'dev-api-fallback-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.method === 'POST' && req.url === '/api/v1/consultation') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const ref = `AGX-${Math.floor(100000 + Math.random() * 900000)}`;
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 201;
                res.end(
                  JSON.stringify({
                    status: 'success',
                    message: 'Consultation request received successfully',
                    data: {
                      referenceId: ref,
                      receivedAt: new Date().toISOString(),
                      company: parsed.company || 'Enterprise Partner'
                    }
                  })
                );
              } catch {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 400;
                res.end(JSON.stringify({ status: 'error', message: 'Invalid payload' }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ],
  build: {
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) return 'vendor-react';
            if (id.includes('gsap')) return 'vendor-gsap';
            return 'vendor';
          }
        }
      }
    }
  }
});
