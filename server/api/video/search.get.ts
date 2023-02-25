import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const searchVideosSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  channelName: z.string(),
  views: z.number(),
  description: z.string(),
  createdAt: z.string(),
  thumbnail: z.string()
}))

export default defineEventHandler(async (event) => {
  const { q, page } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/video/search?q=${q}&page=${page}`)
  return searchVideosSchema.parse(result)
})
