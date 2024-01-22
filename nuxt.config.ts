import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  srcDir: 'src',
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'zh-CN',
      },
      titleTemplate: '%s | 奈思简历 NiceCV',
      meta: [],
    },
  },
  components: {
    dirs: [
      // ! 全局组件，JSON 数据动态引入
      { path: '~/components/Form', global: true, prefix: 'Form' },
      { path: '~/components' },
    ],
  },
  css: ['~/assets/styles/main.scss'],
  experimental: {
    componentIslands: true,
  },
  routeRules: {
    // '/': {
    //   prerender: true
    // },
    '/api/**': {
      cors: true,
    },
    // '/editor/**': {
    //   ssr: false
    // },
    // '/creator/**': {
    //   ssr: false,
    //   swr: 3600
    // }
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
    '@vueuse/nuxt',
    // * logger for vue in server side render
    'nuxt3-winston-log',
  ],
  pinia: {
    storesDirs: ['src/stores/**'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  devtools: { enabled: false },
})
