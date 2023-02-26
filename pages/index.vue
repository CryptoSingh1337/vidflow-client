<template>
  <v-container class="fill-height" fluid>
    <v-row class="ma-3" no-gutters>
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
    <v-card v-intersect.quiet="infiniteScroll" />
  </v-container>
</template>
<script lang='ts' setup>
import { Video } from 'utils/model'
const page = ref(1)
const videos = ref<Video[]>([])

const { data } = await useFetch('/api/videos', {
  query: {
    page: 0
  }
})
data.value?.forEach(video => videos.value.push(video))

definePageMeta({ auth: false })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  setTimeout(async () => {
    const { data } = await useFetch(`/api/videos?page=${page.value}`)
    if (data.value?.length !== 0) {
      data.value?.forEach(video => videos.value.push(video))
      page.value++
    }
  }, 500)
}
</script>
