import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  define: {
    'process.env': process.env
  },
  server: {
    cors: {
      origin: '*', // Allow all origins
      credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
    },
    proxy: {
        '/api': {
            target: 'http://localhost:4000',
            changeOrigin: true,
            secure: process.env.NODE_ENV === 'production',
        },
    }
  },
});