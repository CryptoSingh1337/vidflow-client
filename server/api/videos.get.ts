import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const videos = z.array(z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  channelName: z.string(),
  views: z.number(),
  createdAt: z.string(),
  thumbnail: z.string()
}))

export default defineEventHandler(async (event) => {
  const page = Number(event.node.req.url?.split('=', 2)[1])
  const result = await $fetch(`${backendBaseUrl}/video?page=${page}`)
  return videos.parse(result)
})
