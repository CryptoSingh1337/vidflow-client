<template>
  <v-list-item :to="`/watch/${props.video.id}`" class="pa-0 my-1 rounded-lg" :active="false">
    <template #prepend>
      <v-img
        class="mr-2 rounded-lg"
        aspect-ratio="16/9"
        :width="$vuetify.display.xs ? 120 : 150"
        :src="props.video.thumbnail"
        alt="thumbnail"
      />
    </template>
    <template #title>
      {{ props.video.title }}
    </template>
    <v-list-item-subtitle style="opacity: 1 !important;">
      <div class="font-weight-medium text-caption">
        <span :title="props.video.channelName">{{ props.video.channelName }}</span>
      </div>
      <span class="text-caption text-disabled">{{ formatTimeAgo(new Date(props.video.createdAt)) }} •
        {{ shortifyNumber(props.video.views) }} views</span>
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script lang='ts' setup>
import { formatTimeAgo } from '@vueuse/core'
import { Video } from 'utils/model'
import { shortifyNumber } from '@/utils/functions'

const props = defineProps<{
    video: Video
}>()
</script>
