// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import pwa from '@vite-pwa/astro'; // <-- Importamos PWA

export default defineConfig({
  integrations: [
    react(),
    pwa({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi Aplicación',
        short_name: 'MiApp',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4a90e2', // Color de la barra superior en móviles
        icons: [
          {
            src: '/assets/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  vite: {
    server: {
      host: true,       // Permite conexiones externas (necesario para ngrok)
      allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0', '::1'],
 // Permite todos los hosts, incluyendo ngrok

      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        overlay: false,
      },
    },
  },
});
