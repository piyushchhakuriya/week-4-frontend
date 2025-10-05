// vite.config.js
// Vite ek fast frontend build tool hai jo React, Vue, Svelte jaisi libraries ke saath use hota hai
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // change to your BE port
        changeOrigin: true
      }
    }
  }
})
