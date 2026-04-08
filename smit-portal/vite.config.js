import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['sweetalert2'] // ✅ ensure SweetAlert2 is pre-bundled
  },
  build: {
    rollupOptions: {
      external: [] 
    }
  }
})