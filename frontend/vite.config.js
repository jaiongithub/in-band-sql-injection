import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://backend:3000' // Proxy /api calls to backend container
    },
    host: true, // allow access from outside container
  }
});
