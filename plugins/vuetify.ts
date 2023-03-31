import { createVuetify } from 'vuetify'
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    blueprint: md3,
    components: {
      VDataTableServer
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    },
    theme: {
      defaultTheme: 'dark'
    },
    ssr: true
  })

  nuxtApp.vueApp.use(vuetify)
})
