import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const subscribedChannelsSchema = z.array(z.object({
  id: z.string(),
  channelName: z.string()
}))

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const token = await getToken({ event })

  if (token) {
    const result = await $fetch(`${backendBaseUrl}/user/id/${userId}/subscribed`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    }) as any
    return subscribedChannelsSchema.parse(result.data.subscribedChannels)
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
