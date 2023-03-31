import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const response = z.object({
  content: z.array(z.object({
    id: z.string(),
    title: z.string(),
    userId: z.string(),
    views: z.number(),
    createdAt: z.string(),
    likes: z.number(),
    dislikes: z.number(),
    thumbnail: z.string(),
    description: z.string(),
    videoStatus: z.string(),
    tags: z.nullable(z.array(z.string()))
  })),
  totalPages: z.number()
})

export default defineEventHandler(async (event: any) => {
  const token = await getToken({ event })
  const { page } = getQuery(event)
  if (token) {
    const result = await $fetch(`${backendBaseUrl}/video/user/all?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    }) as any
    return response.parse(result.data.videos)
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
