import { UseSessionReturn } from '@sidebase/nuxt-auth/dist/runtime/composables/useSession'

export default defineNuxtPlugin(() => {
  const session: UseSessionReturn = useSession()
  return {
    provide: {
      auth: session
    }
  }
})
