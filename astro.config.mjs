// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  vite: {
    server: {
      watch: {
        usePolling: true, // Fuerza la detección de cambios
        interval: 100, // Ajusta el intervalo de chequeo (prueba con valores más altos si hay problemas)
      },
      hmr: {
        overlay: false, // Evita que la pantalla se bloquee con errores
      }
    }
  }
});









