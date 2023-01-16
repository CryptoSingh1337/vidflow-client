const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineEventHandler(async (event) => {
  const video = await $fetch(`${BACKEND_BASE_URL}/video?page=0`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return {
    video
  }
})
