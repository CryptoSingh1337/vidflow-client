import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const videoId = getRouterParam(event, 'video_id')
  const session = await getServerSession(event)

  if (session) {
    const token = await getToken({ event })
    await $fetch(`${backendBaseUrl}/user/id/${userId}/video/id/${videoId}/liked`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
  }
  return null
})
