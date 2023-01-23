import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const video = z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  channelName: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  views: z.number(),
  likes: z.number(),
  dislikes: z.number(),
  createdAt: z.string(),
  thumbnail: z.string(),
  comments: z.array(z.object({
    id: z.string(),
    username: z.string(),
    channelName: z.string(),
    body: z.string(),
    createdAt: z.string()
  }))
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const result = await $fetch(`${backendBaseUrl}/video/id/${id}`)
  return video.parse(result)
})
