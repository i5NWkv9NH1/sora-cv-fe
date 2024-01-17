import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  srcDir: 'src',
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      titleTemplate: '%s - 奈思简历 NiceCV',
      meta: []
    }
  },
  css: ['~/assets/styles/main.scss'],
  imports: {
    dirs: []
  },
  experimental: {
    componentIslands: true
  },
  routeRules: {
    '/': {
      prerender: true
    },
    '/api/**': {
      cors: true
    },
    '/editor/**': {
      ssr: false
    },
    '/creator/**': {
      ssr: false,
      swr: 3600
    }
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt'
  ],
  pinia: {
    storesDirs: ['src/stores/**']
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    }
  },
  build: {
    transpile: ['vuetify']
  },
  devtools: { enabled: false }
})
