const { backendBaseUrl } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const videoId = getRouterParam(event, 'id')
  $fetch(`${backendBaseUrl}/video/views/id/${videoId}`, {
    method: 'PUT'
  })
  return 'success'
})
