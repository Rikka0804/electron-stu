import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@components': resolve('src/renderer/src/components'),
        '@hooks': resolve('src/renderer/src/hooks'),
        '@views': resolve('src/renderer/src/views'),
        '@utils': resolve('src/renderer/src/utils'),
        '@router': resolve('src/renderer/src/router'),
        '@store': resolve('src/renderer/src/store'),
        '@assets': resolve('src/renderer/src/assets'),
        '@styles': resolve('src/renderer/src/styles'),
        '@types': resolve('src/renderer/src/types'),
        '@api': resolve('src/renderer/src/api'),
        '@layout': resolve('src/renderer/src/layout'),
      }
    },
    server: {
      "proxy": {
        '/api': {
          target:'http://uat.crm.xuexiluxian.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ]
  }
})
