import {defineConfig} from 'vite'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        host: true,
        port: 5173,
    },
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
                type: "module"
            },
            manifest: {
                name: "Latest Mushroom Hero",
                short_name: "LMH",
                description: "Mario-style platformer",
                start_url: '/',
                display: 'standalone',
                background_color: '#2EC6FE',
                theme_color: '#8936FF',
                orientation: 'landscape',
                icons: [
                    {
                        purpose: "maskable",
                        sizes: "512x512",
                        src: "/icons/icon512_maskable.png",
                        type: "image/png"
                    },
                    {
                        purpose: "any",
                        sizes: "512x512",
                        src: "/icons/icon512_rounded.png",
                        type: "image/png"
                    },
                    {
                        src: "/icons/icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: 'any'
                    },
                ],
            },
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,mp3}'],
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
