import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const videosSchema = z.object({
  responseStatus: z.string(),
  data: z.object({
    videos: z.object({
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
  })
})

export default defineEventHandler(async (event) => {
  const { page } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/video?page=${page}`)
  return videosSchema.parse(result)
})
