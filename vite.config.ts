import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(fileURLToPath(import.meta.url), '../src'),
    },
  },
  server: {
    proxy: {
      '/graphql': {
        target: 'http://localhost:3000', // Your Rails API endpoint
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
        secure: false, // Ignore self-signed certificates in development
      },
    },
  },
});
