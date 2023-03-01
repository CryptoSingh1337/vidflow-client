<template>
  <UnauthorizeUser v-if="$auth.status.value === 'unauthenticated'" icon="mdi-video" heading="Keep your eyes on your vidoes stats" caption="Sign in to see your videos stats" />
  <v-container v-else-if="videos && videos.length > 0">
    <div class="text-h6 font-weight-bold mb-5">
      Your videos
    </div>
    <VideoLikedList :videos="videos" />
  </v-container>
</template>

<script lang='ts' setup>
import { Video } from 'utils/model'

definePageMeta({ auth: false })
useHead({
  title: 'Your videos - VidFlow'
})

const { data: videos } = await useFetch<Video[]>('/api/user/videos')
</script>
