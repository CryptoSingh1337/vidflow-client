import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const videosSchema = z.array(z.object({
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
  const userId = getRouterParam(event, 'user_id')
  const { page } = getQuery(event)
  const token = await getToken({ event })
  const result = await $fetch(`${backendBaseUrl}/user/id/${userId}/liked?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`
    }
  })
  return videosSchema.parse(result)
})
