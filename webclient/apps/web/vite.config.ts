import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // The supported browsers match the TypeScript target. Revisit this before
    // adding a legacy-browser requirement.
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: true,
    // Compression is reported by the workspace bundle script instead of during
    // every Vite build, keeping local and CI builds faster.
    reportCompressedSize: false,
    chunkSizeWarningLimit: 250,
  },
})
