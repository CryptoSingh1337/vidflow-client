import { z } from 'zod'
import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const commentSchema = z.object({
  id: z.string(),
  username: z.string(),
  channelName: z.string(),
  body: z.string(),
  createdAt: z.string()
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const session = await getServerSession(event)

  if (session) {
    const token = await getToken({ event })
    if (token) {
      const payload = await readBody(event)
      const result = await $fetch(`${backendBaseUrl}/video/id/${id}/comment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: payload
      })
      return commentSchema.parse(result)
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: 'Token is missing'
      })
    }
  }
})
