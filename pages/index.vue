<template>
  <v-container style="height: 100%;" fluid>
    <v-row no-gutters>
      <v-col
        v-for="video in videos"
        :key="video.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mx-xs-auto"
      >
        <VideoMainCard :width="$vuetify.display.xs ? '100%' : '90%'" :video="video" />
      </v-col>
    </v-row>
    <v-card v-intersect.quiet="infiniteScroll" class="my-auto" />
  </v-container>
</template>
<script lang='ts' setup>
import { Video } from 'utils/model'
const page = ref(1)
let totalPages = 1
const videos = ref<Video[]>([])

const { data } = await useFetch('/api/videos', {
  query: {
    page: 0
  }
})
data.value?.content?.forEach(video => videos.value.push(video))
totalPages = data.value?.totalPages ? data.value?.totalPages : 1

definePageMeta({ auth: false })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  setTimeout(async () => {
    if (page.value < totalPages) {
      const { data } = await useFetch(`/api/videos?page=${page.value}`)
      totalPages = data.value?.totalPages ? data.value?.totalPages : totalPages
      data.value?.content?.forEach(video => videos.value.push(video))
      page.value++
    }
  }, 1000)
}
</script>
