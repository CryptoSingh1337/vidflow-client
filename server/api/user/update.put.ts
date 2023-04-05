import { z } from 'zod'
import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string()
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = await getToken({ event })

  if (token) {
    const result = await $fetch(`${backendBaseUrl}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      },
      body
    }) as any
    return userSchema.parse(result.data.user)
  } else {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token is missing'
    })
  }
})
