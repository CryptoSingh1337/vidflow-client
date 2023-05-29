import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const responseSchema = z.object({
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
  const videoId = getRouterParam(event, 'id')
  const { page } = getQuery(event)
  const response = await $fetch(`${backendBaseUrl}/video/id/${videoId}/recommend?page=${page}`) as any
  return responseSchema.parse(response.data.videos)
})
