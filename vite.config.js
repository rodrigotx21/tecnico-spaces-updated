// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['md-filter-chip', 'md-chip-set'].includes(tag)
        }
      }
    })
  ],
  build: {
    outDir: 'dist'
  }
});