<template>
  <VideoMainCard v-if="$vuetify.display.xs" :width="'100%'" :video="video" />
  <v-list-item v-else lines="three" :to="`/watch/${props.video.id}`" :ripple="false">
    <template #prepend>
      <v-img
        class="mr-2"
        aspect-ratio="16/9"
        :src="video.thumbnail"
        alt="thumbnail"
        width="250"
      />
    </template>
    <template #title>
      {{ video.title }}
      <div>
        <span class="d-flex text-caption text-disabled">{{ formatViews(props.video.views) }} views •
          {{ formatTimeAgo(new Date(props.video.createdAt)) }}</span>
      </div>
    </template>
    <template #subtitle>
      <div>
        <NuxtLink :to="`/channel/${props.video.userId}`" class="text-decoration-none">
          <div class="d-flex my-2" no-gutters>
            <span>
              <v-avatar size="30">
                <v-img :src="`https://avatars.dicebear.com/api/bottts/${props.video.channelName}.svg`" />
              </v-avatar>
            </span>
            <span class="d-flex align-center">
              <div class="text-caption text-disabled ml-2">
                {{ props.video.channelName }}
              </div>
            </span>
          </div>
        </NuxtLink>
      </div>
      <div class="caption grey--text">
        {{ `${props.video.description.substring(0, 250)}...` }}
      </div>
    </template>
  </v-list-item>
</template>

<script lang='ts' setup>
import { formatTimeAgo } from '@vueuse/core'
import { Video } from '@/utils/model'

const props = defineProps<{
    video: Video
}>()

function formatViews (views: number) {
  if (views < 999) {
    return views
  } else if (views >= 1000 && views < 1000000) {
    return Math.floor(views / 1000) + 'K'
  } else if (views >= 1000000 && views < 1000000000) {
    return Math.floor(views / 1000000) + 'M'
  } else {
    return Math.floor(views / 1000000000) + 'B'
  }
}
</script>
