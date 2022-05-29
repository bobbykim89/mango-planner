import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
const path = require('path')

import manifest from './manifest.json'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest,
      base: '/',
      includeAssets: [
        'favion.ico',
        'favicon.svg',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'robots.txt',
      ],
      devOptions: {
        enabled: process.env.NODE_ENV !== 'production',
      },
      workbox: {
        cleanupOutdatedCaches: true,
        sourcemap: true,
        globPatterns: ['**/*.{js,jsx,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000/',
    },
  },
})
