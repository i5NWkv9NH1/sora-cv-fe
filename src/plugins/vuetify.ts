import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

const defaults = {
  global: {
    ripple: false
  },
  VChip: {
    rounded: 'lg'
  },
  VBtn: {
    rounded: 'lg'
  },
  VCarousel: {
    class: 'rounded-lg'
  },
  VCard: {
    rounded: 'lg'
  },
  VSheet: {
    rounded: 'lg'
  },
  VAvatar: {
    rounded: 'lg'
  },
  VTab: {
    rounded: 'lg'
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    // ssr: false,
    // blueprint: md3,
    defaults,
    directives
  })
  app.vueApp.use(vuetify)
})
