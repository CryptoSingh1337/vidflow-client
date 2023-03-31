import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const generalResponse = z.object({
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
  }),
  channel: z.object({
    name: z.string(),
    subscribers: z.number()
  }),
  userMetadata: z.object({
    subscribeStatus: z.boolean()
  }).nullable()
})

const authResponse = generalResponse.required({
  userMetadata: true
})

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const { page, subscribeStatus, authenticatedUserId } = getQuery(event)
  const result = await $fetch(`${backendBaseUrl}/user/id/${userId}/channel`, {
    query: {
      page,
      subscribeStatus,
      authenticatedUserId
    }
  }) as any
  if (authenticatedUserId) {
    return authResponse.parse(result.data)
  } else {
    return generalResponse.parse(result.data)
  }
})
