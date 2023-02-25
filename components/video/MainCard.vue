<template>
  <v-card
    class="ma-2 mx-auto bg-transparent"
    :max-width="width"
    :to="`/watch/${props.video.id}`"
    variant="flat"
    :ripple="false"
  >
    <v-img
      :src="props.video.thumbnail"
      alt="thumbnail"
      aspect-ratio="16/9"
    />
    <div
      class="px-2 pt-2 subtitle-1 font-weight-bold mb-2"
      style="line-height: normal"
      v-text="truncateText(props.video.title)"
    />
    <v-row class="px-2 pb-2" no-gutters>
      <v-col cols="2" class="mr-2">
        <ClientOnly>
          <NuxtLink :to="`/channel/${props.video.userId}`" class="channel-link">
            <v-avatar size="44">
              <v-img
                :src="`https://avatars.dicebear.com/api/bottts/${props.video.channelName}.svg`"
              />
            </v-avatar>
          </NuxtLink>
        </ClientOnly>
      </v-col>
      <v-col class="d-flex align-center flex-row">
        <v-card-subtitle class="pa-0 grey--text">
          <div class="font-weight-bold">
            {{ props.video.channelName }}
          </div>
          <span>
            {{ formatViews(props.video.views) }} views •
            {{ formatTimeAgo(new Date(props.video.createdAt)) }}
          </span>
        </v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang='ts' setup>
import { formatTimeAgo } from '@vueuse/core'
import { useDisplay } from 'vuetify'
import { Video } from 'utils/model'

const { name } = useDisplay()

const props = defineProps<{
    video: Video
    width: string
}>()

function formatViews (views: number) {
  if (views < 999) {
    return views
  } else if (views >= 1000 && views < 1000000) {
    return (views / 1000).toFixed(2) + 'K'
  } else if (views >= 1000000 && views < 1000000000) {
    return (views / 1000000).toFixed(2) + 'M'
  } else {
    return (views / 1000000000).toFixed(2) + 'B'
  }
}

function isGreaterThanSize (title: string, size: number) {
  return title.length > size
}

function truncateText (title: string) {
  switch (name.value) {
    case 'xs':
    case 'md':
    case 'lg':
    case 'xl': {
      if (isGreaterThanSize(title, 80)) {
        return title.substring(0, 65) + '...'
      }
      return title
    }
    case 'sm': {
      if (isGreaterThanSize(title, 90)) {
        return title.substring(0, 90) + '...'
      }
      return title
    }
  }
}
</script>

<style scoped>
.channel-link:hover {
  cursor: pointer;
}
</style>
