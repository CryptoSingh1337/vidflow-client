<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-video" heading="Keep your eyes on your vidoes stats" caption="Sign in to see your videos stats" />
  <div v-else-if="videos && videos.length > 0">
    <VideoLikedList :videos="videos" />
  </div>
</template>

<script lang='ts' setup>
import { Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Your videos - VidFlow'
})

const { data: videos } = await useFetch<Video[]>('/api/user/videos')
</script>
