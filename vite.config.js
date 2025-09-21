// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuración principal
export default defineConfig(({ mode }) => {
  const enProd = mode === 'production'

  // URL del backend según entorno
  const BACKEND_URL = enProd
    ? 'https://blogslist-app-webpack.onrender.com/api'
    : 'http://localhost:3003/api'

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://localhost:3003',
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      rollupOptions: {
        // Para producción usamos ruta relativa
        input: 'index.html'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx'
        }
      }
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './testSetup.js'
    },
    define: {
      // Exportar la url del BACKEND
      'import.meta.env.VITE_BACKEND_URL': JSON.stringify(BACKEND_URL)
    }
  }
})


