import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { videoId } = getQuery(event)
  const token = await getToken({ event })
  await $fetch(`${backendBaseUrl}/user/id/${id}/video/id/${videoId}`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.accessToken}`
    }
  })
  return null
})
