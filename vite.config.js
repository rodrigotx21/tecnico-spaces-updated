import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['md-filter-chip', 'md-chip-set'].includes(tag)
        }
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icons8-map.svg',
        'robots.txt',
        'apple-touch-icon.png',
        'icons-schedule.svg',
        'icon-search.svg',
        'icons8-blueprint.svg',
        'icons8-google-maps.svg',
        'icons8-last-24-hours.svg'
      ],
      theme_color: '#00253e',
      manifest: {
        name: 'Técnico Spaces',
        short_name: 'Spaces',
        description: 'Aqui podes encontrar todos os espaços do IST!',
        theme_color: '#00253e',
        background_color: '#001523',
        display: 'standalone',
        orientation: 'any',
        lang: 'en',
        icons: [
          {
            src: '/icons8-map.svg',
            sizes: '144x144',
            type: 'image/svg+xml'
          },
          {
            src: '/icons-schedule.svg',
            sizes: '40x40',
            type: 'image/svg+xml'
          },
          {
            src: '/icon-search.svg',
            sizes: '24x24',
            type: 'image/svg+xml'
          },
          {
            src: '/icons8-blueprint.svg',
            sizes: '50x50',
            type: 'image/svg+xml'
          },
          {
            src: '/icons8-google-maps.svg',
            sizes: '48x48',
            type: 'image/svg+xml'
          },
          {
            src: '/icons8-last-24-hours.svg',
            sizes: '30x30',
            type: 'image/svg+xml'
          }
        ]
      }
    })    
  ],
  build: {
    outDir: 'dist',
    manifest: true
  }
});