import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Meal Tracker", 
        short_name: "MealTracker",
        description: "מעקב אחרי קלוריות וחלבון", 
        theme_color: '#4f46e5',
        icons: [
          {
            src: "/pngegg.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pngegg.png", 
            sizes: "512x512",
            type: "images/png"
          }
        ]
      }
    })
  ],
  server: {
    historyApiFallback: true
  }
})
