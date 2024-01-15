import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  srcDir: 'src',
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-CN'
      },
      titleTemplate: '%s - 奈思简历 | NiceCV',
      meta: []
    }
  },
  css: [],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
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
