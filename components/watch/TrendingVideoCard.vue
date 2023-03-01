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
    <template #subtitle>
      <div class="font-weight-bold text-caption">
        {{ video.channelName }}
      </div>
      <span class="text-caption text-disabled">{{ formatTimeAgo(new Date(props.video.createdAt)) }} •
        {{ shortifyNumber(props.video.views) }} views</span>
    </template>
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
