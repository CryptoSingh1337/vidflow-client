<template>
  <GlobalPageLoader v-if="pending" />
  <div v-else>
    <WatchVideoPlayer :src="video.videoUrl" :title="video.title" :thumbnail="video.thumbnail" />
    {{ route.params.id }}
    <div>
      Video:
      {{ video }}
    </div>
    <div>
      Trending video:
      {{ trendingVideo }}
    </div>
  </div>
</template>

<script lang='ts' setup>
const route = useRoute()
const page = ref(0)

definePageMeta({ auth: false })

const { pending, data: video } = await useFetch(`/api/video/id/${route.params.id}`, {
  key: route.params.id as string
})

const { data: trendingVideo } = await useFetch(`/api/video/trending?page=${page.value}`)
</script>
