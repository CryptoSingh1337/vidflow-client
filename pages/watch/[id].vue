<template>
  <GlobalPageLoader v-if="pending" />
  <div v-else-if="video">
    <WatchVideoPlayer :src="video.videoUrl" :title="video.title" :thumbnail="video.thumbnail" />
    <v-row class="px-lg-5" no-gutters>
      <v-col class="px-5 pt-5 pa-sm-5" cols="12" sm="12" md="7" lg="8">
        <WatchVideoFooter
          :same="same"
          :subscribers="subscribers"
          :subscribed="subscribed"
          :video="video"
          :liked="liked"
        />
        <v-divider />
        <WatchCommentSection :comments="video.comments" />
      </v-col>
      <v-col class="px-5 py-3 py-sm-0 py-md-5" cols="12" sm="12" md="5" lg="4">
        <div class="d-flex flex-column-reverse">
          <WatchTrendingVideoCard v-for="(trendingVideo, idx) in trendingVideos" :key="idx" :video="trendingVideo" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang='ts' setup>
import { User } from 'utils/model'

const route = useRoute()
const { backendBaseUrl } = useRuntimeConfig()
const { $auth } = useNuxtApp()
const user = $auth.data.value?.user as User

const page = ref(0)
const same = ref(false)
const subscribers = ref(10034)
const subscribed = ref(false)
const liked = ref(false)

definePageMeta({ auth: false })

const { pending, data: video } = await useFetch(`/api/video/id/${route.params.id}`, {
  key: route.params.id as string
})

const { data: trendingVideos } = await useFetch(`/api/video/trending?page=${page.value}`)

onMounted(async () => {
  useFetch(`/video/views/id/${route.params.id}`, {
    baseURL: backendBaseUrl,
    onResponse () {
      if (video.value && video.value.views) {
        video.value.views += 1
      }
    }
  })
  if ($auth.status.value === 'authenticated') {
    await useFetch(`/api/user/${user.id}/history/${route.params.id}`, {
      method: 'post'
    })
    await useFetch(`/api/user/${user.id}/video/${route.params.id}/liked`, {
      onResponse ({ response }) {
        if (response.status === 200) {
          liked.value = true
        }
      }
    })
  }
})
</script>
