import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/v1': {
        target: 'https://2.56.166.37',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://2.56.166.37'
        }
      }
    }
  }
})