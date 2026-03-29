import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the app when you push new code
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'], // Caches these for offline use
      manifest: {
        name: 'Prateek Shekhawat | Full Stack Developer',
        short_name: 'Prateek',
        description: 'Elite MERN Stack Developer Portfolio and AI Assistant',
        theme_color: '#000000', // The color of the phone's top status bar
        background_color: '#000000', // The splash screen background color
        display: 'standalone', // Makes it look like a native app (hides browser URL bar)
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Ensures the icon fits perfectly on Android and iOS
          }
        ]
      },
      // ADD THIS NEW BLOCK RIGHT HERE:
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000 // Increases the limit to 5MB
      }
    })
  ]
});