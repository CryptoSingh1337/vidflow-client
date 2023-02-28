import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const subscribedUserId = getRouterParam(event, 'subscribed_user_id')
  const session = await getServerSession(event)

  let result = false
  if (session) {
    const token = await getToken({ event })
    if (token) {
      await $fetch(`${backendBaseUrl}/user/id/${userId}/subscribed/id/${subscribedUserId}`, {
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
