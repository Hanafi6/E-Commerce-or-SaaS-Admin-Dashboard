import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        customMedia: true,
      }
    }
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'charts',
              test: /node_modules\/chart\.js/,
              priority: 40
            },
            {
              name: 'motion',
              test: /node_modules\/(framer-motion|motion-dom|motion-utils)/,
              priority: 30
            },
            {
              name: 'icons',
              test: /node_modules\/lucide-react/,
              priority: 20
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 10
            }
          ]
        }
      }
    }
  }
})