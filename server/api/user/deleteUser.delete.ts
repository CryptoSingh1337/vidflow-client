import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const token = await getToken({ event })

  if (token) {
    await $fetch(`${backendBaseUrl}/user`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    }) as any
    return 'success'
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
