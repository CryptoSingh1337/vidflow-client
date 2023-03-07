import { getServerSession, getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const commentId = getRouterParam(event, 'comment_id')
  const session = await getServerSession(event)

  if (session) {
    const token = await getToken({ event })
    if (token) {
      const payload = await readBody(event)
      await $fetch(`${backendBaseUrl}/video/id/${id}/comment/id/${commentId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: payload
      })
      return 'success'
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: 'Token is missing'
      })
    }
  }
})
