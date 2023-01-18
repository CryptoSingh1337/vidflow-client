// import videos from '@/assets/data/videos'

const BACKEND_BASE_URL = useRuntimeConfig().backendBaseUrl

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineEventHandler(async (event) => {
  const videos = await $fetch(`${BACKEND_BASE_URL}/video?page=0`)

  return videos
  // const video = videos
  // return {
  //   video
  // }
})
