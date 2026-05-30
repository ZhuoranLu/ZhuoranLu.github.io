import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// User pages site (zhuoranlu.github.io) is served from the root path.
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
