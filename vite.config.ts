import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    port: 5199,
    https: true,
    proxy: {
      '/api': {
        target: 'https://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
