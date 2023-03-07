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
        <span class="d-flex text-caption text-grey">{{ shortifyNumber(props.video.views) }} views •
          {{ formatTimeAgo(new Date(props.video.createdAt)) }}</span>
      </div>
    </template>
    <v-list-item-subtitle style="opacity: 1 !important;">
      <div>
        <NuxtLink :to="`/channel/${props.video.userId}`" class="text-decoration-none">
          <div class="d-flex my-2" no-gutters>
            <span>
              <v-avatar size="30">
                <v-img :src="`https://avatars.dicebear.com/api/bottts/${props.video.channelName}.svg`" />
              </v-avatar>
            </span>
            <span class="d-flex align-center">
              <div class="text-grey font-weight-medium ml-2">
                {{ props.video.channelName }}
              </div>
            </span>
          </div>
        </NuxtLink>
      </div>
      <div class="text-disabled">
        {{ `${props.video.description && props.video.description.substring(0, 250)}...` }}
      </div>
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script lang='ts' setup>
import { formatTimeAgo } from '@vueuse/core'
import { Video } from '@/utils/model'
import { shortifyNumber } from '@/utils/functions'

const props = defineProps<{
    video: Video
}>()
</script>
