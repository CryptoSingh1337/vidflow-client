import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const videoId = getRouterParam(event, 'id')
  const token = await getToken({ event })
  if (token) {
    await $fetch(`${backendBaseUrl}/user/id/${userId}/video/id/${videoId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    return null
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
