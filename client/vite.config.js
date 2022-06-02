import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'
const path = require('path')

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: 'MangoPlanner',
        name: 'Mango Planner',
        description: 'Simple planner app for convenient use',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '48x48',
            type: 'image/x-icon',
          },
          {
            src: 'pwa-192x192.png',
            type: 'image/png',
            sizes: '192x192',
          },
          {
            src: 'pwa-512x512.png',
            type: 'image/png',
            sizes: '512x512',
          },
        ],
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#fde047',
        lang: 'en-US',
        start_url: '/',
      },
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'robots.txt',
      ],
      registerType: 'autoUpdate',
      devOptions: {
        enabled: process.env.NODE_ENV !== 'production',
      },
      strategies: 'injectManifest',
      injectManifest: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
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
