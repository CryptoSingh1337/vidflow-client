import { z } from 'zod'

const { backendBaseUrl } = useRuntimeConfig()

const response = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    channelName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    profileImage: z.string()
  })
})

const errorResponseSchema = z.object({
  responseStatus: z.string(),
  error: z.object({
    code: z.string(),
    message: z.array(z.string())
  })
})

export default defineEventHandler(async (event) => {
  const payload = await readBody(event)
  const result = await $fetch(`${backendBaseUrl}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onResponseError ({ request, options, response }) {
      const error = errorResponseSchema.parse(response._data)
      throw createError({
        statusCode: response.status,
        statusMessage: error.error.message[0]
      })
    }
  }) as any
  return response.parse(result.data)
})
