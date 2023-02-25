<template>
  <v-list-item :to="`/watch/${video.id}`" class="px-0 px-sm-5" :active="false">
    <template #prepend>
      <v-img
        class="mr-2"
        aspect-ratio="16/9"
        width="100"
        :src="props.video.thumbnail"
        alt="thumbnail"
      />
    </template>
    <template #title>
      <div class="text-body-2">
        {{
          ($vuetify.display.xs ? video.title.substring(0, 60) : video.title.substring(0, 100)) + "..."
        }}
      </div>
      <div>
        <div class="font-weight-bold text-caption">
          {{ video.channelName }}
        </div>
        <span class="text-caption text-disabled">{{ formatTimeAgo(new Date(props.video.createdAt)) }} •
          {{ formatViews(props.video.views) }} views</span>
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
