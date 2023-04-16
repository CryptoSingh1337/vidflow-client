import { z } from 'zod'
import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const generalResponse = z.object({
  video: z.object({
    id: z.string(),
    title: z.string(),
    userId: z.string(),
    channelName: z.string(),
    description: z.string(),
    videoUrl: z.string(),
    category: z.string(),
    views: z.number(),
    likes: z.number(),
    dislikes: z.number(),
    createdAt: z.string(),
    thumbnail: z.string(),
    tags: z.array(z.string()),
    comments: z.array(z.object({
      id: z.string(),
      username: z.string(),
      channelName: z.string(),
      body: z.string(),
      createdAt: z.string()
    }))
  }),
  channel: z.object({
    subscribers: z.number()
  }),
  userMetadata: z.object({
    likeStatus: z.boolean(),
    subscribeStatus: z.boolean()
  }).nullable()
})

const authResponse = generalResponse.required({
  userMetadata: true
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const session = await getServerSession(event)
  if (session) {
    const token = await getToken({ event }) as any
    const result = await $fetch(`${backendBaseUrl}/video/id/${id}`, {
      query: {
        likeStatus: true,
        userId: token.id,
        subscribeStatus: true
      }
    }) as any
    return authResponse.parse(result.data)
  } else {
    const result = await await $fetch(`${backendBaseUrl}/video/id/${id}`, {
      query: {
        likeStatus: false,
        subscribeStatus: false
      }
    }) as any
    return generalResponse.parse(result.data)
  }
})
