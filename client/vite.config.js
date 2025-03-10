import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      $: "jquery",
    },
  },
  server: {
    hmr: {
      overlay: false, // Disable the error overlay if needed
    },
    proxy: {
      '/api': {
        target: 'http://139.59.11.243:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  })
