import { getToken } from '#auth'

const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const videoId = getRouterParam(event, 'id')
  const token = await getToken({ event })
  await $fetch(`${backendBaseUrl}/user/id/${userId}/video/id/${videoId}`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token.accessToken}`
    }
  })
  return null
})
