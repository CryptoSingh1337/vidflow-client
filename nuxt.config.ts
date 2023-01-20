import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'VidFlow',
      meta: [
        { property: 'og:title', name: 'og:title', content: 'VidFlow' },
        { property: 'og:url', name: 'og:url', content: 'https://vidflow.vercel.app/' },
        { property: 'og:image', name: 'og:image', content: '/images/logo.svg' },
        { property: 'og:type', name: 'og:type', content: 'Web application' },
        { property: 'og:description', name: 'og:description', content: 'VidFlow - An open source content sharing platform.' },
        {
          property: 'description',
          name: 'description',
          content: 'VidFlow - An open source content sharing platform.'
        }
      ],
      link: [
        { rel: 'icon', href: '/images/logo.svg' }
      ]
    }
  },
  typescript: {
    shim: false
  },
  modules: [
    '@sidebase/nuxt-auth',
    '@vueuse/nuxt',
    // @ts-ignore
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(vuetify()))
    }
  ],
  css: ['vuetify/styles'],
  vite: {
    ssr: {
      noExternal: ['vuetify']
    }
  },
  runtimeConfig: {
    authSecret: '',
    backendBaseUrl: ''
  },
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true
  },
  nitro: {
    prerender: {
      routes: ['/login', '/register']
    }
  }
})
