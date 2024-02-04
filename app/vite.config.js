import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: true
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  build: {
    outDir: path.join(__dirname, '../api/src/build')
  },
  publicDir: path.join(__dirname, '../app/public')
})
