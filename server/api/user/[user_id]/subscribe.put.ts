import { getToken, getServerSession } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const query = getQuery(event)
  const session = await getServerSession(event)

  if (session) {
    const token = await getToken({ event })
    if (token) {
      $fetch(`${backendBaseUrl}/user/id/${userId}/subscribe`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.accessToken}`
        },
        query: {
          subscribeToUserId: query.subscribeToUserId,
          increase: query.increase
        }
      })
      return 'success'
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: 'Token is missing'
      })
    }
  }
})
