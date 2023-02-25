import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const videosSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  channelName: z.string(),
  views: z.number(),
  createdAt: z.string(),
  thumbnail: z.string()
}))

export default defineEventHandler(async (event) => {
  const { page } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/video?page=${page}`)
  return videosSchema.parse(result)
})
