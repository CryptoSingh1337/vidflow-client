<template>
  <v-container v-if="searchVideos.length > 0" fluid>
    <v-row align="center" justify="center" no-gutters>
      <v-col cols="12" md="10" lg="8">
        <SearchVideoCard v-for="(searchVideo, idx) in searchVideos" :key="idx" :video="searchVideo" />
      </v-col>
    </v-row>
    <v-card v-intersect.quiet="infiniteScroll" class="my-auto" />
  </v-container>
  <GlobalEmptyDataHandler v-else class="mt-16 pt-16" :text="'No video found with title: ' + $route.query.q" :icon="'mdi-close-circle'" />
</template>

<script lang='ts' setup>
import { Video } from 'utils/model'

const route = useRoute()
const page = ref(1)
const searchVideos = ref<Video[]>([])
let totalPages = 1

definePageMeta({ auth: false })
useHead({
  title: 'Search - VidFlow'
})

const { refresh } = await useAsyncData(() => $fetch('/api/video/search', {
  query: {
    q: route.query.q,
    page: 0
  },
  onResponse ({ response }) {
    if (response.status === 200) {
      searchVideos.value = response._data?.content
      totalPages = response._data?.totalPages ? response._data?.totalPages : 1
    }
  }
}))

watch(() => route.query, () => refresh())

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function infiniteScroll (isIntersecting: any, entries: any, observer: any) {
  setTimeout(async () => {
    if (page.value < totalPages) {
      const { data } = await useFetch(`/api/video/search?q=${route.query.q}&page=${page.value}`)
      totalPages = data.value?.totalPages ? data.value?.totalPages : totalPages
      data.value?.content?.forEach(video => searchVideos.value.push(video))
      page.value++
    }
  }, 500)
}
</script>
