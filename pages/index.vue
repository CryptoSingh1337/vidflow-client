<template>
  <div>
    <v-container fluid>
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
          <VideoMainCard :width="'90%'" :video="video" />
        </v-col>
      </v-row>
      <v-card v-intersect.quiet="infiniteScroll" />
    </v-container>
  </div>
</template>
<script lang='ts' setup>
import { Video } from 'utils/model'
const page = ref(1)
const previousPageFetch = ref(0)
const videos = ref<Video[]>([])

const { data } = await useFetch('/api/videos?page=0')
data.value?.forEach(video => videos.value.push(video))

definePageMeta({ auth: false })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: { intersectionRatio: number; }[], observer: any) {
  setTimeout(async () => {
    if (isIntersecting && previousPageFetch.value === page.value - 1) {
      console.log('Loading more videos')

      const intersectionRatio = entries[0].intersectionRatio as number
      if (intersectionRatio >= 0.99) {
        const { data } = await useFetch(`/api/videos?page=${page.value}`)
        previousPageFetch.value = page.value
        if (data.value !== undefined && data.value?.length as number > 0) {
          data.value?.forEach(video => videos.value.push(video))
          page.value++
        }
      }
    }
  }, 500)
}
</script>
