const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const result = await $fetch<number>(`${backendBaseUrl}/user/id/${userId}/subscribers/count`)
  return result
})
