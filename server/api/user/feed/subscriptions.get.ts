import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const response = z.object({
  videos: z.array(z.object({
    id: z.string(),
    title: z.string(),
    userId: z.string(),
    channelName: z.string(),
    views: z.number(),
    createdAt: z.string(),
    thumbnail: z.string()
  })),
  totalPages: z.number()
})

export default defineEventHandler(async (event) => {
  const { page } = getQuery(event)
  const token = await getToken({ event })

  if (token) {
    const result = await $fetch(`${backendBaseUrl}/video/subscribe/channel?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    }) as any
    return response.parse(result.data)
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
