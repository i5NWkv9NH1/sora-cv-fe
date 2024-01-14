import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import 'vuetify/styles'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    ssr: true,
    // ssr: false,
    blueprint: md3
  })
  app.vueApp.use(vuetify)
})
