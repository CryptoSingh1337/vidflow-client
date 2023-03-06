<template>
  <v-list-item :to="`/watch/${video.id}`" class="px-0 px-sm-5 my-1" :active="false">
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
      {{ props.video.title }}
    </template>
    <v-list-item-subtitle style="opacity: 1 !important;">
      <div class="font-weight-medium text-caption">
        {{ video.channelName }}
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
