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
  const userId = getRouterParam(event, 'user_id')
  const { page } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/video/user/id/${userId}?page=${page}`)
  return videosSchema.parse(result)
})
