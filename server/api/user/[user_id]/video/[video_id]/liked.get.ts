import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const videoId = getRouterParam(event, 'video_id')
  const session = await getServerSession(event)

  let result = false
  if (session) {
    const token = await getToken({ event })
    if (token) {
      await $fetch(`${backendBaseUrl}/user/id/${userId}/video/id/${videoId}/liked`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        },
        onResponse ({ response }) {
          if (response.status === 200) {
            result = true
          }
        }
      })
      return result
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: 'Token is missing'
      })
    }
  }
})
