import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // We will add these later
      manifest: {
        name: 'Prateek Singh | Systems Architect',
        short_name: 'Prateek',
        description: 'Portfolio of Prateek Singh, MERN Stack Developer & Architect.',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone', // This hides the browser UI when installed
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})