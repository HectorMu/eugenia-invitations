import { defineConfig } from 'vitest/config'
import jsconfigPaths from 'vite-jsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [jsconfigPaths(), react()],
  test: {
    setupFiles: './vitest.setup.js',
    globals: true,
    environment: 'jsdom'
  }
  // resolve: {
  //   alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  // }
})
