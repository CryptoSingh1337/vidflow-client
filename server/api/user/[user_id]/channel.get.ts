const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')
  const result = await $fetch(`${backendBaseUrl}/user/id/${userId}/channel`)
  return result
})
