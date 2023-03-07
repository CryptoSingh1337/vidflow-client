import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const videoId = getRouterParam(event, 'id')
  const { isLiked } = getQuery(event)
  const session = await getServerSession(event)

  if (!session) {
    throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
  }
  const token = await getToken({ event })
  if (token) {
    $fetch(`${backendBaseUrl}/user/id/${userId}/video/id/${videoId}/like?isLiked=${isLiked}`, {
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
