import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      
      '@assets': path.resolve(__dirname, './src/assets'),
      '@configs': path.resolve(__dirname, './configs'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@states': path.resolve(__dirname, './src/states')
    }
  }
})
