import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const videoSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  channelName: z.string(),
  description: z.string(),
  views: z.number(),
  createdAt: z.string(),
  thumbnail: z.string()
}))

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { page } = getQuery(event)
  const token = await getToken({ event })
  const result = await $fetch(`${backendBaseUrl}/user/id/${id}/watch/history?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`
    }
  })
  return videoSchema.parse(result)
})
