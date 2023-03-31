import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const response = z.object({
  content: z.array(z.object({
    id: z.string(),
    title: z.string(),
    userId: z.string(),
    channelName: z.string(),
    views: z.number(),
    description: z.string(),
    createdAt: z.string(),
    thumbnail: z.string()
  })),
  totalPages: z.number()
})

export default defineEventHandler(async (event) => {
  const { q, page } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/video/search?q=${q}&page=${page}`) as any
  return response.parse(result.data.videos)
})
