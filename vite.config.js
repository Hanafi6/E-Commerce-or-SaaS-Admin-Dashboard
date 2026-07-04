import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";


export default defineConfig({
  plugins: [react(), tailwindcss(),
  visualizer({
    open: true,
    gzipSize: true,
  }),
  ],
  optimizeDeps: {
    include: ['recharts'],
  },
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
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "charts",
              test: /node_modules\/(recharts|d3-)/,
              priority: 40,
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