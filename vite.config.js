// vite.config.js
// Modulos
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuracion
export default defineConfig(({ mode }) => {
  const enProd = mode === 'production'

  const backend_url = enProd
    ? 'https://blogslist-app-webpack.onrender.com/api'
    : 'http://localhost:3003/api'

  return {
    plugins: [react()],
    server: {
      port: 3000,
      // Proxy para evitar CORS en dev
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
        input: path.resolve(__dirname, 'index.html')
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        loader: {
          '.js': 'jsx', // Forzar que los .js se lean como JSX
        },
      },
    },
    // Configuración para pruebas
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './testSetup.js',
    },
  }
})
