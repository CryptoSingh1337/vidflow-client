import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const videoSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  channelName: z.string(),
  description: z.string(),
  views: z.number(),
  createdAt: z.string(),
  thumbnail: z.string()
}))

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const { page } = getQuery(event)
  const token = await getToken({ event })

  if (token) {
    const result = await $fetch(`${backendBaseUrl}/user/id/${userId}/watch/history?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    return videoSchema.parse(result)
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
