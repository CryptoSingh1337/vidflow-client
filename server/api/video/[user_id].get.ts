import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const response = z.object({
  content: z.array(z.object({
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
  const userId = getRouterParam(event, 'user_id')
  const { page } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/video/user/id/${userId}?page=${page}`) as any
  return response.parse(result.data.videos)
})
