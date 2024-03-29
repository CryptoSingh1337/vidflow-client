<template>
  <GlobalPageLoader v-if="pending" />
  <div v-else-if="response?.video && response.channel">
    <v-row justify="center" no-gutters>
      <v-col cols="12" sm="12" md="7" lg="8">
        <WatchVideoPlayer class="ml-md-10 mt-md-5 rounded-lg" :src="response.video.videoUrl" :title="response.video.title" :thumbnail="response.video.thumbnail" />
        <div class="mt-5 mx-5 mx-md-10">
          <WatchVideoFooter
            :same="same"
            :subscribers="response.channel.subscribers"
            :subscribed="subscribed"
            :video="response.video"
            :liked="liked"
          />
          <v-divider />
          <WatchCommentSection :comments="response.video.comments" />
        </div>
      </v-col>
      <v-col
        v-if="recommendedVideos.length > 0"
        class="px-5 py-3 py-sm-0 py-md-5"
        cols="12"
        sm="12"
        md="5"
        lg="4"
      >
        <h3 class="font-weight-medium">
          Recommended videos
        </h3>
        <div class="d-flex flex-column-reverse">
          <WatchRecommendVideoCard v-for="(recommendedVideo, idx) in recommendedVideos" :key="idx" :video="recommendedVideo" />
          <v-card v-intersect.quiet="infiniteScroll" class="my-auto" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang='ts' setup>
import { User, Video } from 'utils/model'

const route = useRoute()
const videoId = route.params.id
const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const recommendedVideos = ref<Video[]>([])
const page = ref(1)
let totalPages = 0
const subscribed = ref(false)
const liked = ref(false)
let same = false

definePageMeta({ auth: false })
useHead({
  title: 'Watch - VidFlow'
})

const { pending, data: response } = await useFetch(`/api/video/id/${videoId}`, {
  key: videoId as string
})
const category = response.value?.video.category
const tags = response.value?.video.tags

const { data } = await useFetch(`/api/video/id/${videoId}/recommend`, {
  query: {
    page: 0
  }
})

// const { data } = await useFetch('/api/video/recommended', {
//   method: 'POST',
//   body: {
//     category,
//     tags,
//     page: 0
//   }
// })

// const { data } = await useFetch('/api/video/trending', {
//   query: {
//     page: 0
//   }
// })

data.value?.content.forEach((v) => {
  if (v.id !== videoId) {
    recommendedVideos.value.push(v)
  }
})
totalPages = data.value?.totalPages ? data.value?.totalPages : 1

if (response.value?.video && response.value.channel) {
  if ($auth.status.value === 'authenticated' && response.value.userMetadata) {
    if (user.id === response.value.video.userId) {
      same = true
    } else {
      subscribed.value = response.value.userMetadata.subscribeStatus
    }
    liked.value = response.value.userMetadata.likeStatus
    useFetch(`/api/user/${user.id}/history/${videoId}`, {
      method: 'POST'
    })
  }
}

onMounted(async () => {
  await Promise.all([
    new Promise(() => setTimeout(() => {
      useFetch(`/api/video/views/${videoId}`, {
        method: 'PUT',
        onResponse () {
          if (response.value?.video && response.value.video.views) {
            response.value.video.views += 1
          }
        }
      })
    }, 1000))
  ])
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  setTimeout(async () => {
    if (page.value < totalPages) {
      const { data } = await useFetch(`/api/video/id/${videoId}/recommend`, {
        query: {
          page: 0
        }
      })
      // const { data } = await useFetch('/api/video/recommended', {
      //   body: {
      //     category,
      //     tags
      //   },
      //   query: {
      //     page: 0
      //   }
      // })
      // const { data } = await useFetch(`/api/video/trending?page=${page.value}`)
      totalPages = data.value?.totalPages ? data.value?.totalPages : totalPages
      data.value?.content?.forEach(video => recommendedVideos.value.push(video))
      page.value++
    }
  }, 1000)
}
</script>
