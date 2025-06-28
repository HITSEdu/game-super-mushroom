import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/game-szns/',
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "SZNS",
        short_name: "SZNS",
        description: "2D Platformer",
        start_url: '/game-szns/',
        scope: '/game-szns/',
        display: 'standalone',
        background_color: '#2EC6FE',
        theme_color: 'rgba(0, 0, 0, 1)',
        orientation: 'landscape',
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icons/icon512_maskable.png",
            type: "image/png"
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icons/icon512_rounded.png",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: 'any'
          },
        ],
        screenshots: [
          {
            src: "screenshots/desktop.png",
            type: "image/png",
            sizes: "1919x984",
            form_factor: "wide"
          },
          {
            src: "screenshots/mobile.png",
            type: "image/png",
            sizes: "427x752",
            form_factor: "narrow"
          },
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        globIgnores: [
          '**/node_modules/**/*',
          '**/dev-dist/**/*',
          'sw.js',
          'workbox-*.js'
        ]
      }
    }),
  ],
})
