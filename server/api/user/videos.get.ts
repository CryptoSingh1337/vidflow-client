import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const videoSchema = z.array(z.object({
  id: z.string(),
  title: z.string(),
  userId: z.string(),
  views: z.number(),
  createdAt: z.string(),
  likes: z.number(),
  dislikes: z.number(),
  thumbnail: z.string(),
  description: z.string(),
  videoStatus: z.string()
}))

export default defineEventHandler(async (event: any) => {
  const token = await getToken({ event })

  if (token) {
    const result = await $fetch(`${backendBaseUrl}/video/user/all`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    return videoSchema.parse(result)
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
