<template>
  <v-card
    class="ma-2 mx-auto bg-transparent"
    :max-width="props.width"
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
      class="pt-2 subtitle-1 font-weight-bold mb-2"
      style="line-height: normal"
      v-text="truncateTitle(props.video.title)"
    />
    <v-row class="px-2 pb-2" no-gutters>
      <v-col cols="2" class="mr-2">
        <ClientOnly>
          <NuxtLink :to="`/channel/${props.video.userId}`" class="channel-link">
            <v-avatar size="44">
              <v-img
                :src="`https://avatars.dicebear.com/api/bottts/${props.video.channelName}.svg`"
                :title="props.video.channelName"
              />
            </v-avatar>
          </NuxtLink>
        </ClientOnly>
      </v-col>
      <v-col class="d-flex align-center flex-row">
        <v-card-subtitle class="pa-0" style="opacity: 1 !important">
          <div class="font-weight-medium" :title="props.video.channelName">
            {{ props.video.channelName }}
          </div>
          <span class="text-grey">
            {{ shortifyNumber(props.video.views) }} views •
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
import { shortifyNumber, truncateText } from '@/utils/functions'

const { name } = useDisplay()

const props = defineProps<{
    video: Video
    width: string
}>()

function truncateTitle (title: string): string {
  let result = ''
  switch (name.value) {
    case 'xs':
    case 'md':
    case 'lg':
    case 'xl':
      result = truncateText(title, 65)
      break
    case 'sm':
      result = truncateText(title, 90)
      break
  }
  return result
}
</script>

<style scoped>
.channel-link:hover {
  cursor: pointer;
}
</style>
