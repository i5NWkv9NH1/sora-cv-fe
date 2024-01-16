import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
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
  }
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    // ssr: false,
    blueprint: md3,
    defaults
  })
  app.vueApp.use(vuetify)
})
